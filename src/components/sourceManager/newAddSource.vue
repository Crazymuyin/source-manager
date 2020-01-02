<template>
  <div class="newAddSource">
    <div class="wrapper-select">
      <el-row>
        <el-col :span="4">
          <el-row type="flex" justify="center" align="middle">
            <el-col :span="4">
              <div class="grid-content-two">
                <span>平台</span>
              </div>
            </el-col>
            <el-col :span="20">
              <div class="grid-select1">
                <el-select v-model="initParams.platform" placeholder="请选择" @change="changeSelect">
                  <el-option v-for="item in platformList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-row type="flex" justify="center" align="middle">
            <el-col :span="6">
              <div class="grid-content-four">
                <span>媒体类型</span>
              </div>
            </el-col>
            <el-col :span="18">
              <div class="grid-select2">
                <el-select v-model="initParams.type" placeholder="请选择" @change="changeSelect">
                  <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-row type="flex" justify="center" align="middle">
            <el-col :span="4">
              <div class="grid-content-two">
                <span>状态</span>
              </div>
            </el-col>
            <el-col :span="20">
              <div class="grid-select3">
                <el-select v-model="initParams.status" placeholder="请选择" @change="changeSelect">
                  <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-row type="flex" justify="center" align="middle">
            <el-col :span="6">
              <div class="grid-content-four">
                <span>信源等级</span>
              </div>
            </el-col>
            <el-col :span="18">
              <div class="grid-select4">
                <el-select v-model="initParams.sourceLevel" placeholder="请选择" @change="changeSelect">
                  <el-option v-for="item in sourceLevelList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-row type="flex" justify="center" align="middle">
            <el-col :span="5">
              <div class="grid-content-three">
                <span>优先级</span>
              </div>
            </el-col>
            <el-col :span="19">
              <div class="grid-select5">
                <el-select v-model="initParams.priority" placeholder="请选择" @change="changeSelect">
                  <el-option v-for="item in priorityList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-row type="flex" justify="center" align="middle">
            <el-col :span="4">
              <div class="grid-content-two">
                <span>地区</span>
              </div>
            </el-col>
            <el-col :span="20">
              <div class="grid-select6">
                <el-cascader :options="regionList" v-model="initParams.region" allow-create filterable @change="changeSelect"></el-cascader>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="wrapper-table">
      <el-row :gutter="0">
        <el-col :span="24">
          <el-table ref="multipleTable" :data="sourceList" tooltip-effect="dark" style="width: 100%"
                    header-cell-class-name="TableHeader" size="medium" :header-cell-style="tableHeaderColor"
                    @selection-change="handleSelectionChange" max-height="580" stripe border>
            <el-table-column type="selection" width="44" align="center"></el-table-column>
            <el-table-column label="ID" width="90" align="center" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div>{{pageInfo.currentPage === 1 ? scope.$index + 1 : scope.$index + 1 + (pageInfo.currentPage - 1) * 10 }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="类型" width="70" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="sourceName" label="信源名称" width="240" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="sourceLink" label="信源地址" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="platform" label="平台" width="70" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="region" label="地区" width="240" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="industry" label="综合/行业" width="90" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="priority" label="优先级" width="70" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="cleanPeople" label="整理人" width="70" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column fixed="right" label="操作" width="300" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="warning" round @click="handleCheck('look', scope.row)" :disabled="scope.row.status === 2 || scope.row.status === 3">
                  {{scope.row.status === 2 ? '已审' : scope.row.status === 3 ? '-----' : '审核'}}
                </el-button>
                <el-button size="mini" :type="scope.row.status === 3 ? 'info' : 'success'" round @click="handleCheck('back', scope.row)" :disabled="scope.row.status === 3 || scope.row.status === 2">退回</el-button>
                <el-button size="mini" type="primary" round @click="handleAuditCheck(scope.row)" :disabled="scope.row.distribute !== '' || scope.row.status === 1 || scope.row.status === 3">分配</el-button>
                <el-button size="mini" type="danger" round @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div class="wrapper-submit">
      <el-row>
        <el-col :span="4">
          <el-button size="small" @click="handleCheckAll('look')">审核</el-button>
          <el-button size="small" @click="handleCheckAll('back')">退回</el-button>
          <el-button size="small" @click="handleAuditCheck">分配</el-button>
          <el-button size="small" @click="handleDeleteAll">删除</el-button>
        </el-col>
        <el-col :span="20"></el-col>
      </el-row>
    </div>
    <div class="wrapper-page">
      <el-row>
        <el-col :span="24">
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageInfo.currentPage"
              :page-sizes="pageInfo.pageSizes"
              :page-size="pageInfo.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageInfo.total">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="信源分配" :visible.sync="dialogAuditingAddFormVisible" width="30%">
      <el-radio-group v-model="distributeId">
        <el-radio v-for="(list, index) in auditingList" :key="index" :label="list.id">{{list.username}}</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAddAuditingFormDialogWithClear(true)">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="application/ecmascript">
  import {regionDataPlus, CodeToText} from 'element-china-area-data'
  import {getPlatformOptions, getMediaTypeOptions, getStatusOptions, getSourceLevelOptions, getPriorityOptions} from '../../common/option.config'
  import {getLocalStorage} from '../../common/cookie'
  export default {
    name: 'newAddSource',
    data() {
      return {
        platformList: getPlatformOptions(),
        typeList: getMediaTypeOptions(),
        statusList: getStatusOptions(),
        sourceLevelList: getSourceLevelOptions(),
        priorityList: getPriorityOptions(),
        regionList: regionDataPlus,
        initParams: {
          platform: 'AOS',
          type: 'all',
          status: 'all',
          sourceLevel: 'all',
          priority: 'all',
          region: [''],
          editShow: false,
          userId: getLocalStorage('userId')
        },
        sourceList: [],
        idList: [],
        pageInfo: {
          currentPage: 1,
          pageSize: 10,
          pageSizes: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 10000],
          total: 0
        },
        sourceForm: {
          id: '',
          type: '',
          webName: '',
          webLink: '',
          sourceLevel: '',
          sourceName: '',
          sourceLink: '',
          platform: '',
          industry: '',
          region: [],
          attribute: [],
          priority: ''
        },
        dialogAuditingAddFormVisible: false,
        auditingList: [],
        distributeId: '',
        auditingForm: {
          id: '',
          distributeId: '',
          distribute: ''
        }
      }
    },
    created() {
      let status = getStatusOptions()
      if (Array.isArray(status) && status.length) {
        status.forEach((item, index) => {
          if (item.value === 0) {
            status.splice(index, 1)
          }
        })
      }
      this.statusOptions = status
      this.initRequest()
    },
    methods: {
      changeSelect: function() {
        this.pageInfo.currentPage = 1
        this.initRequest()
      },
      initRequest: function () {
        let paramRegion = []
        this.initParams.region.forEach(item => {
          paramRegion.push(CodeToText[item])
        })
        console.log(paramRegion)
        let params = {}
        params['user_id'] = this.initParams.userId
        params['platform'] = this.initParams.platform
        params['type'] = this.initParams.type
        params['status'] = this.initParams.status
        params['source_level'] = this.initParams.sourceLevel
        params['priority'] = this.initParams.priority
        params['region'] = paramRegion.join('，')
        params['currentPage'] = this.pageInfo.currentPage
        params['pageSize'] = this.pageInfo.pageSize
        let url = 'api/newadd/list'
        this.$get(url, params)
          .then(response => {
            if (response.status === 1) {
            this.sourceList = response.data
            this.pageInfo.total = response.total
          }
        }).catch(error => {
          console.log(error)
          this.$message({type: 'error', message: error})
        })
      },
      tableHeaderColor: function ({row, column, rowIndex, columnIndex}) {
        return 'background-color: transparent; color: #444; font-weight: 500; text-align: center'
      },
      handleSelectionChange: function (list) {
        this.idList.length = 0
        list.forEach(item => {
          this.idList.push(item.id)
        })
      },
      handleCheck: function (type, list) {
        let url = 'api/newadd/update'
        this.$post(url, {type: type, id: list.id, platform: this.initParams.platform})
          .then(response => {
            if (response.code === 200) {
              this.$message({
                message: response.message,
                type: 'success'
              })
              this.initRequest()
            }
          })
      },
      handleCheckAll: function (type) {
        let url = 'api/newadd/update'
        this.$post(url, {type: type, id: this.idList.join(','), platform: this.initParams.platform})
          .then(response => {
            if (response.code === 200) {
              this.$message({
                message: response.message,
                type: 'success'
              })
              this.initRequest()
            }
          })
      },
      handleAuditCheck: function (list) {
        let url = 'api/newadd/getUser'
        this.$get(url)
          .then(response => {
            if (response.code === 200) {
              if (Array.isArray(response.data) && response.data.length) {
                response.data.forEach(item => {
                  item.id = item.id + ',' + item.username
                })
              }
              this.auditingList = response.data
              this.auditingForm.id = this.idList.length > 0 ? this.idList.join(',') : list.id
            }
          })
        this.dialogAuditingAddFormVisible = true
      },
      centerDialogVisible: function() {
        let arr = this.distributeId.split(',')
        if (Array.isArray(arr) && arr.length === 2) {
          this.auditingForm.distributeId = arr[0]
          this.auditingForm.distribute = arr[1]
          this.auditingForm.platform = this.initParams.platform
          let url = 'api/newadd/update'
          this.auditingForm.type = 'audit'
          this.$post(url, this.auditingForm)
            .then(response => {
              if (response.code === 200) {
                this.$message({type: 'success', message: response.message})
                this.initRequest()
                this.dialogAuditingAddFormVisible = false
                this.auditingForm = {}
              } else {
                this.$message({type: 'error', message: response.message})
              }
            }).catch(() => {
            this.$message({type: 'info', message: '已取消删除操作。'})
          })
        }
      },
      showAddAuditingFormDialogWithClear: function(isClear) {
        this.dialogAuditingAddFormVisible = false
        if (isClear) {
          this.auditingForm = {}
        }
      },
      handleDelete: function (list) {
        this.idList.length = 0
        this.idList.push(list.id)
        this.deleteSourceReq()
      },
      deleteSourceReq() {
        this.$confirm(`您确定要删除您当前所选的这` + this.idList.length + `条数据吗？`, `提示`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {}
          Object.assign(params, {
            id: this.idList.toString(),
            userId: getLocalStorage('userId'),
            userName: getLocalStorage('username'),
            platform: this.initParams.platform
          })
          let url = 'api/sourceAdd/mySource/deleteSourceList'
          this.$get(url, params).then(response => {
            if (response.status === 1) {
              this.$message({type: 'success', message: response.message})
              this.initRequest()
            } else {
              this.$message({type: 'error', message: response.message})
            }
          }).catch(error => {
            this.$message({type: 'error', message: error})
          })
        }).catch(() => {
          this.$message({type: 'info', message: '已取消删除操作。'})
        })
      },
      handleDeleteAll() {
        this.deleteSourceReq()
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.pageInfo.pageSize = val
        this.initRequest()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.pageInfo.currentPage = val
        this.initRequest()
      }
    }
    // watch: {
    //   initParams: {
    //     handler: function (newVal, oldVal) {
    //       if (newVal) {
    //         this.initRequest()
    //       }
    //     },
    //     deep: true,
    //     immediate: false
    //   }
    // }
  }

