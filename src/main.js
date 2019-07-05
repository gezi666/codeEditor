import Vue from 'vue'
import './assets/css/reset.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueCodemirror from 'vue-codemirror'
import 'codemirror/addon/selection/active-line.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/html-hint.js'
import 'codemirror/addon/hint/javascript-hint.js'
import 'codemirror/addon/hint/css-hint.js'
import 'codemirror/addon/lint/json-lint.js'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/css/css.js'
import 'codemirror/mode/htmlmixed/htmlmixed.js'
import 'codemirror/addon/edit/closebrackets.js'
import 'codemirror/addon/edit/matchbrackets.js'
import App from './App.vue'
import store from './store/index'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(ElementUI)
Vue.use(VueCodemirror, {
  options: {
    tabSize: 2,
    styleActiveLine: true,
    lineNumbers: true,     // 是否在编辑器左侧显示行号
    line: true,
    theme: 'monokai',      // 主题
    foldgutter: true,
    autocorrect: true,
    lineWrapping: true,   // 是否代码折叠
    matchBrackets: true,  // 括号匹配
    extraKeys: { "Tab": "autocomplete" },
    autoCloseBrackets: true
  }
})

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
