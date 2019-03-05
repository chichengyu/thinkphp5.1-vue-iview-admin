// 入口文件


// 引入包
import Vue from 'Vue'
import store from './store/index.js'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

import App from './App.vue'
import router from './router/admin.router.js'

Vue.use(iView)

// NProgress.inc(0.2)
// NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

const vm = new Vue({
	el:'#app',
    store,
	router,
	render:c => c(App),
})