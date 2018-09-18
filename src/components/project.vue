<template>
    <div>
        <Row style="margin-bottom: 10px">
            <Col span="5"> <Input v-model="query" placeholder="请输入项目名" style="width: 260px"></Input></Col>
            <Col span="1" style="margin-left: 60px"><Button type="ghost" shape="circle" icon="ios-search" >搜索</Button></Col>
            <Col span="1" style="margin-left: 60px"><Button type="ghost" shape="circle" icon="android-add" @click="add" >新建</Button></Col>
        </Row>
        <Table :context="self" :data="projectsPage" :columns="tableColumns"></Table>
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
            <Form :model="formItem" :label-width="80" :rules="ruleValidate" ref="formValidate">
                <Form-item label="项目名"　prop="projectName">
                    <Input v-model="formItem.projectName" placeholder="请输入报告名"></Input>
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
    import { addOrUpdateProject, removeProjectById } from '../api/api';
    export default {
        data () {
            return {
                self: this,
                visible:false,
                title: '新建项目',
                query: '',
                row: '',
                pagesData:[],
                tableData: [],
                // projects: [],
                // total: 0,
                page: 1,
                // projectsPage: [],
                pageDataNum: 20,
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
                        title: '项目名',
                        key: 'projectName',
                        align: 'left',
                         render: (h, params) => {
                            return h('Poptip',{
                                props: {
                                        trigger: 'hover',
                                        content: params.row.remarks
                                }},
                                [
                                h('span', params.row.projectName),
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
                    
                    // {
                    //     title: '测试用例数',
                    //     align: 'left',
                    //     key: 'caseNum'
                    // },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'left',
                        render: (h, params) => {
                            // disable = params.status == 1 ? true : false;
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
                                            this.edit(params.row)
                                        }
                                    }
                                }, '修改'),
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
            projects: {
                get:function(){
                    return this.$store.state.Project.projectList;
                }
            },
            projectsPage:{
                get:function(){
                    var filterProjects = this.projects.filter(item => item.projectName.toLowerCase().indexOf(this.query.toLowerCase()) > -1);;
                    return filterProjects.slice((this.page - 1) * this.pageDataNum, this.page * this.pageDataNum);
                },
                set:function(newValue){
                    this.projectsPage = newValue;
                }
            },
            total:{
                get:function(){
                    return this.$store.state.Project.projectList.length;
                },
                set:function(newValue){
                    this.total = newValue;
                }
            }
        },
        methods: {
            add(){
                this.visible = true;
                this.title = '新建项目';
                this.formItem.id = '';
                this.formItem.projectName = '';
                this.formItem.remarks = '';
            },
            remove(params){
                this.$Message.error("暂时不支持删除项目")
                // removeProjectById(params).then((res)=>{
                //     if (res.success == 'FAILED'){
                //          this.$Message.error("删除项目失败，请联系管理员")
                //     }else{
                //         this.$Message.success("删除项目成功")
                //     }
                // }).catch(()=>{
                //     this.$Message.error("网络错误，请重试");
                // })
            },
            edit(params){
                this.visible = true;
                this.title = '修改项目信息';
                this.formItem.id = params.id;
                this.formItem.projectName = params.projectName;
                this.formItem.remarks = params.remarks;
            },
            ok () {
                this.$refs.formValidate.validate((valid) => {
                    if (valid){
                        this.$Loading.start();
                        this.visible = false;
                        var para = this.formItem;
                        addOrUpdateProject(para).then((res)=>{
                            if (res.success == 'FAILED'){
                            this.$Message.error(res.error.message)
                        }else{
                            this.$Loading.finish();
                            this.$Message.success("请求成功")
                            this.$store.dispatch('getProjectsList', this);
                        }}).catch(()=>{
                            this.$Message.error("网络错误，请重试");
                        })
                    }else {
                        this.$Message.info('请填写正确的信息');
                      
                    }
                });
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
            var point = this;
            if (this.projects !== undefined && this.projects !== null && this.projects.length !== 0){
                // this.projectsPage = this.projects.slice(0, this.pageDataNum);
            }else{
                this.$store.dispatch('getProjectsList', point);
            }
        }
    }
</script>

<style scoped>

.bg-gray {
    color: #f00;
}

</style>