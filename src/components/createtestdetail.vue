<template>
    <Row>
        <Col span="24">
        <Form ref="requests" :model="requests" :rules="ruleValidate" :label-width="90">
            <Form-item v-show="requests.length !== 0">
            <Button type="primary" @click="handleSubmit('requests')">Save&Run</Button>
            <Button type="ghost" @click="handleReset('requests')" style="margin-left: 8px">Save</Button>
           </Form-item>
            <Row>
                <Col span="24" v-show="requests.length > 0">
                    <Form-item v-for="(item, index) in requests">
                        <Collapse v-model="value2" accordion>
                        <Panel name=index>
                            <!--class="icon icon-remove"-->
                        {{item.api}}<i class="remove"@click="handleRemove(index)"><Icon type="close"></Icon></i>
                        <Tabs value="name1"　slot="content">
                            <Tab-pane label="Requset" name="name1">
                                <label class="bg-gray">NAME</label>
                                <Row>
                                <Col span="4">
                                 <Form-item prop="requestName" label="" :rules="{required: true, message: '请求名不能为空', trigger: 'blur'}">
                                    <Input type="text" v-model="item.requestName" placeholder="请输入请求名"></Input>
                                 </Form-item>
                                 </Col>
                                </Row>
                                <label class="bg-gray">EndPoint</label>
                                <Row>
                                    <Col span="6">
                                         <Select v-model="item.requestType" style="width:140px">
                                            <Option v-for="item in optionsRequestType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                    </Col>
                                    <Col span="10">
                                        <Input type="text"  v-model="item.api" placeholder="请输入..."></Input>
                                    </Col>
                                </Row>
                                <label class="bg-gray">HEADERS</label>
                                <Row>
                                <Form-item　v-for="(item, indexHeader) in item.apiHeaders">
                                    <Row>
                                        <Col span="11" style="padding-right:10px">
                                            <Select
                                            v-model="item.key"
                                            filterable
                                            remote
                                            :remote-method="headerKeyMethod"
                                            :loading="loadingHeaderKey">
                                            <Option v-for="option in optionsHeaderKey" :value="option.value" :key="option.value">{{option.label}}</Option>
                                            </Select>
                                        </Col>
                                        <Col span="11">
                                            <Select
                                                v-model="item.value"
                                                filterable
                                                remote
                                                :remote-method="headerValueMethod"
                                                :loading="loadingHeaderValue">
                                            <Option v-for="option in optionsHeaderValue" :value="option.value" :key="option.value">{{option.label}}</Option>
                                            </Select>
                                        </Col>
                                        <Col span="2">
                                            <i  @click="deleteHeader(indexHeader,index)"><Icon type="close"></Icon></i>
                                        </Col>
                                    </Row>
                                </Form-item>
                                <div>
                                    <a class="remove" style="text-align: center;　float: left; color: #00a0e9" @click="addHeader(index)">+新增头部</a>
                                </div>
                                </Row>
                                <Row>
                                    <div>
                                        <label class="bg-gray">QUERYSTRING</label>
                                    </div>
                                    <Form-item　v-for="(item, urlParameterHeader) in item.apiUrlParameter">
                                        <Row>
                                        <Col span="11" style="padding-right:10px">
                                           <Input type="text" v-model="item.key" placeholder="name"></Input>
                                        </Col>
                                        <Col span="11">
                                           <Input type="text" v-model="item.value" placeholder="value"></Input>
                                        </Col>
                                        <Col span="2">
                                            <i  @click="deleteUrlParameter(urlParameterHeader,index)"><Icon type="close"></Icon></i>
                                        </Col>
                                        </Row>
                                    </Form-item>
                                    <div>
                                        <a class="remove" style="text-align: center;　float: left; color: #00a0e9" @click="addUrlParameter(index)">+新增Url参数</a>
                                   </div>  
                                </Row>
                                <Row>
                                     <Row>
                                     <a v-show = "isJsonBody" class="remove" style="text-align: center;　float: left; color: #00a0e9" @click="addFormData(index)">+新增Form Parameter</a>
                                     <a v-show = "item.apiBodies.formData.length == 0" class="remove" style="text-align: center;　float: left; color: #00a0e9" @click="addJsonBody(index)">+增加Json Body</a>
                                     </Row>
                                     <Form-item　v-for="(item, formDataIndex) in item.apiBodies.formData">
                                        <Row>
                                        <Col span="11" style="padding-right:10px">
                                           <Input type="text" v-model="item.key" placeholder="name"></Input>
                                        </Col>
                                        <Col span="11">
                                           <Input type="text" v-model="item.value" placeholder="value"></Input>
                                        </Col>
                                        <Col span="2">
                                            <i  @click="deleteFormData(formDataIndex,index)"><Icon type="close"></Icon></i>
                                        </Col>
                                        </Row>
                                    </Form-item>
                                    <vue-json-editor v-show = "!isJsonBody" v-model="item.apiBodies.raw.value" :showBtns="false"></vue-json-editor>
                                    <a v-show = "!isJsonBody" class="remove" style="text-align: center;　float: left; color: #00a0e9" @click="deleteJsonBody(index)">-删除Json Body</a>
                                </Row>
                                {{item.apiBodies.flag}}
                                {{item.apiBodies.raw.value}}
                                </br>
                                </br>
                            </Tab-pane>
                            <Tab-pane label="Assertions" name="name2">
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
                                <Form-item　style="margin-top:5px" v-for="(item, assertionsIndex) in item.apiAssertions">
                                        <Row>
                                        <Col span="5" style="padding-right:10px">
                                           <Input type="text" v-model="item.name" placeholder="测试返回状态码是否是200"></Input>
                                        </Col>
                                        <Col span="4">
                                             <Select v-model="item.source" style="width:190px">
                                                <Option v-for="item in sourceOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                             </Select>
                                        </Col>
                                        <Col span="4" style="padding-right:10px">
                                           <Input type="text" v-model="item.targetValue" placeholder="200"></Input>
                                        </Col>
                                        <Col span="4">
                                             <Select v-model="item.comparison" style="width:190px">
                                                <Option v-for="item in comparisonOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                             </Select>
                                        </Col>
                                        <Col span="4" style="padding-right:10px">
                                           <Input type="text" v-model="item.property" placeholder="实际值"></Input>
                                        </Col>
                                        <Col span="2">
                                            <i  @click="deleteAssertionData(assertionsIndex,index)"><Icon type="close"></Icon></i>
                                        </Col>
                                        </Row>
                                    </Form-item>
                                    <div>
                                        <a class="remove" style="text-align: center;　float: left; color: #00a0e9" @click="addAssertionData(index)">+新增断言</a>
                                   </div>  
                            </Tab-pane>
                            <Tab-pane label="Variables" name="name3">
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
                                <Form-item　style="margin-top:5px" v-for="(item, variableIndex) in item.apiVariables">
                                        <Row>
                                        <Col span="4">
                                            <Select v-model="item.source" style="width:190px">
                                                <Option v-for="item in sourceOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                            </Select>
                                        </Col>
                                        <Col span="4" style="padding-right:10px">
                                           <Input type="text" v-model="item.property" placeholder="取值"></Input>
                                        </Col>
                                        <Col span="4" style="padding-right:10px">
                                           <Input type="text" v-model="item.name" placeholder="变量名"></Input>
                                        </Col>
                                        <Col span="2">
                                            <i  @click="deleteVariableData(variableIndex,index)"><Icon type="close"></Icon></i>
                                        </Col>
                                        </Row>
                                    </Form-item>
                                    <div>
                                        <a class="remove" style="text-align: center;　float: left; color: #00a0e9" @click="addVariableData(index)">+新增断言</a>
                                   </div>  
                            </Tab-pane>
                        </Tabs>
                        </Panel>
                        </Collapse>
                    </Form-item>
                 </Col>
                <Col span="24" v-show="requests.length == 0" style="text-align: center; font-size: 20px; color: #00a0e9">至少新增一个请求</Col>
            </Row>
            <br>
            <Form-item>
                <Row type="flex" justify="center">
                    <Col span="12">
                    <Button type="dashed" long @click="handleAdd" icon="plus-round">新增</Button>
                    </Col>
                </Row>
            </Form-item>
        </Form>
        </Col>
        <Col span="8"></Col>
    </Row>

