<template>

    <section style="width:100%;">
        <Row class="margin-bottom-30">
            <h1 class="margin-bottom-20px"> {{collectionInfo.collectionName}} </h1>
            <h4 class="margin-bottom-20px"> {{collectionInfo.remarks}} </h4>
        </Row>
        <Row>
        <div class="navbar collection-nav">
            <div class="navbar-inner">
                <ul class="nav">
                    <li @click='RetryAll'><span><li class="fa fa-repeat"></li> Retry All</span></li>
                    <li>
                        <span class="dropdown-toggle"> <li class="fa fa-plus"></li> Create Test </span>
                    </li>
                </ul>
                <ul class="nav pull-right">
                    <li class="collection-settings"><span><li class="fa fa-cog fa-fw"></li> Settings</span></li>
                </ul>
            </div>
        </div>
      </Row>
      <Row>
        <Table :context="self" :data="tableData" :columns="tableColumns"></Table>      
      </Row>
    </section>
</template>
<script>
    import {mapGetters} from 'vuex';
    import {mapActions} from 'vuex';
    import ResultCollapse from './resultcollapse.vue';
    import {runCollectionTestCases, getCollectionTestCase, removeCollectionTestCases} from '../api/api';
    export default {
        components: {
            ResultCollapse
        },
        data () {
            return {
                self:this,
                isRequest: true,
                isResponse: false,
                isToggle:true,
                tableData:[],
                // collectionInfo: {},
                collectionTestCase: [],
                result: {},
                caseResult: {},
                caseResultDetail: [],
                tableColumns: [
                    {
                        type: 'index',
                        align: 'left'
                    },
                    {
                        title: '测试用例名',
                        key: 'testCaseName',
                        align: 'left'
                      
                    },
                    {
                        title: '最后一次运行日期',
                        key: 'runDate',
                        align: 'left'
                      
                    },
                    // {
                    //     title: '环境变量',
                    //     key: 'environmentName',
                    //     align: 'left'
                      
                    // },
                    {
                        title: '运行结果',
                        align: 'left',
                        key: 'isSuccess',
                        render: (h, params) => {
                            console.log(params);
                            if (params.row.runDate === null){
                                return h('Tag', {
                                     props: {
                                        type: 'dot',
                                        color: 'blue'
                                    }
                                }, '还未执行');
                            }else{
                                if (params.row.isSuccess === '1'){
                                    return h('Tag', {
                                     props: {
                                        type: 'dot',
                                        color: 'green'
                                    }
                                }, '执行成功');
                            } else if(params.row.isSuccess === '0'){
                                    return h('Tag', {
                                     props: {
                                        type: 'dot',
                                        color: 'red'
                                    }
                                }, '执行失败');
                                }
                            }
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'left',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '2px',
                                        color: '#5cadff'
                                    },
                                    on: {
                                        click: () => {
                                            this.clickResult(params.row)
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        color: '#ed3f14'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row)
                                        }
                                    }
                                }, '移出')
                            ]);
                        }
                    }
                ]
            }
        },
        computed: {
           testCases:{
                get:function(){
                    var testCases = this.$store.state.TestCase.testCases;
                    var collectionTestCases = this.collectionInfo.testCases;
                    console.log(testCases)
                    return testCases;
                }
            },
            collectionInfo:{
                 get:function(){
                    return this.$store.state.Collection.currentCollectionInfo;
                }
            }
        },
        methods: {
            RetryAll(){
                var params = {"collectionId":this.collectionInfo.id}
                if (this.tableData.length == 0){
                    this.$Message.info("没有要执行的测试用例")
                    return
                }
                this.$loading();
                runCollectionTestCases(params).then((res)=>{
                     this.$loading.close();
                    if (res.success == 'FAILED'){
                        this.$Message.error(res.error.message)
                    }else{
                        console.log(res.data);
                        let _this = this;
                        // var para = {name:'ResultTable',params: {}}
                        // para.params = _this.caseResult.testCaseResult;
                        // this.$router.push(para);
                    }
                }).catch(()=>{
                    this.$Message.error("网络错误");
                    this.$loading.close();
                })
            },
            /** 查看测试用例结果 */
            clickResult(params){
                let _this = this;
                var para = {name:'ResultTable',params: {}}
                para.params = {"testCaseId":params.id, "testCaseName":params.testCaseName};
                this.$store.dispatch('setCurrentTestCaseInfo', params);
                this.$router.push(para);
            },
            reRun(){
                var params = {"testCaseId":this.result.testCaseId}
                this.$loading();
                reRunTestCase(params).then((res)=>{
                    this.$loading.close();
                    if (res.success == 'FAILED'){
                        this.$Message.error(res.error.message)
                    }else{
                        let _this = this;
                        var para = {name:'ResultTable',params: {}}
                        para.params = _this.caseResult.testCaseResult;
                        this.$router.push(para);
                    }
                }).catch(()=>{
                    this.$Message.error("网络错误");
                    this.$loading.close();
                })
            },
            remove(params){
                params = {"testCaseId":params.id,"collectionId":this.collectionInfo.id}
                this.$loading();
                removeCollectionTestCases(params).then((res)=>{
                    this.$loading.close();
                    if (res.success == 'FAILED'){
                        this.$Message.error(res.error.message)
                    }else{
                        this.getCollectionTestCase();
                        this.$Message.success("删除成功")
                    }
                }).catch(()=>{
                    this.$Message.error("网络错误");
                    this.$loading.close();
                })
            },
            toggleClick(){
                this.isToggle = !this.isToggle;
            },
            clickRequest(){
                this.isRequest = true;
                this.isResponse = false;
            },
            clickResponse(){
                this.isRequest = true;
                this.isResponse = false;
            },
            getCollectionTestCase(){
                getCollectionTestCase(this.collectionInfo).then((res)=>{
                    if (res.success == 'FAILED'){
                        this.$Message.error(res.error.message)
                    }else{
                        console.log(res)
                        this.collectionTestCase = res.data
                        this.tableData=res.data　
                    }
                }).catch(()=>{
                    this.$Message.error("网络错误");
                });
            }
        },
        mounted() {
            this.getCollectionTestCase();
        }
    }
