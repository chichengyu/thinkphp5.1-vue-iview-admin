<?php 
namespace app\lib\exception;
use think\exception\Handle;
use think\facade\Request;
use think\facade\Log;
use think\exception\HttpException;
class ExceptionHandler extends Handle
{
	// HTTP 状态码
	private $code;
	// 提示信息
	private $msg;
	//错误码
	private $errorCode;
	// 客户端当前请求的url地址
	// private $requestUrl;
	public function render(\Exception $e)
	{
		 /*
		 	异常分两种情况：
		 		1.用户行为导致的,
		 			如：没有通过验证其、没有查询到结果
		 			通常不需要记录日志,返回具体信息
		 		2.服务器自身错误
		 			如：代码错误、第三方接口错误
		 			通常记录日志,不需要返回具体原因
		 */
		if ($e instanceof BaseException) {
			// BaseException就代表用户行为导致的异常，不记录日志
			$this->code = $e->code;
			$this->msg = $e->msg;
			$this->errorCode = $e->errorCode;
		} else if ($e instanceof HttpException) {
			// 路由异常的时候,也是客户端导致的，不需要记录日志
			$this->code = $e->getStatusCode();
			$this->msg = $e->getMessage();
			$this->errorCode = 40004;
		} else {
			if (config('app_debug')) {
				// 开发者模式时,便于调试,调用TP自带异常输出到页面
				return parent::render($e);
			}
			// 上线后,返回信息,并记录日志
			$this->code = '500';
			$this->msg = 'Server Error';
			$this->errorCode = 9999;
			Log::write($e->getMessage()."\r\n".$e->getFile().'第 '.$e->getLine().' 行','error');
		}
		$result = array(
			'msg' => $this->msg,
			'error_code' => $this->errorCode,
			'request_url'=> Request::url(true)
		);
		return json($result,$this->code);
	}
}
