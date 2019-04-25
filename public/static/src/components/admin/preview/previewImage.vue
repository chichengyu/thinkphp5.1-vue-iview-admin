<template>
    <div class="preview">
        <img :src="imageUrl">
        <div class="preview-cover">
            <Icon type="ios-eye-outline" @click.native="handleView(imageUrl)"></Icon>
        </div>
        <Modal title="预览图片" v-model="visible" :footer-hide="true">
            <img :src="imgName" v-if="visible" style="width: 100%">
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "previewImage",
        props:['imageUrl'],
        data () {
            return {
                imgName:'',
                visible:false
            }
        },
        methods:{
            handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
        }
    }
</script>

<style scoped>
    .preview{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .preview img{
        width: 100%;
        height: 100%;
    }
    .preview-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .preview:hover .preview-cover{
        display: block;
    }
    .preview-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>