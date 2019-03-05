import axios from './index.js'

export const getToken = () => {
	return axios.request({
		url:'/admin/getToken',
		method:'get',
		headers:{},
	});
}