<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2018 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

// 前端首页
Route::get('/', function(){
	return  view('home/index');
});

// 后台首页
Route::get('/admin', function(){
	return  view('admin/index');
});
Route::group('admin',function(){
	// getToken
	Route::get('/getToken','admin/Token/getToken');
});