import axios from './axios'

// 首页分类浏览列表
export const getClassBrowseList = (params) =>{  
  return axios.request({
    url:'/index',
    method: 'post',
    data: params
  })
}
// =================  知识库平台api  ↓ ==================

// 文献默认首页
export const getEsIndex = (params) =>{
  return axios.request({
    url:'/es-index',
    method: 'post',
    data: params
  })
}
// 文献首页普通检索右侧推荐
export const getSingleRecommendDisease = (params) =>{
  return axios.request({
    url:'/es-single-recommend-disease',
    method: 'post',
    data: params
  })
}
// 文献详情页
export const literatureDetails = (params) =>{
  return axios.request({
    url:'/es-detail',
    method: 'post',
    data: params
  })
}
// 文献首页搜索
export const literatureDocSearch = (params) =>{
  return axios.request({
    url:'/doc-search',
    method: 'post',
    data: params
  })
}
// 期刊分析首页
export const journalAnalysisIndex = (params) =>{
  return axios.request({
    url:'/es-album-index',
    method: 'post',
    data: params
  })
}
// 期刊详情页
export const journalAnalysisDetail = (params) =>{
  return axios.request({
    url:'/es-album-detail',
    method: 'post',
    data: params
  })
}
// 文献搜索历史记录
export const getliteratureHistory = (params) =>{
  return axios.request({
    url:'/es-history',
    method: 'post',
    data: params
  })
}
// 期刊详情相关文献
export const getalbumRecommend = (params) =>{
  return axios.request({
    url:'/album-recommend',
    method: 'post',
    data: params
  })
}
// 文献详情页相关文献
export const getdocRecommend = (params) =>{
  return axios.request({
    url:'/doc-recommend',
    method: 'post',
    data: params
  })
}
//点击收藏
export const clickCollection = (params) =>{
  return axios.request({
    url:'/es-collection',
    method: 'post',
    data: params
  })
}
// 查看我的收藏
export const getMyCollection = (params) =>{
  return axios.request({
    url:'/es-my-collection',
    method: 'post',
    data: params
  })
}
// 文献首页---- 换一批
export const getRandomDoc = (params) =>{
  return axios.request({
    url:'/es-random-doc',
    method: 'post',
    data: params
  })
}
// 学者分析首页列表
export const getAuthorIndex = (params) =>{
  return axios.request({
    url:'/es-author-index',
    method: 'post',
    data: params
  })
}
// 学者分析详情页 -- 分析接口
export const getAnalysisDetail = (params) =>{
  return axios.request({
    url:'/es-author-detail',
    method: 'post',
    data: params
  })
}
// 学者分析首页 -- 开始分析
export const getAnalysisSearch = (params) =>{
  return axios.request({
    url:'/es-author-search',
    method: 'post',
    data: params
  })
}
// 文献点击相关作者获取机构名
export const getTitleOrganization = (params) =>{
  return axios.request({
    url:'/es-get-organization',
    method: 'post',
    data: params
  })
}
// 机构分析详情页
export const getOrganizationDetail = (params) =>{
  return axios.request({
    url:'/es-organization-detail',
    method: 'post',
    data: params
  })
}

// 学科分析接口
export const getDepartmentIndex = (params) =>{
  return axios.request({
    url:'/es-department-index',
    method: 'post',
    data: params
  })
}
// 学科分析接口
export const getRelationRecommend = (params) =>{
  return axios.request({
    url:'/es-relation-recommend',
    method: 'post',
    data: params
  })
}

// 清除历史记录
export const clearHistory = (params) =>{
  return axios.request({
    url:'/es-clear-history',
    method: 'post',
    data: params
  })
}
// 文献检索模糊匹配
export const searchTip = (params) =>{
  return axios.request({
    url:'/search-tip',
    method: 'post',
    data: params
  })
}
// 学者分析检索匹配机构
export const getAuthorOrganization = (params) =>{
  return axios.request({
    url:'/es-get-select-organization',
    method: 'post',
    data: params
  })
}

