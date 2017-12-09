<template>
    <div>
        <template v-if="login">
            <div class="layout" :class="{'layout-hide-text': spanLeft < 5}" style="height:920px">
            <Row type="flex" style="height:100%">
                <Col :span="spanLeft" class="layout-menu-left">
                    <Menu active-name="1" theme="dark" width="auto">
                        <div class="layout-logo-left"></div>
                        <MenuItem name="1">
                            <Icon type="ios-navigate" :size="iconSize"></Icon>
                            <span class="layout-text">
                              <router-link to="/user" active-class="active">用户管理</router-link>
                            </span>
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-analytics" :size="iconSize"></Icon>
                            <span class="layout-text">
                               <router-link to="/cate" active-class="active">分类管理</router-link>
                            </span>
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad" :size="iconSize"></Icon>
                            <span class="layout-text">
                              <router-link to="/upload" active-class="active">上传管理</router-link></span>
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-analytics" :size="iconSize"></Icon>
                            <span class="layout-text">
                               <router-link to="/news" active-class="active">新闻管理</router-link>
                            </span>
                        </MenuItem>
                        
                        <MenuItem name="5">
                            <Icon type="ios-analytics" :size="iconSize"></Icon>
                            <span class="layout-text">
                               <router-link to="/comment" active-class="active">评论管理</router-link>
                            </span>
                        </MenuItem>
                        
                         <MenuItem name="6">
                            <Icon type="ios-analytics" :size="iconSize"></Icon>
                            <span class="layout-text">
                              <a href="javascript:void(0)" @click="Quit">退出系统</a>
                              <!-- <router-link to="/"  @click="Quit">退出系统</router-link> -->
                            </span>
                        </MenuItem>
                    </Menu>
                </Col>
                <Col :span="spanRight" style="height:920px">
                    <div class="layout-header">
                        <Button type="text" @click="toggleClick">
                            <Icon type="navicon" size="32"></Icon>
                        </Button>
                    </div>
                    <div class="layout-breadcrumb">
                        <Breadcrumb>
                            <BreadcrumbItem ><router-link to="/" active-class="active">首页</router-link></BreadcrumbItem>
                            <BreadcrumbItem href="#">应用中心</BreadcrumbItem>
                            <BreadcrumbItem>某应用</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div class="layout-content">
                        <div class="layout-content-main">
                          <router-view></router-view>
                        </div>
                    </div>
                    <div class="layout-copy" style="margin-top:500px">
                        2011-2016 &copy; TalkingData
                    </div>
                </Col>
            </Row>
        </div>
        </template>

        <template v-else>
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                <FormItem prop="name">
                    <Input type="text" v-model="formInline.name" placeholder="Username">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="Password">
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
        </FormItem>
    </Form>
</template>
    </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
    export default {
        data () {
            return {
                spanLeft: 5,
                spanRight: 19,
                formInline: {
                    name: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                }
            }
        },
        computed: {
            ...mapGetters(['login']),
            iconSize () {
                return this.spanLeft === 5 ? 14 : 24;
            }
        },
        methods: {
            ...mapActions(['checkLogin']),
            Quit(){
                this.checkLogin(false)
            },
            toggleClick () {
                if (this.spanLeft === 5) {
                    this.spanLeft = 2;
                    this.spanRight = 22;
                } else {
                    this.spanLeft = 5;
                    this.spanRight = 19;
                }
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                       console.log(this.formInline);
                       this.$http({
                        url:'http://localhost:3000/users/login',
                        data:this.formInline,
                        method:'post'
                       }).then(res=>{
                        console.log(res);
                            
                            if(res.data==null){
                                 this.$Message.success('密码不正确!');
                            }else{
                                this.checkLogin(true)
                            }
                       })
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }
        }
    }
</script>

<style scoped>
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