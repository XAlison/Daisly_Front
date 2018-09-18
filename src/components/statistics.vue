<template>
<div class="vv">
        <Row type="flex">
            <Col span="24">
                <Row :gutter="100">
                    <Col span="20">
                        <div class="info-title">
                            <div class="pull-left">
                                <h4><strong>Administrator，</strong></h4>
                                <p>欢迎登录管理系统！</p>
                            </div>

                            <div class="pull-right" style="margin-left: 30px;">
                                <div>登陆时间：2017-04-09 15:23:22</div>
                                <div>登陆IP：127.0.0.1</div>
                                <div>浏览器：chorme</div>
                            </div>

                            <div class="pull-right" style="margin-left: 30px;">
                                <div>用户组：商家组</div>
                                <div>有效期至：2019-10-11</div>
                            </div>
                        </div>

                        <div style="background-color: #fff; box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15); border: 1px solid #e3e8ee; padding: 10px; margin-bottom: 15px;">
                            <div class="title" style="font-size: 18px; margin-bottom: 10px; height: 50px; line-height: 50px;">今日数据</div>

                            <Row type="flex" justify="space-between" class="code-row-bg">
                                <Col span="4" style="height: 120px; text-align: center; background: #fff; border: 1px solid #F5F5F6; box-shadow: 1px 1px 5px #888888;width: 18.666667%; overflow:hidden;">
                                <span style="display: block; height: 60px; font-size: 40px; margin-top: 18px;"><i>+</i> 110</span>
                                <span style="display: block; font-size: 14px;">总项目数</span>
                                </Col>
                                <Col span="4" style="height: 120px; text-align: center; background: #fff; border: 1px solid #F5F5F6; box-shadow: 1px 1px 5px #888888;width: 18.666667%; overflow:hidden;">
                                <span style="display: block; height: 60px; font-size: 40px; margin-top: 18px;"><i>+</i> 110</span>
                                <span style="display: block; font-size: 14px;">新增项目数</span>
                                </Col>
                                <Col span="4" style="height: 120px; text-align: center; background: #fff; border: 1px solid #F5F5F6; box-shadow: 1px 1px 5px #888888;width: 18.666667%; overflow:hidden;">
                                <span style="display: block; height: 60px; font-size: 40px; margin-top: 18px;"><i>+</i> 110</span>
                                <span style="display: block; font-size: 14px;">总测试用例数</span>
                                </Col>
                                <Col span="4" style="height: 120px; text-align: center; background: #fff; border: 1px solid #F5F5F6; box-shadow: 1px 1px 5px #888888;width: 18.666667%; overflow:hidden;">
                                <span style="display: block; height: 60px; font-size: 40px; margin-top: 18px;"><i>+</i> 110</span>
                                <span style="display: block; font-size: 14px;">新增测试用例数</span>
                                </Col>
                                <Col span="4" style="height: 120px; text-align: center; background: #fff; border: 1px solid #F5F5F6; box-shadow: 1px 1px 5px #888888;width: 18.666667%; overflow:hidden;">
                                <span style="display: block; height: 60px; font-size: 40px; margin-top: 18px;"><i>+</i> 110</span>
                                <span style="display: block; font-size: 14px;">总失败次数</span>
                                </Col>
                            </Row>
                        </div>

                    </Col>

                    <Col span="4">
                        <Card dis-hover>
                            <p slot="title">今日任务</p>
                            <p>任务1</p>
                            <p>任务2</p>
                            <p>任务3</p>
                            <p>
                                <router-link to="/test" style="color: #000;">测试路由</router-link>
                            </p>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row>
            <Col :span="24">
                <div id="chartColumn" style="width:100%; height:400px;"></div>
            </Col>
            <!--<Col :span="24">
                <div id="chartBar" style="width:100%; height:400px;"></div>
            </Col>
            <Col :span="24">
                <div id="chartLine" style="width:100%; height:400px;"></div>
            </Col>
            <Col :span="24">
                <div id="chartPie" style="width:100%; height:400px;"></div>
            </Col>-->
        </Row>
    </div>
</template>

<script>
    import echarts from 'echarts'
    
    export default{
        name: 'statistics',
        data (){
            return {
                chartColumn:null,
                chartBar:null,
                chartLine:null,
                chartPie:null
            }
        },
        mounted:function(){
            var _this=this;
            //基于准备好的dom，初始化echarts实例
            this.chartColumn = echarts.init(document.getElementById('chartColumn'));
            // this.chartBar = echarts.init(document.getElementById('chartBar'));
            // this.chartLine = echarts.init(document.getElementById('chartLine'));
            // this.chartPie = echarts.init(document.getElementById('chartPie'));
            
            this.chartColumn.setOption({
                title: { text: 'Column Chart' },
                tooltip: {},
                xAxis: {
                    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
            
            this.chartBar.setOption({
                title: {
                    text: 'Bar Chart',
                    subtext: '数据来自网络'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['2011年', '2012年']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: ['巴西','印尼','美国','印度','中国','世界人口(万)']
                },
                series: [
                    {
                        name: '2011年',
                        type: 'bar',
                        data: [18203, 23489, 29034, 104970, 131744, 630230]
                    },
                    {
                        name: '2012年',
                        type: 'bar',
                        data: [19325, 23438, 31000, 121594, 134141, 681807]
                    }
                ]
            });

            this.chartLine.setOption({
                title: {
                    text: 'Line Chart'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['邮件营销','联盟广告','搜索引擎']
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
                    data: ['周一','周二','周三','周四','周五','周六','周日']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'邮件营销',
                        type:'line',
                        stack: '总量',
                        data:[120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name:'联盟广告',
                        type:'line',
                        stack: '总量',
                        data:[220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name:'搜索引擎',
                        type:'line',
                        stack: '总量',
                        data:[820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]
            });

            this.chartPie.setOption({
                title : {
                    text: 'Pie Chart',
                    subtext: '纯属虚构',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                },
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[
                            {value:335, name:'直接访问'},
                            {value:310, name:'邮件营销'},
                            {value:234, name:'联盟广告'},
                            {value:135, name:'视频广告'},
                            {value:1548, name:'搜索引擎'}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            });
        }

    }
</script>

<style src="../assets/less/common/main.less" lang="less" scoped>
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

    .vv {
        width: 500px;
    }
</style>