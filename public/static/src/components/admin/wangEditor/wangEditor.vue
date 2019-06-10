<template>
    <div class="editor">
        <div ref="toolbar" class="toolbar">
        </div>
        <div ref="editor" class="text" :style="style">
        </div>
    </div>
</template>

<script>
    import E from 'wangeditor'

    export default {
        name: "wangEditor",
        data () {
            return {
                editor:null,
                content:'',
                style:{
                    height: this.height+'px'
                }
            }
        },
        props:{
            uploadUrl:{
                type:String,
                default: ''
            },
            value: {
                type: String,
                default: ''
            },
            height:{
                type:Number,
                default:200
            },
            isClear: {
                type: Boolean,
                default: false
            },
            isdisable:{// 是否启用编辑器
                type: Boolean,
                default: true
            },
            debug:{// debug模式
                type:Boolean,
                default: false
            }
        },
        watch: {
            isClear(val) {
                // 触发清除文本域内容
                if (val) {
                    this.editor.txt.clear();
                    this.content = null;
                }
            },
            value: function(value) {
                if (value !== this.editor.txt.html()) {
                    this.editor.txt.html(this.value)
                }
            }
            //value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
        },
        mounted () {
            this.setEditor();
            // 设置内容
            this.editor.txt.html(this.value)
        },
        methods:{
            setEditor () {
                // wangeditor
                this.editor = new E(this.$refs.toolbar, this.$refs.editor);
                this.editor.customConfig.zIndex = 0;
                this.editor.customConfig.uploadFileName = 'file'; // 文件名称 表单name
                this.editor.customConfig.onchangeTimeout = 1;// 内容变化出发onchange的延迟时间 1ms
                this.editor.customConfig.uploadImgMaxLength = 5;// 限制一次最多上传 5 张图片
                this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024; // 将图片大小限制为 2M
                this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000; // 设置超时时间
                this.editor.customConfig.uploadImgHeaders  = { // header头设置
                    token:this.$store.getters.userInfo.token
                }
                // 配置菜单
                this.editor.customConfig.menus = [
                    'head', // 标题
                    'bold', // 粗体
                    'fontSize', // 字号
                    'fontName', // 字体
                    'italic', // 斜体
                    'underline', // 下划线
                    'strikeThrough', // 删除线
                    'foreColor', // 文字颜色
                    'backColor', // 背景颜色
                    'link', // 插入链接
                    'list', // 列表
                    'justify', // 对齐方式
                    'quote', // 引用
                    'emoticon', // 表情
                    'image', // 插入图片
                    'table', // 表格
                    'video', // 插入视频
                    'code', // 插入代码
                    'undo', // 撤销
                    'redo', // 重复
                    'fullscreen' // 全屏
                ];

                if (this.uploadUrl !== '') {
                    this.editor.customConfig.uploadImgServer = this.uploadUrl;  // 上传图片到服务器
                }else {
                    this.editor.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
                }

                /*  单张上传
                    this.editor.customConfig.uploadImgHooks = {
                        customInsert: (insertImg, result, editor) => {
                            insertImg(result.ivew_path)
                        }
                    }
                */

                this.editor.customConfig.uploadImgHooks = {
                    fail: (xhr, editor, result) => {
                        // 插入图片失败回调
                    },
                    success: (xhr, editor, result) => {
                        // 图片上传成功回调
                    },
                    timeout: (xhr, editor) => {
                        // 网络超时的回调
                    },
                    error: (xhr, editor) => {
                        // 图片上传错误的回调
                    },
                    customInsert: (insertImg, result, editor) => {
                        // 图片上传成功，插入图片的回调
                        //result为上传图片成功的时候返回的数据，这里我打印了一下发现后台返回的是data：[{url:"路径的形式"},...]
                        // console.log(result.data[0].url)
                        //insertImg()为插入图片的函数
                        //循环插入图片
                        if (result.data && result.data.length) {
                            for (let i = 0; i < result.data.length; i++) {
                                var url = result.data[i].ivew_path;
                                insertImg(url);
                            }
                        }else {
                            insertImg(result.ivew_path);
                        }
                    }
                };

                this.editor.customConfig.onchange = (html) => {
                    this.content = html // 绑定当前逐渐地值
                    this.$emit('change', this.content) // 将内容同步到父组件中
                }

                // 开启debug模式
                if (this.debug){
                    this.editor.customConfig.debug = location.href.indexOf('wangeditor_debug_mode=1');
                }
                // 创建富文本编辑器
                this.editor.create();
                // 是否开启编辑功能(一定要放在创建之后，否则报错)
                this.editor.$textElem.attr('contenteditable', this.isdisable);
            }
        }
    }
</script>

<style lang="css" scoped>
.editor {
    width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 0;
}
.toolbar {
	flex-wrap: wrap;
    border: 1px solid #ccc;
}
.text {
    border: 1px solid #ccc;
}
</style>