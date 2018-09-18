<template>
    <div class="hello"> 
        <h1> {{requestInfo.testCaseName}} </h1>
        <h4> {{requestInfo.remarks}} </h4>
    <Row>
        <Col span="24">
        <div style="margin-bottom:10px;margin-top:10px" v-show="requestInfo.requests.length !== 0">
            <Button type="primary" style="width:100px"  @click="handleSaveAndRun('item')">
               <span>Save&Run</span>
            </Button>
           <!--<Button type="ghost"  @click="handleSave('item')" style="margin-left: 8px;width:100px">Save</Button>-->
           <Dropdown  style="float:right; margin-right:100px">
                <Button type="ghost" long @click="handleOpenClose" >
                    {{currentEnvironmentName}}
                    <Icon type="arrow-down-b"></Icon>
                </Button>
                <DropdownMenu slot="list" style="margin-right: 50px">
                    <div style="margin-left:10px">
                        <label class="bg-gray">环境变量</label>
                        <div v-for="(item, index) in environments ">
                            <Row>
                               <a style="text-align: center;　float: left; color: #00a0e9;" @click="selectEnvironment(index)">{{item.environmentName}}</a>
                            </Row>
                        </div>
                    </div>
                    <div style="margin-left:10px; margin-top:10px">
                        <label class="bg-gray">新增</label>
                    </div>
                     <a class="remove" style="text-align: center;　float: left; color: #00a0e9; margin-left:10px" @click="addEnvironment">+新增环境变量</a>
                    <div style="text-align: right;margin:10px;">
                    </div>
                </DropdownMenu>
            </Dropdown>
        </div>
        <div v-for="(item, index) in requestInfo.requests">
            <Form ref="item" :model="item"  :rules="ruleValidate" :label-width="20">
                    <Collapse  accordion>
                        <Panel name="index + 'panel'">
                        {{item.api}}<i class="remove"@click="handleRemove(index)"><Icon type="close"></Icon></i>
                        <Tabs value="name1"　slot="content">
                            <Tab-pane label="Requset" name="Request">
                                <label class="bg-gray">NAME</label>
                            <Row>
                                <Col span="5">
                                    <Form-item  prop="requestName" label=" " :rules="{required: true, message: '请求名不能为空', trigger: 'blur'}">
                                        <Input type="text" v-model="item.requestName" placeholder="请输入请求名"></Input>
                                    </Form-item>
                                </Col>
                            </Row>
                            <label class="bg-gray">EndPoint</label>
                                <Row>
                                    <Col span="6">
                                    <Form-item　prop="requestType" class="important-css" label=" " :rules="{required: true, message: '请求类型不能为空', trigger: 'change'}">
                                         <Select v-model="item.requestType" style="width:140px" >
                                            <Option v-for="item in optionsRequestType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                    </Form-item>
                                    </Col>
                                    <Col span="10">
                                     <Form-item prop="api" label=" " :rules="{required: true, message: '请求名不能为空', trigger: 'blur'}">
                                        <Input type="text"  v-model="item.api" placeholder="请输入..."></Input>
                                     </Form-item>
                                    </Col>
                                </Row>
                                <label class="bg-gray">HEADERS</label>
                                <Row>
                                    <Row>
                                        <Col span="11" style="padding-right:10px">
                                        <Form-item v-for="(item, indexHeader) in item.apiHeaders" label=" " :key="indexHeader" :prop="'apiHeaders.' + indexHeader + '.key'" :rules="{required: true, message: '头部不能为空', trigger: 'blur'}">
                                            <Select
                                            v-model="item.key"
                                            filterable
                                            remote
                                            :remote-method="headerKeyMethod"
                                            :loading="loadingHeaderKey">
                                            <Option v-for="option in optionsHeaderKey" :value="option.value" :key="option.value">{{option.label}}</Option>
                                            </Select>
                                        </Form-item>
                                        </Col>
                                        <Col span="11">
                                        <Form-item　v-for="(item, indexHeader) in item.apiHeaders" label=" " :key="indexHeader" :prop="'apiHeaders.' + indexHeader + '.value'" :rules="{required: true, message: '头部不能为空', trigger: 'blur'}">
                                            <Select
                                                v-model="item.value"
                                                filterable
                                                remote
                                                :remote-method="headerValueMethod"
                                                :loading="loadingHeaderValue">
                                            <Option v-for="option in optionsHeaderValue" :value="option.value" :key="option.value">{{option.label}}</Option>
                                            </Select>
                                        </Form-item>
                                        </Col>
                                        <Col span="2">
                                        <Form-item　v-for="(item, indexHeader) in item.apiHeaders">
                                            <i  @click="deleteHeader(indexHeader,index)"><Icon type="close" class="red"></Icon></i>
                                          </Form-item>
                                        </Col>
                                    </Row>
                                        <Form-item>
                                            <div>
                                                <a class="remove" style="text-align: center;　float: left; color: #00a0e9" @click="addHeader(index)">+新增头部</a>
                                            </div> 
                                        </Form-item>   
                                </Row>
                                <Row>
                                    <div>
                                        <label class="bg-gray">QUERYSTRING</label>
                                    </div>
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
                                            <i  @click="deleteUrlParameter(urlParameterHeader,index)"><Icon type="close" class="red"></Icon></i>
                                        </Form-item>
                                        </Col>
                                        </Row>
                                    <div>
                                        <Form-item>
                                        <a class="remove" style="text-align: center;　float: left; color: #00a0e9" @click="addUrlParameter(index)">+新增Url参数</a>
                                        </Form-item> 
                                   </div>  
                                </Row>
                                <Row>
                                     <Row v-show="item.requestType == 'Post'">
                                     <a v-show = "item.apiBodies.flag !== 'raw'" class="remove" style="text-align: center;　float: left; color: #00a0e9" @click="addFormData(index)">+新增Form Parameter</a>
                                     <a v-show = "item.apiBodies.formData.length == 0" class="remove" style="text-align: center;　float: left; color: #00a0e9" @click="addJsonBody(index)">+增加Json Body</a>
                                     </Row>
                                        <Row>
                                        <Col span="11" style="padding-right:10px">
                                        <Form-item　v-for="(item, formDataIndex) in item.apiBodies.formData" label=" " :key="formDataIndex" :prop="'apiBodies.formData.' + formDataIndex + '.key'" :rules="{required: true, message: 'url参数不能为空', trigger: 'blur'}">
                                           <Input type="text" v-model="item.key" placeholder="name"></Input>
                                        </Form-item>
                                        </Col>
                                        <Col span="11">
                                        <Form-item　v-for="(item, formDataIndex) in item.apiBodies.formData" label=" " :key="formDataIndex" :prop="'apiBodies.formData.' + formDataIndex + '.value'" :rules="{required: true, message: 'url参数不能为空', trigger: 'blur'}">
                                           <Input type="text" v-model="item.value" placeholder="value"></Input>
                                        </Form-item>
                                        </Col>
                                        <Col span="2">
                                        <Form-item　v-for="(item, formDataIndex) in item.apiBodies.formData">
                                            <i  @click="deleteFormData(formDataIndex,index)"><Icon type="close" class="red"></Icon></i>
                                        </Form-item>
                                        </Col>
                                        </Row>
                                        <editor v-show = "item.apiBodies.flag === 'raw'" v-on:content-update="contentUpdate" :index='index' :content="item.apiBodies.raw.value" :lang="json"></editor>
                                    <!--<vue-json-editor v-show = "item.apiBodies.flag === 'raw'" v-model="item.apiBodies.raw.value" :showBtns="false"></vue-json-editor>-->
                                    <a v-show = "item.apiBodies.flag === 'raw'" class="remove" style="text-align: center;　float: left; color: #00a0e9" @click="deleteJsonBody(index)">-删除Json Body</a>
                                </Row>
                            </Tab-pane>
                            <Tab-pane label="Assertions" name="Assertions">
                                <Row :gutter="2">
                                    <Col :span="5">
                                        <label class="bg-gray">断言项</label>
                                    </Col>
                                    <Col :span="4">
                                        <label class="bg-gray">源数据</label>
                                    </Col>
                                    <Col :span="4">
                                        <label class="bg-gray">期望值</label>
                                    </Col>
                                    <Col :span="4">
                                        <label class="bg-gray">比较</label>
                                    </Col>
                                    <Col :span="4">
                                        <label class="bg-gray">实际值</label>
                                    </Col>
                                    <Col :span="2">
                                        <label class="bg-gray">删除</label>
                                    </Col>
                                </Row>
                                        <Row>
                                        <Col span="5" style="padding-right:10px">
                                        <Form-item　style="margin-top:5px" v-for="(item, assertionsIndex) in item.apiAssertions" label=" " :key="assertionsIndex" :prop="'apiAssertions.' + assertionsIndex + '.name'" :rules="{required: true, message: '断言名不能空', trigger: 'blur'}">
                                           <Input type="text" v-model="item.name" placeholder="测试返回状态码是否是200"></Input>
                                        </Form-item>
                                        </Col>
                                        <Col span="4">
                                        <Form-item　style="margin-top:5px" v-for="(item, assertionsIndex) in item.apiAssertions" label=" " :key="assertionsIndex" :prop="'apiAssertions.' + assertionsIndex + '.source'" :rules="{required: true, message: 'source不能为空', trigger: 'change'}">
                                             <Select v-model="item.source" style="width:190px">
                                                <Option v-for="item in sourceOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                             </Select>
                                        </Form-item>
                                        </Col>
                                        <Col span="4" style="padding-right:10px">
                                        <Form-item　ref="targetValue" style="margin-top:5px" v-for="(item, assertionsIndex) in item.apiAssertions" label=" " :key="assertionsIndex" :prop="'apiAssertions.' + assertionsIndex + '.targetValue'" :rules="{required: true, message: '期望值不能为空', trigger: 'blur'}">         
                                           <Input v-if= "item.comparison=='is empty' || item.comparison=='is not empty' || item.comparison=='is a number'" disabled type="text" 　v-model="item.targetValue" placeholder="200"></Input>
                                           <Input v-else type="text" v-model="item.targetValue" placeholder="200"></Input>
                                        </Form-item>
                                        </Col>
                                        <Col span="4">
                                        <Form-item　style="margin-top:5px" v-for="(item, assertionsIndex) in item.apiAssertions" label=" " :key="assertionsIndex" :prop="'apiAssertions.' + assertionsIndex + '.comparison'" :rules="{required: true, message: '比较符不能为空', trigger: 'change'}">         
                                             <Select v-model="item.comparison" style="width:190px" v-on:on-change="assertionTypeChange(item)">
                                                <Option v-for="item in comparisonOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                             </Select>
                                        </Form-item>
                                        </Col>
                                        <Col span="4" style="padding-right:10px">
                                        <Form-item  style="margin-top:5px" v-for="(item, assertionsIndex) in item.apiAssertions" label=" " :key="assertionsIndex" :prop="'apiAssertions.' + assertionsIndex + '.property'" :rules="{required: true, message: 'property不能为空', trigger: 'blur'}">                                               
                                           <Input  type="text" v-model="item.property" placeholder="实际值"></Input>                   
                                        </Form-item>
    
                                        </Col>
                                        <Col span="2">
                                        <Form-item　style="margin-top:5px" v-for="(item, assertionsIndex) in item.apiAssertions">
                                            <i  @click="deleteAssertionData(assertionsIndex,index)"><Icon type="close" class="red"></Icon></i>
                                        </Form-item>
                                        </Col>
                                    </Row>
                                     <div>
                                        <a class="remove" style="text-align: center;　float: left; color: #00a0e9" @click="addAssertionData(index)">+新增断言</a>
                                   </div>
                                   </Tab-pane> 
                                   <Tab-pane label="Variables" name="Variables">
                                    <Row :gutter="2">
                                    <Col :span="4">
                                        <label class="bg-gray">数据源</label>
                                    </Col>
                                    <Col :span="4">
                                        <label class="bg-gray">取值</label>
                                    </Col>
                                    <Col :span="4">
                                        <label class="bg-gray">变量名</label>
                                    </Col>
                                    <Col :span="2">
                                        <label class="bg-gray">删除</label>
                                    </Col>
                                    </Row>
                                        <Row>
                                        <Col span="4">
                                        <Form-item　style="margin-top:5px" v-for="(item, variableIndex) in item.apiVariables" label=" " :key="assertionsIndex" :prop="'apiVariables.' + variableIndex + '.source'" :rules="{required: true, message: 'source不能为空', trigger: 'blur'}">  
                                            <Select v-model="item.source" style="width:190px">
                                                <Option v-for="item in sourceOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                            </Select>
                                        </Form-item>
                                        </Col>
                                        <Col span="4" style="padding-right:10px">
                                        <Form-item　style="margin-top:5px" v-for="(item, variableIndex) in item.apiVariables" label=" " :key="assertionsIndex" :prop="'apiVariables.' + variableIndex + '.property'" :rules="{required: true, message: 'property不能为空', trigger: 'blur'}">  
                                        
                                           <Input type="text" v-model="item.property" placeholder="取值"></Input>
                                        </Form-item>
                                        </Col>
                                        <Col span="4" style="padding-right:10px">
                                         <Form-item　style="margin-top:5px" v-for="(item, variableIndex) in item.apiVariables" label=" " :key="assertionsIndex" :prop="'apiVariables.' + variableIndex + '.name'" :rules="{required: true, message: '变量名不能为空', trigger: 'blur'}">  
                                           <Input type="text" v-model="item.name" placeholder="变量名"></Input>
                                         </Form-item>
                                        </Col>
                                        <Col span="2">
                                        <Form-item　style="margin-top:5px" v-for="(item, variableIndex) in item.apiVariables">
                                            <i  @click="deleteVariableData(variableIndex,index)"><Icon type="close" class="red"></Icon></i>
                                        </Form-item>
                                        </Col>
                                        </Row>
                                    <div>
                                        <a class="remove" style="text-align: center;　float: left; color: #00a0e9" @click="addVariableData(index)">+新增断言</a>
                                   </div>  
                            
                            </Tab-pane>
                        </Tabs>
                        </Panel>
                    </Collapse>
            </Form>
            </br>
        </div>
        </br>
        </Col>
        <Col span="24" v-show="requestInfo.requests.length == 0" style="text-align: center; font-size: 20px; color: #00a0e9">至少新增一个请求</Col>
        </br>
    </Row>
    <Row type="flex" justify="center">
        <Col span="12">
            <Button type="dashed" long @click="handleAdd" icon="plus-round">新增</Button>
        </Col>
    </Row>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex';
    import {mapActions} from 'vuex';
    import editor from 'vue-brace'
    import 'brace/mode/html'
    import 'brace/mode/xml'
    import 'brace/mode/json'
    import 'brace/theme/github'
    import {saveAndRunCase, getTestCase} from "../api/api";
    import vueJsonEditor from 'vue-json-editor'
    export default {
        components: {
          editor,
          vueJsonEditor
        },
        data () {
            return {
                visible: false,
                isLoading:false,
                createTestInfo:'',
                currentEnvironmentName: '',
                requestInfo:{
                    id:'',
                    projectId: '',
                    testCaseName: '',
                    remarks: '',
                    environmentId: '',
                    requests: []
                },         
                optionsHeaderKey: [],
                environment: [],
                loadingHeaderKey:false,
                optionsHeaderValue: [],
                loadingHeaderValue:false,
                isJsonBody:true,
                requestNum: [],
                formDynamic: {
                    account: [],
                    bank: [],
                    payee: [],
                    amounts: '',
                    pay_type: [],
                    desc: ''
                },
                optionsRequestType: [
                    {
                        label: 'Get',
                        value: 'Get'
                    },
                    {
                        label: 'Post',
                        value: 'Post'
                    }
                ],  
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
                    "keep-alive"],
                // requests:[],
                rawOptions:
                [
                    {
                        value: 'json',
                        label: 'application/json'
                    },
                    {
                        value: 'html',
                        label: 'text/html'
                    },
                    {
                        value: 'xml',
                        label: 'text/xml'
                    }
                ],
                sourceOptions:
                [
                    {
                        value: 'Headers',
                        label: 'Headers'
                    },
                    {
                        value: 'JSONBody',
                        label: 'JSONBody'
                    },
                    {
                        value: 'Response Size(bytes)',
                        label: 'Response Size(bytes)'
                    },
                    {
                        value: 'Response Time(ms)',
                        label: 'Response Time(ms)'
                    },
                    {
                        value: 'Status code',
                        label: 'Status code'
                    },
                    {
                        value: 'Text Body',
                        label: 'Text Body'
                    },
                    {
                        value: 'XML Body',
                        label: 'XML Body'
                    }
                ],
                comparisonOptions:
                [
                    {
                        value: 'equals',
                        label: 'equals'
                    },
                    {
                        value: 'does not equal',
                        label: 'does not equal'
                    },
                    {
                        value: 'is empty',
                        label: 'is empty'
                    },
                    {
                        value: 'is not empty',
                        label: 'is not empty'
                    },
                    {
                        value: 'contains',
                        label: 'contains'
                    },
                    {
                        value: 'does not contains',
                        label: 'does not contains'
                    },
                    {
                        value: 'is a number',
                        label: 'is a number'
                    },
                    {
                        value: 'does not contains',
                        label: 'does not contains'
                    },
                    {
                        value: 'equals(number)',
                        label: 'equals(number)'
                    },
                    {
                        value: 'less than',
                        label: 'less than'
                    },
                    {
                        value: 'less than or equal',
                        label: 'less than or equal'
                    },
                    {
                        value: 'greater than',
                        label: 'greater than'
                    },
                    {
                        value: 'greater than or equal',
                        label: 'greater than or equal'
                    }
                ],
                //验证规则
                ruleValidate: {
                    pay_type: [
                        {required: true, type: 'array', min: 1, message: '至少选择一种充值方式', trigger: 'change'},
                        {type: 'array', max: 2, message: '最多选择两个充值方式', trigger: 'change'}
                    ],
                }
            }
        },
        computed:{
            environments: {
                get:function(){
                    var environments = this.$store.state.Environment.environments;
                    if (this.requestInfo.environmentId !== ''){
                        for (var i=0; i<environments.length; ++i){
                            var item = environments[i]
                            if (item.id === this.requestInfo.environmentId){
                                
                                this.currentEnvironmentName = item.environmentName
                                break
                            }
                        }
                    }
                    return environments
                }
            },
            projectId: {
                get:function(){
                    return this.$store.state.Project.currentProjectId;
                }
            },
        },
        methods: {
            contentUpdate(index, v){
                let _this = this;
                if (v != null){
                    _this.requestInfo.requests[index].apiBodies.raw.value = v
                }
            },
            selectEnvironment(index){
                this.currentEnvironmentName = this.environments[index].environmentName;
                this.requestInfo.environmentId = this.environments[index].id;
            },
            addEnvironment(){
                this.$router.push({path: '/environment'});
            },
            handleOpenClose () {
                this.visible = !this.visible;
            },
            //header 操作
            addHeader(index){
                let request = this.requestInfo.requests[index];
                let headerSize = request.apiHeaders.length;
                request.apiHeaders.splice(headerSize + 1, 0,
                {key: "", value: ""});
            },
            deleteHeader(indexHeader,index){
                 let request = this.requestInfo.requests[index];
                 request.apiHeaders.splice(indexHeader, 1);
            },
              //urlParameter 操作
            addUrlParameter(index){
                let request = this.requestInfo.requests[index];
                let apiUrlParameterSize = request.apiUrlParameter.length;
                request.apiUrlParameter.splice(apiUrlParameterSize + 1, 0,
                {key: "", value: ""});
            },
            deleteUrlParameter(urlParameterHeader, index){
                let request = this.requestInfo.requests[index];
                request.apiUrlParameter.splice(urlParameterHeader, 1);
            },
            //form-data
            addFormData(index){
                let request = this.requestInfo.requests[index];
                request.apiBodies.flag="formData"
                let formDataSize = request.apiBodies.formData.length;
                request.apiBodies.formData.splice(formDataSize + 1, 0,
               {key: "", value: ""});
            },
            deleteFormData(formDataIndex, index){
                let request = this.requestInfo.requests[index];
                request.apiBodies.formData.splice(formDataIndex, 1);
                if (request.apiBodies.formData.length == 0){
                    request.apiBodies.flag=""
                }
            },
            addJsonBody(index){
                this.isJsonBody = false;
                let request = this.requestInfo.requests[index];
                request.apiBodies.flag="raw"
                
            },
            deleteJsonBody(index){
                this.isJsonBody = true;
                let request = this.requestInfo.requests[index];
                request.apiBodies.raw.value="{}"
                request.apiBodies.flag=""
            },
            //assertion
            addAssertionData(index){
                let request = this.requestInfo.requests[index];
                let assertionLength = request.apiAssertions.length;
                request.apiAssertions.splice(assertionLength + 1, 0,
                {name: "", source: "",property:"",comparison:"",targetValue:""});
            },
            deleteAssertionData(assertionsIndex, index){
                let request = this.requestInfo.requests[index];
                request.apiAssertions.splice(assertionsIndex, 1);
            },
            //变量
            addVariableData(index){
                let request = this.requestInfo.requests[index];
                let variablesSize = request.apiVariables.length;
                request.apiVariables.splice(variablesSize + 1, 0,
               {name: "", source: "",property:""});
            },
            deleteVariableData(variablesIndex, index){
                let request = this.requestInfo.requests[index];
                request.apiVariables.splice(variablesIndex, 1);
            },
            assertionTypeChange(item){
                if (item.comparison == 'is empty' || item.comparison == 'is not empty' || item.comparison == 'is a number'){
                    item.targetValue = '无'
                }else{
                    item.targetValue=''
                }
            },
            handleSaveAndRun (name) {
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
                    this.$Message.error('请检查填写的参数');
                }else{
                    this.requestInfo.projectId = this.projectId
                    this.requestInfo.testCaseName = this.createTestInfo.testCaseName
                    this.requestInfo.remarks = this.createTestInfo.remarks
                    var para = {name:'ResultTable',params: {}}
                    this.$loading();
                    saveAndRunCase(this.requestInfo).then((res)=>{
                        this.$loading.close();
                        if (res.success == 'FAILED'){
                            this.$Message.error(res.error.message);
                            this.requestInfo = res.data;
                        }else{
                            this.$Message.success("请求成功");
                            this.requestInfo = res.data;
                            // this.$router.push({path: '/'});
                        }
                        this.$router.push(para);
                    }).catch(()=>{
                        this.$loading.close();
                        this.$Message.error("网络错误");
                    });
                }
            },
            getTestCase(){
                var param = {"testCaseId": this.createTestInfo.id}
                getTestCase(param).then((res)=>{
                   if (res.success == 'FAILED'){
                       this.$Message.error(res.error.message);
                   }else{
                       this.requestInfo = res.data;
                   this.requestInfo.testCaseName = this.createTestInfo.testCaseName;
                   this.requestInfo.remarks = this.createTestInfo.remarks;
                   }
                   
                }).catch(()=>{

                })
            },
            headerKeyMethod(query){
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
                        this.optionsHeaderKey = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
                    }, 200);
                } else {
                    this.optionsHeaderKey = [];
                }
            }, 
            headerValueMethod(query){
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
                        this.optionsHeaderValue = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
                    }, 200);
                } else {
                    this.optionsHeaderValue = [];
                }
            },
            handleSave (name) {
               this.requestInfo.requests = []
            },
            handleAdd () {
                var requestInfo = {
                    id: '',
                    requestName: '',
                    requestType: 'Get',
                    api: 'http://www.baidu.com',
                    apiHeaders: [
                   {
                     key:"Content-Type",
                     value:"application/json"
                   }
                    ],
                    apiUrlParameter : [
              // {
              //     key:"",
              //     value:""
              // }
                    ],
                    apiAssertions:[

                    ],
                    apiVariables:[

                    ],
                    apiBodies:{
                        flag:"",
                        formData:[
                  // {
                  //     key:"",
                  //     value:""
                  // }
                        ],
                        urlEncoded:[
                    // {
                  //     key:"",
                  //     value:""
                  // }
                        ],
                        raw:{
                            key:"json",
                             value:"{}"
                        }
                    }
				};
                this.requestInfo.requests.push(requestInfo);
                // this.formDynamic.bank.push({value: ''});
                // this.formDynamic.payee.push({value: ''});
                // this.formDynamic.account.push({value: ''});
            },
            handleRemove (index) {
                this.requestInfo.requests.splice(index, 1);
                // this.formDynamic.payee.splice(index, 1);
                // this.formDynamic.account.splice(index, 1);
            }
        },
        mounted() {
            // if (this.createTestInfo.id !== ''){
            //     this
            // }
            this.createTestInfo = this.$route.params;
            console.log('xxxxxxxxxxxxxxxx')
            console.log(this.createTestInfo)
            if (this.createTestInfo.id !== ''){
                this.getTestCase()
            }else{
                this.requestInfo.testCaseName = this.createTestInfo.testCaseName;
                this.requestInfo.remarks = this.createTestInfo.remarks;
            }
            
            // this.getData();
        }
    }
</script>
<style lang="less" scoped>
    .remove {
        float: right;
        margin-right: 10px;
    }
    
    .bg-gray {
    color: #d3dce6;
    }
    .red{
        color: #f00;
    }
    h1, h4 {
        font-weight: normal;
    }
    .create_test_detail{
        position: relative;
    }

    .demo-spin-icon-load{
        animation: ani-demo-spin 2s linear infinite;
    }
</style>
