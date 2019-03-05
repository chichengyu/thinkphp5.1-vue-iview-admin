import types from '../types.js'

const modules = {
	state: {},
	mutations: {
	  	// 合并过滤后的路由新数组，并更新获取权限状态
		[types.SET_CONCATROUTES] (state,newRoutes) {
			// 合并过滤后的路由新数组
			state.routes = newRoutes.concat(routes);
			// 更新获取状态
			state.isAuthToken = true;
		}
	},
	actions: {},
	getters: {}
}

export default modules;