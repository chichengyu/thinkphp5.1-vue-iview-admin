<template>
    <div class="layout">
        <Layout>
            <Sider v-if='siderList' ref="side" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu :active-name="linkClassActive" theme="dark" width="auto" :class="menuitemClasses">
                    <template v-for='(menu,key) in siderList'>
                        <router-link :to='menu.path' v-if='!menu.children'>
                            <MenuItem @click.native='menuClickEvent(menu.name)' :name="menu.name" :key='key'>
                                <Icon :type="menu.icon"></Icon>
                                <span>{{ menu.name }}</span>
                            </MenuItem>
                        </router-link>
                        <Submenu :name="menu.name" v-if='menu.children'>
                            <template slot="title">
                                <Icon :type="menu.icon" />
                                <span>{{ menu.name }}</span>
                            </template>
                            <template v-for='(subMenu,index) in menu.children'>
                                <router-link tag='a' :to='subMenu.path' style="display: block;">
                                    <MenuItem :name='subMenu.name' @click.native='menuClickEvent(subMenu.name)' :key='index' >
                                        {{ subMenu.name }}
                                    </MenuItem>
                                </router-link>
                            </template>
                        </Submenu>
                    </template>
                </Menu>
            </Sider>
            <Layout>
                <Header class="layout-header-bar">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
                    <strong>{{titleText}}</strong>
                    <header-right />
                </Header>
                <!-- 当前位置 -->
                <div class="local">
                    <fade-in>
                        <Breadcrumb slot='fadeIn'>
                            当前位置：
                            <BreadcrumbItem v-for='(item,key) in currentLocal' :key='key'>
                                {{ item }}
                            </BreadcrumbItem>
                        </Breadcrumb>
                    </fade-in>
                </div>
                <div class="tabBtn" style="margin: 5px;">
                    <router-link tag='span'
                        @click.native='tabBtnClickEvent(tabBtn.name)'
                        :to='tabBtn.path' 
                        :class='tabBtn.tabBtnActive?"tabBtnActiveClass":""' 
                        v-for='(tabBtn,key) in siderNameList' 
                        :key='key'
                    >
                        <Icon type="ios-radio-button-off" class='tabBtn-icon'/>
                        {{ tabBtn.name }}
                        <Icon type="ios-close" @click.stop='tabBtnClose(tabBtn.name)' class='tabClose'/>
                    </router-link>
                </div>
                <Content :style="{padding:'0',background: '#f5f7f9'}">
                    <h2 class="content-title">
                        <Icon type="ios-pricetags" class='title-icon'/>
                        {{ contentTitle }}
                    </h2>
                    <fade-in>
                        <router-view  slot='fadeIn' />
                    </fade-in>
                </Content>
                <Footer class="layout-footer-center" align="center">2011-2016 &copy; TalkingData - {{titleText}}</Footer>
            </Layout>
        </Layout>
    </div>
</template>

<script>
import FadeIn from '@/components/admin/fadeIn/FadeIn.vue'
import HeaderRight from '@/components/admin/layout/header.vue'
import { getSiderList } from '@/api/admin/sider.js'

