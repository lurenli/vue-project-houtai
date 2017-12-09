<template>
	<div>
	<template v-if="login">
    <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
        <Row type="flex">
            <Col :span="spanLeft" class="layout-menu-left">
                <Menu active-name="1" theme="dark" width="auto">
                    <div class="layout-logo-left"></div>
                    <MenuItem name="1">
                        <Icon type="ios-navigate" :size="iconSize"></Icon>
                        <span class="layout-text">
                        	<router-link class="l_a" to="/user" active-class="active">用户管理</router-link>
                        </span>
                    </MenuItem>
                    <MenuItem name="2" >
                        <Icon type="ios-keypad" :size="iconSize"></Icon>
                        <span class="layout-text ">
                        	 <router-link class="l_a"  to="/upload" active-class="active">上传管理 </router-link>
                        </span>
                    </MenuItem>
                    <MenuItem name="3">
                        <Icon type="ios-analytics" :size="iconSize"></Icon>
                        <span class="layout-text">
                        	<router-link  class="l_a" to="/news" active-class="active">新闻管理</router-link>
                        </span>
                    </MenuItem>
                     <MenuItem name="4">
                        <Icon type="ios-analytics" :size="iconSize"></Icon>
                        <span class="layout-text">
                        	<router-link class="l_a" to="/cate" active-class="active">分类管理</router-link>
                        </span>
                    </MenuItem>
                    <MenuItem name="4">
                        <Icon type="ios-analytics" :size="iconSize"></Icon>
                        <span class="layout-text">
                        	<a href="javascript:void(0)" @click="exit"  class="l_a">退出</a>
                        </span>
                    </MenuItem>
                </Menu>
            </Col>
            <Col :span="spanRight">
                <div class="layout-header">
                    <Button type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <BreadcrumbItem href="#">首页</BreadcrumbItem>
                        <BreadcrumbItem href="#">应用中心</BreadcrumbItem>
                        <BreadcrumbItem>模块管理</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                    	<router-view></router-view>
                    
                    </div>
                </div>
                <div class="layout-copy">
                    2011-2016 &copy; TalkingData
                </div>
            </Col>
        </Row>
    </div>
    </template>
    <template v-else>
    	<div  class="box">
    	<div style="">
	    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline style="margin:100px auto">
	        <FormItem prop="name">
	            <Input type="text"  autofocus  style="width:200px" v-model="formInline.name" placeholder="Username">
	                <Icon type="ios-person-outline" slot="prepend"></Icon>
	            </Input>
	        </FormItem>
	        <FormItem prop="password">
	            <Input type="password"   style="width:200px" v-model="formInline.password" placeholder="Password">
	                <Icon type="ios-locked-outline" slot="prepend"></Icon>
	            </Input>
	        </FormItem>
	        <FormItem>
	            <Button type="primary" style="margin-left:50px" @click="handleSubmit('formInline')">登录</Button>
	        </FormItem>
	    </Form>	
	    </div>
	    </div>
   </template>
</div>
</template>
<script>
//	mapGetters都放在computed,action放在methods
//	import {mapGetters,mapActions}  from 'vuex';
    export default {
        data () {
            return {
            	
                spanLeft: 5,
                spanRight: 19,
                login:true,
                formInline: {
                    name: '',
                    password: ''
                },
              
                ruleInline: {
                    name: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 1,max:12, message: '密码长度不能小于1位', trigger: 'blur' }
                    ]
                }
            }
        },
        computed: {
//      	...mapGetters(['login']),
            iconSize () {
                return this.spanLeft === 5 ? 14 : 24;
            }
        },
        methods: {
//       ...mapActions(['checkLogin']),
 		handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                       this.$http({
                       	  method:'POST',
                          url:'http://localhost:3000/users/login',
                          data:this.formInline
                       }).then(res=>{
                       	  if(res.data && res.data.name.trim().length>0){
                       	  	this.login = true;
                       	  }else{
                       	  	this.$Message.error('用户名或者密码错误!')
                       	  }

                       })
                    } else {
                        this.$Message.error('请输入用户名和密码!');
                    }
                })
            },
            exit(){
            	this.login = false;
            	this.formInline.name = '';
            	this.formInline.password = '';
            },
            toggleClick () {
                if (this.spanLeft === 5) {
                    this.spanLeft = 2;
                    this.spanRight = 22;
                } else {
                    this.spanLeft = 5;
                    this.spanRight = 19;
                }
            }
        },
        
    }
</script>                           

<style scoped>
	.l_a{
		padding: 20px 130px 20px 40px;
		margin: -20px -130px -20px -40px;
	}
	.box {
		position: fixed;
		height: 100%;
		width: 100%;
		background: url('timg.jpg') no-repeat;
		padding:260px 500px;
	}
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
</style>
