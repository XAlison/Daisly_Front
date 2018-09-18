<template>

    <section style="width:100%">
        <!--<Affix class="sticky">-->
        <h1 class="margin-bottom-20px"> {{result.testCaseName}} </h1>
        <h4 class="margin-bottom-20px"> {{result.testCaseRemarks}} </h4>
        <Affix>
        <div class="sticky test-toolbar test-toolbar-result">
            <div class="toolbar-contents-left">
                <span class="margin-right-20">
                    <!--<span class="dashboard-label margin-right-4 hide">
                        Status
                    </span>-->
                    <span class="dashboard-label margin-right-4">
                        结果
                    </span>
                    <span v-if='result.isSuccess === "0"'>
                        <i class="margin-right-4 red"><strong><Icon type="close"></Icon></strong></i>
                        <strong><span>失败</span></strong>
                    </span>
                    <span v-if='result.isSuccess === "1"'>
                        <i class="margin-right-4 success"><strong><Icon type="checkmark"></Icon></strong></i>
                        <strong><span>成功</span></strong>
                    </span>
                    <span class="margin-left-20" style="float:right">
                        <span class="dashboard-label margin-right-4">
                            运行
                        </span>
                        <span>{{result.runDate}}</span>
                        <span v-if="result.collectionName == null">
                        通过 <span>面板运行</span>
                        </span>
                        <span v-if="result.collectionName != null">
                        通过 <span>集合({{result.collectionName}})运行</span>
                        </span>
                    </span>
                </span>
            </div>
            <div class="toolbar-contents-right">
                <a class="margin-right-20" @click='editTest' ><i><Icon type="android-create"></Icon></i> 编辑测试</a>
                <a @click='reRun' ><i><Icon type="ios-redo"></Icon></i> 再次运行</a>
            </div>
            <div class="toolbar-contents-left span6">
                <span class="dashboard-label margin-right-4">
                    详情
                </span>
                <span>
                    总共<strong>{{result.totalAssertions}}</strong> <span data-bind="pluralize: totalErrors">个断言</span>
                </span>
                <span>— 
                    <span>
                        成功<strong>{{result.successAssertions}}</strong>个断言
                    </span>
                </span>
            </div>
            <!--<div class="toolbar-contents span12">
                <div class="test-result-progress">
                </div>
                <div class="test-progress-row">
                </div>-->
            <!-- ko foreach: statusBarList -->
                <!--<div class="cursor-pointer test-progress-bar test-progress-bar-danger"><span class="cursor-pointer test-progress-bar-selector"></span></div>
            
                <div class="cursor-pointer test-progress-bar test-progress-bar-success"><span class="cursor-pointer test-progress-bar-selector"></span></div>
            
                <div class="cursor-pointer test-progress-bar test-progress-bar-danger"><span class="cursor-pointer test-progress-bar-selector"></span></div>-->
            <!-- /ko -->
          </div>
          </Affix>
          <ResultCollapse  v-for="item in caseResultDetail"  :requestResult='item' ></ResultCollapse>
          </div>
        </div>
    </section>
</template>
<script>
    import {mapGetters} from 'vuex';
    import {mapActions} from 'vuex';
    import ResultCollapse from './resultcollapse.vue';
    import {getResultDetail, reRunTestCase} from '../api/api';
    export default {
        components: {
            ResultCollapse
        },
        data () {
            return {
                isRequest: true,
                isResponse: false,
                isToggle:true,
                result: {},
                // caseResult: {},
                caseResultDetail: [],
            }
        },
        computed: {
          
            caseResult:{
                get:function(){
                    return this.$store.state.TestCase.currentTestCaseResultInfo;
                }
            }
            
        },
        methods: {
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
                        para.params = {"testCaseId":_this.result.testCaseId,"testCaseName":_this.result.testCaseName};
                        this.$router.push(para);
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
            editTest(){
                let _this = this;
                var para = {name:'CreateTestDetail',params: {}}
                var createTestInfo = {"id":this.result.testCaseId, "testCaseName":this.result.testCaseName, "remarks":this.result.testCaseRemarks }
                para.params = createTestInfo;
                this.$router.push(para);
            },
            getResultDetailList(){
                var params = {'testCaseResultId':this.caseResult.result.id};
                getResultDetail(params).then((res)=>{
                    if (res.success == 'FAILED'){
                        this.$Message.error(res.error.message)
                    }else{
                        console.log(res)
                        this.caseResultDetail = res.data;
                    }
                }).catch(()=>{
                    this.$Message.error("网络错误");
                });
            }
        },
        mounted() {
            // this.caseResult = this.$route.params;
            this.result = this.caseResult.result;
            this.getResultDetailList();

        }
    }
</script>

