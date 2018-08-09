<template>
    <div class="container">
        <form action="" class="form-horizontal">
            <div class="form-group">
                <label for="" class="control-label col-xs-2" >
                    收货人
                </label>
                <div class="col-xs-3">
                    <input type="text" class="form-control" v-model.trim="form.username">
                </div>
            </div>
            <div class="form-group">
                <label for="" class="control-label col-xs-2" >
                    收货地址
                </label>
                <div class="col-xs-4">
                    <textarea rows="3" class="form-control"  v-model.trim="form.address"></textarea>
                </div>
            </div>
            <div class="form-group">
                <label for="" class="control-label col-xs-2" >
                    联系方式
                </label>
                <div class="col-xs-3">
                    <input type="text" class="form-control"  v-model.trim="form.tel">
                </div>
            </div>
            <div class="form-group">
                <div class="col-xs-3 col-xs-offset-2">
                    <input type="button" value="添加" class="btn btn-primary" @click="add">
                    &nbsp;
                    &nbsp;
                    <input type="button" value="返回" class="btn btn-info btn-sm" @click="back">
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    data () {
        return {
            form: {
                username: '',
                address: '',
                tel: ''
            },
            can_add: true
        }
    },
    methods: {
        ...mapActions([
            'addressAdd'
        ]),
        add () {
            if (!this.can_add) return;
            this.can_add = false

            var errors = [];
            var usernameLen = this.form.username.length;
            if (usernameLen < 2 ||　usernameLen > 8){
                errors.push('收货人由2-8个字符组成')
            }
            var addressLen = this.form.address.length
            if (addressLen < 10 ||　usernameLen > 100){
                errors.push('收货人地址由10-100个字符组成')
            }
            if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.form.tel)) {
                errors.push('联系方式不合法')
            }
            if (errors.length) {
                alert(errors.join('\n'));
                return;
            }
            var _this = this;
            this.addressAdd({
                address: this.form,
                success () {
                    alert('添加成功！！！')
                    _this.back();
                },
                complete () {
                    _this.can_add = true;
                }
            })
        }
    }
}
</script>

