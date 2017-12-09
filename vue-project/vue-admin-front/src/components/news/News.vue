<template>
	<div>
		<Col span="4" style="border-right: 1px dotted #e9eaec">
	        <div>
				<Tree :data="baseData" @on-select-change="selectedTree"></Tree>
				<Button type="primary" @click="addNews" class="p2" style="display:block;margin-bottom:10px">
				<Icon type="android-person-add"></Icon> 选择类型添加新闻</Button>
			</div>
		</Col>
		<Col span="20" >
	        <div  style="overflow:auto">
	        	<Input v-model="filter.type" class="p1" placeholder="请输入搜索内容..." style="width:300px;display: inline-block;">
                </Input>         
                <Button slot="append" @click="search" icon="ios-search"></Button>
                <Button @click="handleSelectAll(true)" type="primary" class="p1"><Icon type="checkmark-circled" style="margin-right:10px;"></Icon>设置全选</Button>
                <Button @click="handleSelectAll(false)" type="primary" class="p1"><Icon type="android-cancel" style="margin-right:10px;"></Icon>取消全选</Button>
                <Button type="warning" class="p2" @click="removedata"><Icon type="ios-trash" style="margin-right:10px;"></Icon>删除选中</Button>
          		<Table border ref="selection" :columns="columnsNews" :data="list"   @on-selection-change="tableselect"></Table>
     	  		<Page :total="filter.total" show-elevator show-total size="small" show-sizer :page-size="5" @on-page-size-change="onPageSizeChange" @on-change="changePage" v-model="filter.page"></Page>
	   		 <Modal v-model="modal1"
			        width="800"
			        title="普通的Modal对话框标题"
			        @on-ok="ok"
			        @on-cancel="cancel">
	   		 	 <Form ref="formValidateNews" :model="formValidateNews"  :label-width="80">
			                <FormItem label="标题" prop="maintitle" style="width: 500px;">
			                    <Input v-model="formValidateNews.maintitle" placeholder="请输入" ></Input>
			                </FormItem>
			                <FormItem label="ID" prop="id" style="width: 500px;display: none">
			                    <Input v-model="formValidateNews.id" placeholder="请输入" ></Input>
			                </FormItem>
			                <FormItem label="类型" prop="type" style="width: 300px;" >
			                    <Input disabled v-model="formValidateNews.type" placeholder="请输入"></Input>
			                </FormItem>
			                <FormItem label="作者" prop="authorer" style="width: 300px;">
			                    <Input v-model="formValidateNews.authorer" placeholder="请输入"></Input>
			                </FormItem>
			                <FormItem label="类型id" prop="cateId" style="width: 300px;display: none;">
			                    <Input v-model="formValidateNews.cateId" placeholder="请输入"></Input>
			                </FormItem>
			                <FormItem label="发布日期" prop="date">
			                    <DatePicker type="date" placeholder="选择日期" v-model="formValidateNews.date"></DatePicker>
			                    <TimePicker type="time" placeholder="选择时间" v-model="formValidateNews.time"></TimePicker>
			                </FormItem>
			                <FormItem label="内容" prop="content">
			                	<quill-editor ref="myTextEditor" v-model="formValidateNews.content" :config="editorOption"></quill-editor>
			                </FormItem>
			                <FormItem>
			                    <Button type="primary" @click="handleSubmit('formValidateNews')">提交</Button>
			                    <Button type="ghost" @click="handleReset('formValidateNews')" style="margin-left: 8px">重置</Button>
			                </FormItem>
			    </Form>
	   		 </Modal> 
	   		 <Modal
				        v-model="modal4"
				        title="新闻"
				        ok-text="退出查看"
                        width="800">
				        <h3 v-model="searchMaintitle">{{searchMaintitle}}</h3>
				        <p v-model="searchAuthorer">作者:{{searchAuthorer}}</p>
				        <p v-model="searchType">类型:{{searchType}}</p>
				        <p v-model="searchTime">发布时间:{{searchTime}}</p>
				        内容:
				        <div v-model="searchContent" v-html="searchContent">{{searchContent}}</div>                        
                        <ul style="margin:48px 0 10px 0;border:2px dashed #dddee1;background-color:#f8f8f9">
                            <template v-for="item in items">
                                 <li v-if="formValidateComment.newsId==item.newsId"style="margin: 20px;border-bottom: 1px dotted #e9eaec">
                                     <div v-model="item.date">
                                         {{item.date}}
                                     </div>
                                     <div>
                                         <Rate disabled show-text allow-half v-model="item.rate" >
                                            <span style="color: #f5a623">{{ item.rate }}</span>
                                        </Rate>
                                     </div>
                                     <div v-html="item.content" style="margin-top:20px;"></div>
                                 </li>
                            </template>      
                        </ul>


                        <Form ref="formValidateComment" :model="formValidateComment"  :label-width="80" style="border:1px double #dddee1">
                            <FormItem label="评分" prop="rate">
                                <Rate show-text allow-half v-model="formValidateComment.rate" style="margin-top:50px;">
                                    <span style="color: #f5a623">{{ formValidateComment.rate }}</span>
                                </Rate>
                            </FormItem>
                            <FormItem label="新闻ID" prop="author" style="width: 300px;display: none;">
                                <Input v-model="formValidateComment.newsId" placeholder="请输入"></Input>
                            </FormItem>
                            <FormItem label="内容" prop="content">
                                <quill-editor ref="myTextEditor" v-model="formValidateComment.content" :config="editorOption"></quill-editor>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="commentSubmit('formValidateComment')">提交评论</Button>
                                <Button type="ghost" @click="commentReset('formValidateComment')" style="margin-left: 8px">清空评论</Button>
                            </FormItem>
                        </Form>
				    </Modal> 
	        </div>
	        </Col>
	</div>
