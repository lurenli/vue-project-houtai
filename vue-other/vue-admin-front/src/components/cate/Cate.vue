<template>
    <div>
        <div style="float:left;border:1px solid #cccccc;height:800px">
            <ButtonGroup >
                <Button @click="changType(1)" :class="{active:formValidate.type===1}">新闻分类</Button>
                <Button @click="changType(2)" :class="{active:formValidate.type===2}">上传分类</Button>
                <Button @click="changType(3)" :class="{active:formValidate.type===3}">产品分类</Button>
            </ButtonGroup>
            <Tree :data="baseData"  @on-select-change="getCheckedNodes"></Tree>
        </div>
        <div style="float:right">
             <Button type="info"  @click="addRootNode">添加根节点</Button>
             <Button type="info"  @click="addNode">添加子节点</Button>
             <Button type="success" @click="editNode">修改</Button>
             <Button type="warning" @click="removeNode">删除</Button>
             <Input  style="margin-top:25px"  v-model="formValidate.title" ></Input>
             <Button type="success" style="margin-top:300px" long @click="submit">确认提交</Button>
            
            <!-- <Button type="error" style="margin-top:25px">确认删除</Button> -->
         </div>

          
    </div>
</template>
<script>
    import Base from '../../common/Base.js';
    export default {
        mixins:[Base],
        data () {
            return {
                module:'cate',
                baseData: [],
                nodeId:'',
                kg:true,
                kg2:true,
                formValidate:{
                    title:'',
                    type:1,
                    parentId:null
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
                    url:'http://localhost:3000/cate/list/'+type,
                    method:'get'
                }).then(res=>{
                    console.log(res)
                    this.baseData=res.data;
                })
            },
            
            //添加根节点
            addRootNode(baseData){
               //console.log(baseData)
               //this.formValidate={};
            
                this.kg=false;
              
              
            },
            //添加子节点
            addNode(){
                console.log(this.baseData[0].parentId);
                //this.kg2=true;
                this.baseData.forEach((id2)=>{
                    this.formValidate.parentId=id2._id;
                })

            },
            //删除节点
            removeNode(){
                this.baseData.forEach((id2)=>{
                    console.log(id2._id)
                    this.$http({
                        method:'delete',
                        url:'http://localhost:3000/cate/data/'+id2._id,
                        
                    }).then((response)=>{
                        this.formValidate=response.data;
                        console.log(id2._id);
                        this.getData();

                        //this.delectData()

                    })
                })
            },
            //修改
            editNode(baseDatas){
                this.baseData.forEach((id2)=>{

                    console.log(id2.title)

                    // this.$refs.input1.value = id2.title;
                    this.formValidate.title=id2.title;
                    this.kg=true;
                    this.kg2=false;

                })
            },
            //getCheckedNodes
            getCheckedNodes(baseData){
                this.baseData=baseData;
                console.log(baseData);

            },
            //点击确定的时候
            submit(name,baseDatas){
                //修改
                console.log(this.baseData[0])
                console.log(this.baseData[0]._id)
                if(this.formValidate.parentId){
                    console.log(this.formValidate.parentId)
                    this.$http({
                            method:'post',
                            url:'http://localhost:3000/cate/data',
                            data:this.formValidate
                        })
                        .then(res=>{
                            this.getTree(this.formValidate.type)
                            this.formValidate.title=""
            
                        })
                }else{
                    if(this.kg){
                    console.log('修改')
                    this.baseData.forEach((id2)=>{
                       this.$http({
                                method:"POST",
                                url:'http://localhost:3000/cate/data/'+id2._id,
                                data:this.formValidate
                            }).then(res=>{
                                //console.log(res);
                                this.formValidate=res.data
                                this.getData();
                                  
                            })
                    
                    })
                }else{
                    //添加根节点
                   
                    console.log(this.baseData[0].parentId)
                   
                       
                            console.log('添加根节点')
                            this.$http({
                            method:"POST",
                            url:'http://localhost:3000/cate/data',
                            data:this.formValidate
                            }).then(res=>{
                                //console.log(res);
                                
                                this.formValidate=res.data;
                                // this.formValidate.type=1;
                                // this.getData();
                                 this.formValidate.title="";
                            })
                }
                }
                
                
        }
    },
        //

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


