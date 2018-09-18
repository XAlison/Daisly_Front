<template>
    <section style="width:100%">
          <div class="message-wrapper sort current" >
            <a name="343d1fe8-9d37-4d02-8dbc-b639c85a5cca"></a>
            <table class="table table-condensed message-list" @click="toggleClick">
              <tbody>
                <tr>
                    <td class="toggler host detail-toggle" rowspan="1">
                        <a class="margin-left-4" v-show="!isToggle"><Icon class = "margin-top-6" type="arrow-right-b"></Icon></Icon></a>
                        <a class="margin-left-4" v-show="isToggle"><Icon class = "margin-top-6" type="arrow-down-b"></Icon></Icon></a>
                        <!--<a href="#" class="toggle-arrow icon-caret-down"></a>-->
                        <!--<i class="hide icon-reorder i"></i>-->
                     </td>
                     <td class="host detail-toggle">{{requestResult.api}}</td>
                     <td class="note detail-toggle">
                     </td>
                    <td class="test-detail-cell status detail-toggle">
                        <Icon type="record" class="ok" v-if="requestResult.statusCode == '200'"></Icon>
                        <Icon type="record" class="red" v-if="requestResult.statusCode != '200'"></Icon>
                        <span class="status_code" title="OK">{{requestResult.statusCode}}</span>
                    </td>
                    <td class="test-detail-cell times detail-toggle" title="Response time">
                        <Icon type="ios-timer" class="icon-time warning"></Icon>
                            {{requestResult.responseTime}} ms
                        </td>   
                    <td class="test-detail-cell detail-toggle result-tools text-right">
                    </td>
                </tr>
                <tr>
                    <td class="detail-toggle" rowspan="2" >
                        &nbsp;
                    </td>
                    <td class="path detail-toggle" colspan="2">
                        <span class="method"><strong>{{requestResult.requestType}}</strong></span>      <span class="absolute-path">/</span><span class="querystring"></span><span class="hash"></span>
                    </td>
	  	            <td class="detail-toggle" ></td>
                    <td class="test-detail-cell sizes detail-toggle" title="Response size">
                        <Icon type="code-download"></Icon> {{requestResult.bodySize}} bytes
                    </td>
                </tr>
              </tbody>
            </table>
            <div class="detail-toggle result-details" @click="toggleClick">
                <div class="variables-detail">
                </div>
                  <div class="assertions-detail">
                    <p class="dashboard-label margin-0">Assertions</p>
                    <div class="assertion-row" v-for="item in requestResult.assertions">
                        <p  v-if = "item.isSuccess !== '1'" class="assertion-error"><i class="red"><strong><Icon type="close"></Icon></strong></i>&nbsp;{{item.name}}— {{item.failedReason}}
                        </p>
                        <p  v-if = "item.isSuccess === '1'" class="assertion-error"><i class="ok"><strong><Icon type="checkmark"></Icon></strong></i>&nbsp;{{item.name}}
                        </p>
                    </div>
                </div>
                <div id="extractors-result-343d1fe8-9d37-4d02-8dbc-b639c85a5cca" class="extractors-detail">
                </div>
                <div class="scripts-detail">
                </div>
            </div>
            <div class="message-detail" style="display: block;" v-show="isToggle">
                <div class="row-fluid margin-bottom-10">
                    <div class="view-toggle">
                        <a class="title  test-detail-view-toggle" @click="clickRequest">Request</a>
                        <a class="title test-detail-view-toggle active"　@click="clickResponse">Response</a>
                           </div>
                    <div class="request-detail hide" v-show="isRequest">
                        <div class="row-fluid">
                            <div class="span6">
                                <h5>HEADERS</h5>
                                <p class="keypair" v-for="item in requestResult.headers"><strong>{{item.key}}:</strong> {{item.value}}</p>
                            </div>
    	                    <div class="span6">
                            </div>
	                    </div>
                        <div class="row-fluid">
                        </div>
                    </div>
                    <div class="response-detail" style="display: block;" v-show="isResponse">
                        <div class="row-fluid">
                            <h5>Headers</h5>
                            <p class="keypair" v-for="item in requestResult.headers"><strong>{{item.key}}:</strong> {{item.value}}</p>
                        </div>
                        <div class="row-fluid">
                            <h5>BODY <a @click="viewerToggle" v-if="isViewToggle" class="pull-right">View formatted</a><a v-show="!isViewToggle" @click="viewerToggle" class="pull-right">View Raw</a></h5>
                            <pre v-show="isViewToggle">{{requestResult.body}}</pre>
                            <editor v-show="!isViewToggle" :content="requestResult.body" :lang="requestResult.bodyType"></editor>
                        </div>
                    </div>
                </div>
          </div>
        </div>
    </section>
</template>
<script>
    import editor from 'vue-brace'
    import 'brace/mode/html'
    import 'brace/mode/xml'
    import 'brace/mode/json'
    import 'brace/theme/github'
    import {mapGetters} from 'vuex';
    import {mapActions} from 'vuex';
    export default {
        components: {
            editor
        },
        data () {
            return {
                theme: 'github',
                isRequest: true,
                isResponse: false,
                isToggle:false,
                isViewToggle:false
            }
        },
         props:{
            requestResult:Object,
        },
        computed: {
           
        },
        methods: {
            viewerToggle(){
                this.isViewToggle = !this.isViewToggle;
            },
            toggleClick(){
                this.isToggle = !this.isToggle;
            },
            clickRequest(){
                this.isRequest = true;
                this.isResponse = false;
            },
            clickResponse(){
                this.isRequest = false;
                this.isResponse = true;
            }
        },
        mounted() {
        }
    }
</script>

<style style="less" scoped>

    pre, code, pre code {
    color: #333;
    border: none;
    background-color: rgba(169,182,189,0.04);
    border-radius: 4px;
    border: 1px solid rgba(169,182,189,0.4);
    padding: 8px 14px;
    font-size: 11.9px;
    font-family: Menlo,Consolas,"Courier New",monospace;
    overflow: auto;
    white-space: pre;
    word-wrap: normal;
    }

    .bg-gray {
        color: #f00;
    }
    .message-list .ok, .message-output .ok, .message-list .times .icon-time.ok, .message-rollup .ok, .message-rollup .times .icon-time.ok, .icon-circle.ok, .ok {
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
    .red{
        color: #f00;
    }
    .pull-right{
        float: right;
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
    width: 20px;
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