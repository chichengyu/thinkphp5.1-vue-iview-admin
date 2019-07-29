<?php
namespace app\lib\sign;

/**
 * aes 加密 解密类库
 * Class Aes
 * @package app\common\lib
 */
class Aes {
    /**
     * key长度使用了16长度
     */
    private $key;
    /**
     * 偏移向量iv的长度必须为16位
     */
    private $iv;
    /**
     * 加密方式
     * KEY 的长度是根据AES-128-CBC 与 AES-256-CBC 变换的。使用 AES-128-CBC 时，key的长度应该为16位，使用 AES-256-CBC时，key的长度应该为32位
     */
    private $mode;

    public function __construct($key=null,$iv=null) {
        // 需要小伙伴在配置文件app.php中定义aeskey
        // $this->key = config('app.aeskey');
        $this->key = isset($key)? $key : 'g87y65ki6e8p93av8zjdrtfdrtgdwetd';
        // $this->iv= md5(time(). uniqid(),true);
        $this->iv = isset($iv)? $iv : '1234567891234567';
        $this->mode = ['AES-128-CBC','AES-256-CBC'];
    }

    /**
     * 加密
     * @param String $str  加密的字符串
     * @param String $mode 模式[128,256] 默认 128
     * @return HexString
     */
    public function encrypt($str = '',$mode=0) {
        $data = base64_encode(openssl_encrypt($str, $this->mode[$mode],$this->key, OPENSSL_RAW_DATA , $this->iv));  
        // return strtolower(bin2hex($data));
        return $data;
    }

    /**
     * 解密
     * @param String input 解密的字符串
     * @param String $mode 模式[128,256] 默认 128
     * @return String
     */
    public function decrypt($str,$mode=0) {
        // $data = openssl_decrypt(base64_decode(hex2bin($str)), $this->mode[$mode], $this->key, OPENSSL_RAW_DATA, $this->iv);
        $data = openssl_decrypt(base64_decode($str), $this->mode[$mode], $this->key, OPENSSL_RAW_DATA, $this->iv);
        return $data;
    }

}