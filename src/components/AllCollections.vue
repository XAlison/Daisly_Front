<template>
    <div>
        <Row style="margin-bottom: 10px">
            <Col span="5"> <Input v-model="query" placeholder="请输入测试集合名" style="width: 260px"></Input></Col>
            <Col span="1" style="margin-left: 60px"><Button type="ghost" shape="circle" icon="ios-search" >搜索</Button></Col>
            <Col span="1" style="margin-left: 60px"><Button type="ghost" shape="circle" icon="android-add" @click="add" >新建</Button></Col>
        </Row>
        <Table :context="self" :data="testCasesPage" :columns="tableColumns"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="total" :current="page" :page-size="pageDataNum" @on-change="changePage" show-total></Page>
            </div>
        </div>
    　　<div>
            <Modal
            v-model="visible"
            :title="title"
            @on-ok="ok"
            @on-cancel="cancel">
            <Form :model="formItem" :label-width="90" :rules="ruleValidate" ref="formValidate">
                <Form-item label="测试用例名"　prop="testCaseName">
                    <Input v-model="formItem.testCaseName" placeholder="请输入报告名"></Input>
                </Form-item>
                <Form-item label="描述">
                    <Input v-model="formItem.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请简单描述"></Input>
                </Form-item>
            </Form>
            </Modal>
       </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex';
    import {mapActions} from 'vuex';
    import { getAllCollections } from '../api/api';
    export default {
        data () {
            return {
                self: this,
                visible:false,
                title: '新建测试用例',
                query: '',
                row: '',
                pagesData:[],
                tableData: [],
                // collections: [],
                page: 1,
                pageDataNum: 20,
                filter: {
                    name:''
                },
                formItem: {
                    id: '',
                    testCaseName: '',
                    remarks: ''
                },
                ruleValidate: {
                    testCaseName: [
                        { required: true, message: '测试用例名不能为空', trigger: 'blur' }
                    ]
                },
                tableColumns: [
                    {
                        type: 'index',
                        align: 'left'
                    },
                    {
                        title: '测试集合名',
                        key: 'testCaseName',
                        align: 'left',
                         render: (h, params) => {
                            return h('Poptip',{
                                props: {
                                        trigger: 'hover',
                                        content: params.row.remarks
                                }},
                                [
                                h('span', params.row.collectionName),
                            ]);
                        }
                      
                    },
                    {
                        title: '创建者',
                        key: 'createBy',
                        align: 'left'
                      
                    },
                    {
                        title: '创建日期',
                        align: 'left',
                        key: 'createDate',
                        sortable: true,
                        sortMethod: function(a, b, type){
                            var t1 = new Date(a);
                            var t2 = new Date(b);
                            if (t1 - t2 >= 0){
                                return true;
                            }
                            return false;  
                        }
                    },
                    {
                        title: '最近一次运行时间',
                        align: 'left',
                        key: 'runDate'
                    },
                    {
                        title: '最近一次运行结果',
                        align: 'left',
                        key: 'isSuccess',
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
                                }else if(params.row.isSuccess === '0'){
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
                                        marginRight: '1px',
                                        color: '#5cadff'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.row)
                                        }
                                    }
                                }, '编辑'),
                                 h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '1px',
                                        color: 'green'
                                    },
                                    on: {
                                        click: () => {
                                            this.clickToDetail(params.row)
                                        }
                                    }
                                }, '详情'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '1px',
                                        color: 'green'
                                    },
                                    on: {
                                        click: () => {
                                            this.clickResult(params.row)
                                        }
                                    }
                                }, '结果'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '1px',
                                        color: '#bbbec4'
                                    },
                                    on: {
                                        click: () => {
                                            this.clickOverView(params.row)
                                        }
                                    }
                                }, '概览'),
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
                                }, '删除')
                            ]);
                        }
                    }
                ]
            }
        },
        computed: {
            testCasesPage:{
                get:function(){
                    var filterProjects = this.collections.filter(item => item.collectionName.toLowerCase().indexOf(this.query.toLowerCase()) > -1);;
                    return filterProjects.slice((this.page - 1) * this.pageDataNum, this.page * this.pageDataNum);
                },
                set:function(newValue){
                    this.projectsPage = newValue;
                }
            },
            projectId: {
                get:function(){
                    return this.$store.state.Project.currentProjectId;
                }
            },
            collections:{
                get:function(){
                    return this.$store.state.Collection.collections
                }
            },
            total:{
                get:function(){
                    return this.collections.length;
                },
                set:function(newValue){
                    this.total = newValue;
                }
            }
        },
        methods: {
            add(){
                var para = {name:'CreateCollection',params: {}}
                this.$router.push(para);
            },
            remove(params){
                this.$Message.error("暂时不支持删除项目")
            },
            clickToDetail(params){
                var para = {name:'CollectionTestCase',params: {}}
                para.params = params;
                this.$store.dispatch('setCurrentCollectionInfo', params);
                this.$router.push(para);
            },
            edit(params){
                var para = {name:'UpdateCollection',params: {}}
                this.$store.dispatch('setCurrentCollectionInfo', params);
                para.params = params;
                this.$router.push(para);
            },
           
            clickResult(params){
                let _this = this;
                var para = {name:'CollectionResultTable',params: {}}
                this.$store.dispatch('setCurrentCollectionInfo', params);
                para.params = params;
                this.$router.push(para);
            },
        
            clickOverView(params){
                let _this = this;
                var para = {name:'CollectionResultOverview',params: {}}
                this.$store.dispatch('setCurrentCollectionInfo', params);
                para.params = params;
                this.$router.push(para);
            },

            ok () {
                this.$refs.formValidate.validate((valid) => {
                    if (valid){
                        let _this = this;
                        var para = {name:'CreateTestDetail',params: {}}
                        para.params = this.formItem;
                        this.$router.push(para);
                    }
                });
            },
            getAllCollections(){
                this.$store.dispatch('setAllCollections', this)
                // var para = {'projectId': this.projectId};
                // this.$Loading.start();
                // getAllCollections(para).then((res) => {
                //     this.$Loading.finish();
                //     if (res.success == 'FAILED'){
                //          this.$Loading.error();
                //         this.$Message.error(res.error.message)
                //     }else{
                       
                //         this.collections =  res.data;
                //     }
                // }).catch(()=>{
                //     this.$Message.error("网络错误，请重试");
                // });
            },
            cancel () {
                 this.visible = false;
                 this.$refs.formValidate.resetFields();
                 this.formItem.projectName = '';
                 this.formItem.des = '';
            },
            changePage (row) {
                this.page = row; 
            }
        },
        mounted() {
            let _this = this;
            if (_this.projectId == ''){
                _this.$Message.warning("请选择项目");
                _this.addIsDisabled = true;
                _this.saveIsDisabled =true;
            }else{
                _this.getAllCollections();
            }
        }
    }
</script>

<style scoped>

.bg-gray {
    color: #f00;
}

</style>