
import * as types from '../mutation-types'

const state = {
    user: JSON.parse(sessionStorage.getItem('USER')) || {},
}

const mutations = {
    // window.localStorage
    //登陆
    [types.USER_LOGIN] (state, user) {
        console.log(user)
        sessionStorage.setItem('USER', JSON.stringify(user))
        state.user = user
    },
    //退出
    [types.USER_OUT] (state) {
        sessionStorage.removeItem('USER')
        state.user = {}
    }
}

export default {
    state,
    mutations
}
