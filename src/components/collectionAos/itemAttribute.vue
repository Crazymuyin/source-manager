<template>
  <div class="itemAttribute">
    <div class="runInfo">
      <el-row>
        <el-col :span="8"><div class="currentRunNum"><span>当前运行项目数：</span>--</div></el-col>
        <el-col :span="8"><div class="sourceTotal"><span>信源总数：</span>{{sourceCountList.sourceTotal ? sourceCountList.sourceTotal : '--'}}</div></el-col>
        <el-col :span="8"><div class="sameRunNum"><span>允许同时运行信源数：</span>{{sourceCountList.exerciseAmount ? sourceCountList.exerciseAmount : '--'}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><div class="runSourceNum"><span>正在运行的信源数：</span>{{sourceCountList.exerciseAmount ? sourceCountList.exerciseAmount : '--'}}</div></el-col>
        <el-col :span="8"><div class="waitingSourceNum"><span>等待运行信源：</span>{{sourceCountList.awaitStartMessage ? sourceCountList.awaitStartMessage : '--'}}</div></el-col>
        <el-col :span="8"><div class="lullSourceNum"><span>暂停运行信源数：</span>{{sourceCountList.awaitStartMessage ? sourceCountList.awaitStartMessage : '--'}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><div class="visitTotal"><span>累计网页访问量：</span>--</div></el-col>
        <el-col :span="8"><div class="gatherTotal"><span>累计采集数据量：</span>{{sourceCountList.collectCount ? sourceCountList.collectCount : '--'}}</div></el-col>
        <el-col :span="8"><div class="validTotal"><span>有效数据量：</span>{{sourceCountList.aosTotal ? sourceCountList.aosTotal : '--'}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><div class="lastRun"><span>上次运行：</span>{{sourceCountList.startTime ? sourceCountList.startTime : '--'}}</div></el-col>
        <el-col :span="8"><div class="lastEnd"><span>上次结束：</span>{{sourceCountList.endTime ? sourceCountList.endTime : '--'}}</div></el-col>
      </el-row>
    </div>
    <hr/>
    <div class="currentData">
      <span class="title">当前数据</span>
      <el-table :data="dataCount"
                v-loading="model.loading"
                :row-style="tableRowStyle"
                :header-row-style="tableHeaderRowColor"
                :cell-style="tableCellColor"
                :header-cell-style="tableHeaderColor"
                border style="width: 100%"
      >
        <el-table-column prop="title" label="文章标题" width="200" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="publish_date" label="时间" width="180" align="center"></el-table-column>
        <el-table-column prop="content" label="内容" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="作者" width="150" align="center">
          <template slot-scope="scope">
            <div style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden; padding-right: 10px">{{scope.row.author ? scope.row.author : '--'}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="source_name" label="来源" width="200" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column label="阅读数" width="80" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.click ? scope.row.click : '--'}}</div>
          </template>
        </el-table-column>
        <el-table-column label="评论数" width="80" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.repeat_total ? scope.row.repeat_total : '--'}}</div>
          </template>
        </el-table-column>
        <el-table-column label="评论" :show-overflow-tooltip="true" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.comment ? scope.row.comment : '--'}}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="wrapper-page" v-if="pageShow">
      <el-row>
        <el-col :span="24">
          <div class="block">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="pageInfo.currentPage"
              :page-size="pageInfo.pageSize"
              layout="total, prev, pager, next"
              :total="pageInfo.total">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="application/ecmascript">
  export default {
    name: 'itemAttribute',
    props: {
      model: Object
    },
    data() {
      return {
        currentPage: 4,
        sourceCountList: {},
        dataCount: [],
        pageInfo: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        pageShow: true
      }
    },
    methods: {
      tableHeaderRowColor: function({row, rowIndex}) {
        return 'background-color: transparent; padding: 0;'
      },
      tableRowStyle: function ({row, rowIndex}) {
        return 'background-color: transparent; text-align:center; padding: 0;'
      },
      tableHeaderColor: function ({row, column, rowIndex, columnIndex}) {
        return 'border-right: 1px solid #777; border-bottom: 1px solid #777; padding: 8px 0; background-color: transparent; color: #444; font-weight: 500; text-align: center'
      },
      tableCellColor: function ({row, column, rowIndex, columnIndex}) {
        return 'border-right: 1px solid #777; border-bottom: 1px solid #777; padding: 8px 0; height: 20px;'
      },
      // 分页
      handleCurrentChange: function(currentPage) {
        this.pageInfo.currentPage = currentPage
        this.$emit('page', this.pageInfo.currentPage)
      }
    },
    watch: {
      model: {
        handler: function (val) {
          if (val) {
            this.dataCount = val.dataList
            this.pageInfo.total = val.pageInfo.total
            this.pageInfo.currentPage = val.pageInfo.current
            this.sourceCountList = val.sourceCountList
          }
          if (val.dataList.length <= 0) {
            this.pageShow = false
          } else {
            this.pageShow = true
          }
        },
        deep: true,
        immediate: false
      }
    }
  }
</script>

<style scoped lang="less">
  .itemAttribute {
    width: 100%;
    height: 100%;
    .runInfo {
      border: 5px solid #cccccc;
      margin: 20px 0 30px 0;
      padding: 5px 0;
      .el-row {
        font-size: 14px;
        padding: 5px 20px;
        color: #333333;
        .el-col {
          & div {
            & span {
              display: block;
              width: 150px;
              float: left;
              text-align: right;
            }
          }
        }
      }
    }
    .currentData {
      width: auto;
      height: auto;
      & span {
        display: block;
        font-size: 14px;
        margin: 20px 0 10px 0;
      }
    }
    /* 重置表格背景 */
    .el-table, .el-table__expanded-cell {
      background-color: transparent;
    }

    el-table th, .el-table tr {
      background-color: transparent;
    }

    .el-table--border, .el-table--group {
      border: 1px solid #666;
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
