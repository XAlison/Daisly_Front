<template>
<div class="vv">
        <Row type="flex">
            <Col span="24">
                <Row :gutter="0">
                    <Col span="24">
                        <div style="background-color: #fff; box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15); border: 1px solid #e3e8ee; padding: 10px; margin-bottom: 15px;">
                            <div class="title" style="font-size: 10px; margin-bottom: 10px; height: 30px; line-height: 30px;">今日数据</div>
                            <Row  :gutter="16">
                                <Col span="6">
                                     <div class="sm-st clearfix">
                                        <span class="sm-st-icon st-blue"><i class="fa fa-align-justify"></i></span>
                                        <div class="sm-st-info">
                                            <span>{{testCaseResultOverViewInfo.totalRunCountToday}}</span>
                                            今日次数
                                        </div>
                                    </div>
                                </Col>
                                <Col span="6">
                                    <div class="sm-st clearfix">
                                        <span class="sm-st-icon st-violet"><i class="fa fa-list"></i></span>
                                        <div class="sm-st-info">
                                            <span>{{testCaseResultOverViewInfo.totalRunCount}}</span>
                                            运行次数
                                        </div>
                                    </div>
                                </Col>
                                <Col span="6">
                                    <div class="sm-st clearfix">
                                        <span class="sm-st-icon st-red"><i class="fa fa-remove"></i></span>
                                        <div class="sm-st-info">
                                            <span>{{testCaseResultOverViewInfo.totalFailedRunCount}}</span>
                                            失败次数
                                        </div>
                                    </div>
                                </Col>
                                <Col span="6">
                                     <div class="sm-st clearfix">
                                        <span class="sm-st-icon st-green"><i class="fa fa-check"></i></span>
                                        <div class="sm-st-info">
                                            <span>{{testCaseResultOverViewInfo.totalSuccessRunCount}}</span>
                                            成功次数
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row>
            <Col span="24">
                <div style="background-color: #fff; box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15); border: 1px solid #e3e8ee; padding: 10px; margin-bottom: 15px;">
                    <div class="title" style="font-size: 10px; margin-bottom: 10px; height: 30px; line-height: 30px;">响应时间曲线图(ms)</div>
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
                            <div id="chartColumn" style="width:100%; height:400px;"></div>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>   
    </div>
</template>

<script>
    import echarts from 'echarts'
    import {getTestCaseStatistic} from '../api/api'

    export default{
        name: 'statistics',
        data (){
            return {
                testInfo:{
                    testCaseName:''
                },
                // testCase: {},
                responseTimeInfo:{},
                testCaseResultOverViewInfo:{},
                timeSuccessFailedCount:{},
                chartColumn:null,
                chartBar:null,
                chartLine:null,
                chartPie:null
            }
        },
        computed: {
            testCase:{
                get:function(){
                    return this.$store.state.TestCase.currentTestCaseInfo;
                }
            }

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
            getTestCaseStatistic(){
                var params = {"testCaseId": this.testCase.id}
                getTestCaseStatistic(params).then((res)=>{                  
                    if (res.success == 'FAILED'){
                        this.$Message.error(res.error.message);
                    }else{
                        this.responseTimeInfo = res.data.responseTimeInfo;
                        this.testCaseResultOverViewInfo = res.data.testCaseResultOverViewInfo;
                        this.timeSuccessFailedCount = res.data.timeSuccessFailedCount;
                        this.initChart();
                    }
                }).catch(()=>{

                })
            },
            initChart(){
                //基于准备好的dom，初始化echarts实例
                this.chartColumn = echarts.init(document.getElementById('chartColumn'));
                // this.chartBar = echarts.init(document.getElementById('chartBar'));
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
                this.chartColumn.setOption({
                    title : {
                        text: '',
                        subtext: ''
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['运行成功','运行失败']
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            data : this.timeSuccessFailedCount.runDate
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'运行成功',
                            type:'bar',
                            data:this.timeSuccessFailedCount.sucessCount,
                            itemStyle : {  
                                normal : {  
                                    color:'#91c7ae',  
                                    lineStyle:{  
                                        color:'#91c7ae'  
                                    }  
                                }
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name:'运行失败',
                            type:'bar',
                            data:this.timeSuccessFailedCount.failedCount,
                            itemStyle : {  
                                normal : {  
                                    color:'#f00',  
                                    lineStyle:{  
                                        color:'#f00'  
                                    }  
                                }
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name : '平均值'}
                                ]
                            }
                        }
                    ]
                });
                // this.chartBar.setOption({
                //     title: {
                //         text: '',
                //         subtext: ''
                //     },
                //     tooltip : {
                //         trigger: 'axis',
                //         axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                //         type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                //         }
                //     },
                //     legend: {
                //         data: ['运行失败', '运行成功']
                //     },
                //     grid: {
                //         left: '3%',
                //         right: '4%',
                //         bottom: '3%',
                //         containLabel: true
                //     },
                //     xAxis:  {
                //         type: 'value'
                //     },
                //     yAxis: {
                //         type: 'category',
                //         data: this.timeSuccessFailedCount.runDate
                //     },
                //     series: [
                //         {
                //             name: '失败',
                //             type: 'bar',
                //             stack: '总量',
                //             label: {
                //             normal: {
                //                     show: true,
                //                     position: 'insideRight'
                //                 }
                //             },
                //             data: this.timeSuccessFailedCount.failedCount
                //         },
                //         {
                //             name: '成功',
                //             type: 'bar',
                //             stack: '总量',
                //             label: {
                //             normal: {
                //                     show: true,
                //                     position: 'insideRight'
                //                 }
                //             },
                //             itemStyle : {  
                //                 normal : {  
                //                     color:'#91c7ae',  
                //                     lineStyle:{  
                //                         color:'#91c7ae'  
                //                     }  
                //                 }  
                //             },  
                //             data: this.timeSuccessFailedCount.sucessCount
                //         }
                //     ]
                // });

                this.chartLine.setOption({
                    title: {
                        text: ''
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
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
            // _this.testCase = _this.$route.params;
            _this.getTestCaseStatistic();
        }

    }
</script>
<style  lang="less" scoped>
    .sm-st {
        background: #fff;
        padding: 20px;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        border: 1px solid #e3e8ee;
        // margin-bottom: 20px;
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
        .st-violet {
            background-color: #7266ba;
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