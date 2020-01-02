<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>修改密码</span>
    </div>
    <div class="content">
      <el-form ref="form" :rules="rules" :model="form" labelWidth="80px">
        <el-form-item label="原密码" prop="oldPass">
          <el-input v-model="form.oldPass" placeholder="请输入密码" show-password clearable autofocus="true"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input v-model="form.newPass" placeholder="请输入密码" show-password clearable></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPass">
          <el-input v-model="form.confirmPass" placeholder="请输入密码" show-password clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save('form')">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script type="application/ecmascript">
  import {getLocalStorage} from '../../common/cookie'

  export default {
    name: 'changePass',
    data() {
      const validatePassword = (rule, value, callback) => {
        const pattern = /^[\w_-]{6,16}$/
        setTimeout(() => {
          if (pattern.test(value)) {
            callback()
          } else {
            callback(new Error('密码最短6位，最长16位，支持大小写字母、数字、_和-。'))
          }
        }, 1000)
      }
      return {
        userId: '',
        form: {
          oldPass: '',
          newPass: '',
          confirmPass: ''
        },
        rules: {
          oldPass: [
            {required: true, message: '原密码不能为空', trigger: 'blur'},
            {validator: validatePassword, trigger: 'blur'}
          ],
          newPass: [
            {required: true, message: '新密码不能为空', trigger: 'blur'},
            {validator: validatePassword, trigger: 'blur'}
          ],
          confirmPass: [
            {required: true, message: '确认密码不能为空', trigger: 'blur'},
            {validator: validatePassword, trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this.userId = getLocalStorage('userId')
    },
    methods: {
      save(formName) {
        this.$refs[formName].validate(status => {
          if (status) {
            if (this.form.newPass !== this.form.confirmPass) {
              this.$message({type: 'error', message: '新密码与确认密码不相同'})
            } else {
              let url = 'api/user/changePass'
              let params = {
                userId: this.userId,
                oldPass: this.form.oldPass,
                newPass: this.form.newPass,
                confirmPass: this.form.confirmPass
              }
              this.$post(url, params)
                .then(response => {
                  if (response.code === 200) {
                    this.$message({type: 'success', message: response.message})
                    this.cancel()
                  } else {
                    this.$message({type: 'error', message: response.message})
                  }
                }).catch(error => {
                this.$message({type: 'error', message: error})
              })
            }
          } else {
            return false
          }
        })
      },
      cancel() {
        this.form = {
          oldPass: '',
          newPass: '',
          confirmPass: ''
        }
        this.$router.push({path: '/'})
      }
    }
  }
</script>

<style scoped>
  .box-card {
    margin: 0 auto;
    width: 700px;
    margin-top: 50px;
  }
</style>
