<template>
  <div class="RoleSetting">
    <el-form :inline="true" :model="query" class="demo-form-inline" size="small">
      <el-form-item label="搜索选项">
        <el-select v-model="query.key" placeholder="请选择" style="width: 120px;">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="搜索内容">
        <el-input v-model="query.value" placeholder="请输入要搜索的内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search()">搜索</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="showRoleFormDialogWithClear(true)">添加角色</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="RoleList" stripe :border="true" header-cell-class-name="TableHeader" size="medium" style="width: 100%">
      <el-table-column prop="id" label="ID" width="50" align="center"></el-table-column>
      <el-table-column prop="name" label="名称" width="180" align="center"></el-table-column>
      <el-table-column prop="alias" label="显示名称" width="100" align="center"></el-table-column>
      <el-table-column label="状态" width="100" align="center">
        <template slot-scope="scope">
          {{scope.row.state === 'ENABLE' ? '正常' : '停止'}}
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column fixed="right" label="操作" width="260" align="center">
        <template slot-scope="scope">
          <el-button @click="showRoleAuth(scope.row)" type="text" size="small" icon="el-icon-bell">权限</el-button>
          <el-button @click="showRoleInfo(scope.row)" type="text" size="small" icon="el-icon-edit">编辑</el-button>
          <el-button @click="deleteRole(scope.row.id)" type="text" size="small" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="form.id ? '修改角色' : '添加角色'" :visible.sync="dialogFormVisible" label-width="80px" width="600px">
      <el-form :model="form" style="padding-right: 10px;" size="medium" ref="RoleForm">
        <el-form-item label="角色ID" prop="id" :label-width="formLabelWidth">
          <el-input v-model="form.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="系统名称" prop="name" :label-width="formLabelWidth" :rules="[{ required: true, message: '系统名称不能为空'}]">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="显示名称" prop="alias" :label-width="formLabelWidth" :rules="[{ required: true, message: '显示名称不能为空'}]">
          <el-input v-model="form.alias"></el-input>
        </el-form-item>
        <el-form-item label="是否可用" prop="state" :label-width="formLabelWidth">
          <el-switch v-model="form.state"></el-switch>
        </el-form-item>
        <el-form-item label="全部数据" prop="state" :label-width="formLabelWidth">
          <el-switch v-model="form.listAll"></el-switch>
        </el-form-item>
        <el-form-item label="角色描述" prop="description" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSaveRole">取 消</el-button>
        <el-button type="primary" @click="saveRole">{{form.id ? '修改' : '添加'}}</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="checkList.length ? '修改权限' : '添加权限'" :visible.sync="dialogAuthFormVisible" label-width="80px" width="1000px" top="80px">
      <el-checkbox-group v-model="checkList">
        <el-row v-for="(list, index) in authTable" :key="index">
          <el-col :span="4">
            <div class="authName">
              <el-checkbox :label="list.id">{{list.alias}}</el-checkbox>
            </div>
          </el-col>
          <el-col :span="20">
            <div class="authList">
              <div v-for="(vo, index) in list.children" :key="index" class="authCheck">
                <el-checkbox :label="vo.id" :disabled="checkList.indexOf(vo.parentId) === -1">{{vo.alias}}</el-checkbox>
                <span v-for="(v, index) in vo.children" :key="index">
                  <el-checkbox :label="v.id" :disabled="checkList.indexOf(v.parentId) === -1">{{v.alias}}</el-checkbox>
                </span>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSaveAuthRole">取 消</el-button>
        <el-button type="primary" @click="saveAuthRole">{{checkList.length ? '修改' : '添加'}}</el-button>
      </div>
    </el-dialog>

    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 30, 50,100]"
        :page-size="eachPageSize"
        layout="sizes, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script type="application/ecmascript">
  export default {
    name: 'RoleSetting',
    data() {
      return {
        // 搜索
        options: [{value: 'id', label: 'ID'},
          {value: 'name', label: '系统名称'},
          {value: 'alias', label: '显示名称'},
          {value: 'auths', label: '拥有权限'},
          {value: 'state', label: '状态'}
        ],
        query: {key: null, value: null},
        // 角色列表数据
        RoleList: [],
        // 编辑角色表单
        dialogFormVisible: false,
        dialogAuthFormVisible: false,
        form: {
          id: null,
          name: null,
          alias: null,
          auths: null,
          state: false,
          listAll: false,
          description: null
        },
        authTable: [],
        checkList: [],
        authForm: {
          id: null
        },
        formLabelWidth: '80px',
        // 分页
        eachPageSize: 10,
        currentPage: 1,
        total: 0
      }
    },
    methods: {
      getRoles: function() {
        // let param = {
        //   page: this.currentPage - 1,
        //   size: this.eachPageSize
        // }
        let url = 'api/role/roles'
        this.$get(url).then(response => {
          this.RoleList = response.data
          this.total = response.totalElements
        }).catch(error => {
          console.log(error)
        })
      },
      showRoleFormDialogWithClear: function(isClear) {
        this.dialogFormVisible = true
        if (isClear) {
          this.resetForm()
        }
      },
      showRoleAuthFormDialogWithClear: function(isClear) {
        this.dialogAuthFormVisible = true
        if (isClear) {
          this.resetAuthForm()
        }
      },
      handleSizeChange: function(val) {
        this.eachPageSize = val
        this.getRoles()
      },
      handleCurrentChange: function(val) {
        this.currentPage = val
        this.getRoles()
      },
      search: function() {
        this.$notify.success({
          title: '温馨提示：',
          message: '搜索暂不可用!',
          showClose: false
        })
      },
      saveRole: function() {
        this.$refs['RoleForm'].validate((valid) => {
          if (valid) {
            let url = 'api/role/insert'
            this.$post(url, this.formToRoleEntity())
              .then(response => {
                if (response.code === 200) {
                  this.$message({
                    message: response.message,
                    type: 'success'
                  })
                  this.getRoles()
                  this.dialogFormVisible = false
                  this.resetForm()
                }
              }).catch(error => {
                if (error.response.status === 404) {
                  this.$message.warning('该角色不存在,请尝试刷新页面后再进行操作')
                } else {
                  this.$message.error(error.response.data)
                }
            })
          } else {
            return false
          }
        })
      },
      saveAuthRole: function() {
        let url = 'api/role/authUpdate'
        this.$post(url, {id: this.authForm.id, auths: this.checkList.toString()})
          .then(response => {
            if (response.code === 200) {
              this.$message({
                message: response.message,
                type: 'success'
              })
              this.getRoles()
              this.dialogAuthFormVisible = false
              this.resetAuthForm()
            } else {
              this.$message.error(response.message)
            }
          }).catch(error => {
            if (error.response.status === 404) {
              this.$message.warning('权限修改失败,请尝试刷新页面后再进行操作')
            } else {
              this.$message.error(error.response.data)
            }
        })
      },
      deleteRole: function(id) {
        this.$confirm('您确定要删除该角色吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = 'api/role/delete'
          this.$get(url, {id: id})
            .then(response => {
              if (response.code === 200) {
                this.$message({
                  message: response.message,
                  type: 'success'
                })
                this.getRoles()
              }
            }).catch(error => {
            if (error.response.status === 404) {
              this.$message.warning('该角色不存在,请尝试刷新页面后再进行操作')
            } else {
              this.$message.error(error.response.data)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      cancelSaveRole: function() {
        this.dialogFormVisible = false
        this.resetForm()
      },
      cancelSaveAuthRole: function() {
        this.authForm = {}
        this.checkList = []
        this.dialogAuthFormVisible = false
        this.resetAuthForm()
      },
      formToRoleEntity: function() {
        return {
          id: this.form.id,
          name: this.form.name,
          alias: this.form.alias,
          auths: this.form.auths,
          state: this.form.state ? 'ENABLE' : 'DISABLE',
          list_all: this.form.listAll ? 1 : 0,
          description: this.form.description
        }
      },
      resetForm: function() {
        this.form = {}
      },
      resetAuthForm: function() {
        this.authForm = {}
        this.checkList = []
      },
      showRoleInfo: function(rowData) {
        this.form.id = rowData.id
        this.form.name = rowData.name
        this.form.alias = rowData.alias
        this.form.auths = rowData.auths
        this.form.state = rowData.state === 'ENABLE'
        this.form.listAll = rowData.listAll === 1
        this.form.description = rowData.description
        this.showRoleFormDialogWithClear(false)
      },
      showRoleAuth: function (rowData) {
        this.authForm.id = rowData.id
        if (rowData.auths) {
          this.checkList = rowData.auths.split(',')
          for (let i = 0; i < this.checkList.length; i++) {
            this.checkList[i] = Number(this.checkList[i])
          }
        }
        let url = 'api/menu/authMenus'
        this.$get(url).then(response => {
          if (response.code === 200) {
            this.authTable = response.data
          }
        })
        this.showRoleAuthFormDialogWithClear(false)
      }
    },
    created: function () {
      this.getRoles()
    }
  }
</script>

<style scoped>
  .pagination {
    margin-top: 20px;
    margin-left: -10px;
  }
  .authCheck{
    height: 30px;
  }
</style>
