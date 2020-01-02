<template>
  <div id="MenuSetting">
   <el-row>
      <el-col :span="6" style="overflow: hidden">
        <el-menu
          default-active="monitor"
          class="el-menu-vertical-demo"
          @select="menuSelected"
          @open="menuSelected"
          @close="menuSelected"
          :default-openeds="defaultOpeneds"
          background-color="#F0F6F6"
          text-color="#1DA028"
          active-text-color="white">
          <NavMenu class="MenuSetting" :menuData="menuData" :showEnableOnly="showEnableOnly" :iconSize="'16px'"></NavMenu>
        </el-menu>
      </el-col>
      <el-col :span="18" style="padding-left: 30px;padding-right: 30px">
        <el-container>
          <el-header style="border-bottom: solid #cccccc 1px;">
            <el-button type="primary" @click="showAddSameLevelMenu()" size="medium">添加同级菜单</el-button>
            <el-button type="primary" @click="showAddSubMenu()" size="medium">添加子菜单</el-button>
          </el-header>
          <el-main>
            <el-form :label-position="labelPosition" label-width="80px" :model="formData" ref="menuForm" size="medium">
              <el-form-item label="菜单ID" prop="id">
                <el-input v-model.number="formData.id" disabled></el-input>
              </el-form-item>
              <el-form-item label="父菜单ID" prop="parent_menu_id" :rules="[{ required: true, message: '父菜单ID不能为空'},{ type: 'number', message: '父菜单ID必须为数字值'}]">
                <el-input v-model.number="formData.parent_menu_id"></el-input>
              </el-form-item>
              <el-form-item label="系统名称" prop="name" :rules="[{ required: true, message: '系统名称不能为空'}]">
                <el-input v-model="formData.name"></el-input>
              </el-form-item>
              <el-form-item label="显示名称" prop="alias" :rules="[{ required: true, message: '显示名称不能为空'}]">
                <el-input v-model="formData.alias"></el-input>
              </el-form-item>
              <el-form-item label="图标" prop="icon" :rules="[{ required: true, message: '图标不能为空'}]">
                <el-input v-model="formData.icon"></el-input>
              </el-form-item>
              <el-form-item label="排序" prop="sort" :rules="[{ required: true, message: '排序不能为空'}]">
                <el-input v-model="formData.sort"></el-input>
              </el-form-item>
              <el-form-item label="值" prop="value">
                <el-input v-model="formData.value"></el-input>
              </el-form-item>
              <el-form-item label="描述/说明" prop="description">
                <el-input type="textarea" v-model="formData.description"></el-input>
              </el-form-item>
              <el-form-item label="是否启用" prop="state" :rules="[{ required: true, message: '是否启用不能为空'}]">
                <el-switch v-model="formData.state"></el-switch>
              </el-form-item>
              <el-form-item label="位置" prop="classifier" :rules="[{ required: true, message: '位置不能为空'}]">
                <el-radio-group v-model="formData.classifier">
                  <el-radio label="顶部菜单"></el-radio>
                  <el-radio label="左侧菜单"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="类型" prop="type" :rules="[{ required: true, message: '类型不能为空'}]">
                <el-radio-group v-model="formData.type">
                  <el-radio label="功能菜单"></el-radio>
                  <el-radio label="链接菜单"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateMenu()">保存</el-button>
                <el-button type="primary" @click="deleteMenu()">删除</el-button>
                <el-button type="primary" @click="resetForm('menuForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-main>
        </el-container>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import NavMenu from '../common/navMenu'

  export default {
    name: 'menuSetting',
    data() {
      return {
        showEnableOnly: false,
        defaultOpeneds: [],
        labelPosition: 'right',
        formData: {},
        menuData: []
      }
    },
    methods: {
      menuSelected(index) {
        this.getMenu(index)
      },
      getMenus: function() {
        let url = 'api/menu/menus'
        this.$get(url).then(response => {
          this.menuData = response.childs
          this.menuData.forEach(child => {
            this.defaultOpeneds.push(child.entity.name)
          })
          // this.getMenu(this.menuData[0].entity.name);
        }).catch(error => {
          console.log(error)
        })
      },
      getMenu: function(menuName) {
        let params = {
          name: menuName
        }
        let url = 'api/menu/menus'
        this.$get(url, params)
          .then(response => {
            this.menuEntityToForm(response.data)
          }).catch(error => {
          console.log(error)
        })
      },

      updateMenu: function() {
        this.$refs['menuForm'].validate((valid) => {
          if (valid) {
            let url = 'api/menu/menus'
            this.$post(url, this.formToMenuEntity(this.formData)).then(response => {
              console.log(response)
              if (response.code === 200) {
                this.$message({
                  message: response.message,
                  type: 'success'
                })
                this.getMenus()
                this.$refs['menuForm'].resetFields()
              }
            }).catch(error => {
              if (error.code === 404) {
                this.$message.warning('该菜单不存在,请尝试刷新页面后再进行操作')
              } else {
                this.$message.error(error.data)
              }
            })
          } else {
            return false
          }
        })
      },
      menuEntityToForm: function(data) {
        this.formData = data
        this.formData.state = (data.state === 'ENABLE')
        this.formData.classifier = (data.classifier === 'TOP' ? '顶部菜单' : '左侧菜单')
        this.formData.type = (data.type === 'MENU' ? '功能菜单' : '链接菜单')
      },
      formToMenuEntity: function(formData) {
        return {
          id: formData.id,
          parent_menu_id: formData.parent_menu_id,
          name: formData.name,
          alias: formData.alias,
          icon: formData.icon,
          sort: formData.sort,
          classifier: formData.classifier === '顶部菜单' ? 'TOP' : 'LEFT',
          state: formData.state ? 'ENABLE' : 'DISABLE',
          type: formData.type === '功能菜单' ? 'MENU' : 'LINK',
          value: formData.value,
          description: formData.description,
          user_id: 2
        }
      },
      deleteMenu: function() {
        if (typeof (this.formData.id) === 'undefined' || this.formData.id === null) {
          this.$message({
            type: 'warning',
            message: '请先选择指定菜单'
          })
          return
        }
        this.$confirm('确定要删除该菜单吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = 'api/menu/deleteMenus/'
          this.$get(url, {id: this.formData.id}).then(response => {
            if (response.code === 200) {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.getMenus()
            } else {
              this.$message.error('删除失败')
            }
          }).catch(() => {
            this.$message.error('删除失败')
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      resetForm: function(formName) {
        this.$refs[formName].resetFields()
      },
      showAddSameLevelMenu: function() {
        let parentMenuId = this.formData.parent_menu_id
        this.formData = {}
        this.formData.parent_menu_id = parentMenuId
      },
      showAddSubMenu: function() {
        if (JSON.stringify(this.formData) !== '{}') {
          if (this.formData.id) {
            let parentMenuId = this.formData.id
            this.formData = {}
            this.formData.parent_menu_id = parentMenuId
          }
        } else {
          this.$message({
            message: '请选择父级菜单',
            type: 'warning'
          })
        }
      }
    },
    created: function () {
      this.getMenus()
    },
    components: {
      NavMenu: NavMenu
    }
  }
</script>

<style>
  .MenuSetting .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active,
  .MenuSetting .el-menu-item.is-active,
  .MenuSetting .el-submenu.is-active {
    background-color: #409EFF !important;
  }
  .MenuSetting .el-menu-item i,
  .MenuSetting .el-submenu__title i {
    color: #409EFF !important;
  }
  .MenuSetting .el-menu-item.is-active i {
    color: white !important;
  }
</style>
