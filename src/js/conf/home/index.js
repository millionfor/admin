// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import io from '@/module/io'
import { mapMutations } from 'vuex'
import { sync } from 'vuex-router-sync'
import ElementUI from 'element-ui'

import 'sass/conf/home/index.scss'

sync(store, router)

Vue.use(ElementUI)

Vue.config.devtools = true
Vue.config.productionTip = true
Vue.config.silent = true

let getUserInfo = () => {
  return new Promise((resolve, reject) => {
    io.get('users/userInfo').then(res => {
      resolve(res.data)
    }).catch(e => {
      if (e.code === 299) {
        window.location.href = '/view/login'
      }
    })
  })
}

getUserInfo().then(usreInfo => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    mounted () {
    },
    created () {
      this.setUserInfo(usreInfo)
    },
    methods: {
      ...mapMutations('users', ['setUserInfo'])
    }
  })
})

