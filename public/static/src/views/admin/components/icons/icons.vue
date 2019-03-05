<template>
	<div class="icons">
		<Alert class='alert'>
			<a target="_new" href="https://panjiachen.github.io/vue-element-admin-site/guide/advanced/icon.html">Add and use</a>
		</Alert>
		<div class="content" @click.stop='copyLink'>
			<div class="icons-box">
				<Icon type="md-volume-up"/><br>
				Notice
			</div>
			<div class="icons-box">
				<Icon type="ios-arrow-back" /><br>
				left arrow
			</div>
			<div class="icons-box">
				<Icon type="ios-arrow-forward" /><br>
				right arrow
			</div>
			<div class="icons-box">
				<Icon type="md-arrow-back" /><br>
				md-arrow-down
			</div>
			<div class="icons-box">
				<Icon type="md-arrow-forward" /><br>
				md-arrow-back
			</div>
			<div class="icons-box">
				<Icon type="md-arrow-down" /><br>
				md-arrow-down
			</div>
			<div class="icons-box">
				<Icon type="md-arrow-up" /><br>
				md-arrow-up
			</div>
			<div class="icons-box">
				<Icon type="ios-alert-outline" /><br>
				waring1
			</div>
			<div class="icons-box">
				<Icon type="md-alert"/><br>
				waring2
			</div>
			<div class="icons-box">
				<Icon type="md-book" /><br>
				md-book
			</div>
			<div class="icons-box">
				<Icon type="ios-close" /><br>
				ios-close
			</div>
			<div class="icons-box">
				<Icon type="ios-checkmark" /><br>
				ios-checkmark
			</div>
			<div class="icons-box">
				<Icon type="md-cloud-download" /><br>
				download
			</div>
			<div class="icons-box">
				<Icon type="md-cloud-upload" /><br>
				upload
			</div>
			<div class="icons-box">
				<Icon type="ios-mail" /><br>
				mail1
			</div>
			<div class="icons-box">
				<Icon type="ios-mail-outline" /><br>
				mail2
			</div>
			<div class="icons-box">
				<Icon type="ios-menu-outline" /><br>
				menu
			</div>
			<div class="icons-box">
				<Icon type="ios-musical-notes-outline" /><br>
				musical
			</div>
			<div class="icons-box">
				<Icon type="ios-options-outline" /><br>
				options
			</div>
			<div class="icons-box">
				<Icon type="ios-paper-plane-outline" /><br>
				paper-plane
			</div>
			<div class="icons-box">
				<Icon type="ios-phone-portrait" /><br>
				phone
			</div>
			<div class="icons-box">
				<Icon type="md-phone-portrait" /><br>
				md-phone
			</div>
			<div class="icons-box">
				<Icon type="ios-pin" /><br>
				pin
			</div>
			<div class="icons-box">
				<Icon type="ios-pin-outline" /><br>
				pin-outline
			</div>
			<div class="icons-box">
				<Icon type="ios-podium-outline" /><br>
				podium
			</div>
			<div class="icons-box">
				<Icon type="md-reorder" /><br>
				reorder
			</div>
			<div class="icons-box">
				<Icon type="ios-pricetag" /><br>
				pricetag1
			</div>
			<div class="icons-box">
				<Icon type="ios-pricetag-outline" /><br>
				pricetag2
			</div>
			<div class="icons-box">
				<Icon type="logo-rss" /><br>
				wifi-rss
			</div>
			<div class="icons-box">
				<Icon type="ios-star" /><br>
				star1
			</div>
			<div class="icons-box">
				<Icon type="ios-star-outline" /><br>
				star2
			</div>
			<div class="icons-box">
				<Icon type="ios-star-half" /><br>
				star-half
			</div>
			<div class="icons-box">
				<Icon type="md-stats" /><br>
				md-stats
			</div>
			<div class="icons-box">
				<Icon type="md-sync" /><br>
				md-sync
			</div>
			<div class="icons-box">
				<Icon type="md-text" /><br>
				md-text
			</div>
			<div class="icons-box">
				<Icon type="ios-trash-outline" /><br>
				trash
			</div>
			<div class="icons-box">
				<Icon type="logo-usd" /><br>
				usd
			</div>
		</div>
	</div>
</template>

<script>
import Clipboard from 'clipboard'

export default {
	name:"Icons",
	methods:{
		copyLink (e) {
			var clipboard = new Clipboard(e.target,{
				text:() => {
					return '<i class="'+e.target.className+'"></i>';
				}
			});
		  	clipboard.on('success', () => {
		    	clipboard.off('error')
			    clipboard.off('success')
			    clipboard.destroy()
			    this.$Message.success('Copy Success');
		  	});
		  	clipboard.onClick(e);
		}
	}
}
</script>

<style lang="stylus" scoped>
.icons{
	width:100%;
	height:100%;
}
.alert{
	margin:0 20px;
	padding:20px;
	font-size:22px;
}
.content{
	padding: 20px;
	overflow:hidden;

	.icons-box{
		float: left;
		margin: 23px;
		width:100px;
		height:100px;
		text-align:center;
		font-size: 12px;
		cursor: pointer;
		font-weight: 900;

		i{
			margin-top: 16px;
			font-size: 40px;
		}
	}
}
</style>
