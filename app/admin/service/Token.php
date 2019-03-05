<?php 
namespace app\admin\service;

class Token
{
	// 生成令牌
	public function generateToken()
	{
		// 32哥字符组成随机字符串
		$randChars = getRandChars(32);
		// 请求开始时的时间戳
		$timestamp = $_SERVER['REQUEST_TIME_FLOAT'];
		// salt 盐
		$salt = config('salt');
		return md5($randChars.$timestamp.$salt);
	}
}