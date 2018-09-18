<template>
    <section style="width:100%">
         
                    <Row>
            <div class="message-wrapper sort current" >
                <table class="table table-condensed message-list" @click="toggleClick">
                    <tbody>
                        <tr>
                            <td class="toggler host detail-toggle" rowspan="1">
                                <a class="margin-left-4" v-show="!isToggle"><Icon class = "margin-top-6" type="arrow-right-b"></Icon></Icon></a>
                                <a class="margin-left-4" v-show="isToggle"><Icon class = "margin-top-6" type="arrow-down-b"></Icon></Icon></a>
                            </td>
                            <td class="host detail-toggle">{{item.environmentName}}</td>
                            <td class="note detail-toggle"> 
                                <i class="remove" @click="handleRemove(index)">
                                <Icon type="close"></Icon>
                            </i></td>
                        </tr>
                    </tbody>
                </table>
                <div class="message-detail" style="display: block;" v-show="isToggle">
                  <label class="bg-gray">NAME</label>
                                <Row>
                                    <Col span="5">
                                    <Form-item prop="environmentName" label=" " :rules="{required: true, message: '共享环境名不能为空', trigger: 'blur'}">
                                        <Input type="text" v-model="item.environmentName" placeholder="请输入共享环境名"></Input>
                                    </Form-item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="5">
                                    <Menu theme="light"  @on-select="menuSelect">
                                        <Menu-item name="initVariable">
                                            ＋初始化变量
                                        </Menu-item>
                                        <Menu-item name="headerInfo">
                                            ＋头部信息
                                        </Menu-item>
                                        <Menu-item name="urlParameter">
                                            ＋url参数
                                        </Menu-item>
                                        <Menu-item name="authentication">
                                            ＋认证配置
                                        </Menu-item>
                                    </Menu>
                                    </Col>
                                    <Col span="16">
                                    <div v-show="currentName == 'initVariable'">
                                        <Row>
                                            <div>
                                                <label class="bg-gray">VARIABLES</label>
                                            </div>
                                            <Row>
                                                <Col span="11" style="padding-right:10px">
                                                <Form-item　v-for="(item, variableIndex) in item.initVariables" label=" " :key="variableIndex" :prop="'initVariables.' + variableIndex + '.name'" :rules="{required: true, message: '变量名不能为空', trigger: 'blur'}">
                                                    <Input type="text" v-model="item.name" placeholder="name"></Input>
                                                    </Form-item>
                                                    </Col>
                                                    <Col span="11">
                                                    <Form-item　v-for="(item, variableIndex) in item.initVariables" label=" " :key="variableIndex" :prop="'initVariables.' + variableIndex + '.value'" :rules="{required: true, message: '变量值不能为空', trigger: 'blur'}">
                                                        <Input type="text" v-model="item.value" placeholder="value"></Input>
                                                        </Form-item>
                                                        </Col>
                                                        <Col span="2">
                                                        <Form-item　v-for="(item, variableIndex) in item.initVariables">
                                                            <i @click="deleteVariableParameter(variableIndex,index)">
                                                                <Icon type="close" class="red"></Icon>
                                                            </i>
                                                            </Form-item>
                                                            </Col>
                                            </Row>
                                            <!--</Form-item>-->
                                            <div>
                                                <Form-item>
                                                    <a class="remove" style="text-align: center;　float: left; color: #00a0e9" @click="addVariableParameter(index)">+新增Url参数</a>
                                                </Form-item>
                                            </div>
                                        </Row>
                                    </div>
                                    <div v-show="currentName == 'headerInfo'">
                                        <label class="bg-gray">HEADERS</label>
                                        <Row>
                                            <Row>
                                                <Col span="11" style="padding-right:10px">
                                                <Form-item v-for="(item, indexHeader) in item.apiHeaders" label=" " :key="indexHeader" :prop="'apiHeaders.' + indexHeader + '.key'" :rules="{required: true, message: '头部不能为空', trigger: 'blur'}">
                                                    <Select v-model="item.key" filterable remote :remote-method="headerKeyMethod" :loading="loadingHeaderKey">
                                                        <Option v-for="option in optionsHeaderKey" :value="option.value" :key="option.value">{{option.label}}</Option>
                                                    </Select>
                                                </Form-item>
                                                </Col>
                                                <Col span="11">
                                                <Form-item　v-for="(item, indexHeader) in item.apiHeaders" label=" " :key="indexHeader" :prop="'apiHeaders.' + indexHeader + '.value'" :rules="{required: true, message: '头部不能为空', trigger: 'blur'}">
                                                    <Select v-model="item.value" filterable remote :remote-method="headerValueMethod" :loading="loadingHeaderValue">
                                                        <Option v-for="option in optionsHeaderValue" :value="option.value" :key="option.value">{{option.label}}</Option>
                                                    </Select>
                                                    </Form-item>
                                                    </Col>
                                                    <Col span="2">
                                                    <Form-item　v-for="(item, indexHeader) in item.apiHeaders">
                                                        <i @click="deleteHeader(indexHeader,index)">
                                                            <Icon type="close" class="red"></Icon>
                                                        </i>
                                                        </Form-item>
                                                        </Col>
                                            </Row>
                                            <Form-item>
                                                <div>
                                                    <a class="remove" style="text-align: center;　float: left; color: #00a0e9" @click="addHeader(index)">+新增头部</a>
                                                </div>
                                            </Form-item>
                                        </Row>
    
                                    </div>
                                    <div v-show="currentName == 'urlParameter'">
                                        <Row>
                                            <div>
                                                <label class="bg-gray">QUERYSTRING</label>
                                            </div>
                                            <!--<Form-item　v-for="(item, urlParameterHeader) in item.apiUrlParameter">-->
                                            <Row>
                                                <Col span="11" style="padding-right:10px">
                                                <Form-item　v-for="(item, urlParameterHeader) in item.apiUrlParameter" label=" " :key="urlParameterHeader" :prop="'apiUrlParameter.' + urlParameterHeader + '.key'" :rules="{required: true, message: 'url参数不能为空', trigger: 'blur'}">
                                                    <Input type="text" v-model="item.key" placeholder="name"></Input>
                                                </Form-item>
                                                </Col>
                                                <Col span="11">
                                                    <Form-item　v-for="(item, urlParameterHeader) in item.apiUrlParameter" label=" " :key="urlParameterHeader" :prop="'apiUrlParameter.' + urlParameterHeader + '.value'" :rules="{required: true, message: 'url参数不能为空', trigger: 'blur'}">
                                                        <Input type="text" v-model="item.value" placeholder="value"></Input>
                                                        </Form-item>
                                                        </Col>
                                                        <Col span="2">
                                                        <Form-item　v-for="(item, urlParameterHeader) in item.apiUrlParameter">
                                                            <i @click="deleteUrlParameter(urlParameterHeader,index)">
                                                                <Icon type="close" class="red"></Icon>
                                                            </i>
                                                        </Form-item>
                                                </Col>
                                            </Row>
                                            <!--</Form-item>-->
                                            <div>
                                                <Form-item>
                                                    <a class="remove" style="text-align: center;　float: left; color: #00a0e9" @click="addUrlParameter(index)">+新增Url参数</a>
                                                </Form-item>
                                            </div>
                                        </Row>
                                    </div>
                                    <div v-show="currentName == 'authentication'">
                                        <p>该处可根据公司具体情况重写</p>
                                        <label class="bg-gray">AuthUrl</label>
                                        <Row>
                                            <Col span="7">
                                            <Input type="text" v-model="item.authInfo.myAuth.authUrl" placeholder="name"></Input>
                                            </Col>
                                        </Row>
                                        <label class="bg-gray">UserName</label>
                                        <Row>
                                            <Col span="7">
                                            <Input type="text" v-model="item.authInfo.myAuth.userName" placeholder="name"></Input>
                                            </Col>
                                        </Row>
                                        <label class="bg-gray">PassWord</label>
                                        <Row>
                                            <Col span="7">
                                            <Input type="text" v-model="item.authInfo.myAuth.passWord" placeholder="name"></Input>
                                            </Col>
                                        </Row>
                                        <label class="bg-gray">TokenName</label>
                                        <Row>
                                            <Col span="7">
                                            <Input type="text" v-model="item.authInfo.myAuth.tokenName" placeholder="name"></Input>
                                            </Col>
                                        </Row>
                                        <label class="bg-gray">Token</label>
                                        <Row>
                                            <Col span="7">
                                            <Input type="text" v-model="item.authInfo.myAuth.token" placeholder="name"></Input>
                                            </Col>
                                        </Row>
                                    </div>
                                    </Col>
                                </Row>
                </div>
            </div>
        </Row>
     </br>
    </section>
</template>
<script>
    import {mapGetters} from 'vuex';
    import {mapActions} from 'vuex';
    export default {
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
                return this.$store.state.Environment.environments;
            }
        }
    },
    props:{
            item:Object,
            index:Number
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
                            // this.$store.dispatch('getProjectsList', this);
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
                        name: "个人线下环境",
                        value: "https://portal-test.icekredit.com"
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
                    myAuth: {
                        authUrl:'',
                        userName:'',
                        password:'',
                        tokenName:'',
                        token:''
                    }
                }
            };
            this.environments.push(environment);
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