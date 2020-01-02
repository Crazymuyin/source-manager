<template>
  <div class="sourceCount">
    <div class="total">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>{{count.total ? count.total : '--'}}</span>
            <span>平台信源总数</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>{{count.myTotal ? count.myTotal : '--'}}</span>
            <span>我的信源总量</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>{{count.myOfferTotal ? count.myOfferTotal : '--'}}</span>
            <span>我的数据贡献量</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>{{count.yesOfferTotal ? count.yesOfferTotal : '--'}}</span>
            <span>我的有效数据贡献量</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="tableCount">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="toDayCount">
            <span class="title">当日数据统计</span>
            <el-table :data="toDayCount" :row-style="tableRowStyle" :header-row-style="tableHeaderRowColor" :cell-style="tableCellColor" :header-cell-style="tableHeaderColor" border style="width: 100%">
              <el-table-column prop="type" label="类型"></el-table-column>
              <el-table-column label="今日新增">
                <template slot-scope="scope">
                  {{scope.row.total ? scope.row.total : '--'}}
                </template>
              </el-table-column>
              <el-table-column label="退回">
                <template slot-scope="scope">
                  {{scope.row.back ? scope.row.back : '--'}}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="dataCount">
            <span class="title">数据统计</span>
            <el-table :data="dataCount" :row-style="tableRowStyle" :header-row-style="tableHeaderRowColor" :cell-style="tableCellColor" :header-cell-style="tableHeaderColor" border style="width: 100%">
              <el-table-column label="">
                <el-table-column prop="type" label="媒体类型"></el-table-column>
              </el-table-column>
              <el-table-column label="信源">
                <el-table-column prop="sourceTotal" label="总量">
                  <template slot-scope="scope">
                    {{scope.row.sourceTotal ? scope.row.sourceTotal : '--'}}
                  </template>
                </el-table-column>
                <el-table-column prop="sourceMonth" label="近一月新增">
                  <template slot-scope="scope">
                    {{scope.row.sourceMonth ? scope.row.sourceMonth : '--'}}
                  </template>
                </el-table-column>
                <el-table-column prop="sourceWeek" label="近一周新增">
                  <template slot-scope="scope">
                    {{scope.row.sourceWeek ? scope.row.sourceWeek : '--'}}
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="信息">
                <el-table-column label="总量">
                  <template slot-scope="scope">
                    {{scope.row.infoMonth ? scope.row.infoMonth : '--'}}
                  </template>
                </el-table-column>
                <el-table-column label="近一月新增">
                  <template slot-scope="scope">
                    {{scope.row.infoMonth ? scope.row.infoMonth : '--'}}
                  </template>
                </el-table-column>
                <el-table-column label="近一周新增">
                  <template slot-scope="scope">
                    {{scope.row.infoWeek ? scope.row.infoWeek : '--'}}
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="有效信息">
                <el-table-column label="总量">
                  <template slot-scope="scope">
                    {{scope.row.validTotal ? scope.row.validTotal : '--'}}
                  </template>
                </el-table-column>
                <el-table-column label="近一月新增">
                  <template slot-scope="scope">
                    {{scope.row.validMonth ? scope.row.validMonth : '--'}}
                  </template>
                </el-table-column>
                <el-table-column label="近一周新增">
                  <template slot-scope="scope">
                    {{scope.row.validWeek ? scope.row.validWeek : '--'}}
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="application/ecmascript">
  import {getLocalStorage} from '../../common/cookie'
  export default {
    name: 'sourceCount',
    data() {
      return {
        count: {
          total: 0,
          myTotal: 0,
          myOfferTotal: 0,
          yesOfferTotal: 0
        },
        toDayCount: [{type: '新闻', total: 0, back: 0}, {type: '论坛', total: 0, back: 0}, {type: '微博', total: 0, back: 0}, {type: '微信', total: 0, back: 0}, {type: '帖吧', total: 0, back: 0}, {type: '平媒', total: 0, back: 0}, {type: '搜索', total: 0, back: 0}, {type: '留言板', total: 0, back: 0}],
        dataCount: [
          {type: '新闻', sourceTotal: 0, sourceMonth: 0, sourceWeek: 0, infoTotal: 0, infoMonth: 0, infoWeek: 0, validTotal: 0, validMonth: 0, validWeek: 0},
          {type: '论坛', sourceTotal: 0, sourceMonth: 0, sourceWeek: 0, infoTotal: 0, infoMonth: 0, infoWeek: 0, validTotal: 0, validMonth: 0, validWeek: 0},
          {type: '微博', sourceTotal: 0, sourceMonth: 0, sourceWeek: 0, infoTotal: 0, infoMonth: 0, infoWeek: 0, validTotal: 0, validMonth: 0, validWeek: 0},
          {type: '微信', sourceTotal: 0, sourceMonth: 0, sourceWeek: 0, infoTotal: 0, infoMonth: 0, infoWeek: 0, validTotal: 0, validMonth: 0, validWeek: 0},
          {type: '帖吧', sourceTotal: 0, sourceMonth: 0, sourceWeek: 0, infoTotal: 0, infoMonth: 0, infoWeek: 0, validTotal: 0, validMonth: 0, validWeek: 0},
          {type: '平媒', sourceTotal: 0, sourceMonth: 0, sourceWeek: 0, infoTotal: 0, infoMonth: 0, infoWeek: 0, validTotal: 0, validMonth: 0, validWeek: 0},
          {type: '搜索', sourceTotal: 0, sourceMonth: 0, sourceWeek: 0, infoTotal: 0, infoMonth: 0, infoWeek: 0, validTotal: 0, validMonth: 0, validWeek: 0},
          {type: '留言板', sourceTotal: 0, sourceMonth: 0, sourceWeek: 0, infoTotal: 0, infoMonth: 0, infoWeek: 0, validTotal: 0, validMonth: 0, validWeek: 0}
        ]
      }
    },
    created () {
      this.getPlatformCountReq()
      this.getTodayDataReq()
      this.getDataCountReq()
    },
    methods: {
      tableHeaderRowColor: function({row, rowIndex}) {
        return 'background-color: transparent;'
      },
      tableRowStyle: function ({row, rowIndex}) {
        return 'background-color: transparent; text-align:center'
      },
      tableHeaderColor: function ({row, column, rowIndex, columnIndex}) {
        return 'border-right: 1px solid #777; border-bottom: 1px solid #777; padding: 8px 0; background-color: transparent; color: #444; font-weight: 500; text-align: center'
      },
      tableCellColor: function ({row, column, rowIndex, columnIndex}) {
        return 'border-right: 1px solid #777; border-bottom: 1px solid #777; padding: 8px 0; text-align:center;'
      },
      getPlatformCountReq: function () {
        let url = 'api/sourceadd/platformcount'
        this.$get(url, {addId: getLocalStorage('userId')}).then(res => {
          if (res.code === 200) {
            this.count.total = res.data.total
            this.count.myTotal = res.data.mytotal
          }
          if (res.code === 404) {
            this.$message({
              message: res.message,
              type: 'error'
            })
          }
        }).catch(error => {
          console.log(error)
        })
      },
      getTodayDataReq: function () {
        let url = 'api/sourceadd/todaydata'
        this.$get(url).then(res => {
          if (res.code === 200) {
            this.toDayCount = res.data
          }
        }).catch(error => {
          console.log(error)
        })
      },
      getDataCountReq: function () {
        let url = 'api/sourceadd/datacount'
        this.$get(url).then(res => {
          if (res.code === 200) {
            this.dataCount.forEach(item => {
              res.data.forEach(list => {
                if (item.type === list.type) {
                  item.sourceTotal = list.total
                  item.sourceMonth = list.month
                  item.sourceWeek = list.week
                }
              })
            })
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped lang="less">
.sourceCount {
  width: 100%;
  height: 100%;
  .total {
    width: 100%;
    height: 100%;
    .el-row {
      margin-bottom: 50px;
    }
    .el-col {
      border-radius: 4px;
      .bg-purple {
        background: #909399;
      }
      .grid-content {
        border-radius: 4px;
        min-height: 36px;
        & span {
          display: block;
          line-height: 36px;
          text-align: center;
          color: white;
        }
        & span:first-child {
          padding-top: 20px;
          font-size: 20px;
        }
        & span:last-child {
          padding-bottom: 20px;
        }
      }
    }
  }
  .tableCount {
    width: 100%;
    height: 100%;
    .el-row {
      .el-col {
        .toDayCount, .dataCount {
          & span {
            display: block;
            text-align: center;
            margin-bottom: 20px;
          }
        }
      }
    }
  }
  .bg-purple {
    background: #909399;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
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
}
</style>
