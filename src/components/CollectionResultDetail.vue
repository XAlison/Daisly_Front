<template>
<div class="vv">
        <Row type="flex">
            <Col span="24">
                <Row :gutter="0">
                    <Col span="24">
                        <div style="background-color: #fff; box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15); border: 1px solid #e3e8ee; padding: 10px; margin-bottom: 15px;">
                            <div class="title" style="font-size: 10px; margin-bottom: 10px; height: 30px; line-height: 30px;">今日数据</div>
                            <Row type="flex" justify="space-between" class="code-row-bg" :gutter="16">
                                <Col span="8" >
                                    <div class="sm-st clearfix">
                                        <span class="sm-st-icon st-red"><i class="fa fa-remove"></i></span>
                                        <div class="sm-st-info">
                                            <span>{{statisticInfo.totalFailedCase}}</span>
                                            失败用例
                                        </div>
                                    </div>
                                <!--<span style="display: block; height: 60px; font-size: 40px; margin-top: 18px;"><i>+</i> {{testCaseResultOverViewInfo.totalRunCountToday}}</span>
                                <span style="display: block; font-size: 14px;">今日次数</span>-->
                                </Col>
                                <Col span="8">
                                    <div class="sm-st clearfix">
                                        <span class="sm-st-icon st-green"><i class="fa fa-check"></i></span>
                                        <div class="sm-st-info">
                                            <span>{{statisticInfo.totalSuccessCase}}</span>
                                            成功用例
                                        </div>
                                    </div>
                                </Col>

                                <Col span="8">
                                    <div class="sm-st clearfix">
                                        <span class="sm-st-icon st-blue"><i class="fa fa-navicon"></i></span>
                                        <div class="sm-st-info">
                                            <span>{{statisticInfo.totalCase}}</span>
                                            总用例
                                        </div>
                                    </div>
                                </Col>
                                <!--<Col span="4" style="height: 120px; text-align: center; background: #fff; box-shadow: 1px 1px 5px #888888;border: 1px solid #F5F5F6; width: 18.666667%; overflow:hidden;">
                                <span style="display: block; height: 60px; font-size: 40px; margin-top: 18px;"><i>+</i> {{testCaseResultOverViewInfo.totalFailedRunCount}} </span>
                                <span style="display: block; font-size: 14px;">失败次数</span>
                                </Col>
                                <Col span="4" style="height: 120px; text-align: center; background: #fff; box-shadow: 1px 1px 5px #888888;border: 1px solid #F5F5F6; width: 18.666667%; overflow:hidden;">
                                <span style="display: block; height: 60px; font-size: 40px; margin-top: 18px;"><i>+</i> {{testCaseResultOverViewInfo.totalSuccessRunCount}} </span>
                                <span style="display: block; font-size: 14px;">成功次数</span>
                                </Col>-->
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row>
            <Col span="24">
                <div style="background-color: #fff; box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15); border: 1px solid #e3e8ee; padding: 10px; margin-bottom: 15px;">
                    <div class="title" style="font-size: 10px; margin-bottom: 10px; height: 50px; line-height: 50px;">所有测试用例结果</div>
                    <Row style="margin-bottom: 10px">
                        <Col span="5"> <Input v-model="query" placeholder="请输入测试用例名" style="width: 260px"></Input></Col>
                        <!--<Col span="1"><Button type="ghost" shape="circle" icon="ios-search" >搜索</Button></Col>-->
                    </Row>
                    <Table :context="self" :data="testCaseResultFilter" :columns="tableColumns"></Table>
                </div>
            </Col>
        </Row>
        <!--<Row>
            <Col span="24">
                <div style="background-color: #fff; box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15); border: 1px solid #e3e8ee; padding: 10px; margin-bottom: 15px;">
                    <div class="title" style="font-size: 10px; margin-bottom: 10px; height: 30px; line-height: 30px;">响应时间曲线图</div>
                    <Row >
                        <Col :span="24">
                            <div id="chartLine" style="width:100%; height:400px;"></div>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
         <Row>
            <Col span="24">
                <div style="background-color: #fff; box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15); border: 1px solid #e3e8ee; padding: 10px; margin-bottom: 15px;">
                    <div class="title" style="font-size: 10px; margin-bottom: 10px; height: 30px; line-height: 30px;">结果统计</div>
                    <Row >
                        <Col :span="24">
                            <div id="chartBar" style="width:100%; height:400px;"></div>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>   -->
    </div>
</template>

