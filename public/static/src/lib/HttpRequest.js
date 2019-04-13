import axios from 'axios'
import config from '@/config'
import store from '@/store/index.js'

class HttpRequest{
	constructor(baseUrl = config.baseUrl){
		this.baseUrl = baseUrl;
		// 定义一个队列, 用于做加载动画
		this.queue = {};
	}
	// 获取配置
	getInsideConfig(){
		const config = {
			baseURL:this.baseUrl,
			headers:{}
		};
		return config;
	}
	// 拦截器
	interceptors(instance,url){
		// 请求拦截
		instance.interceptors.request.use(config => {
			// axios 的配置 config
			// Object.keys 获取对象 this.queue 的所有属性名
			if (Object.keys(this.queue).length) {
				// 有请求
				this.queue[url] = true;
			}
			return config;
		},error => {
			// 请求失败，需要删除请求
			delete this.queue[url];
			return Promise.reject(error);
		});
		// 响应拦截
		instance.interceptors.response.use(response => {
			// 响应完成，五=无请求
			delete this.queue[url];
			const { data, status } = response;
			return { data, status };
		},error => {
			// 失败也需要删除请求
			delete this.queue[url];
			return Promise.reject(error);
		});
	}
	// 请求
	request(options){
		// 设置请求头 token
		const userInfo = store.getters.userInfo;
		if (userInfo && userInfo.token) {
			options.headers["token"] = userInfo.token;
		}
		// 创建 axios 实例
		const instance = axios.create();
		options = Object.assign(this.getInsideConfig(),options);
		this.interceptors(instance,options.url);
		return instance(options);
	}
}

export default HttpRequest