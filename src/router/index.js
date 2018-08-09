import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/index'
import Cart from '@/components/cart/cart'
import OrderCreate from '@/components/order/order_create'
import AddressCreate from '@/components/address/address_create'
import OrderConfirm from '@/components/order/order_confirm'
import Product from '@/components/product/product'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/order_create',
      component: OrderCreate
    },
    {
      path: '/address_create',
      component: AddressCreate
    },
    {
      path: '/order_confirm',
      component: OrderConfirm
    },
    {
      path: '/product/:id',
      component: Product
    }
  ]
})
