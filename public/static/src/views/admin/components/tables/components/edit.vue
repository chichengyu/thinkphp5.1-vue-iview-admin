<template>
    <div>
        <Drawer
            title="Edit"
            v-model="show"
            width="45%"
            :mask-closable="false"
            :styles="styles"
        >
            <div slot='close'>
                <Icon type="ios-close" @click.stop='showDrawer'/>
            </div>
            <Form :model="formData">
                <Row :gutter="32">
                    <Col>
                        <FormItem label="名称" prop="name" label-position="top">
                            <Input v-model="formData.name" placeholder="请输入名称" />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col>
                        <FormItem label="年龄" prop="age" label-position="top">
                            <Input v-model="formData.age" placeholder="请输入年龄" />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col>
                        <FormItem label="地址" prop="address" label-position="top">
                            <Input v-model="formData.address" placeholder="请输入地址" />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="日期" prop="date" label-position="top"><br>
                            <DatePicker type="date" placeholder="选择日期" :value='formData.date' style="width: 200px"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
                <FormItem label="Description" prop="desc" label-position="top">
                    <Input type="textarea" v-model="formData.desc" :rows="4" placeholder="please enter the description" />
                </FormItem>
            </Form>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="showDrawer">Cancel</Button>
                <Button type="primary" :loading="loading" @click="handleSubmit">Submit</Button>
            </div>
        </Drawer>
    </div>
</template>
<script>
    export default {
        props:['show'],
        data () {
            return {
                loading: false,
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
                },
                formData: {
                    name: '',
                    age: '',
                    address: '',
                    date: '',
                    desc: ''
                },
            }
        },
        methods:{
            // 显示隐藏模态表单
            showDrawer () {
                this.$emit('showTableEditEvent');
            },
            // 修改后提交
            handleSubmit () {
                this.loading = true;
                setTimeout(() => {
                    this.$Message.success('修改成功');
                    this.loading = false;
                    this.showDrawer();
                },5000)
            },
            // 接收修改时传递的函数
            currentEditData (data) {
                this.formData = data
            }
        }
    }
</script>
<style>
    .demo-drawer-footer{
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        border-top: 1px solid #e8e8e8;
        padding: 10px 16px;
        text-align: right;
        background: #fff;
    }
</style>
