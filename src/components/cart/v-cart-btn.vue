<template>
    <div class="input-group cart_btn">
        <div class="input-group-btn">
            <button class="btn btn-primary" @click.prevent="cartDelNum(product)">-</button>
        </div>
        <input type="text" class="form-control text-center" :value="product.cart_num" @keyup.enter="cartSetNum_2" @blur="blur">
        <div class="input-group-btn">
            <button class="btn btn-primary" @click.prevent="cartAdd({product})">+</button>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    props: {
        product: {
            required: true,
            type: Object
        }
    },
    methods: {
        ...mapActions([
            'cartAdd',
            'cartDelNum',
            'cartSetNum'
        ]),
        cartSetNum_2 (e) {
            this.cartSetNum({
                product: this.product,
                cart_num: e.target.value,
                complete () {
                    e.target.blur()
                }
            })
            
        },
        blur (e) {
            if (e.target.value!=this.product.cart_num) e.target.value=this.product.cart_num
        }
    }
}
</script>

<style scoped>
.cart_btn{width: 180px}
</style>


