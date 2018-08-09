<template>
    <div :class="['pay_box',{active:pay_chk==pay.id}]" @click="payChk(pay.id)">
        {{pay.text}}
    </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'

export default {
    props:{
        pay: {
            required: true,
            type: Object
        }
    },
    computed: {
        ...mapGetters([
            'pay_chk'
        ])
    },
    methods: {
        ...mapActions([
            'payChk'
        ])
    }
}
</script>

<style scoped>
.pay_box{border: 2px solid #EEE;border-radius: 5px;padding: 20px 0;background: #F8F8F8;margin-bottom: 15px;text-align: center;cursor: pointer;}
.pay_box.active{border-color:#2e6da4;color: #2e6da4}
</style>


