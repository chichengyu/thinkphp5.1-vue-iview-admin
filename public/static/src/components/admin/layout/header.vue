<template>
	<div class="right">
        <div class="user">
        	<div style="display: inline-block;" class="massage">
	        	<Badge :count='5'>
			        <Icon type="ios-notifications-outline" size='26'></Icon>
			    </Badge>
	        </div>
	        <Dropdown style="margin-left: 20px" placement="bottom-end">
		        <a href="javascript:void(0)" class="user-img">
		            <img src="@/assets/admin/images/touxiang.gif" width="32">
		            <Icon type="md-arrow-dropdown" class='user-icon'/>
		        </a>
		        <DropdownMenu slot="list">
		            <DropdownItem>个人资料</DropdownItem>
		            <DropdownItem>密码修改</DropdownItem>
		            <DropdownItem @click.native='() => logout()'>退出登陆</DropdownItem>
		        </DropdownMenu>
		    </Dropdown>
        </div>
    </div>
</template>

<script>
export default {
	name:'HeaderRight',
	methods:{
		logout () {
			this.$ls.clear();
			this.$store.dispatch('clearLoginOut');
			this.$Message.success('退出登陆!');
			this.$router.push('/login');
			setTimeout(() => {
				window.location.reload();
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
.right{
	float: right;
	margin-top: 5px;
	line-height: 0;
	.user{
		.user-img{
			img{
				position: relative;
				top: 8px;
				border-radius: 30%;
			}
			.user-icon{
				/*font-size: 18px;*/
				line-height: 34px;
				color: #515a6e
			}
		}
		.massage{
			position: relative;
			cursor: pointer;
			.messageBox{
				display:block;
				position: absolute;
				right: 0;
				width: 1000%;
				height: 500px;
			}
			&:hover .messageBox{
				display:block;
			}
		}
		/*.massage:hover .messageBox{
			display: block;
		}*/
	}
}


</style>