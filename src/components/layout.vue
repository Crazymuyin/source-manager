<template>
  <div class="container">
    <div id="header" class="header">
      <div class="logo"></div>
      <div id="topMenu" class="topMenu">
        <!--顶部菜单导航-->
        <el-menu
          default-active="0"
          mode="horizontal"
          @select="menuSelected"
          backgroundColor="#409EFF"
          text-color="white"
          active-text-color="#FFD04B">
          <NavMenu class="TopMenu" :menuData="topMenus" :showEnableOnly="showEnableOnly" :iconSize="'24px'"></NavMenu>
        </el-menu>
      </div>

      <div class="user-info">
        <img class="head-ico" src="../assets/image/head-ico.jpg"/>
        <div class="user-name">
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link" style="color: white;text-align:center;">
              {{userInfo.userNick ? userInfo.userNick : userInfo.username}} <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="userInfo">个人资料</el-dropdown-item>
              <el-dropdown-item command="changePass">修改密码</el-dropdown-item>
              <!--<el-dropdown-item command="personalSetting">个人设置</el-dropdown-item>-->
              <el-dropdown-item command="logout" @click.native="logout">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div id="nav" class="nav">
      <!--左侧菜单组件-->
      <el-menu default-active="0" class="el-menu-vertical-demo" @open="handleOpen" @close="handleOpen" @select="menuSelected" :default-openeds="defaultOpeneds" background-color="#F0F6F6" text-color="#409EFF" active-text-color="white">
        <NavMenu class="LeftMenu" :menuData="leftMenus" :showEnableOnly="showEnableOnly" :iconSize="'16px'"></NavMenu>
      </el-menu>
    </div>

    <div id="section" class="section">
      <div id="positions" class="positions">
        <!--内容顶部当前位置组件-->
        <Position :positions="positions"></Position>
      </div>
      <div id="section-content" class="section-content">
        <div id="section-header" class="section-header">
          <blockquote class="quote">{{instruction}}</blockquote>
        </div>
        <div id="section-body" class="section-body">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <div id="footer" class="footer">
      信源管理平台
    </div>
  </div>
</template>

