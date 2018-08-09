<template>
    <div  :class="['address_box',{active:address.id==address_chk}]"  @click="addressChk(address.id)">
        <div class="address_body">
            <div class="adrUer">{{address.username}}</div>
            <div class="adr" title="">{{address.address}}</div>
            <div class="adrTel">tel {{address.tel}}</div>
        </div>
        <div class="address_footer clearfix">
            <span class="label label-success pull-left" v-if="address.is_default">默认地址</span>
            <span class="label label-warning pull-left" @click="addressSetDefault(address.id)" v-else>设为默认</span>
            <span class="glyphicon glyphicon-trash pull-right adrDel" @click.stop="addressDel_2"></span>
        </div>
    </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'

export default {
    props: {
        address: {
            required: true,
            type: Object
        }
    },
    computed: {
        ...mapGetters([
            'address_chk'
        ])
    },
    methods: {
        ...mapActions([
            'addressChk',
            'addressSetDefault',
            'addressDel'
        ]),
        addressDel_2 () {
            if(!confirm('您确定要删除该地址吗？')) return
            this.addressDel(this.address.id)
            
        }
    }
}
</script>

<style scoped>
.address_box{border: 2px solid #EEE;border-radius: 5px;padding: 10px;background: #F8F8F8;margin-bottom: 15px}
.address_box.active{border-color: #2e6da4}
.address_body{cursor: pointer;height: 91px;}
.address_box.active .address_body{color: #2e6da4}
.adr{margin: 5px 0;height: 41px;display:flex;-webkit-line-clamp:2;-webkit-box-orient: vertical;overflow: hidden;}
.address_footer{margin-top: 5px;}
.adrDel{cursor: pointer;display: none}
.address_box:hover .adrDel{display: inline-block}
</style>


