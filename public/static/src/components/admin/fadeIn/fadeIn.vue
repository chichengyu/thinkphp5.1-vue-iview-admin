<template>
	<transition name="fade" mode="out-in" appear>
		<slot name='fadeIn' ></slot>
	</transition>
</template>
<script>
export default {
	name:'fadeIn'
}
</script>
<style scoped>
.fade-enter,.fade-leave-to{
	/*transform: translateX(-10px);*/
	width:120%;
	opacity:0;
	margin-left: -30px;
}
/*.fade-leave-to{
	transform: translateX(-10px);
	width: 100
	opacity:0
}*/
.fade-enter-active,.fade-leave-active{
	transition:all .1s
}
</style>