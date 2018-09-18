import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Home from '@/components/home'
import Statistics from '@/components/statistics'
import OverView from '@/components/overview'
import Project from '@/components/project'
import Environment from '@/components/environment.vue'
import AllTest from '@/components/alltest.vue'
import CreateTest from '@/components/createtest.vue'
import CreateTestDetail from '@/components/createtestdetailnew.vue'
import TestCaseResult from '@/components/testcaseresult.vue'
import TestCaseResultTable from '@/components/testCaseResultTable.vue'
import CreateCollection from '@/components/CreateCollection.vue'
import TestCaseResultOverview from '@/components/TestCaseResultOverview.vue'
import CollectionResultOverview from '@/components/CollectionResultOverview.vue'
import AllCollections from '@/components/AllCollections.vue'
import UpdateCollection from '@/components/UpdateCollection.vue'
import CollectionTestCase from '@/components/CollectionTestCase.vue'
import CollectionResultTable from '@/components/CollectionResultTable.vue'
import CollectionResultDetail from '@/components/CollectionResultDetail.vue'
import MyAccount from '@/components/login/MyAccount.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login', 
      hidden: true,
      component: Login
    },
        {
      path: '/',
      name: 'Home',
      component: Home,
      leaf:true,
      iconSize:5,
      alias:"首页",
      children: [
            { path: '/', hidden: true, icon:"home" ,component: OverView, name: 'OverView', alias:"首页" }
      ]
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      hidden: true,
      children: [
            { path: '/setting/personal', hidden: true ,component: MyAccount, name: 'MyAccount'}
      ]
    },
    {
      path: '/',
      name: 'Home',
      leaf:true,
      alias:"首页",
      icon:"clipboard",
      component: Home,
      children: [
            { path: '/project', icon:"clipboard", component: Project, name: 'Project', alias:"项目管理" }
      ]
    },
    {
      path: '/',
      name: 'Home',
      alias:"首页",
      leaf: true,
      component: Home,
      children: [
            { path: '/environment', icon:"gear-a", alias:"环境变量管理",　component: Environment, name: 'Environment'}
      ]
    },
    {
      path: '/',
      name: 'Home',
      hidden: true,
      component: Home,
      children: [
            { path: '/createtestdetail', component: CreateTestDetail, name: 'CreateTestDetail' }
      ]
    },
    {
      path: '/',
      name: 'Home',
      alias:"测试管理",
      icon: "paper-airplane",
      component: Home,
      children: [
            { path: '/alltest', alias:"所有测试",　component: AllTest, name: 'AllTest' },
            { path: '/createtest', alias:"创建测试",　component: CreateTest, name: 'CreateTest' }
      ]
    },
    // {
    //   path: '/',
    //   name: 'Home',
    //   component: Home,
    //   children: [
    //         { path: '/createtest', component: CreateTest, name: '创建测试' }
    //   ]
    // },
    {
      path: '/',
      name: 'Home',
      hidden:true,
      component: Home,
      children: [
            { path: '/testcaseresult', component: TestCaseResult, name: 'CaseResultViewer' }
      ]
    },
    {
      path: '/',
      name: 'Home',
      hidden:true,
      component: Home,
      children: [
            { path: '/result_table', component: TestCaseResultTable, name: 'ResultTable' }
      ]
    },
    // {
    //   path: '/',
    //   name: 'Home',
    //   component: Home,
    //   children: [
    //         { path: '/create_collection', component: CreateCollection, name: 'CreateCollection' }
    //   ]
    // },
    {
      path: '/',
      name: 'Home',
      hidden:true,
      component: Home,
      children: [
            { path: '/test_case_result_overview', component: TestCaseResultOverview, name: 'TestCaseResultOverview' }
      ]
    },
        {
      path: '/',
      name: 'Home',
      hidden:true,
      component: Home,
      children: [
            { path: '/collection_result_overview', component: CollectionResultOverview, name: 'CollectionResultOverview' }
      ]
    },
    {
      path: '/',
      name: 'Home',
      alias: '测试集合',
      icon: "soup-can-outline",
      component: Home,
      children: [
            { path: '/all_collections', alias: '所有集合', component: AllCollections, name: 'AllCollections' },
            { path: '/create_collection', alias: '创建集合',　component: CreateCollection, name: 'CreateCollection' }
      ]
    },
    {
      path: '/',
      name: 'Home',
      hidden:true,
      component: Home,
      children: [
            { path: '/edit_collection', component: UpdateCollection, name: 'UpdateCollection' }
      ]
    },
    {
      path: '/',
      name: 'Home',
      hidden:true,
      component: Home,
      children: [
            { path: '/collection_test_case', component: CollectionTestCase, name: 'CollectionTestCase' }
      ]
    },
    {
      path: '/',
      name: 'Home',
      hidden:true,
      component: Home,
      children: [
            { path: '/collection_result_table', component: CollectionResultTable, name: 'CollectionResultTable' }
      ]
    },
    {
      path: '/',
      name: 'Home',
      hidden:true,
      component: Home,
      children: [
            { path: '/collection_result_detail', component: CollectionResultDetail, name: 'CollectionResultDetail' }
      ]
    }
  ]
})
