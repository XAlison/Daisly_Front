
import * as types from '../mutation-types'

const state = {
    // projectList: [],
    createTestInfo: {},
    testCases: JSON.parse(sessionStorage.getItem('TestCases')) || [],
    currentTestCaseInfo: JSON.parse(sessionStorage.getItem('TestCase')) || {},
    currentTestCaseResultInfo: JSON.parse(sessionStorage.getItem('TestCaseResult')) || {},
}
// JSON.parse(sessionStorage.getItem('User')) || {},
const getters = {
    createTestInfo : state => state.createTestInfo,
    testCases: state => state.testCases,
    currentTestCaseInfo: state => state.currentTestCaseInfo
}

const mutations = {
    // window.localStorage
    //设置创建测试用例信息（包括测试用例名和测试用例描述）
    [types.SET_CREATETEST_INFO] (state, createTestInfo) {
        state.createTestInfo = createTestInfo
    },
      //设置当前操作测试用例信息
    [types.SET_CURRENT_TEST_CASE_INFO] (state, testCase) {
        sessionStorage.setItem('TestCase', JSON.stringify(testCase))
        state.currentTestCaseInfo = JSON.parse(sessionStorage.getItem('TestCase'))
    },
    //获得测试用例信息
    [types.SET_ALL_TEST_CASES] (state, testCases) {
        sessionStorage.setItem('TestCases', JSON.stringify(testCases))
        state.testCases = JSON.parse(sessionStorage.getItem('TestCases'))
        // state.testCases = testCases
    },
        //获得测试用例信息
    [types.SET_CURRENT_TEST_CASE_RESULT_INFO] (state, testCaseResult) {
        sessionStorage.setItem('TestCaseResult', JSON.stringify(testCaseResult))
        state.currentTestCaseResultInfo = JSON.parse(sessionStorage.getItem('TestCaseResult'))
        // state.testCases = testCases
    }
}

export default {
    state,
    getters,
    mutations
}
