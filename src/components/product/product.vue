<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-4">
                <img :src="'static/images/products/'+product.img" alt="" class="img">
            </div>
            <div class="col-xs-8">
                <ul class="list-unstyled productUl">
                    <li>
                        <h3>{{product.title}}</h3>
                    </li>
                    <li>
                        价格：
                        <span class="total">
                            &yen;
                            <span class="totalPrice">{{product.price | currency('')}}</span>
                        </span>
                    </li>
                    <li>
                        <input type="number" min="1" step="1" :max="product.kucun" v-model.number="num" class="form-control sortText">
                    </li>
                    <li>
                        <button class="btn btn-warning" @click="buy">立即购买</button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <v_cart_add :product="product" :num="num" @success="add_success"></v_cart_add>
                    </li>
                </ul>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">商品属性</h3>
            </div>
            <div class="panel-body">
                <div class="col-xs-3 attrItem" v-for="(attr,i) in product.attrs" :key="i">
                    {{attr.name}}：{{attr.val}}
                </div>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">商品详情</h3>
            </div>
            <div class="panel-body desc" v-html="product.desc">
               
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
import v_cart_add from '@/components/cart/v-cart-add'

export default {
    data() {
        return {
            product: {},
            num: 1
        }
    },
    created() {
        axios.get('/api/product?id=' + this.$route.params.id)
            .then((res) => {
                if(res.data.status) {
                    this.product = res.data.data
                }
            })
            .catch((err) => {
                console.log('product_err', err)
            })

    },
    methods: {
        ...mapActions([
            'cartAdd',
            'cartSetChk'
        ]),
        add_success() {
            this.num = 1
        },
        buy() {
            var _this = this
            this.cartAdd({
                product: this.product,
                num: this.num,
                success() {
                    _this.cartSetChk([_this.product.id])
                    _this.jump('/order_create')
                }
            })
        }
    },
    watch: {
        num(val, oldVal) {
            if (!/^[1-9]\d*$/.test(val)) this.num = oldVal
        }
    },
    components: {
        v_cart_add
    }
}
</script>


<style scoped>
img.img{width: 100%;vertical-align: top;}
ul.productUl>li {margin-bottom: 30px;}
.sortText{width: 120px;text-align: center}
.attrItem{margin: 5px 0;}
.desc{padding: 15px 80px}
</style>

