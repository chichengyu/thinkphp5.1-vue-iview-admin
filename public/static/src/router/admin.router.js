  import Vue from 'Vue'
import VueRouter from 'vue-router'
import Storage from 'vue-ls'
import iView from 'iview'
import store from '@/store/index.js'
import {routes} from './admin.routes.js'
import { userInfo } from '@/env.js'
import clone from 'clone'

const options = {
    namespace: '', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'session',
};

Vue.use(VueRouter)
Vue.use(iView)
Vue.use(Storage,options)

const router = new VueRouter({
	scrollBehavior: () => ({ y: 0 }),
	routes
});

/*
	通过meta.role判断是否与当前用户权限匹配
	@param roles 当前用户所属于的用户组 如：['admin'] 从 vuex 获取
	@param rules 当前访问的路由的meta下的rules用户组数组，如：['admin'，‘editor'] 从当前访问路由对象 to 获取

	注意：如果登陆时，返回的不是用户组的名称(如：admin)，而是数字姓的级别，那么路由中的 rules 也必须改成级别数组，如：[10,9]
*/
let hasAccess = (roles,rules) => {
	if (roles.indexOf('admin') >= 0) return true;
	if (!rules) return true;// 不存在表示当前路由没有权限控制
	if(Array.isArray(roles)){
		// 数组
		return roles.some(item => rules.indexOf(item) >= 0);
	} else {
		// 字符串
		return rules.includes(roles);
	}
}

router.beforeEach((to,from,next) => {
	// require('@/http.js').default.get('/getToken').then(res => {
	// 	console.log(res.data);
	// })
	iView.LoadingBar.start();
	var isLogin = Vue.ls.get(userInfo);
	if (to.path == '/login' || to.path == '/register') {
		next();
	}else{
		if (isLogin) {
			// 是否获取过权限
			if (!store.getters.isAuthToken) {
				store.dispatch('getUserInfo').then(rlues => {
					store.dispatch('concatRlues',rlues).then(routes => {
						// 将合并后的路由动态挂载到路由对象上
						router.addRoutes(routes);
						next({ ...to, replace: true });
					}).catch(err => {
						// 出现异常直接跳转登陆页
						next('/login');
					});
				}).catch(err => {
					Vue.ls.remove('userInfo');
					// 出现异常直接跳转登陆页
					next('/login');
				});
			} else {
				// 获取过权限了  直接跳转
				// 判断该页面是否有权限访问
				if (hasAccess(store.getters.rules,to.meta.rules)) {
					next();
				} else {
					iView.Message.error('你没有权限访问');
					iView.LoadingBar.error();
					next({path:'/401',replace:true});
				}
			}
		}else {
			iView.Message.warning('请先登陆');
			iView.LoadingBar.finish();
			next('/login');
		}
	}
});
router.afterEach((to,from) => {
	if (to.path === '*') {
		iView.Message.error('页面不存在');
		iView.LoadingBar.error();
	}else{
		iView.LoadingBar.finish();
	}
});

export default router