<template>
	<div class="app">
		<!-- <router-view></router-view> -->
		<keep-alive>
			<router-view/>
		</keep-alive>
	</div>
</template>

<script>
export default {
	name:'App'
}
</script>

<style lang="stylus">
html,body,.app{
  width: 100%;
  height: 100%;
  /*overflow: hidden;*/
}
</style>