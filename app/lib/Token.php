<?php
namespace app\lib;


class Token{

    /** 实例对象
     * @var
     */
    private static $_instance;

    /** 一串随机的字符,用于令牌token加密
     * @var string
     */
    private $salt = 'CHhsICsAscS546213';

    private function __construct(){}
    private function __clone(){}


    /** 获取实例对象
     * @return
     */
    public static function getInstance(){
        if (!self::$_instance){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    /** 生成未加密token
     * @return string
     */
    public function generateToken($uid){
        return sha1(md5($this->getRandChars(32)).md5(uniqid(microtime(true),true).$this->salt.$uid));
    }

    /** 获取加密token
     * @return string
     */
    public function getAuthEncodeToken($token,$expiry=0){
        return $this->authTokenCode($token,'ENCODE','encrypt',$expiry);
    }

    /** 解密的token
     * @param $token 加密的token
     * @return string
     */
    public function getAuthDecodeToken($token,$expiry=0){
        return $this->authTokenCode($token,'DECODE','encrypt',$expiry);
    }

    /**
     * @param $string    要加密/解密的字符串
     * @param string $operation   类型，ENCODE 加密；DECODE 解密
     * @param string $key    密匙
     * @param int $expiry    有效期
     * @return string
     */
    private function authTokenCode($string, $operation, $key, $expiry){
        // 动态密匙长度，相同的明文会生成不同密文就是依靠动态密匙
        $ckey_length = 4;
        // 密匙
        $key = md5($key ? $key : $GLOBALS['discuz_auth_key']);
        // 密匙a会参与加解密
        $keya = md5(substr($key, 0, 16));
        // 密匙b会用来做数据完整性验证
        $keyb = md5(substr($key, 16, 16));
        // 密匙c用于变化生成的密文
        $keyc = $ckey_length ? ($operation == 'DECODE' ? substr($string, 0, $ckey_length):substr(md5(microtime()), -$ckey_length)) : '';
        // 参与运算的密匙
        $cryptkey = $keya . md5($keya . $keyc);
        $key_length = strlen($cryptkey);
        // 明文，前10位用来保存时间戳，解密时验证数据有效性，10到26位用来保存$keyb(密匙b)，
        //解密时会通过这个密匙验证数据完整性
        // 如果是解码的话，会从第$ckey_length位开始，因为密文前$ckey_length位保存 动态密匙，以保证解密正确
        $string = $operation == 'DECODE' ? base64_decode(substr($string, $ckey_length)):sprintf('%010d', $expiry ? $expiry + time() : 0).substr(md5($string . $keyb), 0, 16) . $string;
        $string_length = strlen($string);
        $result = '';
        $box = range(0, 255);
        $rndkey = array();

        // 产生密匙簿
        for ($i = 0; $i <= 255; $i++) {
            $rndkey[$i] = ord($cryptkey[$i % $key_length]);
        }
        // 用固定的算法，打乱密匙簿，增加随机性，好像很复杂，实际上对并不会增加密文的强度
        for ($j = $i = 0; $i < 256; $i++) {
            $j = ($j + $box[$i] + $rndkey[$i]) % 256;
            $tmp = $box[$i];
            $box[$i] = $box[$j];
            $box[$j] = $tmp;
        }
        // 核心加解密部分
        for ($a = $j = $i = 0; $i < $string_length; $i++) {
            $a = ($a + 1) % 256;
            $j = ($j + $box[$a]) % 256;
            $tmp = $box[$a];
            $box[$a] = $box[$j];
            $box[$j] = $tmp;
            // 从密匙簿得出密匙进行异或，再转成字符
            $result .= chr(ord($string[$i]) ^ ($box[($box[$a] + $box[$j]) % 256]));
        }
        if ($operation == 'DECODE') {
            // 验证数据有效性，请看未加密明文的格式
            if ((substr($result, 0, 10) == 0 || substr($result, 0, 10) - time() > 0) &&
                substr($result, 10, 16) == substr(md5(substr($result, 26) . $keyb), 0, 16)
            ) {
                return substr($result, 26);
            } else {
                return '';
            }
        } else {
            // 把动态密匙保存在密文里，这也是为什么同样的明文，生产不同密文后能解密的原因
            // 因为加密后的密文可能是一些特殊字符，复制过程可能会丢失，所以用base64编码
            return $keyc.str_replace('=', '', base64_encode($result));
        }
    }

    /** 获取指定长度的随机字符串
     * @param $length [number] 指定长度
     * @return string
     */
    private function getRandChars($length){
        $str="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $max = strlen($str) - 1;
        $key = "";
        for($i=0;$i<$length;$i++)
        {
            $key .= $str[mt_rand(0,$max)];//生成php随机数
        }
        return $key;
    }
}