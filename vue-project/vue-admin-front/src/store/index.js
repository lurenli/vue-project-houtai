import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
	
	state:{
		login:true
	},
	getters:{
		login:state=>{
			return state.login
		}
	},
	mutations:{
		checkLogin:(state,payLoad)=>{
			state.login  =  payLoad; //commit
			
		}
	},
	actions:{
		checkLogin:({commit},payLoad)=>{
			commit('checkLogin',payLoad); //dispatch
		}
	}
})

