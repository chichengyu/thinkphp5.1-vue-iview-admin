<template>
    <div class="table">
        <!-- header -->
        <div class="table-header" style="margin: 10px">
            <Button type="primary" size="large" @click.stop="showTableAdd=true"><Icon type="md-add"></Icon>添加</Button>
            <Button type="primary" size="large" @click="exportShow=true"><Icon type="md-download"></Icon>导出数据</Button>
        </div>
        <!-- 表格 -->
        <div class="tableData">
            <Table ref='table' border v-if='pageData' :columns="columns" :data="pageData"></Table>
            <!-- loading -->
            <loading :isSshow="isShowLoading"></loading>
        </div>

        <!-- 导出 Excel -->
        <Modal
                v-model="exportShow"
                width='300'
                @on-ok='exportData(1)'
                @on-cancel='exportShow=false'
        >
            <h2>确定要导出数据吗？</h2>
        </Modal>

        <!-- 模态框（查看） -->
        <Modal 
            v-model='showModal'
            title="详情查看"
            @on-ok="modalOk"
            @on-cancel="modalCancel">
            <div v-if='currentTableData'>
                <p><strong>ID：</strong>{{ currentTableData.id }}</p>
                <p><strong>年龄：</strong>{{ currentTableData.name }}</p>
                <p><strong>地址：</strong>{{ currentTableData.age }}</p>
                <p><strong>名称：</strong>{{ currentTableData.address }}</p>
                <p><strong>日期：</strong>{{ currentTableData.date }}</p>
            </div>
        </Modal>

        <!-- 添加 -->
        <table-add ref='tabelAdd' :show="showTableAdd" @showTableAddEvent="showTableAddEvent"></table-add>
        <!-- 抽屉（编辑） -->
        <table-edit
            ref='tabelEdit'
            :show='showTableEdit'
            @showTableEditEvent='showTableEditEvent'
        >
        </table-edit>
        <!-- 分页 -->
        <Page align='right' :styles='{marginTop:"10px"}' :total="total" @on-change='getPageData' show-sizer />
    </div>
</template>
<script>
import TableAdd from './components/add.vue'
import TableEdit from './components/edit.vue'
import Loading from '@/components/admin/loading/load.vue'
import { getTableData } from '@/api/admin/table.js'

export default {
    components:{
        TableAdd,
        TableEdit,
        Loading
    },
    data () {
        return {
            showModal:false,// 模态框
            exportShow:false,// 导出模态确认
            showTableAdd:false, // 抽屉添加
            showTableEdit:false, // 抽屉编辑
            delOkOrCancel:false,// 删除确认框
            currentTableData:null,
            offset:10,// 每页显示的条数
            columns: [
                {
                    title:'ID',
                    key:'id',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '名称',
                    key: 'name'
                },
                {
                    title: '年龄',
                    key: 'age'
                },
                {
                    title: '地址',
                    key: 'address'
                },
                {
                    title: '日期',
                    key: 'date'
                },
                {
                    title: '操作',
                    key: 'address',
                    width:180,
                    align: 'center',
                    render: (h, params) => {
                        var rule = this.$store.getters.rules;
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'default',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        // this.show(params.index)
                                        this.currentTableData = this.pageData[params.index];
                                        this.showModal = !this.showModal;
                                    }
                                }
                            }, '查看'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.$refs.tabelEdit.currentEditData(this.pageData[params.index])
                                        this.showTableEdit = true;
                                    }
                                }
                            }, '修改'),
                            h('Poptip',{
                                props: {
                                    confirm: true,
                                    title: '您确认删除这条内容吗？',
                                    placement: 'top',
                                    transfer:true,
                                },
                                style:{
                                    display:((Array.isArray(rule) && rule[0]!='admin')|| rule!='admin')?'none':''
                                },
                                on: {
                                    'on-ok': () => {
                                        if (this.$store.getters.rules[0] !== 'admin'){
                                            return this.$Message.error('你没有权限删除');
                                        }
                                        this.$Message.success('删除成功');
                                        this.pageData.splice(params.index, 1);
                                    },
                                    'on-cancel': () => {
                                        this.$Message.error('删除失败');
                                    }
                                }
                            }, [
                                h('Button',{ 
                                    props: { 
                                        type: 'error' ,
                                        size: 'small',
                                    }
                                },'删除')
                            ])
                        ]);
                    }
                }
            ],
            tableData: [],// 所有数据
            pageData:[],// 分页数据
            total:0,// 总共多少条数据,
            page:1,// 总页数
            currentPage:1,// 当前页,
            isShowLoading:false
        }
    },
    created () {
        this.getTableData(currentPage,this.offset);
    },
    methods:{
        // 获取分页数据
        getTableData (currentPage,offset) {
            this.isShowLoading = true;
            getTableData(currentPage,offset).then(res => {
                this.tableData = res.data.data;
                this.total = res.data.total;
                this.pageData = this.handleTableData(this.tableData,0,this.offset);
                this.isShowLoading = false;
            });
        },
        // 点击分页切换数据
        getPageData (currentPage) {
            this.currentPage = currentPage;
            const page = (currentPage - 1) * this.offset;
            this.pageData = this.handleTableData(this.tableData,page,this.offset);
        },
        modalOk () {
            this.$Message.info('Clicked ok');
        },
        modalCancel () {
            this.$Message.info('Clicked cancel');
        },
        showTableAddEvent () {
            this.showTableAdd = false;
            this.getTableData(this.currentPage,this.offset);
        },
        // 抽屉显示隐藏
        showTableEditEvent () {
            this.showTableEdit = false;
            this.getTableData(this.currentPage,this.offset);
        },
        // 截取数组中指定的项
        handleTableData (tableData,start,end) {
            return Array.isArray(tableData) &&　tableData.slice(start,start+end);
        },
        // 导出数据
        exportData (type) {
            if (type === 1) {
                this.$refs.table.exportCsv({
                    filename: 'The original data'
                });
            } else if (type === 2) {
                this.$refs.table.exportCsv({
                    filename: 'Sorting and filtering data',
                    original: false
                });
            } else if (type === 3) {
                this.$refs.table.exportCsv({
                    filename: 'Custom data',
                    columns: this.columns8.filter((col, index) => index < 4),
                    data: this.pageData.filter((data, index) => index < 4)
                });
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.table{
    height:80%;
}
.tableData{
    position: relative;
    /*height:100%;*/
}
</style>
