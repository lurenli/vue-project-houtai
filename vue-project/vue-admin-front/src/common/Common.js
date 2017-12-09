export default{
	data(){
		return {
			modal1:false,
			ids:[],
			list:[],
			filter:{
				title:'',
				page:1,
				limit:5,
				name:'',
				total:0,
				type:'',
				newId:'',
                cateId:'',
                newsId:''
			},
			formValidate:{
                	title:'',
                	type:1,
                	parentId:'',
                	id:'',
                    title1: '',//点击结点时后台存储数据，方便增删改调用数据
                    id1:'',
                    parentId1:'',
                    type1:''
               },
		}
	},
	methods:{
 //删除 2
        changeSelection(ids){
        	this.ids=ids;
        },
         ok2 () {
                this.$Message.info('点击了确定');
                 this.remove(this.idx,this.indexx);

            },
        
          cancel2() {
                this.$Message.info('点击了取消');
            },
        
        
//		增删改查
	//单行单个删除
	        remove(id){
	        		
	        		this.$http({
		        		method:'delete',
		        		//url:'http://localhost:3000/users/data/'+id,
		        		url:`http://localhost:3000/${this.module}/data/${id}`
		        	}).then((response)=>{
		        		console.log(this.idx)
		        		//方法1 手动刷新
		        		//this.formValidate=response.data;
	
		        		//this.list.splice(index,1);
		        		//
		        		this.getData();
		        	})
	        },
        //删除
        delectData(){
        	this.modal3=true;

        },	
         //删除 2
        changeSelection(ids){
        	//var ids=[];
        	//console.log(this.list[0]._id)
        	this.ids=ids;
        	console.log(ids)
        },
            
         //编辑
        editData(id,index){
        		this.$http({
	        		method:'GET',
	        		//url:'http://localhost:3000/users/data/'+id,
	        		url:`http://localhost:3000/${this.module}/data/${id}`
	        	}).then((response)=>{
	        		this.formValidate=response.data;

	        	})
        		this.modal1=true;

        },   
            







//      查看刷新数据
		getData(){
			this.$http({
				method:'POST',
				url:`http://localhost:3000/${this.module}/list`,
				data:this.filter
			})
			.then( res =>{
				this.list  = res.data.rows,
				this.filter.total = res.data.total
			})
		},
     //分页页码
 		onPageSizeChange(pageSize){
        	this.filter.limit = pageSize;
        	this.getData();
       },
       //分页
       changePage(page){
        	this.filter.page = page;
        	this.getData();
       },
  
       search(){
		    this.getData();
		 },
		 created(){	
		  this.getData();	
		 },
//		 getTree(){
//	            	this.$http({
//	        		method:"GET",
//	        		url:`http://localhost:3000/${this.module}/list/` + this.formValidate.type
// 	        	}).then(res=>{
//	        		this.baseData = res.data;
//	        	})
//          },
        getTime(str){
		  	var reg= /([\d\-]+)T(\d+:\d+)\:.*/;
		  	return str.replace(reg, "$1 $2");
		}
		
	},
	
}

