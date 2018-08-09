<template>
    <div class="container">
        <table class="table" v-if="cart.length">
            <thead>
                <tr>
                    <th width="3%">&nbsp;</th>
                    <th width="45%">商品</th>
                    <th width="10%">单价（元）</th>
                    <th width="22%">数量</th>
                    <th width="12%">小计（元）</th>
                    <th width="8%">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(pro,i) in cart" :key="i">
                    <td>
                        <input type="checkbox" :checked="cartInfo.chIsStr.indexOf(','+pro.id+',') > -1" @click.prevent="cartChk(pro.id)">
                    </td>
                    <td>
                        <div class="media">
                            <div class="media-left">
                                <img :src="'static/images/products/'+pro.img" class="media-object img">
                            </div>
                            <div class="media-body">
                                <h4 class="media-heading">{{pro.title}}</h4>
                            </div>
                        </div>
                    </td>
                    <td>
                        {{pro.price | currency('')}}
                    </td>
                    <td>
                        <v_cart_btn :product='pro'></v_cart_btn>
                    </td>
                    <td>
                        {{pro.cart_num*pro.price | currency('')}}
                    </td>
                    <td>
                        <span class="glyphicon glyphicon-trash del" @click="cartDel_2(pro.id)"></span>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td>
                        <input type="checkbox" :checked="cart.length == cart_chk.length" @click.prevent="cartChkAll(!cart.length == cart_chk.length)">
                    </td>
                    <td>
                        <a href="" class="text-danger" @click.prevent="cartDel_3">删除所选</a>
                    </td>
                    <td colspan="4" class="text-right">
                        总计：
                        <span class="total">
                            &yen; <span class="totalPrice">{{cartInfo.chk_price | currency('')}}</span>
                        </span>
                        元&nbsp;&nbsp;
                        <button :class="['btn', 'btn-primary',{disabled:this.cart_chk.length == 0}]" @click="buy">确定购买</button>
                    </td>
                </tr>
            </tfoot>
        </table>
        <p v-else>
            您的购物车是空的，<a href="" @click.prevent="jump('/')">赶快去逛逛！</a>
        </p>
    </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import v_cart_btn from '@/components/cart/v-cart-btn'

export default {
    computed: {
        ...mapGetters([
            'cart',
            'cart_chk',
            'cartInfo'
        ]),

    },
    methods: {
        ...mapActions([
            'cartDel',
            'cartChk',
            'cartChkAll'
        ]),
        cartDel_2 (id) {
            if(!confirm('确定删除该商品？')) return;
            this.cartDel([id])
        },
        cartDel_3 () {
            if (this.cart_chk.length == 0) {
                alert("请选择商品");
                return
            }
            if(!confirm('确定删除所选商品？')) return;
            this.cartDel(this.cart_chk)
        },
        buy () {
            if (this.cart_chk.length == 0) {
                alert("请选择商品");
                return
            }
            this.jump('/order_create');
        }
    },
    components: {
        v_cart_btn
    }
}
</script>


<style scoped>
.img{width: 140px}
.del {cursor: pointer;}
</style>

