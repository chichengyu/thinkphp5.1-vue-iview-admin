<?php
namespace app\lib;


trait ResponseJson{

    /** 成功 code
     * @var int
     */
    private $success = 1;

    /** 错误 code
     * @var int
     */
    private $error = 0;

    /** 成功时返回
     * @param string   $msg
     * @param string   $data
     * @param int      $status
     * @return \think\response\Json
     */
    public function responseSuccess($msg='', $data='', $status=200){
        return $this->responseJson($msg, $this->success, $data, $status);
    }

    /**
     * @param string   $msg
     * @param string   $data
     * @param int      $status
     * @return \think\response\Json
     */
    public function responseError($msg='', $data='', $status=200){
        return $this->responseJson($msg, $this->error, $data, $status);
    }

    /**
     * @param string   $msg    返回的提示信息
     * @param int      $code   返回的状态吗
     * @param string   $data   返回的数据
     * @param int      $status 状态码
     * @return \think\response\Json
     */
    public function responseJson($msg, $code, $data, $status){
        $obj = [
            'code'   => $code,
            'msg'    => $msg,
            'url'    => request()->url(true)
        ];
        if (!empty($data)){
            $obj['data'] = $data;
        }
        return json($obj,$status);
    }

}