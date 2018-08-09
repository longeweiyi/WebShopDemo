<template>
    <div class="container">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">购买商品</h3>
            </div>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th width='40%'>商品</th>
                        <th>单价（元）</th>
                        <th>数量</th>
                        <th>小计（元）</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(pro,i) in cartInfo.chk" :key="i">
                        <td>
                            <div class="media">
                                <div class="media-left">
                                    <img :src="'static/images/products/'+pro.img" class="media-object img">
                                </div>
                                <div class="media-body">
                                    <h4 class="media-heading">
                                        {{pro.title}}
                                    </h4>
                                </div>
                            </div>
                        </td>
                        <td>{{pro.price | currency('')}}</td>
                        <td>{{pro.cart_num | currency('')}}</td>
                        <td>{{pro.price*pro.cart_num | currency('')}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="panel-footer text-right">
                总计：
                <span class="total">
                    &yen;
                    <span class="totalPrice">{{cartInfo.chk_price | currency('')}}</span>
                </span>
                元
            </div>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">收货地址</h3>
            </div>
            <ul class="list-group">
                <li class="list-group-item">
                    收货人：{{addressInfo.chk.username}}
                </li>
                <li class="list-group-item">
                    收货地址：{{addressInfo.chk.address}}
                </li>
                <li class="list-group-item">
                    联系方式：{{addressInfo.chk.tel}}
                </li>
            </ul>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">支付方式</h3>
            </div>
            <div class="panel-body">
                {{payInfo.chk.text}}
            </div>
            <p class="text-center">
                <button class="btn btn-info btn-sm" @click="back">返回</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button class="btn btn-primary btn-sm" @click="pay">确认订单</button>
            </p>
        </div>
    </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'

export default {
    data() {
        return {
            cartMustChk: true
        }
    },
    computed: {
        ...mapGetters([
            'cartInfo',
            'addressInfo',
            'payInfo',
            'cart_chk'
        ])
    },
    methods: {
        ...mapActions([
            'cartDel'
        ]),
        pay () {
            this.$dialog.alert('TODO:去支付', {
                okText: '支付成功'
            })
            .then(() => {
                this.cartDel(this.cart_chk)
                this.jump('/')
            })
        }
    }
}
</script>


<style>
img.img{width: 140px}
</style>

