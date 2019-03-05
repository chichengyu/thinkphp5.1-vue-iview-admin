import {routes} from '@/router/admin.routes.js'

const state = {
	isAuthToken:false,// 是否获取过权限
	userInfo:{},// 用户信息
	routes:routes,// 最后过滤后的合并路由
	siderList:[], // 左侧菜单列表
	rules:[],// 存放用户组 如：['admin','editor']
}

export default state