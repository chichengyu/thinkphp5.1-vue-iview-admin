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

	public function render(\Exception $e)
	{
		if ($e instanceof BaseException) {
			// 客户端请求异常
			$this->code = $e->code;
			$this->msg = $e->msg;
			$this->errorCode = $e->errorCode;
		}else if ($e instanceof HttpException) {
			// 路由不存在
			$this->code = $e->getStatusCode();
			$this->msg = $e->getMessage();
			$this->errorCode = 40004;
		}else{
			// 服务器异常
			$this->code = '500';
			$this->msg = 'Server Error';
			$this->errorCode = '9999';
			Log::write($e->getMessage()."\r\n".$e->getFile().'第 '.$e->getLine().' 行','error');
		}
		return json([
			'msg'  => $this->msg,
			'error_code' => $this->errorCode,
			'request_url'=> Request::url(true)
		],$this->code);
	}
}