</script>
<style lang="less">

h1, h4 {
  font-weight: normal;
}

.margin-bottom-30{
     margin-bottom: 30px;
}
.margin-bottom-20{
     margin-bottom: 20px;
}
.margin-bottom-10{
     margin-bottom: 10px;
}
.collection-nav {
    margin-bottom: 10px;
    margin-left: -10px;
    margin-right: -10px;
}
.navbar {
    overflow: visible;
    margin-bottom: 20px;
}
.navbar .navbar-inner {
    background-image: none;
    box-shadow: none;
    border: 1px solid #f2f2f2;
    height: 50px;
    padding-left: 0;
    padding-right: 0;
}

.collection-nav .navbar-inner {
    background: #fafafa!important;
}


.navbar .nav {
    position: relative;
    left: 0;
    display: block;
    float: left;
    margin: 0 10px 0 0;
}
.nav {
    margin-left: 0;
    margin-bottom: 20px;
  
    list-style: none;
}
li:hover{ 
    /*border:1px solid #333; z-index:0;*/
    background: #fff;
}
ul {
    display: block;
}
.navbar .nav.pull-right {
    float: right;
    margin-right: 0;
}
.navbar .nav>li {
    float: left;
}
.collection-nav .navbar-inner {
    background: #fafafa !important;
}
.collection-nav .nav>li {
    padding: 10px 15px 10px;
    border-right: 1px solid #eee;
    cursor: pointer;
}
.collection-nav {
    margin-bottom: 10px;
    margin-left: -10px;
    margin-right: -10px;
}
.collection-settings {
    border-left: 1px solid #eee;
}
li {
    line-height: 30px;
}

li {
    display: list-item;
    text-align: -webkit-match-parent;
}

</style>