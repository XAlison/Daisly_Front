
import * as types from '../mutation-types'
import{requestLogin, getProjectList, getEnvironmentListPage, getAllCasesList, requestLoginOut, getAllCollections} from "../../api/api"

/**
 * 登陆
 * @param commit
 * @param user
 * @param point
 */
export const userLogin = ({ commit }, {user, point}) => {
    if (user) {
        requestLogin(user).then((res)=>{
            if (res.success == 'FAILED'){
                point.$Message.error(res.error.message);
            }else{
                commit(types.USER_LOGIN, res.data)
                point.$router.push({path: '/'});
            }
        }).catch(()=>{
             point.$Message.error("网络错误");
        })
    }
}

/**
 * 用戶退出
 * @param commit
 */
export const userOut = ({ commit }, point) => {
    requestLoginOut().then((res)=>{
         if (res.success == 'FAILED'){
             point.$Message.error(res.error.message);
         }else{
             commit(types.USER_OUT)
             point.$router.push({path: '/login'});
         }
    });
}

/**
 * 查询项目列表
 * @param commit
 * @param point
 */
export const getProjectsList = ({ commit }, point) => {
    getProjectList().then((res)=>{
        if (res.success == 'FAILED'){
            point.$Message.error(res.error.message);
        }else{
            point.$Message.success("访问成功");
            commit(types.GET_PROJECTLIST, res);
        }
    }).catch(res=>{
        point.$Message.error(res);
    })
}

/**
 * 设置当期项目
 * @param commit
 * @param currentProjectId
 */
export const setCurrentProject = ({ commit }, currentProjectId) => {
    commit(types.SET_CURRENT_PROJECT, currentProjectId);
}

/**
 * 获取环境变量
 * @param commit
 * @param point
 */
export const getEnvironments = ({ commit,state }, point) => {
     var param = {'projectId':state.Project.currentProjectId}
     getEnvironmentListPage(param).then((res)=>{
            if (res.success == 'FAILED'){
                point.$Message.error(res.error.message)
            }else{
                commit(types.GET_ENVIRONMENTS, res)
            }
        }).catch(()=>{
             point.$Message.error("网络错误")
        })
}

//ADD_ENVIRONMENT

/**
 * 添加环境变量
 * @param commit
 * @param point
 */
export const addEnvironment = ({ commit,state }, environment) => {
     commit(types.ADD_ENVIRONMENT, environment)
}

/**
 * 删除环境变量
 * @param commit
 * @param point
 */
export const removeEnvironment = ({ commit,state }, index) => {
     commit(types.REMOVE_ENVIRONMENT, index)
}

/**
 * 设置创建测试用例信息
 * @param commit
 * @param data
 */
export const setCreateTestInfo = ({ commit }, data) => {
    commit(types.SET_CREATETEST_INFO, data);
}

/**
 * 获取所有测试用例
 * @param commit
 * @param state
 * @param point
 */
export const setAllTestCases = ({commit, state}, point) =>{
    var para = {'projectId':state.Project.currentProjectId}
    point.$Loading.start();
    getAllCasesList(para).then((res) => {
         point.$Loading.finish();
         if (res.success == 'FAILED'){
             point.$Message.error(res.error.message)
        }else{
             commit(types.SET_ALL_TEST_CASES, res.data)
        }
    }).catch(()=>{
        point.$Message.error("网络错误，请重试");
    });
}

/**
 * 设置当期执行测试用例信息
 * @param commit
 * @param testCase
 */
export const setCurrentTestCaseInfo = ({ commit }, testCase) => {
    commit(types.SET_CURRENT_TEST_CASE_INFO, testCase);
}

/**
 * 获取所有测试集合
 * @param commit
 * @param state
 * @param point
 */
export const setAllCollections = ({commit, state}, point) =>{
    var para = {'projectId':state.Project.currentProjectId}
    point.$Loading.start();
    getAllCollections(para).then((res) => {
        point.$Loading.finish();
        if (res.success == 'FAILED'){
            point.$Loading.error();
            point.$Message.error(res.error.message)
        }else{
            commit(types.SET_ALL_COLLECTIONS, res.data)
        }
        }).catch(()=>{
            point.$Message.error("网络错误，请重试");
        });
}

/**
 * 设置当期执行测试用例信息
 * @param commit
 * @param testCase
 */
export const setCurrentCollectionInfo = ({ commit }, collection) => {
    commit(types.SET_CURRENT_COLLECTION_INFO, collection);
}

/**
 * 设置当期测试集合结果信息
 * @param commit
 * @param testCase
 */
export const setCurrentCollectionResultInfo = ({ commit }, collectionResult) => {
    commit(types.SET_CURRENT_COLLECTION_RESULT_INFO, collectionResult);
}

/**
 * 设置当期测试结果信息
 * @param commit
 * @param testCase
 */
export const setCurrentTestCaseResultInfo = ({ commit }, testCaseResult) => {
    commit(types.SET_CURRENT_TEST_CASE_RESULT_INFO, testCaseResult);
}