</template>

<script>
	import Common from '../../common/Common.js';
	 export default{
	 	mixins:[Common],
	 	data(){
	 		return{
	 			   modal4:false,//弹窗
	 			   module:'news',
	 			   items: [],//评论内容存储
	 			   editorOption: {},
            	   searchMaintitle:'',
            	   searchContent:'',
            	   searchType:'',
            	   searchTime:'',
            	   searchAuthorer:'',
	 			   formValidateNews:{//新闻表格内容
            		maintitle:'',
            		content:'',
            		type:'',
            		cateId:'',
            		date:'',
            		time:'',
            		authorer:'',
            		id:'',	
            	 },
            	 formValidateComment:{//新闻评论内容
                    content:'',
                    rate:5.0,
                    newsId:''
                },
            	 editorOption: {},
	 			   columnsNews:[
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '作者',
                        key: 'authorer',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.authorer)
                            ]);
                        }
                    },
                    {
                        title: '标题',
                        key: 'maintitle',
                        width:200
                    },
                    {
                        title: '类型',
                        key: 'type',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: '220',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                            	h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        icon:'search'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {//将信息传递给弹窗查看消息
                                        	console.log(params.row)
                                        	this.searchMaintitle=params.row.maintitle;
                                        	this.searchContent=params.row.content;
                                        	this.searchType=params.row.type;
                                        	this.searchTime=params.row.data;
                                        	this.searchAuthorer=params.row.authorer;
                                            this.modal4=true;
                                            this.formValidateComment.newsId=params.row._id;
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        icon:'edit'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {//编辑，传给编辑框
                                            this.modal1=true;
                                            this.formValidateNews.maintitle=params.row.maintitle;
                                            this.formValidateNews.content=params.row.content;
                                            this.formValidateNews.type=params.row.type;
                                            this.formValidateNews.data=params.row.date;
                                            this.formValidateNews.time=params.row.time;
                                            this.formValidateNews.cateId=params.row.cateId;
                                            this.formValidateNews.authorer=params.row.authorer;
                                            this.formValidateNews.id=params.row._id;
                                        }   
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                        icon:'android-cancel'
                                    },
                                    on: {
                                        click: () => {
                                        	 this.$http({//获取id并删除改表单
                                                method:'DELETE',
                                                url:'http://localhost:3000/news/data/'+params.row._id
                                            }).then((res)=>{
                                                this.getData();
                                            });
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                   baseData: [],
                   data1:[],
                   title:'',
                   arr:[],
                   node:'',
                   parentId:'',
                   value:''
                 }
                },
              methods:{
               	tableselect(selection){
	 			   this.arr=[];
	            for(var i=0;i<selection.length;i++){
	                this.arr.push(selection[i]._id)
	            }
	 		   },
              //删除选中按钮arr里的id
             removedata(){
               	 var len=this.arr.length;
                	for(var i=0;i<len;i++){
                  	 	 this.$http({//获取id并删除该表单
                        method:'DELETE',
                        url:'http://localhost:3000/news/data/'+this.arr[i]
                    }).then(res=>{
                        this.getData();
                    });
                   }
           		 },
               	ok () {
                	this.$Message.info('点击了确定');
	            },
	            cancel () {//取消表单时候清空表单内容
	                this.$Message.info('点击了取消');
	            },
	            //选中树
	            selectedTree(select){
	            	this.formValidateNews.type=select[0].title;
            		this.formValidateNews.cateId=select[0]._id;
                	this.filter.type=select[0].title;
               	  if(this.filter.type!=''){
                   		 this.getData();
               		 }
	            },
	            //请选新闻择类型后再添加按钮
	            addNews(){
               	    if(this.formValidateNews.cateId==''){
            			this.$Message.info('请选择新闻类型后再添加');
            		}else{
            			this.modal1=true;
            		}
				},
				clear(){//操控编辑框，清空字段信息
	            	this.formValidateNews.maintitle='';
	            	this.formValidateNews.content='';
	            	this.formValidateNews.type='';
	            	this.formValidateNews.cateId='';
	            	this.formValidateNews.date='';
	            	this.formValidateNews.authorer='';
             	},
               	//选中所有
        		 handleSelectAll (status) {
               		this.$refs.selection.selectAll(status);
             	},
             	//添加新闻提交
           		 handleSubmit (name) {
              	  this.$refs[name].validate((valid) => {
                    if (valid) {
                    	if(this.formValidateNews.id==''){
//                  		弹窗添加新闻
	                        this.$http({
	                        	method:'POST',
	                        	url:'http://localhost:3000/news/data',
	                        	data:this.formValidateNews
	                        }).then(res=>{
	                        	this.$Message.success('提交成功!');
	                        	this.getData();
	                       		this.modal1=false;
	                       		this.clear();
	                        });
	                    }else{
//	                    	弹窗添加新闻
	
	                    	this.$http({
                                method:'POST',
                                url:'http://localhost:3000/news/data/'+this.formValidateNews.id,
                                data:this.formValidateNews
                            }).then((res)=>{
                                this.modal1 = false;
                                this.$Message.success('提交成功!');
                                this.getData();
                            });
	                    }    
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            //评论添加
             commentSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$http({
                            method:'POST', 
                            url:'http://localhost:3000/comments/data',
                            data:this.formValidateComment
                        }).then(res=>{
                            this.formValidateComment.content='';
                            this.loadComment();
                        }) 
                    } else {
                        this.$Message.error('提交失败!');
                    }
                })
            },
            //取消按钮
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            //取消评论
            CommentReset (name) {
                this.$refs[name].resetFields();
            },
                //评论列表地址
             loadComment(){
               		 this.$http({
                  	   url:'http://localhost:3000/comments/list',
                   	   method:'post'
                   }).then(res=>{
                       this.items=res.data.rows;
                  });
               }
               },
			 	created(){
	            	this.$http({
	        			url:'http://localhost:3000/cate/list/1',
	        			method:'get',
 	        		}).then(res=>{
	        			this.baseData = res.data;
	        		});
					this.getData();
					this.loadComment();
			 }
}   
</script>
<style scoped>
	.contents{
		background-color:red; 
	}
</style>











