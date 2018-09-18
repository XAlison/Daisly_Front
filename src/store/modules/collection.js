
import * as types from '../mutation-types'

const state = {
    collections: JSON.parse(sessionStorage.getItem('COLLECTIONS')) || [],
    currentCollectionInfo: JSON.parse(sessionStorage.getItem('COLLECTION')) || {},
    currentCollectionResultInfo: JSON.parse(sessionStorage.getItem('CURRENTCOLLECTIONRESULTINFO')) || {},
}
// JSON.parse(sessionStorage.getItem('User')) || {},
const getters = {
    collections: state => state.collections,
    currentCollectionInfo: state => state.currentTestCollectionInfo
}

const mutations = {
    // window.localStorage
      //设置当前操作测试用例信息
    [types.SET_CURRENT_COLLECTION_INFO] (state, collection) {
        sessionStorage.setItem('COLLECTION', JSON.stringify(collection))
        state.currentCollectionInfo = JSON.parse(sessionStorage.getItem('COLLECTION'))
    },
    //获得测试用例信息
    [types.SET_ALL_COLLECTIONS] (state, collections) {
        sessionStorage.setItem('COLLECTIONS', JSON.stringify(collections))
        state.collections = JSON.parse(sessionStorage.getItem('COLLECTIONS'))
        // state.testCases = testCases
    },
        //获得测试用例信息
    [types.SET_CURRENT_COLLECTION_RESULT_INFO] (state, collectionResult) {
        sessionStorage.setItem('CURRENTCOLLECTIONRESULTINFO', JSON.stringify(collectionResult))
        state.currentCollectionResultInfo = JSON.parse(sessionStorage.getItem('CURRENTCOLLECTIONRESULTINFO'))
        // state.testCases = testCases
    }
}

export default {
    state,
    getters,
    mutations
}
