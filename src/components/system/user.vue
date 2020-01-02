<template>
  <div class="user">
    <div class="selectMenu">
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
          <el-button type="primary" @click="showAddUserFormDialogWithClear(true)">添加账号</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table ref="multipleTable" :data="userInfo" tooltip-effect="dark" style="width: 100%"
                header-cell-class-name="TableHeader" size="medium" :header-cell-style="tableHeaderColor"
                max-height="580" stripe border>
      <!--<el-table :data="userInfo" stripe :border="true" header-cell-class-name="TableHeader" size="medium" style="width: 100%">-->
      <!--<el-table :data="userInfo" :row-style="tableRowStyle" :header-row-style="tableHeaderRowColor" :cell-style="tableCellColor" :header-cell-style="tableHeaderColor" border style="width: 100%">-->
        <el-table-column prop="id" label="ID" width="90" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="account" label="登录账号" width="100px" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="username" label="用户姓名" width="150px" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="sex" label="性别" width="80px" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="tel" label="联系电话" width="130px" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="200px" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="role_name" label="角色" width="160px" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="创建时间" width="200px">
            <template slot-scope="scope">
              {{scope.row.gmt_create | moment}}
            </template>
        </el-table-column>
        <el-table-column prop="state" label="状态" width="180px" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.state"
              active-text ="启用"
              inactive-text = "禁用"
              active-value = "1"
              inactive-value = "0"
              @change="handleClick(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="operation" label="操作" fixed="right" width="160px" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" circle size="mini" @click="userEdit(scope.row.id)">修改</el-button>
            <el-button type="text" icon="el-icon-delete" circle size="mini" @click="userDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="userForm.id ? '修改账号' : '添加账号'" :visible.sync="dialogUserAddFormVisible" label-width="80px" width="800px">
      <el-form :model="userForm" :rules="userRules" ref="userForm" label-width="100px" class="userForm">
        <el-form-item label="登录账号" prop="account">
          <el-input v-model="userForm.account"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input type="password" v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="userForm.sex" placeholder="请选择">
            <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色名称" prop="roleId">
          <el-select v-model="userForm.roleId" placeholder="请选择">
            <el-option v-for="item in roleOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话" prop="tel">
          <el-input v-model="userForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱" prop="email">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="userForm.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('userForm')">{{userForm.id ? '立刻修改' : '立即创建'}}</el-button>
          <el-button @click="resetForm('userForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script type="application/ecmascript">
  export default {
    name: 'user',
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
        // 搜索
        options: [{value: 'id', label: 'ID'},
          {value: 'account', label: '登录名'},
          {value: 'username', label: '用户姓名'},
          {value: 'role', label: '角色'},
          {value: 'state', label: '状态'}
        ],
        // 添加账号及修改
        dialogUserAddFormVisible: false,
        query: {key: null, value: null},
        userForm: {
          account: '',
          password: '',
          username: '',
          role_id: '',
          sex: '',
          tel: '',
          email: '',
          remark: ''
        },
        sexOptions: [{
          value: '男',
          label: '男'
        }, {
          value: '女',
          label: '女'
        }],
        roleOption: [],
        userRules: {
          account: [
            {required: true, message: '请输入登录账号', trigger: 'blur'},
            {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
          ],
          password: [
            {required: false, message: '请输入登录密码', trigger: 'blur'},
            {min: 6, message: '密码长度至少 6 个字符', trigger: 'blur'}
          ],
          username: [
            {required: true, message: '请输入用户姓名', trigger: 'blur'},
            {min: 2, max: 4, message: '长度在 2 到 8 个字符', trigger: 'blur'}
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: 'change'}
          ],
          roleId: [
            {required: true, message: '请选择角色', trigger: 'change'}
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
        },
        userInfo: []
      }
    },
    created() {
      this.initFun()
      this.initRole()
    },
    methods: {
      initFun: function () {
        let url = 'api/userList'
        this.$post(url).then(response => {
          if (response.code === 200) {
            response.data.forEach((item) => {
              // let time = item.gmt_create
              // item.gmt_create = moment(time).format('YYYY-MM-DD HH:mm:ss')
              item.state = item.state.toString()
            })
            this.userInfo = response.data
          } else {
            this.userInfo = []
          }
        })
      },
      // change: function (index, row) {
      //   console.log(index, row)
      // },
      initRole: function() {
        let url = 'api/role/roleOption'
        this.$get(url).then(response => {
          this.roleOption = response.data
        }).catch(error => {
          console.log(error)
        })
      },
      showAddUserFormDialogWithClear: function(isClear) {
        this.dialogUserAddFormVisible = true
        if (isClear) {
          this.resetUserForm()
        }
      },
      resetUserForm: function() {
        this.userForm = {}
      },
      submitForm: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let url = 'api/userInsert'
            this.$post(url, this.userForm).then(response => {
              if (response.code === 200) {
                this.$message({
                  message: response.message,
                  type: 'success'
                })
                this.initFun()
                this.dialogUserAddFormVisible = false
                this.resetUserForm()
              } else {
                this.$message({
                  message: response.message,
                  type: 'warning'
                })
              }
            })
          } else {
            this.$message.error('创建失败，请检查相关信息！')
            return false
          }
        })
      },
      resetForm: function (formName) {
        this.$refs[formName].resetFields()
      },
      handleClick: function (obj) {
        this.$confirm('您确定修改该用户状态吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = 'api/userUpdate'
          this.$get(url, {id: obj.id, state: obj.state}).then(response => {
            if (response.code === 200) {
              this.$message({
                message: response.message,
                type: 'success'
              })
            } else {
              this.$message.error(response.message)
            }
          })
        }).catch(() => {
          // console.log(obj)
          obj.state = obj.state === '1' ? '0' : '1'
          this.$message({
            type: 'info',
            message: '已取消状态修改'
          })
        })
      },
      userEdit: function(id) {
        // this.$notify.success({
        //   title: '温馨提示：',
        //   message: '修改暂不可用!',
        //   showClose: false
        // })
        this.dialogUserAddFormVisible = true
        let url = 'api/userOne'
        this.$get(url, {id: id}).then(response => {
          this.userForm = response.data[0]
        }).catch(error => {
          console.log(error)
        })
      },
      userDelete: function (id) {
        this.$confirm('您确定删除该用户吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = 'api/userDelete'
          this.$get(url, {id: id}).then(response => {
            if (response.code === 200) {
              this.$message({
                message: response.message,
                type: 'success'
              })
              this.initFun()
            } else {
              this.$message.error(response.message)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      search: function() {
        this.$notify.success({
          title: '温馨提示：',
          message: '搜索暂不可用!',
          showClose: false
        })
      },
      tableHeaderRowColor: function({row, rowIndex}) {
        return 'background-color: transparent;'
      },
      tableRowStyle: function ({row, rowIndex}) {
        return 'background-color: transparent; text-align:center'
      },
      tableHeaderColor: function ({row, column, rowIndex, columnIndex}) {
        // return 'border-right: 1px solid #777; border-bottom: 1px solid #777; padding: 9px 0; background-color: transparent; color: #444; font-weight: 500; text-align: center'
        return 'background-color: transparent; color: #444; font-weight: 500; text-align: center'
      },
      tableCellColor: function ({row, column, rowIndex, columnIndex}) {
        return 'border-right: 1px solid #777; border-bottom: 1px solid #777; padding: 7px 0;'
      }
    }
  }
</script>

<style scoped lang="less">
.user {
  width: 100%;
  height: 100%;
  .selectMenu {
    width: 100%;
    height: auto;
    margin-bottom: 10px;
  }
}
</style>
