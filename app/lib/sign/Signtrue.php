<?php
namespace app\lib\sign;

use think\facade\Cache;

class Signtrue{
	/**
	 * app请求设备类型
	 */
	private $app_type = ['ios','android','web'];

	/**
	 * 请求有效时间
	 */
	private $expire = 600;

	/**
	 * sign缓存有效时间（一般大于请求有效时间），规定时间内请求过了，就不能再请求
	 */
	private $sign_expire = 10;

	/**
	 * 实例
	 */
	private static $instance;


	private function __construct(){}
	private function __clone(){}

	/** 获取实例
	 */
	public static function getInstance(){
		if (!self::$instance) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/** 生成签名
	 * @param number $version  版本号
	 */
	public function getCreateSign($params){
		$data = [
			'host_name' => $params['host_name'],
			'version' => $params['version'],
			'time' => $this->getTimeStamp()
		];
		// 1 按字段排序
		ksort($data);
		// 2 拼接字符串数据  &
		$string = http_build_query($data);
		// 3 通过aes来加密
		$sign = (new Aes)->encrypt($string);
		return $sign;
	}

	/** 验证签名
	 * @param Array $data  获取的数据
	 */
	public function check($headers){
		if (empty($headers['sign'])) {
			return false;
		}
		if (!in_array($headers['apptype'],$this->app_type)) {
            return false;
		}
		$sign = (new Aes)->decrypt($headers['sign']);
		if (empty($sign)) {
            return false;
		}
		parse_str($sign,$data);
		if (!is_array($data) || (isset($data['version']) && ($data['version'] != $headers['version']))) {
            return false;
		}
		// echo Cache::get($sign);exit();
		if (!config('app_debug')) {
			if ((time() - ceil($data['time'] / 1000)) > $this->expire) {
                return false;
			}
			// 请求唯一性判定，规定时间内请求过了，就不能再请求
			if (Cache::get($sign)) {
				return false;
			}
		}
		Cache::set($sign,1,$this->sign_expire);
		return true;
	}

	/**
	 * 获取 13 位时间戳
	 */
	private function getTimeStamp(){
		list($t1,$t2) = explode(' ', microtime());
		return $t2 . ceil($t1 * 1000);
	}
}