<template>
	<div>
		<Tree :data="baseData" @on-select-change="clickselect"></Tree>
		<Upload
        multiple
        type="drag"
        name="avatar"
        :default-file-list="defaultList"
        :on-success="handleSuccess"
        action="http://localhost:3000/users/upload">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击或将文件拖拽到这里上传</p>
        </div>
    </Upload>
      <Table border ref="selection" stripe :columns="columns2" :data="list"  @on-selection-change="changeSelection" style="width:800px"></Table>
    <!--  删除单个 -->
            <Modal
            v-model="modal2"
            title="删除对话框"
            @on-ok="ok2"
            @on-cancel="cancel2">
            <p>确认删除此条信息？</p>
            
        </Modal>
	</div>
</template>

<script>
	import Common from '../../common/Common.js';
	export default{
		mixins:[Common],
		 data () {
            return {
                module:'upload',
                baseData: [],
                cateId:'',
                idx:'',
                title:0,
                indexx:'',
                total:'',
                formValidate:{
                    title:'',
                    type:2,
                    fieldname:'',
                    originalname:'',
                    encoding:'',
					mimetype:String,//上传的类型                  
                    path:'',
                    size:'',
                    cateId:''
                },
                columns2: [
                    {
                        title: '字段名',
                        key: 'fieldname'
                    },
                    {
                        title: '原始名字',
                        key: 'originalname'
                    },
                    {
                        title: '编码',
                        key: 'encoding'
                    },
                    {
                        title: '类型',
                        key: 'mimetype'
                    },
                    {
                        title: '描述',
                        key: 'destination'
                    },
                    {
                        title: '名称',
                        key: 'filename'
                    },
                    {
                        title: '路径',
                        key: 'path'
                    },
                    {
                        title: '大小',
                        key: 'size'
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
                 shows:true,
                 data6:[],
                 defaultList: []  
            }
        },
		methods:{
			 show (index) {
                this.$Modal.info({
                    title: '用户信息',
                    content: `字段名：${this.data6[index].fieldname}<br>前名字：${this.data6[index].originalname}<br>编码：${this.data6[index].encoding}<br>类型：${this.data6[index].mimetype}<br>描述：${this.data6[index].destination}<br>名称：${this.data6[index].filename}<br>路径：${this.data6[index].path}<br>大小：${this.data6[index].size}`
                })
            },
            changType(type){
                this.formValidate.type=type;
                this.getTree(type);
            },
			getTree(type){
	            	this.$http({
	        		method:"GET",
	        		url:'http://localhost:3000/cate/list/' + type
 	        	}).then(res=>{
//	        		console.log(res)
	        		this.baseData = res.data;
	        	})
        },
          //点击树节点
            
            clickselect(node){
                 if(node.length==0){//解决——id找不到和栈溢出的错误
                    node[0]={_id:this.cateId}
                }
                this.initList(node[0]._id);
                //this.formValidate.cateId='2'
//              console.log(node[0]._id)

               this.cateId=node[0]._id;
               console.log(this.cateId)
                this.$http({
                    method:'POST',
                    url:'http://localhost:3000/upload/all'
                }).then((response) => {
                    this.data6=[];
                    // console.log(response)
                    var bstop=true;
                    for(var i=0;i<response.data.length;i++){
                        if(response.data[i].cateId==this.cateId){
                        	
                            bstop=false;
                            this.data6.push(response.data[i])
//                          console.log(11111111)
//                           console.log(this.data6.length)
//                          console.log(response.data[i].newsId,this.newsId)
                        }
                        console.log(22222)
                    }
                    if(bstop){
                        this.data6=[];
                        console.log(33333333)
                    }
                    this.total=this.data6.length;
                   
                })
            },
            changePage(page){//这个方法让每页数据在(分页中)页面显示
                // console.log(page)
                this.$http({
                    method:'POST',
                    url:'http://localhost:3000/upload/list',
                    data:{
                        page:page
                    }
                }).then((response) => {
                    // console.log(response)
                    this.total=response.data.total;
                    this.data6=response.data.rows
                })
            },
            //cateid的一个函数
            initList(cateId){
                this.$http({
                method:'post',
                url:'http://localhost:3000/upload/list',
                data:{
                   cateId:cateId
                }
                })
                .then(res=>{
//                  console.log(res);
                    this.list=res.data.rows;
                    this.filter.total=res.data.total;
                })
            },
            //上传成功之后的函数
            handleSuccess (res, file,defaultList) {
//              console.log(this.defaultList)
                this.formValidate.cateId=this.cateId;
                console.log(this.formValidate.cateId)
                res=Object.assign(res, {cateId:this.cateId})
                console.log('上传成功',res)
                if(this.cateId!=null){
                    this.$http({
                        method:'POST',
                        url:'http://localhost:3000/upload/data',
                        data:res
                    }).then(res=>{	
                        this.changePage(this.filter.page)
                        this.getData();
                    })
                }else{
                	console.log(111111111111)
                }
            }
        },
        created(){
        	this.getTree(2);
        	 this.$http({
                method:'POST',
                url:'http://localhost:3000/upload/list',
                data:this.formValidate 
            }).then((response) => {
            	console.log(response.data);
//              this.total=response.data.total;
//              this.data6=response.data.rows//把数据添加到表格输出
				 this.list  = response.data.rows;
				 this.formValidate.total = response.data.total
            });
        }
	}
	
</script>

<style>
</style>