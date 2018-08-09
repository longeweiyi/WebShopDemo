<template>
    <button class="btn btn-danger" @click="cartAdd_2">+ 加入购物车</button>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    props: {
        product: {
            required: true,
            type: Object
        },
        num: {
            type: Number
        }
    },
    methods: {
        ...mapActions([
            'cartAdd'
        ]),
        cartAdd_2() {
            var _this = this;
            this.cartAdd({
                product: _this.product,
                num: _this.num,
                success () {
                    _this.$dialog.confirm('已加入购物车',{
                        okText: '查看购物车',
                        cancelText: '继续浏览'
                    })
                    .then(() => {
                        _this.jump('/cart')
                    })
                    .catch(() => {})
                    _this.$emit('success')
                }
            });
        }
    }
}
</script>

