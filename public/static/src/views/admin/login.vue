<template>
	<div class="login">
		<div class="login-container">
			<h2 class="title">后台管理</h2>
			<div class="login-form">
				<Form ref="formInline" :model="formInline" :rules="ruleInline">
			        <FormItem prop="username">
			            <Input type="text" v-model="formInline.username" size="large">
			                <Icon type="ios-person-outline" slot="prepend" size="20"></Icon>
			            </Input>
			        </FormItem>
			        <FormItem prop="password">
			            <Input type="password" v-model="formInline.password" size="large">
			                <Icon type="ios-lock-outline" slot="prepend" size="20"></Icon>
			            </Input>
			        </FormItem>
			        <FormItem>
			            <Button type="primary" @click="handleSubmit('formInline')">登陆</Button>
			        </FormItem>
			    </Form>
			</div>
		</div>
	</div>
</template>
<script>
import md5 from 'md5'
import { userInfo } from '@/env.js'
import { getLogin } from '@/api/admin/login.js'

function hasErrors (fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field])
}
export default {
    name:'login',
    data () {
        return {
            formInline: {
                username: 'admin',
                password: '123456'
            },
            ruleInline: {
                username: [
                    { required: true, message: '请输入账号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码最小长度为6位', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit(name) {
            this.$Loading.start();
            var username = this.formInline.username,
               	password = md5(this.formInline.password);
            if(!username){
        		this.$Message.error('请输入账号!');
            	this.$Loading.error();
            	return;
        	}
        	if (!password) {
        		this.$Message.error('请输入密码!');
            	this.$Loading.error();
            	return;
        	}
            this.$refs[name].validate((valid) => {
                if (valid) {
            		getLogin({username,password}).then(res => {
		        		if (res) {
		        			res = res.data;
		        			if (username == 'admin') {
		        				if (password == md5('123456')) {
		        					this.$ls.set(userInfo,res);
		        					this.$store.dispatch('setUserInfo',res);
		        					this.$Message.success('登陆成功!');
				                	this.$router.push('/index');
		        				}else{
		        					this.$Message.error('密码错误!');
                    				this.$Loading.error();
		        				}
		        			}else{
		        				this.$Message.error('账号错误!');
                    			this.$Loading.error();
		        			}
				            this.$Loading.finish();
				            return;
		        		}
	        			this.$Message.error('登陆失败!');
                		this.$Loading.error();
		        	});
                } else {
                	this.$Message.error('输入格式不正确!');
                    this.$Loading.error();
                }
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
@import '~@/assets/admin/style/varibles.styl'

.login{
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
	text-align: center;
	background: url($bgImgLogin) no-repeat center/cover;
}
.login-container{
	width: 25%;
	min-width: 25%;
	/*height: 350px;*/
	position: absolute;
	top: 15%;
	left: 32%;
	padding-top: 2%;
	/*margin: 0 auto;*/
	background: rgba(255,255,255,.3);
}
.login-container .title{
	margin-bottom: 20px;
	font-size: 26px;
	color:#eee;
}
.login-container .login-form{
	width: 60%;
	margin: 0 auto;
}
</style>