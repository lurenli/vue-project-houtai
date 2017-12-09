<template>
    <div>
        <div style="float:left">
           <!--  <ButtonGroup >
                <Button @click="changType(1)" :class="{active:formValidate.type===1}">新闻分类</Button>
                <Button @click="changType(2)" :class="{active:formValidate.type===2}">上传分类</Button>
                <Button @click="changType(3)" :class="{active:formValidate.type===3}">产品分类</Button>
            </ButtonGroup> -->
            <Tree :data="baseData" @on-select-change="clickselect"></Tree>
        </div>
        <div style="float:right">
        <Button type="primary" @click="addData">添加新闻</Button>
        <Button type="error" @click="delectData"  >删除新闻</Button>
        <Input v-model="filter.title">
      
        <Button slot="append" icon="ios-search" placeholder="请输入搜索内容..." @click="search"></Button>
    </Input>
        <br/>
        <!-- <Button @click="handleSelectAll(true)">设置全选</Button>
        <Button @click="handleSelectAll(false)">取消全选</Button> -->
        <Table border ref="selection" stripe :columns="columns2" :data="list"  @on-selection-change="changeSelection" style="width:800px"></Table>
        
        <Page :total="filter.total" show-elevator show-sizer   show-total  size="small" :page-size="4" @on-change="changePage" @on-page-size-change="onPageSizeChange" ></Page>

         <Modal
            v-model="modal1"
            title="普通的Modal对话框标题"
            @on-ok="ok"
            @on-cancel="cancel">
             <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="标题" prop="title">
                <Input v-model="formValidate.title" placeholder="请输入标题"></Input>
            </FormItem>
            <FormItem label="作者" prop="author">
                <Input v-model="formValidate.author" placeholder="请输入作者"></Input>
            </FormItem>
            <FormItem label="副标题" prop="htitle">
                <Input v-model="formValidate.htitle" placeholder="请输入副标题"></Input>
            </FormItem>
            <FormItem label="cateId" prop="cateId" >
                <Input v-model="formValidate.cateId"  placeholder="请输入cateId"></Input>
            </FormItem>
             <FormItem label="belongs" prop="belongs">
                <Input v-model="formValidate.belongs"placeholder="请输入belongs"></Input>
            </FormItem>
            <FormItem label="内容" prop="content">
                <Input v-model="formValidate.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
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

          
    </div>
</template>
<script>
    import Base from '../../common/Base.js';
    export default {
        mixins:[Base],
        data () {
            return {
                module:'news',
                baseData: [],
                nodeid:'',
                idx:'',
                formValidate:{
                    title:'',
                    type:1,
                    author:'',
                    htitle:'',
                    cateId:'',
                    content:'',
                    belongs:''

                },
                columns2: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '标题',
                        key: 'title',
                       
                        
                    },
                    {
                        title: '作者',
                        key: 'author',
                       
                    },
                    {
                        title: '副标题',
                        key: 'htitle',
                       
                    },
                    {
                        title: '内容',
                        key: 'content',
                       
                    },
                    {
                        title: 'cateId',
                        key: 'cateId',
                       
                    },
                    {
                        title: 'belongs',
                        key: 'belongs',
                       
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
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            console.log(params)
                                            //this.idx=params.row._id;
                                            //this.comment(this.idx)
                                            this.$router.push({ path: `/comment/${params.row._id}` })
                                        }
                                    }
                                }, '查看评论'),
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
                 ruleValidate: {
                    title: [
                        { required: true, message: '标题不能为空', trigger: 'blur' }
                    ],
                    author: [
                         
                        { required: true, message: '作者不能为空', trigger: 'blur' }
                    ],
                    
                    htitle: [
                        { required: true, message: '副标题不能为空', trigger: 'blur' }
                    ],
                    
                    content: [
                        { required: true, message: '请输入个人介绍', trigger: 'blur' },
                        { type: 'string', min: 2, message: '介绍不能少于20字', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            changType(type){
                this.formValidate.type=type;
                this.getTree(type);
            },
            getTree(type){
                this.$http({
                    url:'http://localhost:3000/sorts/list/'+type,
                    method:'get'
                }).then(res=>{
                    console.log(res)
                    this.baseData=res.data;
                })
            },
            //点击树节点
            
            clickselect(node){


                if(node.length==0){//解决——id找不到和栈溢出的错误
                    node[0]={_id:this.cateId}
                }
               
                this.initList(node['0']._id);
                //this.formValidate.cateId='2'
                console.log(node['0']._id)
                this.nodeid=node['0']._id

              // this.formValidate.cateId=node[0]._id
            },
            //cateid的一个函数
            initList(cateId){
                this.$http({
                method:'post',
                url:'http://localhost:3000/news/list',
                data:{
                    cateId:cateId
                }
                })
                .then(res=>{
                    console.log(res);
                    this.list=res.data.rows;
                    this.filter.total=res.data.total;
                })
            }
            
        },

        created(){
            this.getTree(1)
        }
    }
</script>
<style scoped>
    .active{
        background:yellow;
    }
</style>




<!-- getCheckedNodes(arr){
                if(arr.length==0){//解决——id找不到和栈溢出的错误
                    arr[0]={_id:this.cateId}
                }
                this.cateId=arr[0]._id;
                console.log(this.cateId)
                this.$http({
                    method:'POST',
                    url:'http://localhost:3000/news/all',
                    data:{
                        page:this.filter.page
                    }
                }).then((response) => {
                    this.data6=[];
                    // console.log(response)
                    var bstop=true;
                    for(var i=0;i<response.data.length;i++){
                        if(response.data[i].cateId==this.cateId){
                            bstop=false;
                            this.data6.push(response.data[i])
                            // console.log(response.data[i].cateId,this.cateId)
                        }
                    }
                    if(bstop){
                        this.data6=[];
                    }
                })

                if(arr.length!==0)
                {
                    this.filter.cateId=this.cateId;
                
                }else{
                    this.getCheckedNodes(arr);
                }
                this.getData();

            }
 -->