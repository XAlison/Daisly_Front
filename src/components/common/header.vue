<style src="../../assets/less/common/manage.less" lang="less"></style>
<template>
    <div class="header box-shadow">
        <!--<h1 class="logo"><a href="/">冰鉴接口测试平台欢迎你</a></h1>-->
        <div class="top-panel">
            <span class="divide-icon pull-left">|</span>
            <router-link to="/setting/personal" class="user-info">
                <img src="../../assets/images/head_photo.png">
                <span class="simple-text user-name">{{user.account}}</span>
            </router-link>
            <span class="divide-icon pull-left">|</span>
            <a href="javascript: void(0);" class="logout-btn" @click="modal = true">退出</a>
            <div class="clearfix"></div>
        </div>
        <!--<div class="feedback-panel">
            <i class="message">
                <div class="notification"></div>
            </i>
        </div>-->
        <div class="nav">
            <ul class="list-inline">
                <li>
                <Select v-model="projectId" @on-change='changeProject' filterable>
                    <Option v-for="item in projects" :value="item.id" :key="item.projectName">{{ item.projectName }}</Option>
                </Select>
                </li>
                <li>
                     <a class="active">项目</a></li>
                </li>
                <!--<li><a href="#/myclass" class="active">财务</a></li>
                <li><a href="#/message">工单</a></li>
                <li><a href="#/score">帮助</a></li>-->
            </ul>
        </div>

        <!--modal 提示-->
        <Modal v-model="modal" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>温馨提示</span>
            </p>
            <div style="text-align:center">
                <p>您确认要退出?</p>
            </div>
            <div slot="footer">
                <Button type="success" size="large" long :loading="modalLoading" @click="signOut">确认退出</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    ///你给我每一次，都是新鲜！我对你的依恋更加明显。就在我们每次亲吻的瞬间，我就在也无法离开你的身边！
    import {mapActions} from 'vuex'
    export default{
        data () {
            return {
                // currentProject: '',
                info: '',
                modal: false,
                modalLoading: false
            }
        },
        computed: {
            projectId: {
                get:function(){
                    return this.$store.state.Project.currentProjectId;
                }
            },
            projects: {
                get:function(){
                    return this.$store.state.Project.projectList;
                }
            },
            user: {
                get:function(){
                    return this.$store.state.User.user;
                }
            }
        },
        methods: {
            // ...mapActions(['userOut']),
            changeProject(value){
                var currentProjectId = value;
                var param = {'projectId':currentProjectId};
                var point = this;
                this.$store.dispatch('setCurrentProject', currentProjectId);
                this.$store.dispatch('getEnvironments', point);
                point.$router.push({path: '/'});
            },
            //退出方法
            signOut () {
                this.modalLoading = true;
                setTimeout(() => {
                    this.modalLoading = false;
                    this.modal = false;
                    //处理一系列数据
                    this.$store.dispatch('userOut', this)
                    // this.userOut(this)
                    // this.$Message.success('退出成功');
                    // this.$router.push({path: '/login'})
                }, 1000);
            }
        },
        components: {},
        mounted() {
            
        },
        watch: {

        },
    }
</script>

