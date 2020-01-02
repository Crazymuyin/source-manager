<template>
  <div class="myWriteSource">
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
                    max-height="580" stripe border>
            <el-table-column label="ID" width="120" :show-overflow-tooltip="true" align="center">
              <template slot-scope="scope">
                <div>{{pageInfo.currentPage === 1 ? scope.$index + 1 : scope.$index + 1 + (pageInfo.currentPage - 1) * 10 }}</div>
              </template>
            </el-table-column>
            <el-table-column label="类型" width="70" :show-overflow-tooltip="true" align="center">
              <template slot-scope="scope">
                {{ scope.row.type === null || scope.row.type === '' ? '-' : scope.row.type }}
              </template>
            </el-table-column>
            <el-table-column label="信源名称" width="240" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                {{ scope.row.sourceName === null || scope.row.sourceName === '' ? '-' : scope.row.sourceName }}
              </template>
            </el-table-column>
            <el-table-column label="信源地址" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                {{ scope.row.sourceLink === null || scope.row.sourceLink === '' ? '-' : scope.row.sourceLink }}
              </template>
            </el-table-column>
            <el-table-column label="平台" width="80" :show-overflow-tooltip="true" align="center">
              <template slot-scope="scope">
                {{ scope.row.platform === null || scope.row.platform === '' ? '-' : scope.row.platform }}
              </template>
            </el-table-column>
            <el-table-column label="地区" width="240" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                {{ scope.row.region === null || scope.row.region === '' ? '-' : scope.row.region }}
              </template>
            </el-table-column>
            <el-table-column label="综合/行业" width="120" :show-overflow-tooltip="true" align="center">
              <template slot-scope="scope">
                {{ scope.row.industry === null || scope.row.industry === '' ? '-' : scope.row.industry }}
              </template>
            </el-table-column>
            <el-table-column label="优先级" width="80" :show-overflow-tooltip="true" align="center">
              <template slot-scope="scope">
                {{ scope.row.priority === null || scope.row.priority === '' ? '-' : scope.row.priority }}
              </template>
            </el-table-column>
            <el-table-column label="状态" width="80" :show-overflow-tooltip="true" align="center">
              <template slot-scope="scope">
                {{ scope.row.status === 0 ? '未提交' : scope.row.status === 1 ? '已提交' : scope.row.status === 2 ? '已审' :
                '退回' }}
              </template>
            </el-table-column>
            <el-table-column label="错误日志" width="240" :show-overflow-tooltip="true" align="center">
              <template slot-scope="scope">
                {{ scope.row.remark === null || scope.row.remark === '' ? '-' : scope.row.remark }}
              </template>
            </el-table-column>
          </el-table>
        </el-col>
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
  </div>
</template>

<script type="application/ecmascript">
  import {regionDataPlus, CodeToText} from 'element-china-area-data'
  import { getLocalStorage } from '../../common/cookie'
  import { getPlatformOptions, getMediaTypeOptions, getStatusOptions, getSourceLevelOptions, getPriorityOptions } from '../../common/option.config'
  export default {
    name: 'myWriteSource',
    data() {
      return {
        platformList: getPlatformOptions(),
        typeList: getMediaTypeOptions(),
        statusList: getStatusOptions(),
        sourceLevelList: getSourceLevelOptions(),
        priorityList: getPriorityOptions(),
        regionList: regionDataPlus,
        initParams: {
          userId: '',
          platform: 'AOS',
          type: 'all',
          status: 'all',
          sourceLevel: 'all',
          priority: 'all',
          region: ['']
        },
        sourceList: [],
        idList: [],
        pageInfo: {
          currentPage: 1,
          pageSize: 10,
          pageSizes: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 10000],
          total: 0
        }
      }
    },
    created() {
      this.initParams.userId = getLocalStorage('userId')
      this.init()
    },
    methods: {
      changeSelect: function() {
        this.pageInfo.currentPage = 1
        this.init()
      },
      init: function() {
        let paramRegion = []
        this.initParams.region.forEach(item => {
          paramRegion.push(CodeToText[item])
        })
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
        let url = 'api/sourceEdit/mySource/getSourceList'
        this.$get(url, params).then(response => {
          if (response.status === 1) {
            this.sourceList = response.data
            this.pageInfo.total = response.total
          }
        }, error => {
          this.$message({type: 'error', message: error})
        })
      },
      tableHeaderColor: function ({row, column, rowIndex, columnIndex}) {
        return 'background-color: transparent; color: #444; font-weight: 500; text-align: center'
      },
      handleSelectionChange: function (selectedList) { // 多选操作
        this.idList.length = 0
        selectedList.forEach(item => {
          this.idList.push(item.id)
        })
      },
      handleDelete(list) {
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
          Object.assign(params, {id: this.idList.length === 1 ? this.idList[0] : this.idList.join(','), userId: getLocalStorage('userId'), userName: getLocalStorage('username')})
          let url = 'api/sourceAdd/mySource/deleteSourceList'
          this.$get(url, params).then(response => {
            if (response.status === 1) {
              this.$message({type: 'success', message: response.message})
              this.init()
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
      handleSubmit: function (list) {
        this.idList.length = 0
        this.idList.push(list.id)
        this.handleSubmitAll()
      },
      handleDeleteAll() {
        this.deleteSourceReq()
      },
      handleSubmitAll() {
        this.$confirm(`您确定要提交您当前所选的这` + this.idList.length + `条数据吗？`, `提示`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {}
          Object.assign(params, {id: this.idList.length === 1 ? this.idList[0] : this.idList.join(',')})
          let url = 'api/sourceAdd/mySource/submitSourceList'
          this.$get(url, params).then(response => {
            if (response.status === 1) {
              this.$message({type: 'success', message: response.message})
              this.init()
            } else {
              this.$message({type: 'error', message: response.message})
            }
          }).catch(error => {
            this.$message({type: 'error', message: error})
          })
        }).catch(() => {
          this.$message({type: 'info', message: '已取消提交操作。'})
        })
      },
      handleSizeChange(pageSize) {
        this.pageInfo.pageSize = pageSize
        this.init()
      },
      handleCurrentChange(currentPage) {
        this.pageInfo.currentPage = currentPage
        this.init()
      }
    }
    // watch: {
    //   initParams: {
    //     handler: function (newVal, oldVal) {
    //       if (newVal) {
    //         this.init()
    //       }
    //     },
    //     deep: true,
    //     immediate: false
    //   }
    // }
  }

</script>

<style lang="less" scoped>
  .myWriteSource {
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
