<template>
  <div class="sourceCount">
    <div class="runInfo">
      <el-row>
        <el-col :span="8"><div class="currentRunNum"><span>当前运行项目数：</span>--</div></el-col>
        <el-col :span="8"><div class="sourceTotal"><span>信源总数：</span>{{sourceCountList.sourceTotal ? sourceCountList.sourceTotal : '--'}}</div></el-col>
        <el-col :span="8"><div class="sameRunNum"><span>允许同时运行信源数：</span>{{sourceCountList.exerciseAmount ? sourceCountList.exerciseAmount : '--'}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><div class="runSourceNum"><span>正在运行的信源数：</span>--</div></el-col>
        <el-col :span="8"><div class="waitingSourceNum"><span>等待运行信源：</span>{{sourceCountList.awaitStartMessage ? sourceCountList.awaitStartMessage : '--'}}</div></el-col>
        <el-col :span="8"><div class="lullSourceNum"><span>暂停运行信源数：</span>{{sourceCountList.awaitStartMessage ? sourceCountList.awaitStartMessage : '--'}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><div class="visitTotal"><span>累计网页访问量：</span>--</div></el-col>
        <el-col :span="8"><div class="gatherTotal"><span>累计采集数据量：</span>{{sourceCountList.collectCount ? sourceCountList.collectCount : '--'}}</div></el-col>
        <el-col :span="8"><div class="validTotal"><span>有效数据量：</span>{{sourceCountList.aosTotal ? sourceCountList.aosTotal : '--'}}</div></el-col>
      </el-row>
      <!--<el-row>-->
        <!--<el-col :span="8"><div class="lastRun"><span>上次运行：</span>2018-08-08</div></el-col>-->
        <!--<el-col :span="8"><div class="lastEnd"><span>上次结束：</span>2018-08-08</div></el-col>-->
      <!--</el-row>-->
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
  export default {
    name: 'sourceCount',
    data() {
      return {
        count: {
          total: 0,
          myTotal: 0,
          myOfferTotal: 10,
          yesOfferTotal: 0
        },
        sourceCountList: {},
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
      this.init()
      this.getTodayDataReq()
      this.getDataCountReq()
    },
    methods: {
      tableHeaderRowColor: function({row, rowIndex}) {
        return 'background-color: transparent;'
      },
      tableRowStyle: function ({row, rowIndex}) {
        return 'background-color: transparent; text-align:center;'
      },
      tableHeaderColor: function ({row, column, rowIndex, columnIndex}) {
        return 'border-right: 1px solid #777; border-bottom: 1px solid #777; padding: 8px 0; background-color: transparent; color: #444; font-weight: 500; text-align: center'
      },
      tableCellColor: function ({row, column, rowIndex, columnIndex}) {
        return 'border-right: 1px solid #777; border-bottom: 1px solid #777; padding: 8px 0; text-align:center;'
      },
      // 数据量统计
      init: function() {
        this.sourceCountList = {}
        let url = `system/nature/info`
        this.$get(url).then(res => {
          if (res.code === 200) {
            this.sourceCountList = res.data
          } else {
            this.sourceCountList = {}
            this.$message(res.message)
          }
        }).catch(error => {
          if (error) {
            this.sourceCountList = {}
            this.$message(error)
          }
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
  .runInfo {
    width: 100%;
    height: 100%;
    border: 5px solid #cccccc;
    margin: 20px 0 50px 0;
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
