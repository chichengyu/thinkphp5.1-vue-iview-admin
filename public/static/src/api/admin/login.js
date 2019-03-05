import axios from './index.js'

export const getLogin = (data) => {
	return axios.request({
		url:'/login',
		method:'post',
		data:data
	});
}