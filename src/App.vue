<template>
  <div id="app">
    <v-header></v-header>
    <router-view/>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import VHeader from '@/components/layouts/v-header'

export default {
  methods: {
    ...mapActions([
      'cartInit',
      'addressInit',
      'payInit'
    ])
  },
  components: {
    VHeader
  },
  created () {
    this.cartInit();
    this.addressInit()
    this.payInit()
  }
}
</script>

<style>
.loadAll{text-align: center;margin: 10px 0;}
.loadMore{width: 36px;height: 36px;margin: 10px auto; background: url(./assets/images/common/loadMore.gif) no-repeat center center;background-size: 100%;}
img[lazy=loading] {background: url(./assets/images/common/loading.gif) no-repeat center center;background-size: 100%}
span.total{color: #F00}
span.total span.totalPrice{font-size: 20px}
</style>

