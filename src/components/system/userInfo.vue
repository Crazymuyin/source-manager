<template>

  <div class="userInfoForm">
    <el-form ref="form" :model="form" :rules="userInfoRules" label-width="80px">
      <el-form-item label="帐号">
        <el-input v-model="form.account" disabled></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="=username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="tel">
        <el-input v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" v-model="form.remark"></el-input>
      </el-form-item>
      <el-form-item label="注册时间">
        <el-input v-model="form.gmt_create" disabled></el-input>
      </el-form-item>
      <el-form-item label="登录时间">
        <el-input v-model="form.gmt_modified" disabled></el-input>
      </el-form-item>
      <el-form-item label="登录IP">
        <el-input v-model="form.ip" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="application/ecmascript">
  import {getLocalStorage} from '../../common/cookie'

  export default {
    name: 'UserInfo',
    data() {
      const checkPhone = (rule, value, callback) => {
        const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
        if (!value) {
          return callback(new Error('电话号码不能为空'))
        }
        setTimeout(() => {
          if (!Number.isInteger(+value)) {
            callback(new Error('请输入正确的电话号码'))
          } else {
            if (phoneReg.test(value)) {
              callback()
            } else {
              callback(new Error('电话号码格式不正确'))
            }
          }
        }, 1000)
      }
      const checkEmail = (rule, value, callback) => {
        const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        if (!value) {
          return callback(new Error('请输入联系邮箱'))
        }
        setTimeout(() => {
          if (mailReg.test(value)) {
            callback()
          } else {
            callback(new Error('请输入正确的邮箱格式'))
          }
        }, 1000)
      }
      return {
        form: {
          account: '',
          username: '',
          email: '',
          tel: '',
          remark: '',
          gmt_create: '',
          gmt_modified: '',
          ip: ''
        },
        userInfoRules: {
          username: [
            {required: true, message: '请输入用户姓名', trigger: 'blur'},
            {min: 2, max: 4, message: '长度在 2 到 8 个字符', trigger: 'blur'}
          ],
          tel: [
            {validator: checkPhone, required: true, trigger: 'blur'}
          ],
          email: [
            {validator: checkEmail, required: true, trigger: 'blur'}
          ],
          remark: [
            {required: false, message: '请填写活动形式', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      onSubmit: function(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.form.userId = getLocalStorage('userId')
            this.$post('api/user/userInfoUpdate', this.form).then(response => {
              if (response.code === 200) {
                this.$message({
                  message: response.message,
                  type: 'success'
                })
                this.form = {}
                this.$router.push({path: '/'})
              } else {
                this.$message({
                  message: response.message,
                  type: 'warning'
                })
              }
            })
          } else {
            this.$message.error('修改失败，请检查相关信息！')
            return false
          }
        })
      },
      getUserName: function() {
        this.$get('/api/user/userInfo', {userId: getLocalStorage('userId')}).then(response => {
          this.form = response.data
          console.log(response)
        })
      }
    },
    created: function () {
      this.getUserName()
    }
  }
</script>

<style scoped>
.userInfoForm{
  margin: 0 auto;
  max-width: 1000px;
}
</style>
