
import * as types from '../mutation-types'

const state = {
    environments: JSON.parse(sessionStorage.getItem('ENVIRONMENTS')) || [],
}

const getters = {
    environments : state => state.environments,
}

const mutations = {
    // window.localStorage
    //获取项目列表
    [types.GET_ENVIRONMENTS] (state, environments) {
        sessionStorage.setItem('ENVIRONMENTS', JSON.stringify(environments.data))
        state.environments = environments.data
    },

    [types.REMOVE_ENVIRONMENT](state, index){
        sessionStorage.removeItem('ENVIRONMENTS')
        state.environments.splice(index,1)
    },

    [types.ADD_ENVIRONMENT](state, environment){
        sessionStorage.getItem('ENVIRONMENTS')
        var en = state.environments;
        en.push(environment);
        sessionStorage.setItem('ENVIRONMENTS', JSON.stringify(en))
        state.environments = en
    }
}

export default {
    state,
    getters,
    mutations
}
