<style src="../assets/less/common/iconfont.css" lang="less" scoped></style>
<style src="../assets/less/common/manage.less" lang="less" scoped></style>
<style scoped>
    .layout{
        background: #f5f7f9;
    }
    .layout-logo{
        float: left;
        position: relative;
        left: 20px;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
    }
    .layout-assistant{
        width: 300px;
        margin: 0 auto;
        height: inherit;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin-top: 60px;
        /*margin: 15px;*/
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .ivu-menu-dark{
        background: #0000;
    }

 .userinfo{
    display: inline-block;
    float: right;
}
.layout-logo .ivu-dropdown{
    margin-top: 50px;
}
 .ivu-dropdown {
    margin-left: 80px;
    margin-top: 22px;
}
.ivu-menu-submenu-title{
    padding: 14px;
}
.head-img {
    width: 100%;
    height: 60px;
    line-height: 60px;
    float: left;
    margin-top: -50px;
}
.head-img img{
    border-radius: 20px;
    margin: 10px 0px 10px 10px;
    width: 40px;
    height: 40px;
    float: right;
}
.layout-content-main{
    margin-top:10px;
}
</style>
<template>
    <div class="fixedDiv">
        <!--头部组件-->
        <common-header></common-header>
        <!--头部组件结束-->

        <div class="content-container">
            <div class="content">
                <div class="box">
                    <div class="box-content flex">
                        <div class="menu-box">
                            <div class="tip"><router-link to="/">应用中心</router-link></div>
                            <div class="sub-menu">
                                <Menu width="auto" style="position: static;" @on-select="menuSelect" accordion>
                                    <template v-for="(item, index) in routes" v-if="!item.hidden">  
                                        <Submenu :name="index" v-if="!item.leaf">
                                            <template slot="title">
                                                <Icon :type="item.icon"></Icon>
                                                {{item.alias}}
                                            </template>
                                            <Menu-item :name="child.path" v-for="(child, key) in item.children" :key="child.id" v-if="!child.hidden" class="menu-item">
                                                <router-link :to="child.path">{{child.alias}}</router-link>
                                            </Menu-item>
                                        </Submenu>
                                        <template  v-if="item.leaf && item.children.length>0">
                                            <Menu-item :name="item.children[0].path">
                                                <Icon :type="item.children[0].icon"></Icon>
                                                <span class="layout-text" >{{item.children[0].alias}}</span>
                                            </Menu-item>
                                        </template>
                                    </template>  
                                </Menu>
                            </div>
                        </div>

                        <!--右边盒子-->
                        <div class="right-content">
                            <!--<div :name="transitionName" v-if="$route.path == '/'">-->
                                <!--<common-main></common-main>-->
                            <!--</div>-->
                             <!--v-if="$route.path = '/'-->
                            <div>
                                <div>
                                    <!--<div class="navigation-box">
                                        <Breadcrumb>
                                            <Breadcrumb-item>应用中心</Breadcrumb-item>
                                            <Breadcrumb-item v-for="(item, index) in routes" v-if="$route.length > 0" :key="index">{{item}}</Breadcrumb-item>
                                        </Breadcrumb>
                                    </div>-->
                                    <router-view></router-view>
                                </div>
                            </div>
                        </div>
                    </div>

                        <!--右边盒子-->
                        <!--<div class="right-content">
                            <div :name="transitionName" v-if="$route.path == '/'">
                                
                            </div>
                            <div :name="transitionName" v-if="$route.path != '/'">
                                <div>
                                    <div class="navigation-box">
                                        <Breadcrumb>
                                            <Breadcrumb-item>接口一站式测试平台</Breadcrumb-item>
                                            <Breadcrumb-item v-for="(item, index) in $route.meta.navigation" v-if="$route.meta.navigation.length > 0" :key="index">{{item}}</Breadcrumb-item>
                                        </Breadcrumb>
                                    </div>
                                    <router-view></router-view>
                                </div>
                            </div>
                        </div>-->
                    </div>

                    <!--<div class="footer">
                        <p>推荐使用先进浏览器获得最佳体验 <span><a href="http://rj.baidu.com/soft/detail/14744.html">谷歌Chrome浏览器</a></span> | <span><a href="http://rj.baidu.com/soft/detail/11843.html" target="_blank">Firefox浏览器</a></span></p>
                        Copyright 2017 © daimatu.cn　All Rights Reserved 平台版权所有
                    </div>-->
                </div>

            </div>
        </div>
    </div>
    <!--<div class="layout">
        <CommonHeader></CommonHeader>
        <div class="layout-content">
            <Row class="layout-content-main">
                <i-col span="4" v-if="activeName !== '/'">
                    <Menu :active-name="this.$route.path" width="auto"  @on-select="leftMenuSelect">
                        <Menu-item name="/overview">
                            <li class="fa fa-home"></li>
                            <span class="layout-text" >首页</span>
                        </Menu-item>
                        <Menu-item name="/project">
                            <i class="fa fa-suitcase"></i>
                            <span class="layout-text" >项目管理</span>
                        </Menu-item>
                        <Menu-item name="/environment">
                            <i class="fa fa-envira"></i>
                            <span class="layout-text" >共享环境</span>
                        </Menu-item>
                        <Submenu name="3">
                            <template slot="title">
                                <i class="fa fa-location-arrow"></i>
                                测试管理
                            </template>
                            <Menu-item name="/alltest">所有测试</Menu-item>
                            <Menu-item name="/createtest">创建测试</Menu-item>
                        </Submenu>
                        <Submenu name="4">
                             <template slot="title">
                                 <i class="fa fa-align-justify"></i>
                                测试集
                            </template>
                                <Menu-item name="/all_collections">所有测试集</Menu-item>
                                <Menu-item name="/create_collection">创建测试集</Menu-item>
                        </Submenu>
                    </Menu>
                </i-col span="22">
                  <i-col span="5" v-if="this.$route.matched[0].name.indexOf('createtest') !== -1">
                    <Menu :active-name="this.$route.path" width="auto"  @on-select="leftMenuSelect">
                        <Menu-item name="/overview">
                            <Icon type="ios-navigate"></Icon>
                            <span class="layout-text" >概览</span>
                        </Menu-item>
                        <Menu-item name="/project">
                            <Icon type="ios-navigate"></Icon>
                            <span class="layout-text" >编辑</span>
                        </Menu-item>
                        <Menu-item name="/environment">
                            <Icon type="ios-navigate"></Icon>
                            <span class="layout-text" >结果</span>
                        </Menu-item>
                    </Menu>
                </i-col>
                <i-col span="19" v-if="activeName !== '/'">
                    <div class="layout-content-main">
                        <router-view></router-view>
                    </div>
                </i-col>
                <i-col span="24" v-if="activeName == '/'">
                    <div class="layout-content-main">
                        <router-view></router-view>
                    </div>
                </i-col>
            </Row>
        </div>
    </div>-->
</template>
<style scoped>
    * {
        padding: 0;
        margin: 0;
    }

    html, body {
        height: 100%
    }

    i {
        padding: 0;
        margin: 0;
    }
</style>
<script>
    import {mapGetters} from 'vuex';
    import {mapActions} from 'vuex';
    import ResultCollapse from './resultcollapse.vue';
    import CommonHeader from "./common/header.vue";
    export default {
        components: {
            CommonHeader
        },
          data () {
            return {
                transitionName: 'slide-left',
                routes: [],
                openNames: [this.$route.matched[0].name],
                currentProject: '',
                activeName: ''
                // openNames: [this.$route.matched[0].name],
                // curUserName : sessionStorage.getItem('user').replace(/\"/g,""),
                // modeType: "vertical",
                // spanLeft: 3,
                // spanRight: 21,
                // logoIsDisplay: false,
                // loading: true,
                // modal1: false,
                // formValidate: {
                //     oldPassword: '',
                //     newPassword: '',
                //     resetPassword:''
                // },
                // ruleValidate: {
                //     oldPassword: [
                //         { required: true, message: '密码不能为空', trigger: 'blur' }
                //     ],
                //     newPassword: [
                //         { required: true, message: '密码不能为空', trigger: 'blur' }
                //     ],
                //     resetPassword: [
                //         { required: true, message: '密码不能为空', trigger: 'blur' }
                //     ],
                // }
            }
        },
        computed: {
            projects: {
                get:function(){
                    return this.$store.state.Project.projectList;
                }
            }
        },
        methods:{
            menuSelect(name) {
                 this.activeName = name;
                 this.$router.push({ path: name });
            },
            leftMenuSelect(name) {
                 this.activeName = name;
                 this.$router.push({ path: name });
            },
            changeProject(value){
                var currentProjectId = value;
                var param = {'projectId':currentProjectId};
                var point = this;
                this.$store.dispatch('setCurrentProject', currentProjectId);
                this.$store.dispatch('getEnvironments', point);
                point.$router.push({path: '/'});
            }
        },
        mounted(){
            this.routes = this.$router.options.routes;
            this.$store.dispatch('getProjectsList', this);
            this.$store.dispatch('getAllTestCases', this)
        }
    }
</script>
