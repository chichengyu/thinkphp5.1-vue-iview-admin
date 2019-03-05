import axios from './index.js'

export const getUserInfo = () => {
	return axios.request({
		url:'/user',
		method:'get',
		headers:{},
	});
}