</template>
<script>
    import vueJsonEditor from 'vue-json-editor'
    export default {
        components: {
         //Brace
          vueJsonEditor
        },
        data () {
            return {
                optionsHeaderKey: [],
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
                requests:[],
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
                editForm: {
                    id: '',
                    requestName: '',
					projectName: '',
                    interfaceName: '',
                    caseName: '',
                    totalAssertions: 0,
                    dependencies: [],
                    requestType: 'Get',
                    api: 'http://www.baidu.com',
                    returnType: 'JSON',
					remarks: '',
                    apiHeaders: [
              //  {
              //     key:"",
              //     value:""
              //  }
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
                        flag:"formData",
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
				},
                //验证规则
                ruleValidate: {
                    amounts: [
                        {required: true, message: '充值金额不能为空', trigger: 'blur'},
                        {validator: validateAmounts, trigger: 'blur'}
                    ],
                    pay_type: [
                        {required: true, type: 'array', min: 1, message: '至少选择一种充值方式', trigger: 'change'},
                        {type: 'array', max: 2, message: '最多选择两个充值方式', trigger: 'change'}
                    ],
                }
            }
        },
        methods: {
            //header 操作
            addHeader(index){
                let request = this.requests[index];
                let headerSize = request.apiHeaders.length;
                request.apiHeaders.splice(headerSize + 1, 0,
                {key: "", value: ""});
            },
            deleteHeader(indexHeader,index){
                 let request = this.requests[index];
                 request.apiHeaders.splice(indexHeader, 1);
            },
              //urlParameter 操作
            addUrlParameter(index){
                let request = this.requests[index];
                let apiUrlParameterSize = request.apiUrlParameter.length;
                request.apiUrlParameter.splice(apiUrlParameterSize + 1, 0,
                {key: "", value: ""});
            },
            deleteUrlParameter(urlParameterHeader, index){
                let request = this.requests[index];
                request.apiUrlParameter.splice(urlParameterHeader, 1);
            },
            //form-data
            addFormData(index){
                let request = this.requests[index];
                request.apiBodies.flag="formData"
                let formDataSize = request.apiBodies.formData.length;
                request.apiBodies.formData.splice(formDataSize + 1, 0,
               {key: "", value: ""});
            },
            deleteFormData(formDataIndex, index){
                let request = this.requests[index];
                request.apiBodies.formData.splice(formDataIndex, 1);
                if (request.apiBodies.formData.length == 0){
                    request.apiBodies.flag=""
                }
            },
            addJsonBody(index){
                this.isJsonBody = false;
                let request = this.requests[index];
                request.apiBodies.flag="raw"
                
            },
            deleteJsonBody(index){
                this.isJsonBody = true;
                let request = this.requests[index];
                request.apiBodies.raw.value="{}"
                request.apiBodies.flag=""
            },
            //assertion
            addAssertionData(index){
                let request = this.requests[index];
                let assertionLength = request.apiAssertions.length;
                request.apiAssertions.splice(assertionLength + 1, 0,
                {name: "", source: "",property:"",comparison:"",targetValue:""});
                this.request.totalAssertions = this.request.totalAssertions + 1;
            },
            deleteAssertionData(assertionsIndex, index){
                let request = this.requests[index];
                request.apiAssertions.splice(assertionsIndex, 1);
                this.request.totalAssertions = this.request.totalAssertions - 1;
            },
            //变量
            addVariableData(index){
                let request = this.requests[index];
                let variablesSize = request.apiVariables.length;
                request.apiVariables.splice(variablesSize + 1, 0,
               {name: "", source: "",property:""});
            },
            deleteVariableData(variablesIndex, index){
                let request = this.requests[index];
                request.apiVariables.splice(variablesIndex, 1);
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.request("AdminSystemBank", this.formDynamic, '保存中...').then((res) => {
                            if (res.status) {
                                this.$Message.success(res.msg);
                            } else {
                                this.$Message.error(res.msg);
                            }
                        }).catch((err) => {
                            this.$Message.error('系统服务出错');
                        })
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
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
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            handleAdd () {
                var requestInfo = {
                    id: '',
                    requestName: '',
					projectName: '',
                    interfaceName: '',
                    caseName: '',
                    dependencies: [],
                    requestType: 'Get',
                    api: 'http://www.icekredit.com',
                    returnType: 'JSON',
					remarks: '',
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
                this.requests.push(requestInfo);
                // this.formDynamic.bank.push({value: ''});
                // this.formDynamic.payee.push({value: ''});
                // this.formDynamic.account.push({value: ''});
            },
            handleRemove (index) {
                this.requests.splice(index, 1);
                // this.formDynamic.payee.splice(index, 1);
                // this.formDynamic.account.splice(index, 1);
            },
            //拉取数据
            getData () {
                this.apiGet('/admin/system/bank_account', {}, '获取中...').then((res) => {
                    if (res.status && res.data && typeof res.data.length != 'number') {
                        this.formDynamic.amounts = res.data.amounts;
                        this.formDynamic.desc = res.data.desc;
                        this.formDynamic.pay_type = res.data.pay_type;
                        for (let item of res.data.banks) {
                            this.formDynamic.account.push({'value': item.account});
                            this.formDynamic.bank.push({'value': item.bank});
                            this.formDynamic.payee.push({'value': item.payee});
                        }
                    } else {
                        this.$Message.success(res.msg);
                    }
                });
            },
        },
        mounted() {
            this.getData();
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
</style>