</script>

<style lang="less" scoped>
  .newAddSource {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .wrapper-select {
      width: 100%;

      .el-row {
        margin-bottom: 20px;

        &:last-child {
          margin-bottom: 0;
        }

        .el-col {
          border-radius: 4px;

          .grid-content-two {
            width: 5vmin;
            span {
              font-size: 1.4vmin;
              line-height: 4vmin;
            }
          }

          .grid-content-three {
            width: 5vmin;
            span {
              font-size: 1.4vmin;
              line-height: 4vmin;
            }
          }

          .grid-content-four {
            width: 7vmin;
            span {
              font-size: 1.4vmin;
              line-height: 4vmin;
            }
          }

          .grid-select1 {
            width: 20vmin;
          }

          .grid-select2 {
            width: 18vmin;
          }

          .grid-select3 {
            width: 21vmin;
          }

          .grid-select4 {
            width: 18vmin;
          }

          .grid-select5 {
            width: 21vmin;
          }

          .grid-select6 {
            width: 21vmin;
          }
        }
      }
    }

    .wrapper-table {
      width: 100%;
      margin-top: 12px;
    }

    .wrapper-submit {
      width: 100%;
      margin-top: 12px;
    }

    .wrapper-page {
      width: 100%;
      margin-top: 12px;
      .block {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-evenly;
        align-content: center;
      }
    }
  }
</style>
