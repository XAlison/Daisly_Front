<style src="../../assets/less/login.less" lang="less"></style>
<template>
    <div class="large-header" id="home">
        <canvas id="canvas" class="canvas"></canvas>
        <div class="login-box">
            <div class="top">
                <span class="lb" @click="showScan" :class="{ act: account }">帐号登陆</span>
                <span @click="showAccount" :class="{ act: scan }">扫码登陆</span>
            </div>

            <div class="account-box" v-show="account">

                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
                    <Form-item prop="userName">
                        <Input type="text" v-model="formValidate.userName" placeholder="帐号"
                               @on-enter="handleSubmit('formValidate')"></Input>
                    </Form-item>

                    <Form-item prop="password">
                        <Input type="password" v-model="formValidate.password" placeholder="密码"
                               @on-enter="handleSubmit('formValidate')"></Input>
                    </Form-item>

                    <Form-item prop="verificationCode">
                        <Input type="text" v-model="formValidate.verificationCode" placeholder="验证码"
                               @on-enter="handleSubmit('formValidate')"></Input>
                        <img :src="verifyUrl" @click="refreshVerify()" class="code-img" title="点击切换验证码">
                    </Form-item>

                    <div class="login-loading" v-show="login_loading">
                        <Spin fix class="spin">
                            <Icon type="load-c" size=18 class="spin-icon-load"></Icon>
                            <div>登陆中...</div>
                        </Spin>
                    </div>

                    <Form-item v-show="!login_loading">
                        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                    </Form-item>

                </Form>

            </div>

            <div class="scan-box" v-show="scan">
                <div class="position">
                    <img src="../../assets/images/wechat_pic.png" alt="">
                    <div class="tip-msg">打开微信 扫描二维码</div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import {canvas} from '../../libs/canvas/star';
    import {mapActions} from 'vuex';
    import { mapGetters } from 'vuex'
    // import {sessionRouters, filterRouters} from '../../router';

    export default {
        beforeCreate: function () {
        	//todo 后期更改成flex box 自适应
            document.getElementsByTagName("body")[0].className = "login_body";
            //计算屏幕高度宽度 让其自适应
            document.getElementsByTagName('body')[0].style.width = window.innerWidth + 'px';
            document.getElementsByTagName('body')[0].style.height = window.innerHeight + 'px';
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                // 通过 `vm` 访问组件实例'
                //解决进入路由不刷新验证码问题
                vm.verifyUrl = 'http://localhost:8090/getImgCode?v=' + Math.random() * 1000;
            })
        },
        data() {
            const validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (value.length < 6 || value.length > 32) {
                        callback(new Error('密码长度6-32个字符'));
                    }
                    callback();
                }
            }
            const validateCode = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('验证码不能为空'));
                }
                let reg = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;
                if (!reg.test(value)) {
                    callback(new Error('验证码只能中文数字'));
                } else {
                    callback();
                }
            };
            return {
                formValidate: {
                    userName: '',
                    password: '',
                    verificationCode: ''
                },
                ruleValidate: {
                    userName: [
                        {required: true, message: '帐号不能为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'},
                        {validator: validatePassword, trigger: 'blur'}
                    ],
                    verificationCode: [
                        {required: true, message: '验证码不能为空', trigger: 'blur'},
                        {validator: validateCode, trigger: 'blur'}
                    ]
                },
                account: true,
                scan: false,
                verifyUrl: '',
                login_loading: false
            }
        },
        methods: {
            // ...mapActions(['mainMenu', 'userLogin', 'auth']),
            showAccount() {
                this.scan = true;
                this.account = false;
            },
            showScan() {
                this.account = true;
                this.scan = false;
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        var user = this.formValidate;
                        var point = this;
                        this.$store.dispatch('userLogin', {user, point});
                        // if ()
                        // this.$router.push({path: '/'});
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            refreshVerify() {
                this.verifyUrl = '';
                setTimeout(() => {
                    this.verifyUrl = 'http://localhost:8090/getImgCode?v=' + Math.random() * 1000;
                }, 100);
            }
        },
        //挂载执行
        mounted() {
            canvas();
        },
        components: {},
        beforeDestroy: function () {
            //销毁移除
            document.body.removeAttribute("class", "login_body");
        }
    }
</script>
