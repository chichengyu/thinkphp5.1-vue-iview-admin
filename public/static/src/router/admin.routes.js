import Layout from '@/views/admin/index.vue'

/**
 * 	1. hiddenMenu: boolean 是否隐藏该菜单 true 隐藏/ false不隐藏
 *  2. rules:['admin','editor'], admin / editor 两个角色（用户组）可以访问该菜单
 *  一级菜单的话 ，只需要在 chilren 里的 path='index 即可，二级菜单就不用
 *
 *  3. 如果 hiddenMenu:true 与 access:['admin','editor']表示隐藏该路由，且只有 ['admin','editor'] 两个角色组账号登陆才会显示该路由菜单;
 *     如果 hiddenMenu:false 与 rules:['admin','editor']表示不隐藏该路由，所有人登陆都可以到该路由菜单，但只有 ['admin','editor'] 两个角色组有操作权限
 *
 *  	注意：如果父级路由的 hiddenMenu:false 且 子级路由的 hiddenMenu:true 时，该子级路由的 access必须存在，不然该条子级路由将无效
 *
 *		access 用于那些角色组的人登陆可以看到该条路由菜单
 *
 *  注意:所有二级路由 children下的 mete 属性的 icon 必须存在且不能为空，值随便给 我这边给的是true
 *  	而一级菜单的 icon 值就是显示的图标，二级菜单 icon 属性值随意但必须存在
 *
 * @type {*[]}
 */

// 所有人都可以访问
const routes = [
	{
		path:'/login',
		// name:'login',
		meta:{hiddenMenu:true},
		component: () => import(/* webpackChunkName: "login" */ '@/views/admin/login.vue')
	},
	{
		path:'',
		redirect:'/index',
		component: Layout,
		meta:{hiddenMenu:false},
		children:[
			{
				path:'index',
				meta:{
					title:'首页',
					icon:'md-home',
				},
				component: () => import(/* webpackChunkName: "home" */ '@/views/admin/components/index.vue')
			}
		]
	},
	{
		path:'/role',
		redirect:'/role/index',
		component: Layout,
		meta:{hiddenMenu:false},
		children:[
			{
				path:'index',
				meta:{
					title:'角色',
					icon:'md-contacts',
				},
				component: () => import(/* webpackChunkName: "role" */ '@/views/admin/components/rolue/index.vue')
			}
		]
	},
	{
		path:'/401',
		component: Layout,
		redirect:'/401/index',
		meta:{hiddenMenu:true},
		children:[
			{
				path:'index',
				component: () => import(/* webpackChunkName: "401" */ '@/views/401.vue')
			}
		]
	},
	{
		path:'/404',
		component: Layout,
		redirect:'/404/index',
		meta:{hiddenMenu:true},
		children:[
			{
				path:'index',
				component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue')
			}
		]
	}
]

// 需要权限验证
const routesMap = [
	{
		path:'/icons',
		component: Layout,
		redirect:'/icons/index',
		meta:{hiddenMenu:false},
		children:[
			{
				path:'index',
				meta:{
					title:'图标',
					icon:'logo-facebook',
					rules:['editor']
				},
				component: () => import(/* webpackChunkName: "icons" */ '@/views/admin/components/icons/icons.vue')
			}
		]
	},
	{
		path:'/list',
		component: Layout,
		meta:{
			title:'列表',
			icon:'md-list',
			hiddenMenu:false,
			access:['admin'],
		},
		children:[
			{
				path:'table',
				name:'table',
				meta:{
					title:'表格',
					icon:true,
					rules:['admin','editor'],
					hiddenMenu:true,
					access:['admin','editor'],
				},
				component: () => import(/* webpackChunkName: "table" */ '@/views/admin/components/tables/table.vue')
			},
		],
	},
	{
		path:'/charts',
		component: Layout,
		meta:{
			title:'图表',
			icon:'logo-octocat',
			hiddenMenu:false,
			access:['admin','editor'],
		},
		children:[
			{
				path:'chartKeyboard',
				name:'keyboard',
				meta:{
					title:'键盘图表',
					icon:true,
					rules:['admin','editor'],
					hiddenMenu:true,
					access:['admin','editor'],
				},
				component: () => import(/* webpackChunkName: "chartKeyboard" */ '@/views/admin/components/charts/keyboard.vue')
			},
			{
				path:'chartLine',
				name:'line',
				meta:{
					title:'折线图',
					icon:true,
					rules:['admin'],
					hiddenMenu:true,
					access:['admin','editor'],
				},
				component: () => import(/* webpackChunkName: "chartLine" */ '@/views/admin/components/charts/line.vue')
			},
			{
				path:'chartMix',
				name:'mix',
				meta:{
					title:'混合图表',
					icon:true,
					rules:['admin','editor'],
					hiddenMenu:false,
					access:['admin','editor'],
				},
				component: () => import(/* webpackChunkName: "chartMix" */ '@/views/admin/components/charts/mix.vue')
			},
		],
	},
	{
		path:'/component',
		component: Layout,
		meta:{
			title:'组件',
			icon:'md-options',
			hiddenMenu:true,
			access:['admin','editor'],
		},
		children:[
			{
				path:'markdown',
				name:'markdown',
				meta:{
					title:'富文本',
					icon:true,
					rules:['admin','editor'],
					hiddenMenu:false,
					access:['admin']
				},
				component: () => import(/* webpackChunkName: "markdown" */ '@/views/admin/components/markdown/markdown.vue')
			},
		]
	},
	/****************************** errorpages异常路由可直接删除 *********************************/
	{
		path:'/errorpages',
		component: Layout,
		meta:{
			title:'异常',
			icon:'logo-android',
			hiddenMenu:true,
			access:['admin']
		},
		children:[
			{
				path:'401',
				meta:{
					title:'401页面',
					icon:true,
					rules:['admin'],
					hiddenMenu:false,
					access:['admin']
				},
				component: () => import(/* webpackChunkName: "401" */ '@/views/401.vue')
			},
			{
				path:'404',
				meta:{
					title:'404页面',
					icon:true,
					rules:['admin'],
					hiddenMenu:false,
					access:['admin']
				},
				component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue')
			}
		]
	},
	{path:'*',redirect:'/404/index',meta:{hiddenMenu:true}}

]

export {routesMap,routes}