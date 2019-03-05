<template>
	<div class="markdown">
		<mavon-editor v-model='value' style="height: 100%"></mavon-editor>
	</div>
</template>

<script>
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
	name:'Markdown',
	data () {
		return {
			value:''
		}
	},
	components:{
	 	'mavon-editor': mavonEditor.mavonEditor
	},
	methods:{
		
	}
}
</script>

<style lang="stylus" scoped>
.markdown{
	height: 700px;
	background: #fff;
}
</style>