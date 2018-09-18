<template>
    <Row>
        <h1>共享环境设置</h1>
        <div style="margin-top:3px"> 共享环境包括初始化变量，认证信息等，设置好共享环境后整个项目中的测试用例都可以使用设置好的信息 </div>
        <Row style="margin-top:20px">
            <Col span="4">
            <Button type="ghost" @click="save" :disabled='saveIsDisabled'>保存</Button>
            </Col>
            <Col span="4" offset="14">
            <Button type="ghost" 　@click="handleAdd" :disabled='addIsDisabled' style="width:260px">
                <strong style="color:#5cadff">+新建共享环境</strong>
            </Button>
            </Col>
        </Row>
        </br>
        
        <Row>
            <div v-for="(item, index) in environments">
                <Form ref="item" :model="item" :rules="ruleValidate" :label-width="20">
                <EnvrionmentCollapse :item="item" :index="index"></EnvrionmentCollapse>
                </Form>
            </div>
        </Row>
    </Row>
</template>
<script>
    import {mapGetters} from 'vuex';
    import {mapActions} from 'vuex';
    import EnvrionmentCollapse from './EnvironmentCollapse.vue';
    import { addOrUpdateEnvironment,removeEnvironmentById } from '../api/api';
export default {
    components: {
            EnvrionmentCollapse
    },
    data() {
        
        return {
            // environments: [],
            isToggle: false,
            addIsDisabled: false,
            saveIsDisabled:false,
            currentName: 'initVariable',
            optionsHeaderKey: [],
            loadingHeaderKey: false,
            optionsHeaderValue: [],
            loadingHeaderValue: false,
            headerKey:
            [
                "Accept-Language",
                "Accept-Charset",
                "Accept",
                "Accept-Encoding",
                "Content-Type",
                "User-Agent",
                "Host",
                "Connection"],
            headerValue:
            [
                "gzip,deflate",
                "gb2312,utf-8;q=0.7,*;q=0.7",
                "application/x-www-form-urlencoded",
                "application/json",
                "multipart/form-data",
                "zh-cn,zh;q=0.5",
                "keep-alive"
            ],
             //验证规则
            ruleValidate: {
            }
           
        }
    },
    computed: {
        projectId: {
            get:function(){
                this.addIsDisabled = false;
                this.saveIsDisabled = false;
                return this.$store.state.Project.currentProjectId;
            }
        },
        environments: {
            get:function(){
                console.log(this.$store.state.Environment.environments)
                return this.$store.state.Environment.environments;
            }
        }
    },
    methods: {
        toggleClick(){
                this.isToggle = !this.isToggle;
        },
        save(){
            var item = this.$refs['item'];
            var flag = true;
            for (var i=0;i<item.length;i++)
            {
                var itemtemp = item[i];
                itemtemp.validate((valid) => {
                        if (!valid){
                            flag = false;
                        }
                })
            }
            if (!flag){
                this.$Message.error('表单验证失败');
            }
            else{
                this.$Loading.start();
                this.visible = false;
                let _para = this.environments;
                addOrUpdateEnvironment(_para).then((res)=>{
                    this.$Loading.finish();
                    if (res.success == 'FAILED'){
                    this.$Message.error(res.error.message)
                    }else{
                        this.$Loading.finish();
                        this.$Message.success("请求成功")
                }}).catch(()=>{
                    this.$Message.error("网络错误，请重试");
                })
            }
        },
        //header 操作
        addHeader(index) {
            let environment = this.environments[index];
            let headerSize = environment.apiHeaders.length;
            environment.apiHeaders.splice(headerSize + 1, 0,
                { key: "", value: "" });
        },
        deleteHeader(indexHeader, index) {
            let environment = this.environments[index];
            environment.apiHeaders.splice(indexHeader, 1);
        },
        //urlParameter 操作
        addUrlParameter(index) {
            let environment = this.environments[index];
            let apiUrlParameterSize = environment.apiUrlParameter.length;
            environment.apiUrlParameter.splice(apiUrlParameterSize + 1, 0,
                { key: "", value: "" });
        },
        deleteUrlParameter(urlParameterHeader, index) {
            let environment = this.environments[index];
            environment.apiUrlParameter.splice(urlParameterHeader, 1);
        },
        //增加variable操作
        addVariableParameter(index) {
            let environment = this.environments[index];
            let variableParameterSize = environment.initVariables.length;
            environment.initVariables.splice(variableParameterSize + 1, 0,
                { key: "", value: "" });
        },
        deleteVariableParameter(variableIndex, index) {
            let environment = this.environments[index];
            environment.initVariables.splice(variableIndex, 1);
        },
        handleAdd() {
            var environment = {
                id: '',
                projectId: this.projectId,
                environmentName: '未命名',
                initVariables: [
                    {
                        name: "url",
                        value: "www.baidu.com"
                    }
                ],
                apiHeaders: [
                    {
                        key: "Content-Type",
                        value: "application/json"
                    }
                ],
                apiUrlParameter: [
                ],
                authInfo: {
                    // flag: "myAuth",
                    // basicAuth: {
                    //     account: "",
                    //     password: ""
                    // },
                    // Auth2: {

                    // },
                    myAuth: {
                        authUrl:'',
                        userName:'',
                        password:'',
                        tokenName:'',
                        token:''
                    }
                }
            };
            this.$store.dispatch('addEnvironment', environment)
        },
        headerKeyMethod(query) {
            if (query !== '') {
                this.loadingHeaderKey = true;
                setTimeout(() => {
                    this.loadingHeaderKey = false;
                    const list = this.headerKey.map(item => {
                        return {
                            value: item,
                            label: item
                        };
                    });
                    list.push({ value: query, label: query });
                    this.optionsHeaderKey = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);

                }, 200);
            } else {
                this.optionsHeaderKey = [];
            }
        },
        headerValueMethod(query) {
            if (query !== '') {
                this.loadingHeaderValue = true;
                setTimeout(() => {
                    this.loadingHeaderValue = false;
                    const list = this.headerValue.map(item => {
                        return {
                            value: item,
                            label: item
                        };
                    });
                    list.push({ value: query, label: query });
                    this.optionsHeaderValue = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
                }, 200);
            } else {
                this.optionsHeaderValue = [];
            }
        },
        handleRemove(index) {
            var encironment = this.environments[index];
            removeEnvironmentById(encironment).then((res)=>{
                if (res.success == 'FAILED'){
                    this.$Message.error(res.error.message)
                }else
                    this.$store.dispatch('removeEnvironment', index)
                }).catch(()=>{
                this.$Message.error("网络错误")
            })
            
        },
        menuSelect(name) {
            this.currentName = name;
        }
    },
    mounted() {
        if (this.projectId == ''){
            this.$Message.warning("请选择项目");
            this.addIsDisabled = true;
            this.saveIsDisabled =true;
        }else{
            this.$store.dispatch('getEnvironments', this);
        }
    }
}
</script>
<style　lang="less" scoped>
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
    tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
}
.table {
    width: 100%;
    height: 50px;
}
table {
    max-width: 100%;
    background-color: transparent;
    border-collapse: collapse;
    border-spacing: 0;
    background-color: #f8f8f9;
}

table {
    display: table;
    border-collapse: separate;
    border-spacing: 2px;
    border-color: grey;
    background-color: #f8f8f9;
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
.message-list .host, .message-rollup .host {
    max-width: 900px;
}
.message-list tr:first-child td {
    padding-top: 6px;
}
.message-list td, .message-rollup td {
    border: none;
    /*overflowoverflow: hidden;*/
    white-space: nowrap;
    font-size: 14px;
}
.message-list .toggler {
    width: 20px;
}
.margin-top-6{
    margin-top: 4px;
}
a{
    color: #00a0e9;
}
.message-wrapper .detail-toggle {
    cursor: pointer;
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

.remove {
    float: right;
    margin-right: 10px;
    color: #f00;
}
.red{
    color: #f00;
}
.bg-gray {
    color: #d3dce6;
}
</style>

