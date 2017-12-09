export default{
	data(){
		return{
			modal1:false,//对话框
			ids:[],//多选
			list:[],
			filter:{
				page:1,
				limit:5,
				name:'',
                title:'',
				total:0,
                newId:'',
                cateId:'',
                newsId:''
			}
		}
	},
	methods:{
		//增
		//删
		//删多个
		//改
		//查
		


		handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
            },
             ok2 () {
                this.$Message.info('点击了确定');
                 this.remove(this.idx,this.indexx);

            },
            cancel2() {
                this.$Message.info('点击了取消');
            },
            
        	//查看
        	show(id){
        		this.$http({
	        		method:'GET',
	        		// url:'http://localhost:3000/users/data/'+id,
	        		url:`http://localhost:3000/${this.module}/data/${id}`
	        		
	        	}).then((response)=>{
	        		this.formValidate=response.data;
	        		
	        	})  
        		this.modal1=true;
        	},
			handleReset (name) {
                this.$refs[name].resetFields();
            },

        	 ok () {
                this.$Message.info('点击了确定');
                 this.formValidate={}
            },
            cancel () {
                this.$Message.info('点击了取消');
            },
            ok3 () {
                this.$Message.info('点击了确定');
	             this.ids.forEach((id2)=>{
	        		console.log(id2._id)
	        		this.$http({
		        		method:'delete',
		        		//url:'http://localhost:3000/users/data/'+id2._id,
		        		url:`http://localhost:3000/${this.module}/data/${id2._id}`
		        		
		        	}).then((response)=>{
		        		this.formValidate=response.data;
		        		console.log(id2._id)
		        		this.getData();

		        		//this.delectData()

		        	})
	        	})

              	
             
            },
            cancel3 () {
                this.$Message.info('点击了取消');
            },
            //添加用户,出现弹窗
        	addData(){
        		this.modal1=true;
        		this.shows=true;
        		this.formValidate={};
        		//delete this.formValidate._id
                this.formValidate.cateId=this.nodeid
        		this.formValidate.newId=this.newids
        	},
		//搜索
		search(){
			this.getData();

		},
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
       
        	handleSubmit (name) {
        		//编辑
        		console.log(this.formValidate._id)
        		if(this.formValidate._id){
        			//console.log(this.$refs[name].validate)
        			this.$refs[name].validate((valid) => {
                    if (valid) {
                    	console.log(this.formValidate);
                    	this.$http({
                    		method:"POST",
                    		//url:'http://localhost:3000/users/data/'+this.formValidate._id,
                    		url:`http://localhost:3000/${this.module}/data/${this.formValidate._id}`,
                    		data:this.formValidate
                    	}).then(res=>{
                    		//console.log(res);
                    		this.formValidate=res.data;
                    		this.getData();
                    	})
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
               	 	})
        		}else{
        			 //添加用户并提交到数据库
        			 
        			this.$refs[name].validate((valid) => {
                    if (valid) {
                    	console.log(this.formValidate);

                    	this.$http({
                    		method:"POST",
                    		// url:'http://localhost:3000/users/data',
                    		url:`http://localhost:3000/${this.module}/data/`,
                    		data:this.formValidate
                    	}).then(res=>{
                    		//console.log(res);
                    		this.formValidate=res.data;
                            this.getData();

                    	})
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
               	 	})
        		}
        			
        		
                
            },
		onPageSizeChange(pageSize){
			console.log(pageSize)
			this.filter.limit=pageSize;
			//this.getData();
		},
		//改变页数
		changePage(page){
			this.filter.page=page;
			this.getData();

		},
		//查
		getData(){
            this.filter.cateId=this.nodeid;
			this.filter.newId=this.$route.path.split('/')[2]
			this.$http({
				method:'post',
				url:`http://localhost:3000/${this.module}/list`,
				data:this.filter
			})
			.then(res=>{
				console.log(res);
				this.list=res.data.rows;
				this.filter.total=res.data.total;
			})
			}
		},
		created(){
			this.getData();
		}
		
}

