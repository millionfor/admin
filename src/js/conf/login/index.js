// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'

import 'sass/conf/home/index.scss'

Vue.use(ElementUI)

Vue.config.devtools = true
Vue.config.productionTip = true
Vue.config.silent = true

new Vue({
  el: '#app',
  render: h => h(App),
  mounted () {
  },
  methods: {
  },
  created () {
  }
})