// 文献高级检索匹配关键词
export const getRecommendDisease = (params) =>{
  return axios.request({
    url:'/es-recommend-disease',
    method: 'post',
    data: params
  })
}
// 学科分析匹配关键词
export const getXkfxDiseases = (params) =>{
  return axios.request({
    url:'/es-search-diseases',
    method: 'post',
    data: params
  })
}
//学科分析/全部文献接口
export const getXkfxEsDocument = (params) =>{
  return axios.request({
    url:'/es-all-document',
    method: 'post',
    data: params
  })
}
//文献中英切换
export const getSetLanguage = (params) =>{
  return axios.request({
    url:'/set-language',
    method: 'post',
    data: params
  })
}
//个人中心
export const getProfile = (params) =>{
  return axios.request({
    url:'/profile',
    method: 'post',
    data: params
  })
}
// 文献收藏添加标签
export const collectionAddTags = (params) =>{
  return axios.request({
    url:'/es-collection-tags',
    method: 'post',
    data: params
  })
}
// =================  知识库平台api  ↑ ==================

//cdss 获取西医问诊列表
export const getWesternSymptomList = (params) =>{
  return axios.request({
    url:'/cdss',
    method: 'post',
    data: params
  })
}
// cdss 西医问诊 保存按钮
export const clickFinishBtn = (params) =>{
  return axios.request({
    // url:'/result',
    url:'/advisory/submit',
    method: 'post',
    data: params
  })
}
// cdss 西医问诊 预览按钮
export const getUserAdvisory = (params) =>{
  return axios.request({
    url:'/get_user_advisory',
    method: 'post',
    data: params
  })
}
// cdss 点击疑似病例列表
export const clickYsbl = (params) =>{
  return axios.request({
    url:'/about_result',
    method: 'post',
    data: params
  })
}
// cdss 获取医学知识列表请求
export const getMedicineList = (params) =>{
  return axios.request({
    url:'/get_medical_knowledge',
    method: 'post',
    data: params
  })
}
// cdss 症状选项内 搜索点击请求
export const getchoosesymptomBtn = (params) =>{
  return axios.request({
    url:'/symptom/search',
    method: 'post',
    data: params
  })
}
// cdss(icss)分类多项下拉接口
export const getManySelect = (params) =>{
  return axios.request({
    url:'/many_select',
    method: 'post',
    data: params
  })
}
// cdss(icss)获取诊断下 列表
export const getDiagnosis = (params) =>{
  return axios.request({
    url:'/diagnosis',
    method: 'post',
    data: params
  })
}
// cdss(icss)获取主要诊断获取编码
export const getIcd = (params) =>{
  return axios.request({
    url:'/get_icd',
    method: 'post',
    data: params
  })
}
// cdss(icss)获取主要诊断关键字搜索
export const getDiseases = (params) =>{
  return axios.request({
    url:'/get_diseases',
    method: 'post',
    data: params
  })
}
// 搜索页面关键字接口
export const getExistLabels = (params) =>{  
  return axios.request({
    url:'/labels',
    method: 'post',
    data: params
  })
}
export const getNewBaseDetail = (params) =>{  
  return axios.request({
    url:'/new/detail',
    method: 'post',
    data: params
  })
}
// 知识库临床试验检索
export const getNewClinicalTrial = (params) =>{  
  return axios.request({
    url:'/new/get-clinical-trial',
    method: 'post',
    data: params
  })
}
export const getNewInteract = (params) =>{  
  return axios.request({
    url:'/new/get-interact',
    method: 'post',
    data: params
  })
}
export const getZskNewDetail = (params) =>{
  return axios.request({
    url:'/new/detail',
    method: 'post',
    data: params
  })
}
//  详情页右侧
export const getSickNess = (params) =>{
  return axios.request({
    url:'/zsk/detail',
    method: 'post',
    data: params
  })
}
//  列表页搜索
export const getSearch = (params) =>{
  return axios.request({
    url:'/zsk/search',
    method: 'post',
    data: params
  })
}
//  详情页知识图谱搜索
export const getD3Search = (params) =>{
  return axios.request({
    url:'/zsk/graph',
    method: 'post',
    data: params
  })
}