<script type="application/ecmascript">
  import Position from './common/position'
  import NavMenu from './common/navMenu'
  import {delLocalStorage, getLocalStorage} from '../common/cookie'

  export default {
    name: 'Index',
    components: {
      Position: Position,
      NavMenu: NavMenu
    },
    data () {
      return {
        instruction: '暂无使用说明',
        defaultOpeneds: [],
        showEnableOnly: true,
        topMenus: [],
        leftMenus: [],
        positions: [],
        userInfo: {
          username: getLocalStorage('username')
        }
      }
    },
    methods: {
      logout: function() {
        this.$get('/logout').then(response => {
          if (response.code === 200) {
            if (getLocalStorage('userId')) delLocalStorage('userId')
            if (getLocalStorage('roleId')) delLocalStorage('roleId')
            if (getLocalStorage('roleName')) delLocalStorage('roleName')
            if (getLocalStorage('username')) delLocalStorage('username')
            this.$router.push('/login')
          }
        })
      },
      menuSelected: function(key, keyPath, value) {
        let menu = value.$attrs.data.entity
        if (menu.classifier === 'TOP') {
          if (menu.type === 'MENU') {
            this.getLeftMenus(menu.id)
          }
        } else if (menu.classifier === 'LEFT') {

        }
        /* 公共部分 */
        if (menu.type === 'LINK') {
          if (menu.value !== null && menu.value !== '') {
            this.$router.push(menu.value)
            this.instruction = menu.description
          } else {
            this.$notify.success({
              title: '温馨提示：',
              message: '对不起[' + menu.alias + ']暂未开通  您可以关注Minsx主页[www.minsx.com]随时获取项目进度!',
              showClose: false
            })
          }
        }
        this.positions = getPositionsByMenus(value)
      },
      handleOpen(key) {
        this.$router.push({path: key})
      },
      handleCommand: function(command) {
        if (command === 'logout') {
          // Cookies.remove('access_token', {domain: Config.COOKIE_DOMAIN, path: '/'})
          // window.location.href = Config.LOGIN_URI
        } else if (command === 'personalSetting') {
          /* 个人设置 */
        } else {
          let position = {}
          if (command === 'userInfo') {
            position = {
              value: '/user/userInfo',
              icon: 'el-icon-info',
              alias: '个人资料'
            }
            this.instruction = '使用说明：修改个人资料'
          } else if (command === 'changePass') {
            position = {
              value: '/user/changePass',
              icon: 'el-icon-view',
              alias: '修改密码'
            }
            this.instruction = '使用说明：修改密码'
          }
          this.positions = [position]
          this.$router.push(position.value)
        }
      },
      initialPosition: function() {
        this.positions = [{
          value: '/',
          icon: 'el-icon-success',
          alias: '系统首页'
        }]
      },
      getUserName: function() {
        // Axios.get('/user/currentUserInfo')
        //   .then(response => {
        //     this.userInfo = response.data
        //   }).catch(error => {
        //   console.log(error)
        // })
      },
      getLeftMenus: function() {
        let url = 'api/menu/leftMenus'
        this.$get(url, {roleId: getLocalStorage('roleId')}).then(response => {
          this.leftMenus = response.childs
          if (Array.isArray(response.childs) && response.childs.length) {
            let path = response.childs[0].entity.value
            if (path.indexOf('/') !== -1) {
              this.$router.push({path: path})
            } else {
              this.$router.push({path: '/'})
            }
          }
          // this.leftMenus.forEach(child => {
          //   this.defaultOpeneds.push(child.entity.name)
          // })
        }).catch(error => {
          console.log(error)
        })
      },
      // getLeftMenus: function(parentMenuId) {
      //   let url = 'api/menu/leftMenus'
      //   this.$get(url + parentMenuId)
      //     .then(response => {
      //       this.leftMenus = response.data.childs
      //       this.leftMenus.forEach(child => {
      //         this.defaultOpeneds.push(child.entity.name)
      //       })
      //     }).catch(error => {
      //     console.log(error)
      //   })
      // },
      getTopMenus: function() {
        // Axios.get('/menu/topMenus')
        //   .then(response => {
        //     this.topMenus = response.data.childs
        //     this.getLeftMenus(1)
        //   }).catch(error => {
        //   console.log(error)
        // })
      }
    },
    created: function () {
      this.getLeftMenus()
      this.initialPosition()
      // this.getUserName()
      // this.getTopMenus()
    }
  }

  /* 根据选取菜单改变导航面包屑 */
  function getPositionsByMenus(value) {
    let positions = []
    let currnetMenu = value
    while (typeof (currnetMenu.$attrs.data) !== 'undefined') {
      let menu = currnetMenu.$attrs.data.entity
      positions.push({
        value: menu.value === null ? null : (menu.value === '' ? null : '/' + menu.value),
        icon: menu.icon,
        alias: menu.alias
      })
      currnetMenu = currnetMenu.$parent.$parent
    }
    return positions.reverse()
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this common only -->
<style>
  .TopMenu .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active,
  .TopMenu .el-menu-item.is-active,
  .TopMenu .el-submenu.is-active {
    background-color: #409EFF !important;
  }

  .TopMenu .el-menu-item i,
  .TopMenu .el-menu-item.is-active,
  .TopMenu .el-submenu__title i,
  .TopMenu .el-submenu__title {
    color: white !important;
  }

  .LeftMenu .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active,
  .LeftMenu .el-menu-item.is-active,
  .LeftMenu .el-submenu.is-active {
    background-color: #409EFF !important;
  }

  .LeftMenu .el-menu-item i,
  .LeftMenu .el-submenu__title i {
    color: #409EFF !important;
  }

  .LeftMenu .el-menu-item.is-active i {
    color: white !important;
  }

  .TableHeader {
    background-color: #F0F6F6 !important;
  }

  .el-breadcrumb__inner{
    color: #909399 !important;
  }
  .quote {
    margin-bottom: 10px;
    padding: 15px;
    margin-left: 0;
    margin-top: 0;
    margin-right: 0;
    line-height: 22px;
    border-left: 5px solid #409EFF;
    border-radius: 0 2px 2px 0;
    font-size: 13px;
    color: #909399;
    background-color: #f2f2f2
  }
</style>
<style scoped lang="less">
  @color: #F8F8F8;
  .container {
    .header {
      background-color: #409EFF;
      position: absolute;
      left: 0;
      right: 0;
      height: 60px;
      .logo {
        width: 205px;
        height: 60px;
        background: url('../assets/image/logo.png') no-repeat left center;
        background-size: 80%;
        background-position-x: 20px;
      }
      .topMenu {
        position: absolute;
        top: 0;
        left: 206px;
        height: 60px;
        background-color: #409EFF;
      }
      .user-info {
        width: 180px;
        height: 50px;
        position: absolute;
        right: 0;
        top: 0;
        padding: 5px;
        .head-ico {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        .user-name {
          height: 50px;
          width: 120px;
          position: absolute;
          left: 60px;
          top: 5px;
          text-align: center;
          color: white;
          line-height: 50px;
          overflow: hidden;
          cursor: pointer;
        }
      }
    }
    .nav {
      background-color: #F0F6F6;
      width: 206px;
      float: left;
      position: absolute;
      top: 60px;
      bottom: 50px;
      left: 0;
      overflow-x: hidden;
      overflow-y: auto;
      border-top: 1px solid #FFD04B;
    }
    .section {
      float: left;
      position: absolute;
      top: 60px;
      bottom: 50px;
      left: 205px;
      right: 0;
      border-left: 1px solid #A9A9A9;
      border-top: 1px solid #FFD04B;
      overflow: auto;
      .positions {
        position: absolute;
        right: 0;
        top: 0;
        left: 0;
        height: 14px;
        background-color: #F0F6F6;
        border-bottom: 1px solid #A9A9A9;
        padding: 5px;
        overflow: hidden;
      }
      .section-content {
        position: absolute;
        right: 0;
        top: 25px;
        left: 0;
        bottom: 0;
        padding: 25px;
        overflow: auto;
        background-color: @color;
        .section-header {
          position: relative;
          right: 0;
          left: 0;
        }
        .section-body {
          position: relative;
          right: 0;
          left: 0;
          bottom: 0;
          background-color: @color;
        }
      }
    }
    .footer {
      background-color: #F2F2F2;
      color: #7F7C7C;
      text-align: center;
      position: absolute;
      bottom: 0px;
      height: 34px;
      line-height: 35px;
      left: 0;
      right: 0;
      padding: 5px;
      border-top: 1px solid #A9A9A9;
      border-bottom: 5px solid #409EFF;
    }
  }
</style>
