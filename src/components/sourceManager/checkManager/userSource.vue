<template>
  <div class="userSource">
    <div class="wrapper-select">
      <el-row>
        <el-col :span="4">
          <el-row type="flex" justify="center" align="middle">
            <el-col :span="24">
              <el-select v-model="initParams.sourceStatus" placeholder="请选择信源状态" @change="statusToggle">
                <el-option v-for="item in statusList" :key="item.value" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row type="flex" justify="center" align="middle">
            <el-col :span="18">
              <el-input placeholder="请输入信源名称或者用户名" v-model="initParams.sourceName" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
              </el-input>
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="5">
              <el-button type="warning" @click="resetClick">重置</el-button>
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
            <el-table-column prop="id" label="序号" width="90" :show-overflow-tooltip="true" align="center"></el-table-column>
            <el-table-column label="信源名称" width="240" :show-overflow-tooltip="true" align="left">
              <template slot-scope="scope">
                {{ scope.row.source_name === null || scope.row.source_name === '' ? '-' : scope.row.source_name }}
              </template>
            </el-table-column>
            <el-table-column label="信源地址" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                {{ scope.row.source_url === null || scope.row.source_url === '' ? '-' : scope.row.source_url }}
              </template>
            </el-table-column>
            <el-table-column label="用户" width="230" :show-overflow-tooltip="true" align="center">
              <template slot-scope="scope">
                {{ scope.row.user_name === null || scope.row.user_name === '' ? '-' : scope.row.user_name }}
              </template>
            </el-table-column>
            <el-table-column label="审核状态" width="240" :show-overflow-tooltip="true" align="center">
              <template slot-scope="scope">
                {{ scope.row.source_status === 0 ? '待审核' : scope.row.source_status === 1 ? '审核通过（长期信源）' : scope.row.source_status === 2 ? '审核通过（临时信源）' : '审核未通过' }}
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="300" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="success" plain @click="showViewDialog(scope.row)">详细</el-button>
                <el-button size="mini" type="primary" plain @click="showCheckDialog(scope.row, 1)" :disabled="scope.row.source_status !== 0">通过</el-button>
                <el-button size="mini" type="danger" plain @click="showCheckDialog(scope.row, 0)" :disabled="scope.row.source_status !== 0">拒绝</el-button>
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
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="initParams.currentIndex" :page-sizes="initParams.pageSizes" :page-size="initParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="initParams.total"></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <user-source-view :detail="viewDetail" @closeClick="closeClickDialog"></user-source-view>
    <el-dialog :title="sourceForm.type ? '审核通过' : '审核拒绝'" :visible.sync="dialogSourceCheckVisible" label-width="80px" width="800px">
      <div v-if="sourceForm.type === 1" class="">
        <div class="checkType">
          <span>通过类型：</span>
          <span @click="sourceForm.sourceStatus = 1" :class="{'active': sourceForm.sourceStatus === 1}">长期信源</span>
          <span @click="sourceForm.sourceStatus = 2" :class="{'active': sourceForm.sourceStatus === 2}">临时信源</span>
        </div>
        <div class="checkRemark"></div>
      </div>
      <div class="checkRemarkContent">
        <span>{{sourceForm.type ? '备注信息（选择临时信源必填此项）' : '备注信息'}}</span>
        <el-input type="textarea" rows="10" v-model="sourceForm.remark" placeholder="请输入备注信息"></el-input>
      </div>
      <div class="checkBtnList">
        <el-button size="mini" type="info" @click="cancelDialogClick">取消</el-button>
        <el-button size="mini" type="primary" @click="submitDialogClick">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="application/javascript">
  import userSourceView from './userSourceView'
  export default {
    name: 'userSource',
    components: {
      userSourceView
    },
    data() {
      return {
        statusList: [{name: '全部', value: ''}, {name: '待审核', value: 0}, {name: '审核通过', value: 1}, {name: '审核未通过', value: 3}],
        initParams: {
          sourceStatus: '',
          sourceName: '',
          currentIndex: 1,
          pageSize: 10,
          pageSizes: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 10000],
          total: 0
        },
        dialogSourceViewVisible: false,
        dialogSourceCheckVisible: false,
        sourceList: [],
        sourceForm: {
          id: '',
          type: '',
          sourceStatus: '',
          remark: ''
        },
        viewDetail: {
          isShow: false
        }
      }
    },
    created() {
      this.getSourceRequest()
    },
    methods: {
      /**
       * 初始化获取数据列表、查询
       */
      getSourceRequest() {
        let params = {}
        if (this.initParams.sourceStatus !== '') params.sourceStatus = this.initParams.sourceStatus
        if (this.initParams.sourceName) params.sourceName = this.initParams.sourceName
        params.currentIndex = this.initParams.currentIndex
        params.pageSize = this.initParams.pageSize
        let url = `api/userSource/list`
        this.$get(url, params).then(response => {
          if (response.status === 200) {
            if (Array.isArray(response.data) && response.data.length) {
              this.sourceList = response.data
              this.initParams.total = response.total
            } else {
              this.sourceList = []
              this.initParams.total = 0
            }
          } else {
          }
        })
      },
      /**
       * 修改信源状态、审核
       */
      updateUserSourceRequest(callBack) {
        let params = {}
        if (this.sourceForm.id) params.id = this.sourceForm.id
        if (this.sourceForm.sourceStatus) params.sourceStatus = this.sourceForm.sourceStatus
        if (this.sourceForm.remark) params.remark = this.sourceForm.remark
        let url = `api/userSource/update`
        this.$post(url, params).then(response => {
          if (response.status === 200) {
            this.$message({message: response.message, type: 'success'})
            callBack(true)
          }
        })
      },
      /**
       * 切换状态请求数据
       */
      statusToggle() {
        this.initParams.currentIndex = 1
        this.initParams.sourceName = ''
        this.getSourceRequest()
      },
      /**
       * 点击查询数据
       */
      searchClick() {
        this.initParams.sourceStatus = ''
        this.initParams.currentIndex = 1
        this.getSourceRequest()
      },
      /**
       * 重置搜索条件
       */
      resetClick() {
        this.initParams.currentIndex = 1
        this.initParams.sourceStatus = ''
        this.initParams.sourceName = ''
        this.getSourceRequest()
      },
      /**
       * 每页显示多少页
       */
      handleSizeChange(pageSize) {
        this.initParams.pageSize = pageSize
        this.getSourceRequest()
      },
      /**
       * 翻页跳转
       */
      handleCurrentChange(currentPage) {
        this.initParams.currentIndex = currentPage
        this.getSourceRequest()
      },
      /**
       * 打开详细界面
       * @param type
       */
      showViewDialog(obj) {
        this.viewDetail.isShow = true
        this.viewDetail.data = obj
      },
      closeClickDialog(state) {
        this.viewDetail.isShow = false
        this.viewDetail.data = {}
        if (state) this.getSourceRequest()
      },
      /**
       * 打开审核界面
       * @param type
       */
      showCheckDialog(obj, type) {
        this.sourceForm.type = type
        this.sourceForm.id = obj.id
        this.dialogSourceCheckVisible = true
      },
      /**
       * 关闭弹窗
       */
      cancelDialogClick() {
        this.sourceForm.type = ''
        this.sourceForm.id = ''
        this.sourceForm.sourceStatus = ''
        this.sourceForm.remark = ''
        this.dialogSourceCheckVisible = false
      },
      submitDialogClick() {
        if (this.sourceForm.type === 0) {
          this.sourceForm.sourceStatus = 3
          if (!this.sourceForm.remark) {
            this.$message({message: '请输入备注信息', type: 'warning'})
            return false
          }
        } else if (this.sourceForm.type === 1) {
          if (!this.sourceForm.sourceStatus) {
            this.$message({message: '请选择通过类型', type: 'warning'})
            return false
          }
        }
        this.updateUserSourceRequest((status) => {
          if (status) {
            this.getSourceRequest()
            this.cancelDialogClick()
          }
        })
      },
      /**
       * 重写table样式
       * @param row
       * @param column
       * @param rowIndex
       * @param columnIndex
       * @returns {string}
       */
      tableHeaderColor: function ({row, column, rowIndex, columnIndex}) {
        return 'background-color: transparent; color: #444; font-weight: 500; text-align: center'
      }
    }
  }
</script>

<style scoped lang="less">
  .userSource {
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
    .checkType {
      display: flex;
      flex-flow: row nowrap;
      justify-content: left;
      align-content: flex-start;
      & span {
        font-size: 14px;
        padding: 5px 10px;
        margin: 0 10px;
        border: 1px solid #cccccc;
        border-radius: 5px;
        cursor: pointer;
      }
      & span:first-child {
        border: 0;
        margin: 0;
        cursor: default;
      }
      & span:nth-child(2) {
        margin-left: 0;
      }
      & span.active {
        border: 1px solid green;
        background: green;
        color: white;
      }
    }
    .checkRemarkContent {
      width: auto;
      margin-top: 20px;
      padding: 0 10px;
      & span {
      }
      .el-textarea {
        margin-top: 10px;
      }
    }
    .checkBtnList {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-content: flex-start;
      margin-top: 30px;
      & button:first-child {
        margin-right: 50px;
      }
    }
  }
</style>
