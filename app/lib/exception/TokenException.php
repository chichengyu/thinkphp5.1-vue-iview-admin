<?php 
namespace app\lib\exception;

class TokenException extends BaseException
{
	protected $code = 401;
	protected $msg 	= 'Token invalid OR expired';
	protected $errorCode = 401;
}