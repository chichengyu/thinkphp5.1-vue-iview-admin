import Vue from 'Vue'
import Vuex from 'vuex'
import state from './state.js'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'
import modules from './module/index.js'

Vue.use(Vuex);

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters,
	modules
})


// const types = {
// 	SET_TOKEN:'token',// 定义存时的 key
// 	SET_USER:'user',// 定义存时的 key
// 	SET_NAVBAR:'navBarArr'// 选项卡
// }

// const state = {
// 	isAuthToken:false,// 是否通过验证
// 	user:{},// 用户信息
// 	navBarArr:[]// 选项卡
// }

// const getters = {
// 	isAuthToken:state => state.isAuthToken,
// 	user:state => state.user,
// 	navBar:state => state.navBarArr
// }

// const mutations = {
// 	[types.SET_TOKEN] (state,isAuthToken) {
// 		if (isAuthToken){
// 			state.isAuthToken = isAuthToken;
// 		}else{
// 			state.isAuthToken = false;
// 		}
// 	},
// 	[types.SET_USER] (state,user) {
// 		if (user){
// 			state.user = user;
// 		}else{
// 			state.user = {};
// 		}
// 	},	
// }

// const actions = {
// 	setAuthToken ({commit},isAuthToken) {
// 		commit(types.SET_TOKEN,isAuthToken);
// 	},
// 	setUser ({commit},user){
// 		commit(types.SET_USER,user);
// 	},
// 	clearLoginOut ({commit}) {
// 		commit(types.SET_TOKEN,null);
// 		commit(types.SET_USER,null);
// 	}
// }
