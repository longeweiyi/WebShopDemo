<template>
    <div class="container">
        <blockquote class="addressTt">
            <p>收货地址</p>
        </blockquote>
        <div class="row">
            <div class="col-xs-3" v-for="(addr,i) in addressList" :key="i">
                <v_address_box :address='addr'></v_address_box>
            </div>
            <div class="col-xs-3">
                <div class="address_box text-center">
                    <div class="address_body" @click="jump('/address_create')">
                        <div class="addAddress">+</div>
                    </div>
                    <div class="address_footer">
                        <small>添加收货地址</small>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center">
            <button class="btn btn-primary btn-xs" @click="addresss_limit=3" v-if="addresss_limit==-1">
                收起
                <span class="glyphicon glyphicon-menu-up"></span>
            </button>
            <button class="btn btn-primary btn-xs" @click="addresss_limit=-1" v-else>
                展开
                <span class="glyphicon glyphicon-menu-down"></span>
            </button>
        </div>

        <blockquote class="payTt">
            <p>支付方式</p>
        </blockquote>
        <div class="row">
            <div class="col-xs-3" v-for="(pa,i) in pay" :key="i">
                <v_pay_box :pay='pa'></v_pay_box>
            </div>
        </div>
        <div class="text-center btnBox">
            <button class="btn btn-info btn-sm" @click="back">返回</button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button class="btn btn-primary" @click="next">下一步</button>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import v_address_box from '@/components/address/v_address_box'
import v_pay_box from '@/components/pay/v_pay_box'

export default {
    data() {
        return {
            cartMustChk: true,
            addresss_limit: 3,
        }
    },
    computed: {
        ...mapGetters([
            'address',
            'address_chk',
            'pay',
            'pay_chk'
        ]),
        addressList () {
            if (this.addresss_limit==-1) return this.address;
            return this.address.slice(0, this.addresss_limit)
        }
    },
    components: {
        v_address_box,
        v_pay_box
    },
    methods: {
        next() {
            var errors = [];
            if(!this.address_chk) {
                errors.push('请选择收货地址');
            }
            
            if(!this.pay_chk) {
                errors.push('请选择支付方式');
            }
            if(errors.length) {
                alert(errors.join('\n'));
                return
            }

            this.jump('/order_confirm')
        }
    }
}
</script>


<style scoped>
.addressTt,.payTt{margin-bottom: 10px}
.address_box{border: 2px solid #EEE;border-radius: 5px;padding: 10px;background: #F8F8F8;margin-bottom: 15px}
.address_body{cursor: pointer;height: 91px;}
.address_box.active .address_body{color: #2e6da4}
.address_footer{margin-top: 5px;}
.addAddress{font-size: 60px;}

.payTt{margin-top: 40px}

.btnBox{margin: 40px 0 4px}

</style>

