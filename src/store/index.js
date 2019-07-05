import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let timer
let interval = 5000 //计时器时间间隔

const initCaseInfo = {
  caseId: "",
  caseName: "",
  code: {
    html: "",
    js: "",
    css: "",
    dataSource: ""
  },
  vendors: [],
  type: "",
  img: "",
  author: "",
  projectName: "",
  remarks: ""
}

const store = new Vuex.Store({
  state: {
    // operation: "set",   // 是设置方案还是获取方案  set/get
    caseInfo: {
      caseId: "",       // 方案ID
      caseName: "",     // 方案名称
      code: {           // 方案源码
        html: "",       // html源码
        js: "",         // js源码
        css: "",        // css源码
        dataSource: ""  // 方案的数据源
      },
      vendors: [],      // 方案依赖的第三方库
      type: "",         // 方案所属类型（例如：柱状图、饼图等） --预留字段
      img: "",          // 方案缩略图 --预留字段
      author: "",       // 方案提供者 --预留字段
      projectName: "",  // 方案所属项目名称 --预留字段
      remarks: ""       // 方案备注 --预留字段
    }
  },
  mutations: {
    /**
     * 新建方案
     */
    newCase(state, payload) {
      state.caseInfo = { ...initCaseInfo, ...payload }
    },
    /**
     * 更新方案源码
     */
    updateCode(state, payload) {
      state.caseInfo.code = { ...state.caseInfo.code, ...payload }
    },
    /**
     * 更新方案信息
     */
    updateCaseInfo(state, payload) {
      state.caseInfo = { ...state.caseInfo, ...payload }
    }
  },
  actions: {
    // asyncUpdateCode({ commit }, payload) {
    //   if (timer) clearTimeout(timer)
    //   timer = setTimeout(() => {
    //     commit("updateCode", payload)
    //   }, interval);
    // }
  }
})

export default store