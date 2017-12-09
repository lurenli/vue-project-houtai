<template>
	<div>

		<Button type="primary" @click="addData">添加评论</Button>
		<Button type="error" @click="delectData"  >删除评论</Button>
		<Input v-model="filter.name">
      
        <Button slot="append" icon="ios-search" @click="search"></Button>
    </Input>
		<br/>
		<Button @click="handleSelectAll(true)">设置全选</Button>
        <Button @click="handleSelectAll(false)">取消全选</Button>
	    <Table border ref="selection" stripe :columns="columns2" :data="list"  @on-selection-change="changeSelection"></Table>
	    
	    <Page :total="filter.total" show-elevator show-sizer   show-total  size="small" :page-size="4" @on-change="changePage" @on-page-size-change="onPageSizeChange" ></Page>

	     <Modal
	        v-model="modal1"
	        title="普通的Modal对话框标题"
	        @on-ok="ok"
	        @on-cancel="cancel">
	         <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
	        <FormItem label="评论者" prop="name">
	            <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
	        </FormItem>
            <FormItem label="newid" prop="newId">
                <Input v-model="formValidate.newId" placeholder="请输入"></Input>
            </FormItem>
	        <FormItem label="评论内容" prop="content">
	            
                <quill-editor v-model="formValidate.content"
                ref="myQuillEditor"
                :options="editorOption"
                >
                </quill-editor>

	        </FormItem>
	        <FormItem label="评论等级" prop="thump">
                <Row>
                    
                    <Col span="12">
                        <Rate  @on-change="changerate" show-text allow-half v-model="formValidate.thump">
                           <!--  <span style="color: #f5a623">{{ formValidate.thump }}</span> -->
                        </Rate>
                    </Col>
                </Row>
	            <Input v-model="formValidate.thump"  placeholder="请输入"></Input>
	        </FormItem>
	        
	        
	        <FormItem>
	            <Button type="primary" v-show="shows" @click="handleSubmit('formValidate')">提交</Button>
	            <Button type="ghost"  v-show="shows" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
	        </FormItem>
    </Form>
    </Modal>
	<!-- 删除单个 -->
			<Modal
	        v-model="modal2"
	        title="删除对话框"
	        @on-ok="ok2"
	        @on-cancel="cancel2">
	        <p>确认删除此条信息？</p>
	        
	    </Modal>
   
   <!-- 删除多个 -->
			<Modal
	        v-model="modal3"
	        title="删除对话框"
	        @on-ok="ok3"
	        @on-cancel="cancel3">
	        <p>确认要删除选中的所有的信息？</p>
	        
	    </Modal>
	</div>
</template>
<script>
	import Common from '../../common/Common.js';
    import { quillEditor } from 'vue-quill-editor'
    export default {
    	mixins:[Common],
        data () {
            return {
            	module:'comments',
                editorOption:{},
                
                valueCustomText: 3.8,
                columns2: [
                	{
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '评论者',
                        key: 'name',
                       
                        
                    },
                    {
                        title: '评论内容',
                        //key: 'content',
                        render: (h, params) => {
                            return h('div', {
                                domProps:{
                                    innerHTML:params.row.content
                                }
                            })
                        }
                       
                    },
                    {
                        title: '评论等级',
                        key: 'thump',
                        align:'center',
                        render:(h,params)=>{
                            return h('div',[

                                h('Rate', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        value:params.row.thump,
                                        disabled:true
                                    },
                                    style: {
                                        marginRight: '5px'
                                    }
                                    
                                }, ''),

                                ])
                        }
                       
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 250,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [

                                


                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                        	this.shows=false;
                                            this.show(params.row._id)
                                        }
                                    }
                                }, '查看'),

                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            // this.remove(params.index)
                                            //console.log(params)
                                            this.shows=true;
                                            this.editData(params.row._id,params.index)
                                        }
                                    }
                                }, '编辑'),
                                 h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },

                                    on: {
                                        click: () => {
                                            //this.remove(params.row._id)
                                            //console.log(params.row._id)
                                            //
                                            console.log(params)
                                            this.modal2=true;
                                            
                                           this.idx=params.row._id;
                                           this.indexx=params.index;

                                            
                                       
                                            //console.log(params.row._id,params.index)
                                        }
                                    }
                                }, '删除')

                            ]);
                        }
                    }
                ],
                modal2: false,
                modal3: false,
                 idx:'',
                 indexx:'',
                 shows:true,
                 newids:'',
                formValidate: {
                    name: '',
                    content: '',
                    thump: 0,
                    data: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: '',
                    newId:''
                },
                 
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: '请选择城市', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: '至少选择一个爱好', trigger: 'change' },
                        { type: 'array', max: 2, message: '最多选择两个爱好', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'date', message: '请选择时间', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请输入个人介绍', trigger: 'blur' },
                        { type: 'string', min: 2, message: '介绍不能少于20字', trigger: 'blur' }
                    ]
                }
            }
        },
        
        components: {
            quillEditor
          },
          methods:{
            initList(newId){
                console.log(newId);
                this.$http({
                method:'post',
                url:'http://localhost:3000/comments/list',
                data:{
                    newId:newId
                }
                })
                .then(res=>{
                    console.log(res);
                    this.list=res.data.rows;
                    this.filter.total=res.data.total;
                })
            },
            changerate(){
                console.log(this.formValidate.thump)
            }

            

    },
    created(){
            this.newids=this.$route.path.split('/')[2]
           this.initList(this.$route.path.split('/')[2])
     }
}
</script>
{
                        title: '点赞数',
                        key: 'thump',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Rate', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        value:params.row.thump,
                                        disabled:true
                                    },
                                    style: {
                                        marginRight: '5px'
                                    }
                                }, ''),
                            ])
                        }
                    },
                    {
                        title: '评论',
                        align: 'left',
                        render: (h, params) => {
                            return h('div', {
                                domProps:{
                                    innerHTML:params.row.content
                                }
                            })
                        }
                    },