export default {
    name:'layout',
    components:{
        FadeIn,
        HeaderRight
    },
    data () {
        return {
            titleText:'xxxxxxx后台系统',
            isCollapsed: false,
            linkClassActive:'',
            currentContentTitle:null,// 当前选中标题
            currentActiveClassPath:'',// 存放当前选中的路径
            currentLocal:['首页'],// 当前位置
            siderList:[],// 左侧菜单列表
            siderNameList:[
                {
                    name:'首页',
                    path:'/index',
                    tabBtnActive:true
                }
            ]
        }
    },
    computed: {
        rotateIcon () {
            return [
                'menu-icon',
                this.isCollapsed ? 'rotate-icon' : ''
            ];
        },
        menuitemClasses () {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        },
        contentTitle () {
            return this.currentContentTitle?this.currentContentTitle:'首页';
        },
    },
    beforeCreate () {
        this.$router.push('/index');
    },
    created () {
        //this.$store.dispatch('setSiderList',res.data.siderList);
        this.siderList = this.$store.getters.siderList;
        setTimeout(() => {
            this.linkClassActive = this.siderList[0].name;
        });
    },
    methods: {
        collapsedSider () {
            this.$refs.side.toggleCollapse();
        },
        // 点击菜单与 tabBtn 时获取当前菜单并设置选中状态
        getMenuAndTabBtnActiveStatus (currentName) {
            this.currentContentTitle = currentName;
            this.currentLocal.length = 1;
            // 更新当前位置与当前路径
            var flagLocal = this.siderList.some(sider => {
                if ((currentName.length === sider.name.length) && currentName.indexOf(sider.name) != -1) {
                    if (currentName.indexOf('首页') == -1) {
                        this.currentLocal.push(currentName);
                    }else{
                        this.currentLocal.length = 1;
                    }
                    this.currentActiveClassPath = sider.path;
                    return true;
                }
                else if(sider.children){
                    var res = sider.children.some(item => {
                        if (item.name && (currentName.indexOf(item.name) != -1)) {
                            this.currentLocal.push(sider.name);
                            this.currentLocal.push(currentName);
                            this.currentActiveClassPath = item.path;
                            return item;
                        }
                    });
                    return res;
                }
            });
            this.siderNameList.map(item =>　{
                return item.tabBtnActive = false;
            });
            var tabBtnFlag = this.siderNameList.some(item => {
                if (currentName.indexOf(item.name) != -1) {
                    this.linkClassActive = item.name;
                    item.tabBtnActive = true;
                    return item;
                }
            });
            // 当为 true 时表示点击过了
            return {BtnFlag:tabBtnFlag,localFlag:flagLocal};
        },
        // 点击左侧菜单时生成按钮 tabBtn 并选中当前点击的
        menuClickEvent(currentName){
            // var currentName = e.target.innerText;
            setTimeout(() => {
                var {BtnFlag,localFlag} = this.getMenuAndTabBtnActiveStatus(currentName);
                if (localFlag && this.currentActiveClassPath) {
                    BtnFlag || this.siderNameList.push({name:currentName,tabBtnActive:true,path:this.currentActiveClassPath});
                }
            });
        },
        // tabBtn 点击切换选中时,左侧菜单对应选中
        tabBtnClickEvent (currentName) {
            // var currentName = e.target.innerText;
            this.getMenuAndTabBtnActiveStatus(currentName);
        },
        // 关闭 tabBtn 按钮
        tabBtnClose (currentMenuName) {
            if (this.siderNameList.length <= 1) {
                return this.$Message.warning('只剩下一个了，不能关闭！');
            }
            // var currentMenuName = e.target.parentElement.innerText;
            // 关闭 tabBtn 按钮前设置所有的 tabBtn 选中状态为false
            this.siderNameList.map(item =>　{
                return item.tabBtnActive = false;
            });
            var index = this.siderNameList.findIndex((item) =>　{
                return item.name && currentMenuName.indexOf(item.name) != -1;
            });
            if (index != -1) {
                this.siderNameList.splice(index,1);
                setTimeout(() => {
                    this.getMenuAndTabBtnActiveStatus(this.siderNameList[this.siderNameList.length-1].name);
                    this.$router.push(this.siderNameList[this.siderNameList.length-1].path);
                });                
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.content-title{
    margin-left:5px;
    margin-bottom:1px;
    background: #fff;
    box-shadow: 0 .5px .5px rgba(0, 0, 0, 0.1);
}
.local{
    display:inline-block;
    padding-left: 10px;
    background: #fff;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #e6dfdf;

    .ivu-breadcrumb{
        display:inline-block;
        transition:all 1s;
        span{
            padding:5px 0;
        }
    }
}
.ivu-breadcrumb>span:last-child{
    color: #f90;
}
.tabBtn > span.tabBtnActiveClass,.tabBtn > span:hover{
    border-color: #ccc;
    color: #fff;
    background: #7abf73;

    .tabBtn-icon{
        background: #fff;
        border-radius: 100%;
    }
}
.tabBtn > span {
    display: inline-block;
    margin: 0 2px;
    padding: 2px 8px;
    background: #fff;
    border: 1px solid #dcdee2;
    border-radius: 3px;
    transition: .3s;
    color: #515a6e;
    cursor: pointer;
    user-select: none;

    &:hover{
        border-color: #ccc;
        color: #fff;
    }

    .tabBtn-icon{
        transition: .3s;
    }
    .tabClose{
        font-size:16px;
        border-radius: 50%;
        transition: all .1s;
        
        &:hover{
            background: #bbb;
        }
    }
}
.ivu-layout.ivu-layout-has-sider{
    height: 100%;
}
.ivu-menu-item.ivu-menu-item-active,.ivu-menu .ivu-menu-item.ivu-menu-item-active,.ivu-menu .ivu-menu-item.ivu-menu-item-active:hover{
    color: rgb(64, 158, 255);
    background: #3c5269;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover{
    color: rgb(64, 158, 255);
    background: #3c5269 !important;
}
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    width: 100%;
    height: 100%;
}
.layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
    padding: 0;
    font-size:18px;
}
.layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
}
.menu-icon{
    transition: all .3s;
}
.rotate-icon{
    transform: rotate(-90deg);
}
.menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
}
.menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
}
.collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
}
.collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
}
</style>