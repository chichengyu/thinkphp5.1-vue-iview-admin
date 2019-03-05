<template>
	<div class="notAuth">
		<h1>401，抱歉，你没有权限访问</h1>
		<div class="img" align="center">
			<img src="@/assets/admin/images/401.gif" alt="">
		</div>
	</div>
</template>

<script>
export default {
	name:'NotAuth'
}
</script>

<style lang="stylus" scoped>
.notAuth{
	height: 100%;
	background: #fff;

	h1{
		padding: 32px;
		font-size: 32px; 
		text-align: center;
	}
}
</style>