<style style="less" scoped>
    .sticky {
    top: 0;
    right: 0;
    background-color: #fff;
    border-top: 0px solid #eee;
    border-bottom: 0px solid #c6ced3;
    box-shadow: 0 0px 0px 0 rgba(0,0,0,0.06);
    padding-left: 0;
    padding-right: 0;
    margin-left: 0;
    margin-right: 1px;
    z-index: 1040;
    }
    .bg-gray {
        color: #f00;
    }
    .message-list .ok, .message-output .ok, .message-list .times .icon-time.ok, .message-rollup .ok, .message-rollup .times .icon-time.ok, .icon-circle.ok {
        color: #2ecc71;
    }
    .success{
        color: #2ecc71;
    }
    div {
        display: block;
    }
    h1, h4 {
        font-weight: normal;
    }
    .test-toolbar-result .toolbar-contents-left{
        height: 26px;
    }
    .test-toolbar-result .toolbar-contents-right{
        &:extend(.test-toolbar-result .toolbar-contents-left)
    }
    test-toolbar .toolbar-contents-left {
        padding-left: 20px;
        float: left;
    }
    .margin-right-20 {
        margin-right: 20px;
    }
    .margin-left-20 {
        margin-left: 20px;
    }
    .margin-left-4 {
        margin-left: 4px;
    }
    .margin-right-4{
        margin-right: 4px;   
    }
    .margin-bottom-20px{
        margin-bottom: 20px; 
    }
    .test-toolbar .toolbar-contents-left .red, .test-toolbar .toolbar-contents-right .red {
        color: #f00;
    }
    .dashboard-label, .nav-header {
        font-size: 12px;
        font-weight: 600;
        letter-spacing: .5px;
        line-height: 20px;
        text-transform: uppercase;
        color: #afbbc1;
        text-shadow: none;
        text-rendering: optimizelegibility;
        -webkit-font-smoothing: antialiased;
    }
    span{
        display: inline-block;
    }
    .test-toolbar .toolbar-contents-right {
        padding-right: 20px;
        float: right;
    }
    a{
        color: #00a0e9;
    }
    .test-progress-bar.test-progress-bar-danger, .test-result-bar.test-progress-bar-danger, .test-progress-bar.test-result-bar-failed, .test-result-bar.test-result-bar-failed {
        background-color: #c00;
        cursor: pointer;
    }
    .test-progress-row, .test-results-row {
        display: table-row;
        width: 100%;
    }
    .test-result-progress {
        padding-top: 10px;
        height: 24px;
        margin-bottom: 10px;
    }
    .test-progress-bar.test-progress-bar-success, .test-result-bar.test-progress-bar-success, .test-progress-bar.test-result-bar-passed, .test-result-bar.test-result-bar-passed {
        background-color: #2ecc71;
        cursor: pointer;
    }
    .test-progress-bar-selector, .test-result-bar-selector {
        position: absolute;
        margin-top: -16px;
        margin-left: -5px;
        font-size: 16px;
        color: #a9b6bd;
        opacity: 0;
    }
    .clickable, .cursor-pointer {
        cursor: pointer;
    }
    .test-progress-bar, .test-result-bar {
        box-shadow: none;
        background-color: #eee;
        border-right: 1px solid white;
        width: auto;
        display: table-cell;
        width: 100%;
        cursor: default;
        text-align: center;
        border-top: 10px solid #fff;
        border-bottom: 11px solid #fff;
    }
    .message-list, .message-rollup {
    table-layout: fixed;
    margin-bottom: 0;
    }
    tr {
        display: table-row;
        vertical-align: inherit;
        border-color: inherit;
    }
    td.note, div.note-box {
    color: #a9b6bd;
    }
/*.table th, .table td {
    padding: 8px;
    line-height: 20px;
    text-align: left;
    vertical-align: top;
    border-top: 1px solid #ddd;
}*/
tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
}
.table {
    width: 100%;
    margin-bottom: 20px;
}
table {
    max-width: 100%;
    background-color: transparent;
    border-collapse: collapse;
    border-spacing: 0;
}
user agent stylesheet
table {
    display: table;
    border-collapse: separate;
    border-spacing: 2px;
    border-color: grey;
}
.message-list .host, .message-rollup .host {
    max-width: 735px;
}
.message-list tr:first-child td {
    padding-top: 6px;
}
.message-list td, .message-rollup td {
    border: none;
    overflow: hidden;
    white-space: nowrap;
    font-size: 14px;
}
.message-list .toggler {
    width: 16px;
}
.margin-top-6{
    margin-top: 4px;
}

.message-wrapper .detail-toggle {
    cursor: pointer;
}

.message-wrapper.selected, .message-wrapper.current {
    border-left-color: #1B70E0;
    border-top: 1px solid #ccd3d8;
    border-right: 1px solid #ccd3d8;
    border-bottom: 1px solid #ccd3d8;
    -webkit-box-shadow: 0 1px 3px 0 rgba(0,0,0,0.06);
    -moz-box-shadow: 0 1px 3px 0 rgba(0,0,0,0.06);
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.06);
}
.message-wrapper {
    position: relative;
    margin-top: 10px;
    border-top: 1px solid #ebebeb;
    border-right: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
    border-left: 2px solid #a9b6bd;
    border-radius: 4px;
    background-color: #fff;
    -webkit-box-shadow: 0 1px 3px 0 rgba(0,0,0,0.02);
    -moz-box-shadow: 0 1px 3px 0 rgba(0,0,0,0.02);
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.02);
    overflow: auto;
    -webkit-transition: border 80ms ease;
    -moz-transition: border 80ms ease;
    -ms-transition: border 80ms ease;
    -o-transition: border 80ms ease;
    transition: border 80ms ease;
}
.message-list .warning, .message-output .warning, .message-list .times .icon-time.warning, .message-rollup .warning, .message-rollup .times .icon-time.warning, .icon-circle.warning {
    color: #f89406;
}
.result-details {
    padding-left: 30px;
    padding-right: 20px;
}
.assertions-detail, .extractors-detail, .scripts-detail, .response-detail, .request-detail, .connection-detail {
    clear: left;
}
.assertions-detail, .extractors-detail, .inbound-url-detail, .scripts-detail {
    margin: 10px 0;
}
.margin-0 {
    margin: 0;
}
.message-detail {
    padding: 20px 30px;
}
.diff-container .view-toggle, .message-detail .view-toggle {
    margin: -10px auto 0;
    display: inline-block;
}

.diff-container .view-toggle .title, .message-detail .view-toggle .title {
    text-align: center;
    display: inline-block;
    padding: 7px 10px;
    margin: 0 20px 0 -9px;
}
.margin-bottom-10 {
    margin-bottom: 10px;
}
</style>