import axios from './index.js'

export const getSiderList = () => {
	return axios.request({
		url:'/sider',
		method:'get',
		headers:{},
	});
}
// 左侧菜单访问权限
export const getSiderAuth = () => {
	return axios.request({
		url:'/rules',
		method:'get',
		headers:{},
	});
}