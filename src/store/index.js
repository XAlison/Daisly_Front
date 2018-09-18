/**
 * Created by tzl on 2017/7/2.
 * Author: tzl
 * QQ: 726844704
 *
 * 《江畔独步寻花》· 杜甫
 * 黄四娘家花满蹊，千朵万朵压枝低。
 * 留连戏蝶时时舞，自在娇莺恰恰啼。
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
// import * as getters from './getters';
import User from './modules/user'
import Project from './modules/project'
import Environment from './modules/environment'
import TestCase from './modules/testcase'
import Collection from './modules/collection'

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production', //在非生产环境下，使用严格模式
    actions,
    modules: {
        User,
        Project,
        Environment,
        Collection,
        TestCase
    }
})