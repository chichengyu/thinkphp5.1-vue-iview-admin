<?php 
namespace app\admin\controller;
use think\Controller;
use think\facade\Request;
use app\lib\exception\TokenException;

class Token extends Controller
{

	public function getToken()
	{
		$token = md5(mt_rand());
		$res = Cache('token',$token,50);
		$res = Cache('token');
		if (!$res) {
			throw new TokenException;
		}
		return json([
			'token' => $token,
			'msg'	=> 'Success OK',
			'url'	=> Request::url(true)
		]);
	}
}