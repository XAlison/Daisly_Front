<template>
  <div class="hello">
    <h1>{{title}}</h1>
    <Form ref="data" :model="data" :rules="ruleValidate" :label-width="100" style="margin-top:40px">
        <Form-item label="测试集合名" prop="collectionName">
            <Input v-model="data.collectionName" placeholder="请输入测试集合名"></Input>
        </Form-item>
        <Form-item label="测试用例" prop="testCaes">
            <Select v-model="data.testCases" multiple>
                <Option v-for="item in testCases" :value="item.id" :key="item.id">{{ item.testCaseName }}</Option>
            </Select>
        </Form-item>
        <Form-item label="环境变量" prop="environmentId">
            <Select v-model="data.environmentId">
                <Option v-for="item in environments" :value="item.id" :key="item.id">{{ item.environmentName }}</Option>
            </Select>
        </Form-item>
        <Form-item label="描述" prop="remarks">
            <Input v-model="data.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
        </Form-item>
        <Form-item>
            <Button type="primary" @click="handleSubmit('data')" :disabled='isDisabled'>更新测试集合</Button>
            <Button type="ghost" @click="handleReset('data')"  :disabled='isDisabled' style="margin-left: 8px">重置</Button>
        </Form-item>
    </Form>
　</div>
</template>

<script>
import {mapGetters} from 'vuex';
import {mapActions} from 'vuex';
import {updateCollection} from '../api/api'
export default {
  name: 'CreateTest',
  data () {
    return {
      title: '编辑测试集',
      isDisabled:false,
      data:{
          id: '',
          collectionName:'',
          projectId: this.projectId,
          environmentId:'',
          testCases:[],
          remarks:''
      },
      ruleValidate: {
            collectionName: [
                { required: true, message: '测试集合名不能为空', trigger: 'blur' }
            ]
        }
    }
  },
  methods:{
      handleSubmit (name) {
          this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$loading();
                    updateCollection(this.data).then((res)=>{
                       this.$loading.close();
                        if (res.success == 'FAILED'){
                            this.$Message.error(res.error.message);
                        }else{
                            this.$Message.success("更新成功");
                            // this.$router.push({path: '/'});
                        }
                    }).catch(()=>{
                        this.$Message.success("网络错误");
                         this.$loading();
                    })
                    // this.$store.dispatch('setCreateTestInfo', this.data)
                    // this.$router.push({path: '/createtestdetail'})
                } else {
                    // this.$Message.error('测试用例名不能为空');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields()
            this.data.testCases = []
        }
  },
   computed:{
        testCases:{
            get:function(){
                return this.$store.state.TestCase.testCases;
            }
        },
        environments: {
            get:function(){
                return this.$store.state.Environment.environments;
            }
        },
        projectId: {
            get:function(){
                this.data.projectId = this.$store.state.Project.currentProjectId
                return this.$store.state.Project.currentProjectId;
            }
        },
    },
  mounted() {
       if (this.projectId == ''){
            this.$Message.warning("请选择项目");
            this.isDisabled = true;
        }else{
             var _this=this;
            _this.data = _this.$route.params;
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
