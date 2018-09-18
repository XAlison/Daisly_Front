import axios from 'axios';

let base = '';
///loginOut.do /change_password
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };
export const requestLoginOut = params => { return axios.post(`${base}/loginOut`, params).then(res => res.data); };
export const checkLoginOrNot = params => { return axios.post(`${base}/checkLoginOrNot`, params).then(res => res.data); };
export const createTokenApi = params => { return axios.get(`${base}/createToken`, { params: params }).then(res => res.data); };
export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };
export const changePassWd = params => { return axios.post(`${base}/change_password`, params).then(res => res.data); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

//MockServer
export const getInterfacesServersPage = params => { return axios.get(`${base}/interfaceserver/listpage`, { params: params }).then(res => res.data); };


//project
export const getProjectList = () => { return axios.get(`${base}/project/list`).then(res => res.data); };

export const addOrUpdateProject = params => { return axios.post(`${base}/project/addOrUpdate`, params).then(res => res.data);  };

export const getProjectListPage = params => { return axios.post(`${base}/project/listpage`, params).then(res => res.data);  };

export const removeProjectById = params => {return axios.post(`${base}/project/remove`, params).then(res => res.data);  };

//Interface
export const getInterfacesPage = params => { return axios.post(`${base}/interface/listpage`, params).then(res => res.data); };
export const addOrUpdateInterface = params => { return axios.post(`${base}/interface/addOrUpdate`, params).then(res => res.data); };
export const removeInterfaceServer = params => { return axios.post(`${base}/interface/remove`,params).then(res => res.data); };
export const removeInterface = params => { return axios.post(`${base}/interface/remove`, params).then(res => res.data); };

//模型预发布
export const getModelConfigPage = params => { return axios.post(`${base}/model_config/listpage`, params).then(res => res.data); };
export const addOrUpdateModelConfig = params => { return axios.post(`${base}/model_config/addOrUpdate`, params).then(res => res.data); };
export const removeModelConfig = params => { return axios.post(`${base}/model_config/remove`,params).then(res => res.data); };
export const removeRunModel = params => { return axios.post(`${base}/model_config/run_model/remove`,params).then(res => res.data); };
export const runModel = params => { return axios.post(`${base}/model_config/run_model`,params).then(res => res.data); };
export const getRunModelDetailPage = params => { return axios.post(`${base}/model_config/run_model_detail/listpage`, params).then(res => res.data); };
export const getRunModelPage = params => { return axios.post(`${base}/model_config/run_model/listpage`, params).then(res => res.data); };
export const runAllModel = params => { return axios.post(`${base}/model_config/run_model/all`, params).then(res => res.data); };


export const getModelAuthConfigPage = params => { return axios.post(`${base}/model_config/auth/listpage`, params).then(res => res.data); };
export const addOrUpdateModelAuthConfig = params => { return axios.post(`${base}/model_config//auth/addOrUpdate`, params).then(res => res.data); };
export const removeModelAuthConfig = params => { return axios.post(`${base}/model_config/auth/remove`,params).then(res => res.data); };
export const getModelAuthValueLabel = params => { return axios.post(`${base}/model_config/auth/value_label`,params).then(res => res.data); };

//Cases
export const getCasesPage = params => {return axios.post(`${base}/case/listpage`, params).then(res => res.data); };

export const getCaseResult = params => {return axios.get(`${base}/case/test_case_result`, {params:params}).then(res => res.data); };

export const removeCase = params => {return axios.post(`${base}/case/remove`, params); };

export const saveAndRunCase = params => {return axios.post(`${base}/case/saveandrun`, params).then(res => res.data);};

export const reRunTestCase = params => {return axios.get(`${base}/case/re_run_testcase`, {params:params}).then(res => res.data);};

export const getTestCase = params => {return axios.get(`${base}/case/get_testcase`, {params:params}).then(res => res.data);};

export const getAllCasesList = params => {return axios.get(`${base}/case/allcases`, {params:params}).then(res => res.data);};

// result_detail
export const getResultDetail = params => {return axios.get(`${base}/case/result_detail`, {params:params}).then(res => res.data);};

export const reGetCaseByProjectName = params => {return axios.post(`${base}/case/regetcase`, params); };

export const reGetInterfaceByProjectId = params => {return axios.post(`${base}/case/regetinterface`, params).then(res => res.data); };

//Environment
export const addOrUpdateEnvironment = params => { return axios.post(`${base}/environment/addOrUpdate`, params).then(res => res.data);  };

export const getEnvironmentListPage = params => { return axios.get(`${base}/environment/list`, {params:params}).then(res => res.data);  };

export const removeEnvironmentById = params => {return axios.post(`${base}/environment/remove`, params).then(res => res.data);  };

//EnvironmentCollection
export const addOrUpdateEnvironmentCollection = params => { return axios.post(`${base}/environment_collection/addOrUpdate`, params).then(res => res.data);  };

export const getEnvironmentCollectionListPage = params => { return axios.get(`${base}/environment_collection/listpage`, params).then(res => res.data);  };

export const removeEnvironmentCollectionById = params => {return axios.post(`${base}/environment_collection/remove`, params).then(res => res.data);  };

//statistic
export const getTestCaseStatistic = params => {return axios.get(`${base}/statistic/testcase_statistic`, {params:params}).then(res => res.data);};
export const getCollectionStatistic = params => {return axios.get(`${base}/statistic/collection_statistic`, {params:params}).then(res => res.data);};

///collection_statistic

//collection
export const addCollection = params => { return axios.post(`${base}/collection/add`, params).then(res => res.data);  };

export const updateCollection = params => { return axios.post(`${base}/collection/update`, params).then(res => res.data);  };

// get_all_collections
export const getAllCollections = params => { return axios.get(`${base}/collection/get_all_collections`, {params:params}).then(res => res.data);  };

// get_collection_test_case

export const getCollectionTestCase = params => { return axios.post(`${base}/collection/get_collection_test_case`, params).then(res => res.data);  };


// run_collection
export const runCollectionTestCases = params => { return axios.get(`${base}/collection/run_collection`, {params:params}).then(res => res.data);  };
///remove_test_case
export const removeCollectionTestCases = params => { return axios.get(`${base}/collection/remove_test_case`, {params:params}).then(res => res.data);  };
///get_collection_result
export const getCollectionResult = params => { return axios.get(`${base}/collection/get_collection_result`, {params:params}).then(res => res.data);  };


///get_collection_result
export const getCollectionResultDetail = params => { return axios.get(`${base}/collection/collection_result_detail`, {params:params}).then(res => res.data);  };

//collection_result_statistic
export const getCollectionResultStatistic = params => { return axios.get(`${base}/collection/collection_result_statistic`, {params:params}).then(res => res.data);  };

export const removeTestSuitById = params => {return axios.post(`${base}/test_suit/remove`, params).then(res => res.data);  };

export const getCasesByProjectName = params => {return axios.post(`${base}/case/get_cases_by_project_name`, params).then(res => res.data);  };
