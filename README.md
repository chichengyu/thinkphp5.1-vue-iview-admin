# thinkphp5.1-vue-iview-admin

#### 介绍

基于thinkphp5.1、vue、iview做的一个后台管理系统，默认打包出的是异步加载

另外这里在提供一个版本，项目跟这个项目是一模一样的，唯一不同的就是，打包出的文件不是异步加载，只有三个文件，bundle.js、index.html、images。  
not-async-admin@0.1 链接: https://pan.baidu.com/s/1G7qsn8ouE3eOksxO7R7dwA 提取码: hq4d  
not-async-admin@0.2 链接： https://share.weiyun.com/5ioodcD （密码：VZ8n）    
0.1是整改前的，0.2是整改后的


还有一点需要注意的是，如果使用本项目的ThinkPHP5.1进行接口开发，值得注意的一点是，我已经封装好接管异常的处理了，只需要创建异常类文件继承封装的异常就可以了。异常目录 app/lib/excption 目录，这个异常类分两种，一种是客户端异常(BaseException),一种服务器异常（不需要管，接管的异常会自动处理），当需要在不同功能接口返回异常时，只需要创建对应的异常类来继承客户端异常(即 BaseException)即可。


#### 架构
架构说明

   + [Preview预览](http://xiaochiwz.gitee.io/thinkphp5.1-vue-ivew-admin)
   + [Iview官网](http://v1.iviewui.com/docs/guide/start)
   + [ThinkPHP官网](http://www.thinkphp.cn/)
   + [ThinkPHP5.1手册](https://www.kancloud.cn/manual/thinkphp5_1/353946)
   + [Vue官网](https://cn.vuejs.org/v2/guide/)
   + [Wenpack官网](https://www.webpackjs.com/)
   + [Easy Mock接口API](https://www.easy-mock.com/project/5bf4b1a323557c43607406bc)

#### 目录结构
   ThinkPHP的目录结构就不用多说了，要说的是结合Vue后的目录  
```  
     public目录  
     ├─preview          预览目录(安装之后直接删除)  
     ├─static           应用目录  
     │  ├─admin             后台目录（本后台管理系统主目录）  
     │  ├─home              前台目录  
     │  ├─src               模块目录  
     │  │  ├─.Runtime          预编译与缓存目录(运行npm run build:dll生成,使用时不用管,提升打包速度生成的文件存放目录)
     │  │  ├─api               接口请求目录  
     │  │  ├─assets            静态资源目录  
     │  │  ├─components        组件目录  
     │  │  ├─config            配置目录  
     │  │  ├─lib               核心库目录  
     │  │  ├─router            路由目录  
     │  │  ├─store             vuex目录  
     │  │  ├─views             视图目录  
     │  │  ├─App.vue           根组件  
     │  │  ├─env.js            环境变量配置文件  
     │  │  ├─index.html        主页    
     │  │  ├─main.js           入口文件    
     │  │  └─ ...              
     │
```

#### Getting started
```
# clone the project
git clone https://github.com/chichengyu/thinkphp5.1-vue-ivew-admin.git

# install dependency
composer install

# install dependency
npm install

# 利用 DllPlugin 和 DllReferencePlugin 预编译资源模块生成 vendor.dll.js(优化打包速度)
npm run build:dll

# build
npm run build

# watch
npm run watch
```  
+ [composer install错误解决](https://beltxman.com/archives/1620.html) 
  
注意：安装完成后，先把 public/prieview 整个目录删除，这个只是用于在这里预览而已。另外，值得注意一下的是，在执行 ```npm run watch```与```npm run build```之前，必须先执行 ```npm run build:dll```，这样后面打包时的速度会快很多。预编译资源模块：```webpack.dll.config.js```就是预编译模块的配置文件，想要使用预编译资源功能就需要```webpack.dll.config.js```的```entry ```的配置项``` vendor```中加入路径。如：axios(我这里是 npm install axios，所以就是默认找 node_modules 文件夹)  

    vendor: [
       'axios',
       // ...其它库
    ],   

#### Build
```
# Dev server
npm run dev  

# build  
npm run build

# watch
npm run watch
```

#### 使用说明
ThinkPHP5.1、Vue、Iview的使用就不在此多说了，这里要说的是前后分离时的 **权限控制**，这里介绍两种方法，两种都需要前后配合  
   至于，路由的具体添加请查看 **public/static/src/router/admin.routes.js** 的注释，有详细说明    
   + [Vue-Router的meta元信息](https://router.vuejs.org/zh/guide/advanced/meta.html)  
        在需要验证的路由中加入 meta 属性 ``` meta:{rules:['admin','editor']} ```，如下：
      ```
        {  
	        path:'index',  
	        name:'adminIndex',  
	        meta:{rules:['admin','editor']},// 如此这样  
	        component: () => import(/* webpackChunkName: "login" */ '@/views/admin/components/index.vue')  
        }  
      ```
      admin、editor表示只有 admin/editor 两个用户组的用户能访问此条路由。  
         当用户登陆时返回的用户信息中需要有当前用户所属的用户组（键名：roles）  
         如：
      ```
       {
	        username: 'admin',
	        token: ' 5bf4b1a323557c43607406bc',
	        roles: ['admin']
       } 
      ```
   + [Vue-Router的name属性](https://router.vuejs.org/zh/guide/essentials/named-routes.html)  
        在需要验证的路由中加入 name 属性，且每个路由的 name 值必须是独一无二的，不能有相同值的，后台需要返回一个以所有路由中 **name** 值的对象规则，
      ```
        {
	        "rules": {
	            'index': true,
	            'adminIndex': true,
	            'table': true,
	            'form': true,
	            'keyboard': true,
	            'line': true,
	            'icons': true,
	            'mix': true,
	            'notAuth': false,
	            'found': false,
	        }
        }
      ```  
        然后在路由守卫里进行判断筛选出当前登陆用户的菜单动态挂载到路由上。  
        这里使用的是 meta 属性进行权限控制的，当然两种各有优劣势 



#### License
[MIT](https://opensource.org/licenses/MIT)
