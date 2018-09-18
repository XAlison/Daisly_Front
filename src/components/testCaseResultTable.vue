<template>
    <div>
        <Affix>
        <Row style="margin-bottom: 20px" class="sticky">
            <h1>{{testCase.testCaseName}}</h1>
            <h4>按时间顺序显示最近100次的运行结果</h4>
        </Row>
        </Affix>
        <Table :context="self" :data="tableData" :columns="tableColumns"></Table>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex';
    import {mapActions} from 'vuex';
    import { getCaseResult } from '../api/api';
    export default {
        data () {
            return {
                self: this,
                visible:false,
                query: '',
                row: '',
                // testCase: {},
                pagesData:[],
                tableData: [],
                page: 1,
                pageDataNum: 10,
                filter: {
                    name:''
                },
                formItem: {
                    id: '',
                    projectName: '',
                    remarks: ''
                },
                ruleValidate: {
                    projectName: [
                        { required: true, message: '项目名不能为空', trigger: 'blur' }
                    ]
                },
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
                        title: '来源',
                        key: 'collectionName',
                        align: 'left',
                        render: (h, params) => {
                            if (params.row.collectionName === null){
                                return h('div', '面板');
                            }else{
                                return h('div', '测试集-' + params.row.collectionName);
                            }
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
            testCase:{
                get:function(){
                    return this.$store.state.TestCase.currentTestCaseInfo;
                }
            }

        },
        methods: {
            add(){
                this.visible = true;
                this.formItem.id = '';
                this.formItem.projectName = '';
                this.formItem.remarks = '';
            },
            goToResultViewer(params){
                let _this = this;
                //"testCaseName":this.testCase.testCaseName, "testCaseResult":this.testCase, "testCaseRemarks":this.testCase.remarks, 
                var p = {"result": params}
                var para = {name:'CaseResultViewer',params: {}}
                this.$store.dispatch('setCurrentTestCaseResultInfo', p);
                this.$router.push(para);
            },
            getCaseResults(){
                this.$Loading.start();
                var params = {"testCaseId":this.testCase.id}                
                getCaseResult(params).then((res)=>{
                    this.$Loading.finish();
                    if (res.success == 'FAILED'){
                            this.$Message.error(res.error.message)
                    }else{
                            this.tableData = res.data;
                    }
                }).catch(()=>{
                    this.$Message.info('网络错误，请稍后再试');
                })
            }
        },
        mounted() {
            let _this = this;
            _this.getCaseResults();
        }
    }
</script>

<style scoped>
h1, h4 {
  font-weight: normal;
}
.bg-gray {
    color: #f00;
}

.sticky {
    /*position: absolute;*/
    top: 0;
    /*left: 241px;*/
    right: 0;
    background-color: #fff;
    /*border-top: 1px solid #eee;*/
    /*border-bottom: 1px solid #c6ced3;*/
    box-shadow: 0 0px 0px 0 rgba(0,0,0,0.06);
    padding-left: 0;
    padding-right: 0;
    margin-left: 0;
    margin-right: 1px;
    z-index: 0;
}
</style>