<script>
    import echarts from 'echarts'
    import {getCollectionResultDetail, getCollectionResultStatistic} from '../api/api'

    export default{
        name: 'statistics',
        data (){
            return {
                self: this,
                query:'',
                // collectionResultDetail: {},
                testCaseResult: [],
                statisticInfo: {},
                responseTimeInfo:{},
                testCaseResultOverViewInfo:{},
                timeSuccessFailedCount:{},
                chartColumn:null,
                chartBar:null,
                chartLine:null,
                chartPie:null,
                 tableColumns: [
                    {
                        type: 'index',
                        align: 'left'
                    },
                    {
                        title: '测试时间',
                        key: 'runDate',
                        align: 'left'
                      
                    },
                    {
                        title: '测试用例名',
                        key: 'testCaseName',
                        align: 'left',
                         render: (h, params) => {
                            return h('Poptip',{
                                props: {
                                        trigger: 'hover',
                                        content: params.row.remarks
                                }},
                                [
                                h('span', params.row.testCaseName),
                                // h('Icon', {
                                //     props: {
                                //         type: 'information-circled'
                                //     },
                                //     style:{
                                //         // color: '#ff9900'
                                //     }
                                // })
                            ]);
                        }
                      
                    },
                    {
                        title: '环境变量',
                        key: 'environmentName',
                        align: 'left'
                      
                    },
                    {
                        title: '断言',
                        key: 'totalAssertions',
                        align: 'left',
                        render: (h, params) => {
                            console.log(params);
                            return h('div',   params.row.successAssertions + '/' + params.row.totalAssertions);
                        }
                      
                    },
                   {
                        title: '运行结果',
                        align: 'left',
                        key: 'isSuccess',
                        filters: [
                            {
                                label: '成功',
                                value: 1
                            },
                            {
                                label: '失败',
                                value: 2
                            }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === 1) {
                                return row.isSuccess === '1';
                            } else if (value === 2) {
                                return row.isSuccess === '0';
                            }
                        },
                        render: (h, params) => {
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
                                            this.goToResultViewer(params.row)
                                        }
                                    }
                                }, '查看')
                            ]);
                        }
                    }
                ]
            }
        },
        computed: {
            collectionResultDetail:{
                 get:function(){
                    return this.$store.state.Collection.currentCollectionResultInfo;
                }
            },
            testCaseResultFilter:{
                get:function(){
                     var filterProjects = this.testCaseResult.filter(item => item.testCaseName.toLowerCase().indexOf(this.query.toLowerCase()) > -1);;
                      return filterProjects
                },
                set:function(newValue){
                    this.projectsPage = newValue;
                }
            },
        },
        methods:{
            createTest(name){
                this.$refs[name].validate((valid)=>{
                    if (valid){
                        this.$router.push('/createtest/'+ this.testInfo.testCaseName);
                    }else{
                        this.$Message.error('测试用例名不能为空');
                    }
                })
            },
            getCollectionResultDetail(){
                let _this = this
                var params = {"collectionResultId": _this.collectionResultDetail.id}
                getCollectionResultDetail(params).then((res)=>{
                     if (res.success == 'FAILED'){
                        _this.$Message.error(res.error.message)
                    }else{
                        _this.testCaseResult = res.data
                    }
                }).catch(()=>{
                    this.$Message.error('网络错误，请稍后再试');
                })
            },
            goToResultViewer(params){
                let _this = this;
                console.log(params);
                //"testCaseName":this.testCase.testCaseName, "testCaseResult":this.testCase, "testCaseRemarks":this.testCase.remarks, 
                var p = {"result": params}
                 this.$store.dispatch('setCurrentTestCaseResultInfo', p);
                var para = {name:'CaseResultViewer',params: {}}
                this.$router.push(para);
                // var p = {"testCaseName":this.testCase.testCaseName, "testCaseResult":this.testCase, "testCaseRemarks":this.testCase.remarks, "result": params}
                // var para = {name:'CaseResultViewer',params: p}
                // this.$router.push(para);
            },
            getCollectionResultStatistic(){
                let _this = this
                var params = {"collectionResultId": _this.collectionResultDetail.id}
                getCollectionResultStatistic(params).then((res)=>{
                     if (res.success == 'FAILED'){
                        _this.$Message.error(res.error.message)
                    }else{
                        _this.statisticInfo = res.data
                    }
                }).catch(()=>{
                    this.$Message.error('网络错误，请稍后再试');
                })
            },
            initChart(){
                //基于准备好的dom，初始化echarts实例
                // this.chartColumn = echarts.init(document.getElementById('chartColumn'));
                this.chartBar = echarts.init(document.getElementById('chartBar'));
                this.chartLine = echarts.init(document.getElementById('chartLine'));
                // this.chartPie = echarts.init(document.getElementById('chartPie'));
                // this.chartColumn.setOption({
                //     title: { text: '' },
                //     tooltip: {},
                //     xAxis: {
                //         data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                //     },
                //     yAxis: {},
                //     series: [{
                //         name: '销量',
                //         type: 'bar',
                //         data: [5, 20, 36, 10, 10, 20]
                //     }]
                // });
            
                this.chartBar.setOption({
                    title: {
                        text: '',
                        subtext: ''
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['运行失败', '运行成功']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis:  {
                        type: 'value'
                    },
                    yAxis: {
                        type: 'category',
                        data: this.timeSuccessFailedCount.runDate
                    },
                    series: [
                        {
                            name: '失败',
                            type: 'bar',
                            stack: '总量',
                            label: {
                            normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: this.timeSuccessFailedCount.failedCount
                        },
                        {
                            name: '成功',
                            type: 'bar',
                            stack: '总量',
                            label: {
                            normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            itemStyle : {  
                                normal : {  
                                    color:'#91c7ae',  
                                    lineStyle:{  
                                        color:'#91c7ae'  
                                    }  
                                }  
                            },  
                            data: this.timeSuccessFailedCount.sucessCount
                        }
                    ]
                });

                this.chartLine.setOption({
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['响应时间']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data:  this.responseTimeInfo.runDate
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name:'响应时间',
                            type:'line',
                            stack: '总量',
                            // itemStyle : {  
                            //     normal : {  
                            //         color:'#61a0a8',  
                            //         lineStyle:{  
                            //             color:'#61a0a8'  
                            //         }  
                            //     }  
                            // },  
                            data: this.responseTimeInfo.responseTime
                        }
                    ]
            });

            // this.chartPie.setOption({
            //     title : {
            //         text: 'Pie Chart',
            //         subtext: '纯属虚构',
            //         x:'center'
            //     },
            //     tooltip : {
            //         trigger: 'item',
            //         formatter: "{a} <br/>{b} : {c} ({d}%)"
            //     },
            //     legend: {
            //         orient: 'vertical',
            //         left: 'left',
            //         data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            //     },
            //     series : [
            //         {
            //             name: '访问来源',
            //             type: 'pie',
            //             radius : '55%',
            //             center: ['50%', '60%'],
            //             data:[
            //                 {value:335, name:'直接访问'},
            //                 {value:310, name:'邮件营销'},
            //                 {value:234, name:'联盟广告'},
            //                 {value:135, name:'视频广告'},
            //                 {value:1548, name:'搜索引擎'}
            //             ],
            //             itemStyle: {
            //                 emphasis: {
            //                     shadowBlur: 10,
            //                     shadowOffsetX: 0,
            //                     shadowColor: 'rgba(0, 0, 0, 0.5)'
            //                 }
            //             }
            //         }
            //     ]
            // });
            }
        },
        mounted:function(){
            var _this=this;
            // _this.collectionResultDetail = _this.$route.params;
            _this.getCollectionResultStatistic();
            _this.getCollectionResultDetail();
        }

    }
</script>

<style lang="less" scoped>
    .sm-st {
        background: #fff;
        padding: 20px;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        border: 1px solid #e3e8ee;
        -webkit-box-shadow: 0 1px 0px rgba(0,0,0,0.05);
        box-shadow: 0 1px 0px rgba(0,0,0,0.05);
    }

    .sm-st{
        .st-red {
            background-color: #F05050;
        }
        .st-green {
            background-color: #27C24C;
        }
        .st-blue {
            background-color: #23b7e5;
        }
    }
  

    .sm-st-icon {
        width: 60px;
        height: 60px;
        display: inline-block;
        line-height: 60px;
        text-align: center;
        font-size: 30px;
        background: #eee;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        float: left;
        margin-right: 10px;
        color: #fff;
    }

    .sm-st-info {
        font-size: 12px;
        padding-top: 2px;
    }
    
    .sm-st-info{
        span {
            display: block;
            font-size: 24px;
            font-weight: 600;
        }
    } 

    .chart {
        width: 100%;
        float: left;
    }
    /*.chart div {
        height: 400px;
        float: left;
    }*/
    
    .Col {
        padding: 30px 20px;
    }

    .bg-gray {
        color: #d3dce6;
    }
</style>