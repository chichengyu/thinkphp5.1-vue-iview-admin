<template>
    <div class="upload" style="display: inline-block;">
        <div class="demo-upload-list" v-for="item in fileImageList">
            <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
            </template>
            <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
        </div>
        <Upload
                ref="upload"
                :show-upload-list="false"
                :default-file-list="defaultList"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                type="drag"
                :multiple="isUploades"
                :headers="{token:this.$store.getters.userInfo.token}"
                :action="uploadUrl"
                style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="ios-camera" size="20"></Icon>
            </div>
        </Upload>
        <Modal title="View Image" v-model="visible" :footer-hide="true">
            <img :src="imgName" v-if="visible" style="width: 100%">
        </Modal>
    </div>
</template>
<script>
    import {delUploadImage} from './delUploadImage.js'

    export default {
        props:{
            uploadUrl:{
                type:String,
                default:''
            },
            isUploades:{// 是否多张上传
                type:Boolean,
                default: false
            },
            isEdit:{// 是否是编辑操作时上传单张图片
                type:Boolean,
                default: false
            }
        },
        data () {
            return {
                defaultList: [],
                imgName: '',
                visible: false,
                uploadList: [],
                fileImageList:[],
                currentUrl:null,// 当前上传的图片路径
            }
        },
        methods: {
            handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file) {
                this.fileImageList.splice(this.fileImageList.indexOf(file),1);
                this.del(file,true);
            },
            handleSuccess (res, file) {
                if (!this.isUploades){// 单上传，显示当前上传的并删除已上传的图片
                    this.fileImageList.length = 0;
                    this.isEdit && this.currentUrl && this.del(this.currentUrl);
                }
                if (res.code == 401){
                    this.$Message.error(res.msg);
                }
                if (res.code == 1){
                    file.url = res.ivew_path;
                    file.name = file.name;
                    this.fileImageList.push(file);
                    this.$emit('changeImageUrl',res.path);
                    this.currentUrl = file;
                    this.$Message.success('上传成功');
                }
            },
            delImageUlr(){
                this.fileImageList = [];
                // this.$refs.upload.clearFiles();
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '图片格式错误',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '图片超过2M',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            },
            handleBeforeUpload (file) {
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: 'Up to five pictures can be uploaded.'
                    });
                }
                return check;
            },
            // del 删除图片
            del (file,flag=false) {
                let path = file.response.path;
                delUploadImage(path).then(res => {
                    if (res.data.code == 1){
                        if (flag) {
                            if (this.isUploades){// 删除多上传图片
                                this.$emit('changeImageUrl',path,true);
                            }else {
                                this.$emit('changeImageUrl','');
                            }
                            this.$Message.success(res.data.msg);
                        }
                    }else {
                        this.$Message.error(res.data.msg);
                    }
                });
            }
        }
    }
</script>
<style lang="css" scoped>
.demo-upload-list{
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
.demo-upload-list img{
    width: 100%;
    height: 100%;
}
.demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
}
.demo-upload-list:hover .demo-upload-list-cover{
    display: block;
}
.demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
</style>
