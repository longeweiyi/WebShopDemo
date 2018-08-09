<template>
    <div id="header">
        <nav class="navbar navbar-default navbar-static-top">
            <div class="container">
                <div class="navbar-header">
                    <a href="" class="navbar-brand" @click.prevent="jump('/')">XX电子商城</a>
                </div>
                <div class="collapse navbar-collapse">
                    <ul class="nav navbar-nav navbar-right">
                        <li class="cartLi">
                            <a href="" @click.prevent="jump('/cart')">
                                <span class="glyphicon glyphicon-shopping-cart"></span>
                                <span class="badge bg-danger cartNum" v-show="cart.length">{{cart.length}}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'cart'
        ])
    }
}
</script>


<style scoped>
.cartLi{font-size: 22px;position: relative;}
span.cartNum{position:absolute;top:3px;right: 0;font-size: 12px;background: #d9534f}
</style>

