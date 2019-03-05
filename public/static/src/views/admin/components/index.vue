<template>
	<div class="admin-index">
		<!-- 统计图 -->
		<echarts></echarts>
	</div>
</template>

<script>
import echarts from './charts/charts.vue'
const animationDuration = 6000

export default {
	name:'AdminIndex',
	data () {
		return {

		}
	},
	components:{
		echarts
	},
	mounted () {
		
	},
	methods:{
		
	}
}
</script>

<style lang="stylus" scoped>
.admin-index{
	/*margin:5px;*/
	width: 100%;
	height: 100%;
	/*padding: 12px;*/

	
}

</style>