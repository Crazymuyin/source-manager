<template>
  <div class="source-recovery">
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
        <el-col :span="5">
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
        <!--<el-col :span="4">-->
          <!--<el-row type="flex" justify="center" align="middle">-->
            <!--<el-col :span="4">-->
              <!--<div class="grid-content-two">-->
                <!--<span>状态</span>-->
              <!--</div>-->
            <!--</el-col>-->
            <!--<el-col :span="20">-->
              <!--<div class="grid-select3">-->
                <!--<el-select v-model="initParams.status" placeholder="请选择" @change="changeSelect">-->
                  <!--<el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">-->
                  <!--</el-option>-->
                <!--</el-select>-->
              <!--</div>-->
            <!--</el-col>-->
          <!--</el-row>-->
        <!--</el-col>-->
        <el-col :span="5">
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
        <el-col :span="5">
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
        <el-col :span="5">
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
    <el-row :gutter="0">
      <el-col :span="24">
        <el-table ref="multipleTable" :data="sourceList" stripe border tooltip-effect="dark" style="width: 100%"
                  header-cell-class-name="TableHeader" size="medium" :header-cell-style="tableHeaderColor"
                  @selection-change="handleSelectionChange" max-height="580">
          <el-table-column type="selection" width="44" align="center">
          </el-table-column>
          <el-table-column label="ID" width="90" :show-overflow-tooltip="true" align="center">
            <template slot-scope="scope">
              <div>{{pageInfo.currentPage === 1 ? scope.$index + 1 : scope.$index + 1 + (pageInfo.currentPage - 1) * 10 }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类型" width="70" :show-overflow-tooltip="true" align="center">
            <template slot-scope="scope">
              {{ scope.row.type.length === 0 ? '-' : scope.row.type }}
            </template>
          </el-table-column>
          <el-table-column prop="sourceName" label="信源名称" width="240" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              {{ scope.row.sourceName.length === 0 ? '-' : scope.row.sourceName }}
            </template>
          </el-table-column>
          <el-table-column prop="sourceLink" label="信源地址" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              {{ scope.row.sourceLink.length === 0 ? '-' : scope.row.sourceLink }}
            </template>
          </el-table-column>
          <el-table-column prop="platform" label="平台" width="70" :show-overflow-tooltip="true" align="center">
            <template slot-scope="scope">
              {{ scope.row.platform.length === 0 ? '-' : scope.row.platform }}
            </template>
          </el-table-column>
          <el-table-column prop="region" label="地区" width="240" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              {{ scope.row.region.length === 0 ? '-' : scope.row.region }}
            </template>
          </el-table-column>
          <el-table-column prop="industry" label="综合/行业" width="90" :show-overflow-tooltip="true" align="center">
            <template slot-scope="scope">
              {{ scope.row.industry.length === 0 ? '-' : scope.row.industry }}
            </template>
          </el-table-column>
          <el-table-column prop="priority" label="优先级" width="70" :show-overflow-tooltip="true" align="center">
            <template slot-scope="scope">
              {{ scope.row.priority.length === 0 ? '-' : scope.row.priority }}
            </template>
          </el-table-column>
          <el-table-column prop="deleteName" label="删除人" width="70" :show-overflow-tooltip="true" align="center">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" round @click="handleEdit(scope.row)">恢复</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="wrapper-submit">
      <el-row>
        <el-col :span="5">
          <el-button size="small" @click="recoverAllReq">恢复</el-button>
          <el-button :disabled="roleName !== '信源管理' && roleName !== '超级管理员'" size="small" @click="handleDeleteAll">删除</el-button>
        </el-col>
        <el-col :span="19">
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

<script>
import {regionDataPlus, CodeToText} from 'element-china-area-data'
import {getLocalStorage} from '../../../common/cookie'
import {getPlatformOptions, getMediaTypeOptions, getSourceLevelOptions, getPriorityOptions} from '../../../common/option.config'
export default {
  name: 'source-recovery',
  data() {
    return {
      platformList: getPlatformOptions(),
      typeList: getMediaTypeOptions(),
      sourceLevelList: getSourceLevelOptions(),
      priorityList: getPriorityOptions(),
      regionList: regionDataPlus,
      sourceList: [],
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 10000],
        total: 0
      },
      multipleSelection: [],
      initParams: {
        userId: '',
        platform: 'AOS',
        type: 'all',
        // status: 'all', // 已删除的数据status为4
        sourceLevel: 'all',
        priority: 'all',
        region: [''],
        editShow: false
      },
      idList: [],
      username: '',
      roleName: ''
    }
  },
  created() {
    this.init()
    this.username = getLocalStorage('username')
    this.roleName = getLocalStorage('roleName')
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
      params['user_id'] = getLocalStorage('userId')
      params['platform'] = this.initParams.platform
      params['type'] = this.initParams.type
      params['source_level'] = this.initParams.sourceLevel
      params['priority'] = this.initParams.priority
      params['region'] = paramRegion.join('，')
      params['currentPage'] = this.pageInfo.currentPage
      params['pageSize'] = this.pageInfo.pageSize
      let url = 'api/sourcemanager/sourcerecovery'
      this.$get(url, params).then(response => {
        if (response.status === 1) {
          this.sourceList = response.data
          this.pageInfo.total = response.total
        }
      }, error => {
        this.$message({type: 'error', message: error})
      })
    },
    handleEdit: function (list) {
      this.idList.length = 0
      this.idList.push(list.id)
      this.recoverAllReq()
    },
    handleDeleteAll: function() {
      this.deleteAllReq()
    },
    recoverAllReq() {
      this.$confirm(`您确定要恢复您当前所选的这` + this.idList.length + `条数据吗？`, `提示`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {}
        Object.assign(params, {
          id: this.idList.length === 1 ? this.idList[0] : this.idList.join(','),
          platform: this.initParams.platform
        })
        let url = 'api/sourcemanager/sourcerecovery/recoverlist'
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
        this.$message({type: 'info', message: '已取消恢复操作。'})
      })
    },
    deleteAllReq() {
      this.$confirm(`您确定要删除您当前所选的这` + this.idList.length + `条数据吗？`, `提示`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {}
        Object.assign(params, {id: this.idList.length === 1 ? this.idList[0] : this.idList.join(',')})
        let url = 'api/sourcemanager/sourcerecovery/deletelist'
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
    handleSelectionChange: function (selectedList) { // 多选操作
      this.idList.length = 0
      selectedList.forEach(item => {
        this.idList.push(item.id)
      })
    },
    handleSizeChange(pageSize) {
      this.pageInfo.pageSize = pageSize
      this.init()
    },
    handleCurrentChange(currentPage) {
      this.pageInfo.currentPage = currentPage
      this.init()
    },
    tableHeaderColor: function ({row, column, rowIndex, columnIndex}) {
      return 'background-color: transparent; color: #444; font-weight: 500; text-align: center'
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
  //     immediate: true
  //   }
  // }
}
</script>

<style scoped lang="less">
span{
  font-size: 14px;
}
.source-recovery{
  width: 100%;
  height: 100%;

  .wrapper-select {
    width: 100%;
    margin-bottom: 10px;

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
          width: 22vmin;
        }

        .grid-select4 {
          width: 22vmin;
        }

        .grid-select5 {
          width: 22vmin;
        }

        .grid-select6 {
          width: 22vmin;
        }
      }
    }
  }

  /*.el-row {*/
    /*margin-bottom: 20px;*/
    /*&:last-child {*/
      /*margin-bottom: 0;*/
    /*}*/
    /*& span{*/
      /*margin-right: 15px;*/
    /*}*/
    /*.el-col:last-child {*/
      /*.el-select{*/
        /*width: 215px;*/
      /*}*/
    /*}*/
  /*}*/
  .wrapper-submit {
    width: 100%;
    margin-top: 12px;
    .el-row {
      .el-col{
        .page{
          float: right;
        }
        .el-select{
          width:  60px;
        }
      }
    }
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
