<template>
	<div>
		<Button type="primary" @click="addData">添加用户</Button>
		<Button type="error" @click="delectData"  >删除用户</Button>
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
	        <FormItem label="姓名" prop="name">
	            <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
	        </FormItem>
	        <FormItem label="密码" prop="password">
	            <Input v-model="formValidate.password" placeholder="请输入密码"></Input>
	        </FormItem>
	        <FormItem label="邮箱" prop="mail">
	            <Input v-model="formValidate.mail" placeholder="请输入邮箱"></Input>
	        </FormItem>
	        
	        <FormItem label="介绍" prop="desc">
	            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
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
	import Base from '../../common/Base.js';
    export default {
    	mixins:[Base],
        data () {
            return {
            	module:'users',
                columns2: [
                	{
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '姓名',
                        key: 'name',
                       
                        
                    },
                    {
                        title: '密码',
                        key: 'password',
                       
                    },
                    {
                        title: '邮箱',
                        key: 'mail',
                       
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
                formValidate: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
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
        
        methods:{
        	 
        }
    }
</script>
