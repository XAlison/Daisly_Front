<template>
  <div class="hello">
    <h1>{{title}}</h1>
    <Form ref="formValidate" :model="data" :rules="ruleValidate" :label-width="100" style="margin-top:40px">
        <Form-item label="测试用例名" prop="testCaseName">
            <Input v-model="data.testCaseName" placeholder="请输入测试用例名"></Input>
        </Form-item>
        <Form-item label="描述" prop="remarks">
            <Input v-model="data.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
        </Form-item>
        <Form-item>
            <Button type="primary" @click="handleSubmit('formValidate')" :disabled='isDisabled'>创建测试用例</Button>
            <Button type="ghost" @click="handleReset('formValidate')"  :disabled='isDisabled' style="margin-left: 8px">重置</Button>
        </Form-item>
    </Form>
　</div>
</template>

<script>
import {mapGetters} from 'vuex';
import {mapActions} from 'vuex';
export default {
  name: 'CreateTest',
  data () {
    return {
      title: '创建测试用例',
      isDisabled:true,
      data:{
          id: '',
          testCaseName:'',
          remarks:''
      },
      ruleValidate: {
            testCaseName: [
                { required: true, message: '测试用例名不能为空', trigger: 'blur' }
            ]
        }
    }
  },
  methods:{
      handleSubmit (name) {
          this.$refs[name].validate((valid) => {
                if (valid) {
                    let _this = this;
                    var para = {name:'CreateTestDetail',params: {}}
                    para.params = this.data;
                    // this.$store.dispatch('setCreateTestInfo', this.data)
                    this.$router.push(para)
                } else {
                    // this.$Message.error('测试用例名不能为空');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        }
  },
  computed: {
        projectId: {
            get:function(){
                this.isDisabled = false;
                return this.$store.state.Project.currentProjectId;
            }
        }
  },
  mounted() {
       if (this.projectId == ''){
            this.$Message.warning("请选择项目");
            this.isDisabled = true;
        }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
