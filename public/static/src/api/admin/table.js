import axios from './index.js'

export const getTableData = () => {
	return axios.request({
		url:'/tableData',
		method:'get',
		headers:{},
	});
}