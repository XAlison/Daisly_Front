<template>
    <div>
        <Affix>
        <Row style="margin-bottom: 20px" class="sticky">
            <h1>测试集-{{collectionInfo.collectionName}}</h1>
            <h4>按时间顺序显示最近100次的运行结果</h4>
        </Row>
        </Affix>
        <Table :context="self" :data="tableData" :columns="tableColumns"></Table>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex';
    import {mapActions} from 'vuex';
    import { getCollectionResult } from '../api/api';
    export default {
        data () {
            return {
                self: this,
                visible:false,
                query: '',
                row: '',
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
                        title: '成功率',
                        key: 'totalAssertions',
                        align: 'left',
                        render: (h, params) => {
                            console.log(params);
                            return h('div',   params.row.totalSuccessTestCaseNum + '/' + (params.row.totalSuccessTestCaseNum + params.row.totalFailedTestCaseNum));
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
            collectionInfo:{
                 get:function(){
                    return this.$store.state.Collection.currentCollectionInfo;
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
                console.log(params);
                var p = params
                var para = {name:'CollectionResultDetail',params: p}
                this.$store.dispatch('setCurrentCollectionResultInfo', params);
                this.$router.push(para);
            },
            getCollectionResults(){
                var para = {'collectionId': this.collectionInfo.id};
                this.$Loading.start();                
                getCollectionResult(para).then((res)=>{
                    this.$Loading.finish();
                    if (res.success == 'FAILED'){
                            this.$Message.error(res.error.message)
                        }else{
                            console.log(res.data)
                            this.tableData = res.data;
                    }
                }).catch(()=>{
                    this.$Message.info('网络错误，请稍后再试');
                })
            }
        },
        mounted() {
            let _this = this;
            _this.getCollectionResults();
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
    top: 0;
    right: 0;
    background-color: #fff;
    box-shadow: 0 0px 0px 0 rgba(0,0,0,0.06);
    padding-left: 0;
    padding-right: 0;
    margin-left: 0;
    margin-right: 1px;
    z-index: 9999;
}
</style>