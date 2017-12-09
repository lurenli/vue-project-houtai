<template>
	<div>
		<div style="float:left;width:400px">
		<ButtonGroup>
			<Button @click="changType(1)" :class="{active:formValidate.type === 1}">新闻分类</Button>
        	<Button @click="changType(2)" :class="{active:formValidate.type === 2}">上传分类</Button>
        	<Button @click="changType(3)" :class="{active:formValidate.type === 3}">产品分类</Button>
		</ButtonGroup>
          <Tree :data="baseData" @on-select-change="selected"></Tree>
          <ButtonGroup >
		        <Button   @click="addNode" >
		            <Icon type="plus"></Icon>
		            <span>增加</span>
		        </Button>
		        <Button   @click="editNode">
		            <Icon type="edit"></Icon>
		            <span>修改</span>
		        </Button>
		        <Button   @click="deleteNode">
		        	<Icon type="trash-a"></Icon>
		            
		            <span>删除</span>
		        </Button>
		    </ButtonGroup>
		</div>
		<div style="float:left">
          <Form ref="formValidate" :model="formValidate"  :label-width="80">
	        <FormItem label="父节点" prop="name">
	            <Input v-model="formValidate.parentId" style="width:300px"></Input>
	        </FormItem>
	        <FormItem label="分类类型" prop="type" >
	            <Input v-model="formValidate.type" placeholder="请输入分类名称"></Input>
	        </FormItem>
	        <FormItem label="标题" prop="title">
	            <Input v-model="formValidate.title" placeholder="请输入标题"></Input>
	        </FormItem>
	       <FormItem label="隐藏" prop="id" style="display:none" >
	            <Input v-model="formValidate.id" placeholder="隐藏"></Input>
	        </FormItem>
	        <FormItem>
	            <Button type="primary" @click="handleSubmit('formValidate')">确定</Button>
	            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
	        </FormItem>
        </Form>
		</div>
	</div>
</template>

<script>
//	import Common from '../../common/Common.js';
	export default {
//		mixins:[Common],
        data () {
                
            return {
            	module:'cate',
                baseData:[],
                id:'',
                parentId:'',
                title:'',
//              type:'',
                formValidate:{
                	title:'',
                	type:1,
                	id:'',
                	parentId:''  
                }
            }
        },
        methods:{
        		//分页
        	changType(type){
        		this.formValidate.type = type;
//      		this.getData();
        		this.id='';
        		this.getTree(type);
        	},
        	 //      	树的数据
        	getTree(type){
        		this.$http({
	        		method:"GET",
	        		url:'http://localhost:3000/cate/list/' +this.formValidate.type
   	      }).then(res=>{
	        		this.baseData = res.data;
	        	})
        	},

        	
//      	点击树
        	selected(select){
        		
     			this.id = select[0]._id;
                this.parentId = select[0].parentId;
                this.title = select[0].title;
                this.type = select[0].type
                 
        	},        	     	
        	//添加按钮
        	addNode(){
	      		if(this.id){
	      			this.formValidate.parentId = this.id;
	      		}else{
	     			this.formValidate.parentId = '';
	      		}
	      		
        	},
        	editNode(){//修改
                this.formValidate.parentId = this.parentId    
	        	this.formValidate.title=this.title;
	        	this.formValidate.id=this.id;
        	
        	},
	       deleteNode(){//删除选中
	        	if(this.id){
	               this.$http({//获取id并删除改表单
					      method:'DELETE',
					      url:'http://localhost:3000/cate/data/'+ this.id
					 }).then((res)=>{
					     this.getTree()
					    })
					
				}
	        },
        	//确定按钮
        	 handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                    	  if(this.formValidate.id !==''){
                    		console.log('1111111');
                    		this.$http({
	                  			method:'POST',
	                  			url:'http://localhost:3000/cate/data/'+this.formValidate.id,
	                  			data:this.formValidate
	                  		}).then(response=>{
	                  			this.getTree();
	                  			this.$Message.success('修改数据成功!');
	                  		    this.formValidate = response.data;  
	                  		}) 
                             
                    	}
                    	else{
                    		
                    		//这是添加子节点
                    		console.log('222222222');
                    		console.log(this.formValidate);
                    		this.$http({
                    			method:'POST',
                    			url:'http://localhost:3000/cate/data',
                    			data:this.formValidate
                    		}).then(res=>{
//                  			console.log(res)
                    		    this.getTree();
	                  			this.$Message.success('添加子节点成功!');
                                this.handleReset('formValidate');
                                    
                    		}) 
                              
                           } 
                   }
                    else {
	                        this.$Message.error('表单验证失败!');
	                    }
                })
            },
            //重置
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        },
        	created(){
              this.getTree();
        }
    }
</script>

<style scoped>
	.active{background:red}
</style>

















