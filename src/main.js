// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'

import axios from 'axios'
window.axios=axios

import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

import VuejsDialog from 'vuejs-dialog'
Vue.use(VuejsDialog)

import 'vuejs-dialog/dist/vuejs-dialog.min.css';

require('../mock')

import {currency} from './utils/currency'

Vue.mixin({
  filters: {
    currency
  },
  methods: {
    jump (path) {
      this.$router.push(path)
    },
    back () {
      this.$router.go (-1)
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if(vm.cartMustChk) {
        if(!vm.$store.getters.cart_chk.length) {
          vm.$router.replace('/')
          console.log(vm)
        }
      }
    })
  }
})

window.clone = function(obj) {
  var newObj = {};
  for (var k in obj) {
    newObj[k] = obj[k]
  }
  return newObj
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
