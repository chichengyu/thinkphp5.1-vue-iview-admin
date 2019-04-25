import types from './types.js'

// 生成左侧菜单数据
const getMenuList = (routesList,nowRole) => {
	let siderList = [];
	 routesList.forEach(item => {
	 	const sider = {
			 name:'',
			 icon:'',
			 path:'', 
		};
		 if (item.meta && item.meta.hiddenMenu===true) {
		 	// 判断是否所有人可访问，还是不同角色显示不同路由
		 	if (item.meta.access && item.meta.access.includes(nowRole)) {
		 		siderList.push(createSiderList(item,nowRole));
		 	}
		 	// 直接跳过。隐藏该路由
		 	return ;
		 }
		if (item.meta && item.meta.hiddenMenu===false){
			siderList.push(createSiderList(item,nowRole));
			/*
			if (item.meta.icon && item.meta.title && item.path){
				sider.name = item.meta.title;
				sider.icon = item.meta.icon;
				sider.path = item.path;
			}
			// 判断是否有子级
			let childItem = item.children;
			if (childItem) {
				if (childItem.length == 1 && childItem[0].path === 'index'){
					childItem = childItem[0];
					if (childItem.meta && childItem.meta.icon && childItem.meta.title && childItem.path) {
						sider.name = childItem.meta.title;
						sider.icon = childItem.meta.icon;
						sider.path = item.redirect;
					}
				} else {
					let childrenSider = getMenuList(item.children,nowRole);
					if (childrenSider.length > 0){
						for(let key in childrenSider){
							childrenSider[key].path = item.path + '/' + childrenSider[key].path;
						}
						sider.children = childrenSider;
					}
				}
			}
			if (sider.name && sider.icon && sider.path){
				siderList.push(sider);
			}
			*/
		}
	});
	return siderList;
};

function createSiderList(item,nowRole) {
	const sider = {
		 name:'',
		 icon:'',
		 path:'',
	};
	if (item.meta.icon && item.meta.title && item.path){
		sider.name = item.meta.title;
		sider.icon = item.meta.icon;
		sider.path = item.path;
	}
	// 判断是否有子级
	let childItem = item.children;
	if (childItem) {
		if (childItem.length == 1 && childItem[0].path === 'index'){
			childItem = childItem[0];
			if (childItem.meta && childItem.meta.icon && childItem.meta.title && childItem.path) {
				sider.name = childItem.meta.title;
				sider.icon = childItem.meta.icon;
				sider.path = item.redirect;
			}
		} else {
			let childrenSider = getMenuList(item.children,nowRole);
			if (childrenSider.length > 0){
				for(let key in childrenSider){
					childrenSider[key].path = item.path + '/' + childrenSider[key].path;
				}
				sider.children = childrenSider;
			}
		}
	}
	if (sider.name && sider.icon && sider.path){
	// 	siderList.push(sider);
		return sider;
	}
}

const mutations = {
	[types.SET_TOKEN] (state,isAuthToken) {
		if (isAuthToken){
			state.isAuthToken = isAuthToken;
		}else{
			state.isAuthToken = false;
		}
	},
	[types.SET_USER] (state,userInfo) {
		if (userInfo){
			state.userInfo = userInfo;
		}else{
			state.userInfo = {};
		}
	},
	// // 合并过滤后的路由新数组，并更新获取权限状态
	[types.SET_NEWROUTES] (state,newRoutes) {
		// 合并过滤后的路由新数组
		state.routes = state.routes.concat(newRoutes);
		// state.routes = newRoutes.concat(state.routes);
		// 更新获取状态
		state.isAuthToken = true;
	},
	// 左侧菜单列表
	[types.SET_SIDERLIST] (state,siderList) {
		if(!siderList){
			return state.siderList = siderList;
		}
		siderList = getMenuList(siderList,state.rules[0]);
		if (Array.isArray(siderList) && siderList.length > 0) {
			state.siderList = siderList;
		}else {
			state.siderList.length = 0;
		}
	},
	// 存放用户组 如：['admin','editor']
	[types.SET_RULES] (state,rules) {
		if (rules) {
			state.rules = rules;
		}else {
			state.rules = [];
		}
	} 
}

export default mutations
