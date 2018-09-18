
import * as types from '../mutation-types'
// projectList: JSON.parse(window.localStorage.getItem('Projects')) || {},
const state = {
    projectList: JSON.parse(sessionStorage.getItem('PROJECTS')) || [],
    currentProjectId: sessionStorage.getItem('CurrentProjectId') || ''
}

const getters = {
    allProjects : state => state.projectList,
    currentProjectId: state => state.currentProjectId 
}

const mutations = {
    // window.localStorage
    //获取项目列表
    [types.GET_PROJECTLIST] (state, projects) {
        // window.localStorage.setItem('Projects', JSON.stringify(projects.data))
        sessionStorage.setItem('PROJECTS', JSON.stringify(projects.data))
        state.projectList = projects.data
    },
    [types.SET_CURRENT_PROJECT] (state, id){
        sessionStorage.setItem('CurrentProjectId', id)
        state.currentProjectId = id
    }
}

export default {
    state,
    getters,
    mutations
}
