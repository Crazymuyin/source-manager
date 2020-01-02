<template>
  <div class="wrapper">
    <div class="content">
      <h2 class="title">系统登录</h2>
      <div class="user">
        <i class="icon-user"></i>
        <input type="text" placeholder="账号" v-model="loginForm.account" @keyup.enter="login" autofocus='true'/>
      </div>
      <div class="pwd">
        <i class="icon-lock1"></i>
        <input type="password" placeholder="密码" v-model="loginForm.password" @keyup.enter="login"/>
      </div>
      <div class="login">
        <button @click="login" @keyup.enter="login">登录</button>
      </div>
    </div>
  </div>
</template>

<script type="application/ecmascript">
  import {setLocalStorage} from '../../common/cookie'

  export default {
    name: 'login',
    data() {
      return {
        loginForm: {
          account: '',
          password: ''
        }
      }
    },
    methods: {
      login: function () {
        if (!this.loginForm.account) {
          this.$notify.info({
            title: '消息',
            message: '请输入登录账号'
          })
        } else if (!this.loginForm.password) {
          this.$notify.info({
            title: '消息',
            message: '请输入登录密码'
          })
        } else {
          let url = '/login'
          this.$get(url, this.loginForm).then(response => {
            if (response.code === 200) {
              setLocalStorage('userId', response.data.id)
              setLocalStorage('roleId', response.data.role_id)
              setLocalStorage('roleName', response.data.roleName)
              setLocalStorage('username', response.data.username)
              this.$router.push('/')
            } else {
              this.$message({type: 'error', message: response.message})
            }
          }).catch(error => {
            console.log(error)
          })
        }
      }
    }
  }

</script>

<style scoped lang="less">
  @import "../../assets/login/style.css";

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #283443 inset !important;
    -webkit-text-fill-color: #fff !important;
  }

  input::-webkit-input-placeholder {
    /* placeholder颜色  */
    color: #C0C4CC;
    /* placeholder字体大小  */
    font-size: 16px;
  }

  .wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #2D3A4B;

    .content {
      position: relative;
      width: 450px;
      height: 400px;
      margin: 200px auto;

      .title {
        width: 100%;
        line-height: 50px;
        font-size: 26px;
        color: #fff;
        text-align: center;
      }

      .user {
        position: relative;
        margin: 0 auto;
        width: 420px;
        height: 50px;
        border: 1px solid #889AA4;
        background-color: #283443;
        border-radius: 5px;

        .icon-user {
          position: absolute;
          font-size: 20px;
          color: #889AA4;
          top: 15px;
          left: 10px;
        }

        & input {
          position: absolute;
          left: 42px;
          height: 48px;
          width: 368px;
          border: none;
          outline: none;
          font-size: 16px;
          color: #fff;
          padding-left: 10px;
          border-bottom-right-radius: 5px;
          border-top-right-radius: 5px;
          background-color: #283443;
        }
      }

      .pwd {
        position: relative;
        margin: 20px auto;
        width: 420px;
        height: 50px;
        border: 1px solid #889AA4;
        border-radius: 5px;
        background-color: #283443;

        .icon-lock1 {
          position: absolute;
          font-size: 20px;
          color: #889AA4;
          top: 15px;
          left: 10px;
        }

        & input {
          position: absolute;
          left: 42px;
          height: 48px;
          width: 368px;
          border: none;
          outline: none;
          font-size: 16px;
          padding-left: 10px;
          color: #fff;
          border-bottom-right-radius: 5px;
          border-top-right-radius: 5px;
          background-color: #283443;
        }
      }

      .auth {
        position: relative;
        margin: 20px auto;
        width: 420px;
        height: 50px;
        border: 1px solid #889AA4;
        border-radius: 5px;

        .el-select {
          width: 100%;

          .el-input__inner {
            height: 50px;
          }
        }
      }

      .login {
        position: relative;
        width: 422px;
        height: 50px;
        text-align: center;
        margin: 20px auto;

        & button {
          width: 100%;
          height: 50px;
          border-radius: 5px;
          outline: none;
          border: none;
          font-size: 18px;
          color: white;
          background-color: dodgerblue;
          cursor: pointer;
        }
      }
    }
  }
</style>
