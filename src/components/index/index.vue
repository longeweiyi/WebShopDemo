<template>
    <div class="container">
        <form action="" class="form-inline">
            <div class="form-group">
                <label for="" class="control-label">价格区间</label>
                <select class="form-control" v-model="priceArea_chk">
                    <option v-for="(pa,i) in priceArea" :key="i" :value="pa">{{priceAreaText(pa)}}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="" class="control-label">价格区间</label>
                <select class="form-control" v-model="sort_order_chk">
                    <option v-for="so in sort_order" :value="so.val">{{so.text}}</option>
                </select>
            </div>
        </form>
        <div class="row products" v-infinite-scroll="setData" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <div class="col-xs-3" v-for="(pro,i) in productsList" :key="i">
                <div class="pro">
                    <div class="pro-media">
                        <a href="" @click.prevent="jump('/product/'+pro.id)">
                            <img v-lazy="'static/images/products/'+pro.img" alt="">
                        </a>
                    </div>
                    <div class="pro-body">
                        <div class="pro-title" :title="pro.title">{{pro.title}}</div>
                        <div class="pro-price clearfix">
                            <span class="pull-left">&yen;{{pro.price}}</span>
                            <v_cart_add :product='pro' class="btn-xs pull-right"></v_cart_add>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="loadAll" v-if="busy">已加载全部</div>
        <div class="loadMore" v-else></div>
    </div>
</template>

<script>
import v_cart_add from '@/components/cart/v-cart-add'

export default {
    data () {
        return {
            products: [],
            priceArea: [
                null,
                {end: 1000},
                {start: 1000, end: 2000},
                {start: 2000, end: 3000},
                {start: 3000}
            ],
            priceArea_chk: null,
            sort_order: [
                {text: '默认', val: null},
                {text: '价格正序', val: 'price_ascd'},
                {text: '价格倒序', val: 'price_desc'}
            ],
            sort_order_chk: null,
            page: 1,
            busy: true,
            can_loadMore: true
        }
    },
    computed: {
        productsList () {
            var productsList = [];
            var priceArea_chk = this.priceArea_chk;
            if (priceArea_chk) {
                productsList = this.products.filter((item) => {
                    if(priceArea_chk.start && priceArea_chk.end) {
                        if (item.price >= priceArea_chk.start && item.price <= priceArea_chk.end) {
                            return true
                        }
                    } else if (priceArea_chk.start) {
                        if(item.price >= priceArea_chk.start) return true
                    } else if (priceArea_chk.end) {
                        if (item.price <= priceArea_chk.end) return true
                    }
                })
            } else {
                productsList = this.products.slice(0);
            }

            if (this.sort_order_chk) {
                productsList.sort((item1, item2) => {
                    if (this.sort_order_chk == 'price_ascd') {
                        return item1.price - item2.price
                    } else if (this.sort_order_chk == 'price_desc') {
                        return item2.price - item1.price
                    }
                })
            }

            return productsList
        }
    },
    methods: {
        priceAreaText (priceArea) {
            var str = '全部';
            if(priceArea) {
                if(priceArea.start && priceArea.end) {
                    str = priceArea.start + ' ～ ' + priceArea.end;
                } else if (priceArea.start) {
                    str = '大于等于' + priceArea.start;
                } else if (priceArea.end) {
                    str = '小于等于' + priceArea.end;
                }
            }
            return str
        },
        setData () {
            console.log('page', this.page)
            // this.busy = true;
            if(!this.can_loadMore) return;
            this.can_loadMore = false
            axios.get ('/api/products?page='+this.page)
            .then ((res) => {
                console.log('#####')
                if (res.status) {
                    this.products = this.products.concat(res.data.data)
                    if(this.page <= 1) {
                        this.busy = false
                    }
                    this.page++;
                    if(this.page > 5) {
                        this.busy = true;
                    }
                }
                this.can_loadMore = true
            })
            .catch((err) => {
                console.log('index_err', err)
                this.can_loadMore = true
            })
        }
    },
    components: {
        v_cart_add
    },
    created () {
        this.setData ()
    }
}
</script>

<style scoped>
    .products{padding: 10px;}
    .pro{margin: 10px;border: 1px solid #FFF;}
    .pro:hover{border-color: #DDD;}
    .pro-media img{width: 100%;}
    .pro-body{padding: 5px;}
    .pro-title,.pro-price{padding: 5px 0;}
    .pro-title{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}

</style>
