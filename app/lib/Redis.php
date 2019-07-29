<?php
namespace app\lib;

class Redis{

    /** redis
     * @var \Predis\Client
     */
    private $redis;

    /** redis实例对象
     * @var \Predis\Client
     */
    private static $_instance;

    private function __construct(){
        $server = array(
            'host'     => '127.0.0.1',
            'port'     => 6379,
            'database' => 15
        );
        $this->redis = new \Predis\Client($server);
    }
    private function __clone(){}

    /**
     * 获取redis对象
     */
    public static function getInstance(){
        if (!self::$_instance){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __call($name, $agrs)
    {
        if (empty($name)){
            return '';
        }
        if (count($agrs) == 1){
            if ($name == 'ttl'){
                return $this->redis->ttl($agrs[0]);
            }
            return $this->redis->get($agrs[0]);
        }
        if (count($agrs) == 2){
            $this->redis->set($agrs[0],$agrs[1]);
        }
        if (count($agrs) == 3){
            $this->redis->setex($agrs[0],$agrs[1],$agrs[2]);
        }
    }
}