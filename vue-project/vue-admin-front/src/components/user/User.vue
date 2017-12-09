<template>
	<div>	
		<Button @click="handleSelectAll(true)" type="primary" style="float:left;margin-bottom:10px">设置全选</Button>
        <Button @click="handleSelectAll(false)" type="primary" style="float:left;margin-bottom:10px">取消全选</Button>
        <Input v-model="filter.name" style="width:300px;float:left;margin-left:30px;margin-bottom:10px">
         	<Button slot="append" icon="ios-search" @click="search"></Button>
        </Input>
		<Button type="primary" @click="addData" style="float:right;margin-bottom:10px"><Icon type="android-add"></Icon>添加用户</Button>
		<Button type="primary"  @click="removeData" style="float:right;margin-bottom:10px" ><Icon type="trash-b"></Icon> 删除选中</Button>
		<Table border ref="selection" :columns="columns4" :data="list" @on-selection-change="selected" style="clear:both;"></Table>
     	 <Page :total="filter.total" show-elevator show-total size="small" show-sizer :page-size="2" @on-page-size-change="onPageSizeChange" @on-change="changePage" v-model="filter.page"></Page>
	   
        
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
	        <FormItem label="邮箱" prop="email">
	            <Input v-model="formValidate.email" placeholder="请输入邮箱"></Input>
	        </FormItem>
	        <FormItem label="隐藏" prop="id" style="display:none">
	            <Input v-model="formValidate.id" placeholder="隐藏"></Input>
	        </FormItem>
	        <FormItem>
	            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
	            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
	        </FormItem>
    </Form>
    </Modal>
	</div>
</template>
<script>
	import Common from '../../common/Common.js';
    export default {
    	mixins:[Common],
        data () {
            return {
            	module:'users',
                columns4: [
                	 {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                      {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                    	title: '密码',
                        key: 'password'
                    },
                    {
                    	title:'邮箱',
                    	key:'email'
                    },
                     {  
   					    title: '操作',
                        key: 'action',
                        width: 150,
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
                                           this.edit();
                                    	   this.formValidate.name = params.row.name ;
                                    	   this.formValidate.password = params.row.password ;
                                    	   this.formValidate.email = params.row.email; 
                                    	   this.formValidate.id = params.row._id;
                                        }
                                    }
                                },  '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                        	this.remove(params.row._id)
										    this.$Message.success('删除成功!'); 
                                        }
                                    }
                                }, '删除'),
                            ]);
                        }
                    }  
                ],
                
//              data1: [],
//              total:0,
//              module:'users',
                arr:[],
//              modal1:false,
                formValidate: {
                    name: '',
                    email: '',
                    password: '',
                    id :''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ],
 
                }

            }
        },
        methods:{
//      	选中框
        	selected(section){
	    		this.arr = [];
                for(var i=0; i<section.length;i++){
                	this.arr.push(section[i]._id);
                }
            },
            //删除选中数据
        	removeData(){
        		var len = this.arr.length;
				for(var i=0;i<len;i++){
                      this.$http({
                      	method:'DELETE',
                      	url:'http://localhost:3000/users/data/' + this.arr[i]
                      }).then(res=>{
                        this.getData();  	
                      })
        		}
        	},
        	//选中所有
        	 handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
           },
           //提交
        	 handleSubmit (name) {
        	 	
                this.$refs[name].validate((valid) => {
                    if (valid) {
                    	if(this.formValidate.id!=''){
	                  		this.$http({
	                  			method:'POST',
	                  			url:"http://localhost:3000/users/data/"+ this.formValidate.id,
	                  			data:this.formValidate
	                  		}).then(response=>{
                                this.getData();
								this.$Message.success('提交 修改数据成功!');
	                  			this.formValidate = response.data;
	                  			
	                  		})  
                   	 }else {
                    		this.$http({
                    		method:'POST',
                    		url:'http://localhost:3000/users/data',
                    		data:this.formValidate
	                    	}).then(response=>{
	                    		
	                    		this.$Message.success('提交 添加成功!');
				      			this.clear();
				      			this.getData();
	                    	})
                    	}
                        
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            //重置
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            
        	ok () {
			    this.getData(); 
			    data:this.formValidate  
                this.$Message.info('点击了确定');
                this.modal = false;
            },
            cancel () {
                this.$Message.info('点击了取消');
            },
            clear(){
            	this.formValidate.name = '' ;
        	    this.formValidate.password ='' ;
        	    this.formValidate.email = ''; 
        	    this.formValidate.id = '';
            },
            //添加数据
        	addData(){

			        this.modal1 = true;     
        	},
        	//修改数据 
        	edit(){
        		this.modal1 = true;
        	},
        	//删除数据
        	remove(id){
        		this.$http({
					method:"DELETE",
					url:"http://localhost:3000/users/data/"+ id
				}).then((response) =>{		
                     this.getData();

				});
        	}
        },
       created(){
		this.getData();
	}
//      created(){
////      	this.$http({
////      		method:'POST',
////      		url:'http://localhost:3000/users/list'
////      	}).then((response)=>{
////      		this.total = response.data.total;
////    			this.data1 = response.data.rows;
////      	})
//                this.getData()
//      }
        }
</script>