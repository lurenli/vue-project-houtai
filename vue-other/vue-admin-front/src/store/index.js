import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store =new Vuex.Store({
	state:{
		login:true
	},
	getters:{
		login:state=>{
			return state.login
		}
	},
	//修改
	mutations:{
		checkLogin:(state,payload)=>{
			state.login=payload;   //commit
		}
	},
	//actions
	actions:{
		checkLogin:({commit},payload)=>{
			commit('checkLogin',payload); //
		}
	}
})