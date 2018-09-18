<template>
<div class="vv">
        <Row>
            <Col span="24">
                <div style="background-color: #fff; box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15); border: 1px solid #e3e8ee; padding: 10px; margin-bottom: 15px;">
                    <div class="title" style="font-size: 10px; height: 40px; line-height: 30px;">TOKEN</div>
                    <h4>您可以使用一个用户令牌来代替用户登录,这样增加了安全性，不会让您的账户和密码被人劫持</h4>
                        <Row style="margin-top: 20px">
                            <Col span='10'>
                                <Button type="ghost" long :loading="modalLoadingCreateToken" icon="android-add" @click="createToken" >新建</Button>
                            </Col>
                        </Row>
                         <Card v-if="displayToken" style="margin-top: 20px">
                             <Row :gutter="16">
                                <Col span='24'>
                                    <h4 class="red" style="margin-bottom: 20px">token您只能看见一次，请尽快复制保存</h4>
                                </Col>
                                <Col span='5'>
                                    <Input v-model="token" type="password"></Input>
                                </Col>
                                <Col span='2'>
                                    <Button type="ghost"
                                    v-clipboard:copy="token"
                                    v-clipboard:success="onCopy"
                                    v-clipboard:error="onError">复制
                                    </Button>
                                </Col>
                            </Row>
                        </Card>
                </div>
            </Col>
        </Row>
        <Row>
            <Col span="24">
                <div style="background-color: #fff; box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15); border: 1px solid #e3e8ee; padding: 10px; margin-bottom: 15px;">
                    <div class="title" style="font-size: 10px; margin-bottom: 10px; height: 50px; line-height: 30px;">修改密码</div>
                   <Row>
                       <Form ref="password" :model="password" :rules="rulePasswd" :label-width="80">
                            <FormItem label="旧密码" prop="oldPasswd">
                                <Input type="password" v-model="password.oldPasswd"></Input>
                            </FormItem>
                            <FormItem label="新密码" prop="newPasswd">
                                <Input type="password" v-model="password.newPasswd"></Input>
                            </FormItem>
                            <FormItem label="确认密码" prop="passwdCheck">
                                <Input type="password" v-model="password.passwdCheck"></Input>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="handleSubmit('password')" :loading="modalLoadingChangePassWd">提交</Button>
                                <Button type="ghost" @click="handleReset('password')" style="margin-left: 8px">重置</Button>
                            </FormItem>
                        </Form>
                   </Row>
                </div>
            </Col>
        </Row>
        
    </div>
</template>

<script>
    import {createTokenApi,changePassWd} from '../../api/api'
    export default{
        name: 'MyAccount',
        data (){
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                }else if(value.length < 6){
                    callback(new Error('密码长度不能小于６位'));
                }else if (value !== this.password.newPasswd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            const validateOldPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                }else if(value.length < 6){
                    callback(new Error('密码长度不能小于６位'));
                } else {
                    // if (this.password.oldPasswd !== '') {
                    //     // 对第二个密码框单独验证
                    //     this.$refs.password.validateField('oldPasswd');
                    // }
                    callback();
                }
            };
            const validateＮewPasswd = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('新密码不能为空'));
                }else if(value.length < 6){
                    callback(new Error('密码长度不能小于６位'));
                }else{
                    callback();
                }
            };
            return {
                password:{
                    oldPasswd:'',
                    newPasswd: '',
                    passwdCheck: ''
                },
                token: '',
                displayToken: false,
                modalLoadingCreateToken: false,
                modalLoadingChangePassWd: false,
                rulePasswd: {
                    oldPasswd: [
                        { validator: validateOldPass, trigger: 'blur' }
                    ],
                    passwdCheck: [
                        { validator: validatePassCheck, trigger: 'blur' }
                    ],
                    newPasswd: [
                        { validator: validateＮewPasswd, trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            createToken(){
              let _this = this;
              let _params = {}
              _this.modalLoadingCreateToken = true
              createTokenApi(_params).then((res)=>{
                  _this.$Loading.start();
                  _this.modalLoadingCreateToken = false
                    if (res.success == 'FAILED'){
                        _this.$Loading.error();
                        _this.$Message.error(res.error.message)
                    }else{
                        _this.$Loading.finish();
                        _this.displayToken = true;
                        _this.token = res.data
                        console.log(_this.token)
                    }
              }).catch(()=>{
                  _this.$Loading.error();
                   _this.modalLoadingCreateToken = false
                    _this.$Message.error('网络错误，请稍后再试')
              })
            },
            onCopy: function (e) {
                this.$Message.info("复制TOKEN:" + e.text + "成功")
            },
            onError: function (e) {
                this.$$Message.error("复制错误－" + e.text)
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let _this = this;
                        let _params = _this.password
                        _this.modalLoadingChangePassWd = true
                        _this.$Loading.start();
                        changePassWd(_params).then((res)=>{
                        _this.modalLoadingChangePassWd = false
                        if (res.success == 'FAILED'){
                            _this.$Loading.error();
                            _this.$Message.error(res.error.message)
                        }else{
                             _this.$Loading.finish();
                            _this.$Message.success('修改密码成功，下次登录请用新密码')
                        }}).catch(()=>{
                             _this.$Loading.error();
                             _this.modalLoadingChangePassWd = false
                            _this.$Message.error('网络错误，请稍后再试')
                        })
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
          
        },
        mounted:function(){
        }
    }
</script>

<style lang="less" scoped>
    h1 {
        font-weight: normal;
    }
    h2 {
        font-weight: normal;
    }
    h4 {
        font-weight: normal;
    }
    .red{
        color: #f00;
    }
    .bg-gray {
        color: #d3dce6;
    }
</style>