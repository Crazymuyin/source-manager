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
        <el-col>
          <div class="dataCount">
            <span class="title">绩效统计</span>
            <el-row>
              <el-radio-group v-model="viewTime" size="big" @change="changeTime(viewTime)">
                <el-radio-button v-for="(item, index) in conditionTime" :key="index" :label="item.key">{{item.name}}</el-radio-button>
              </el-radio-group>
              <el-date-picker v-model="dataRange" v-show="viewTime === 'diy'" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
              <div class="fn_right">
                <el-select v-model="coPlatform" placeholder="请选择同步平台">
                  <el-option
                    v-for="item in platformOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-date-picker
                  v-model="cogradient"
                  type="date"
                  placeholder="请选择同步日期">
                </el-date-picker>
                <el-button type="primary" icon="el-icon-refresh" @click="cogradientData">同步</el-button>
              </div>
            </el-row>
            <div style="width: 100%; height: 50px; line-height: 50px; text-align: center">AOS信源统计</div>
            <el-table :data="groupData" :row-style="tableRowStyle" :span-method="objectSpanMethod" :header-row-style="tableHeaderRowColor" :cell-style="tableCellColor" :header-cell-style="tableHeaderColor" border style="width: 100%">
              <el-table-column label="部门" prop="group">
                <template slot-scope="scope">
                  {{scope.row.group ? scope.row.group : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="姓名" prop="groupMaker">
                <template slot-scope="scope">
                  {{scope.row.groupMaker ? scope.row.groupMaker : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="新闻" prop="news">
                <template slot-scope="scope">
                  {{scope.row.news ? scope.row.news : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="论坛" prop="bbs">
                <template slot-scope="scope">
                  {{scope.row.bbs ? scope.row.bbs : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="微博" prop="blog">
                <template slot-scope="scope">
                  {{scope.row.blog ? scope.row.blog : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="微信" prop="chat">
                <template slot-scope="scope">
                  {{scope.row.chat ? scope.row.chat : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="贴吧" prop="postBar">
                <template slot-scope="scope">
                  {{scope.row.postBar ? scope.row.postBar : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="平媒" prop="newspaper">
                <template slot-scope="scope">
                  {{scope.row.newspaper ? scope.row.newspaper : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="搜索引擎" prop="search">
                <template slot-scope="scope">
                  {{scope.row.search ? scope.row.search : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="留言板" prop="msgBoard">
                <template slot-scope="scope">
                  {{scope.row.msgBoard ? scope.row.msgBoard : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="其他" prop="other">
                <template slot-scope="scope">
                  {{scope.row.other ? scope.row.other : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="合计" prop="total">
                <template slot-scope="scope">
                  {{scope.row.total ? scope.row.total : '&#45;&#45;'}}
                </template>
              </el-table-column>
            </el-table>
            <div style="width: 100%; height: 50px; line-height: 50px; text-align: center">云测信源统计</div>
            <el-table :data="yunceData" :row-style="tableRowStyle" :span-method="yunceSpanMethod" :header-row-style="tableHeaderRowColor" :cell-style="tableCellColor" :header-cell-style="tableHeaderColor" border style="width: 100%">
              <el-table-column label="部门" prop="group">
                <template slot-scope="scope">
                  {{scope.row.group ? scope.row.group : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="姓名" prop="groupMaker">
                <template slot-scope="scope">
                  {{scope.row.groupMaker ? scope.row.groupMaker : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="新闻" prop="news">
                <template slot-scope="scope">
                  {{scope.row.news ? scope.row.news : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="论坛" prop="bbs">
                <template slot-scope="scope">
                  {{scope.row.bbs ? scope.row.bbs : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="微博" prop="blog">
                <template slot-scope="scope">
                  {{scope.row.blog ? scope.row.blog : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="微信" prop="chat">
                <template slot-scope="scope">
                  {{scope.row.chat ? scope.row.chat : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="贴吧" prop="postBar">
                <template slot-scope="scope">
                  {{scope.row.postBar ? scope.row.postBar : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="平媒" prop="newspaper">
                <template slot-scope="scope">
                  {{scope.row.newspaper ? scope.row.newspaper : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="搜索引擎" prop="search">
                <template slot-scope="scope">
                  {{scope.row.search ? scope.row.search : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="留言板" prop="msgBoard">
                <template slot-scope="scope">
                  {{scope.row.msgBoard ? scope.row.msgBoard : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="其他" prop="other">
                <template slot-scope="scope">
                  {{scope.row.other ? scope.row.other : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="合计" prop="total">
                <template slot-scope="scope">
                  {{scope.row.total ? scope.row.total : '&#45;&#45;'}}
                </template>
              </el-table-column>
            </el-table>

            <div style="width: 100%; height: 50px; line-height: 50px; text-align: center">AOS重复信源统计</div>
            <el-table :data="aosRepeatData" :row-style="tableRowStyle" :span-method="yunceSpanMethod" :header-row-style="tableHeaderRowColor" :cell-style="tableCellColor" :header-cell-style="tableHeaderColor" border style="width: 100%">
              <el-table-column label="部门" prop="group">
                <template slot-scope="scope">
                  {{scope.row.group ? scope.row.group : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="姓名" prop="groupMaker">
                <template slot-scope="scope">
                  {{scope.row.groupMaker ? scope.row.groupMaker : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="新闻" prop="news">
                <template slot-scope="scope">
                  {{scope.row.news ? scope.row.news : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="论坛" prop="bbs">
                <template slot-scope="scope">
                  {{scope.row.bbs ? scope.row.bbs : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="微博" prop="blog">
                <template slot-scope="scope">
                  {{scope.row.blog ? scope.row.blog : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="微信" prop="chat">
                <template slot-scope="scope">
                  {{scope.row.chat ? scope.row.chat : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="贴吧" prop="postBar">
                <template slot-scope="scope">
                  {{scope.row.postBar ? scope.row.postBar : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="平媒" prop="newspaper">
                <template slot-scope="scope">
                  {{scope.row.newspaper ? scope.row.newspaper : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="搜索引擎" prop="search">
                <template slot-scope="scope">
                  {{scope.row.search ? scope.row.search : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="留言板" prop="msgBoard">
                <template slot-scope="scope">
                  {{scope.row.msgBoard ? scope.row.msgBoard : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="其他" prop="other">
                <template slot-scope="scope">
                  {{scope.row.other ? scope.row.other : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="合计" prop="total">
                <template slot-scope="scope">
                  {{scope.row.total ? scope.row.total : '&#45;&#45;'}}
                </template>
              </el-table-column>
            </el-table>
            <div style="width: 100%; height: 50px; line-height: 50px; text-align: center">云测重复信源统计</div>
            <el-table :data="yunceRepeatData" :row-style="tableRowStyle" :span-method="yunceSpanMethod" :header-row-style="tableHeaderRowColor" :cell-style="tableCellColor" :header-cell-style="tableHeaderColor" border style="width: 100%">
              <el-table-column label="部门" prop="group">
                <template slot-scope="scope">
                  {{scope.row.group ? scope.row.group : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="姓名" prop="groupMaker">
                <template slot-scope="scope">
                  {{scope.row.groupMaker ? scope.row.groupMaker : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="新闻" prop="news">
                <template slot-scope="scope">
                  {{scope.row.news ? scope.row.news : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="论坛" prop="bbs">
                <template slot-scope="scope">
                  {{scope.row.bbs ? scope.row.bbs : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="微博" prop="blog">
                <template slot-scope="scope">
                  {{scope.row.blog ? scope.row.blog : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="微信" prop="chat">
                <template slot-scope="scope">
                  {{scope.row.chat ? scope.row.chat : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="贴吧" prop="postBar">
                <template slot-scope="scope">
                  {{scope.row.postBar ? scope.row.postBar : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="平媒" prop="newspaper">
                <template slot-scope="scope">
                  {{scope.row.newspaper ? scope.row.newspaper : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="搜索引擎" prop="search">
                <template slot-scope="scope">
                  {{scope.row.search ? scope.row.search : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="留言板" prop="msgBoard">
                <template slot-scope="scope">
                  {{scope.row.msgBoard ? scope.row.msgBoard : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="其他" prop="other">
                <template slot-scope="scope">
                  {{scope.row.other ? scope.row.other : '&#45;&#45;'}}
                </template>
              </el-table-column>
              <el-table-column label="合计" prop="total">
                <template slot-scope="scope">
                  {{scope.row.total ? scope.row.total : '&#45;&#45;'}}
                </template>
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
  import moment from 'moment/moment'
  export default {
    name: 'sourceManagerCount',
    data() {
      return {
        count: {
          total: 0,
          myTotal: 0,
          myOfferTotal: 0,
          yesOfferTotal: 0
        },
        coPlatform: '',
        platformOptions: [
          {value: 'aos', label: 'AOS'},
          {value: 'yunce', label: '云测'}
        ],
        cogradient: '',
        dataRange: '',
        spanArr: [],
        spanRArr: [],
        position: 0,
        positionR: 0,
        yunceSpanArr: [],
        yunceRSpanArr: [],
        yuncePosition: 0,
        yunceRPosition: 0,
        conditionTime: [{name: '今天', key: 'today'}, {name: '本周', key: 'currentWeek'}, {name: '上周', key: 'lastWeek'}, {name: '本月', key: 'currentMonth'}, {name: '自定义', key: 'diy'}],
        viewTime: 'today',
        groupData: [],
        yunceData: [],
        aosRepeatData: [],
        yunceRepeatData: [],
        params: {
          dateTime: 'today',
          startTime: '',
          endTime: ''
        }
      }
    },
    created () {
      this.getPlatformCountReq()
      this.getDataCountReq()
      this.getYunceCountReq()
      this.getRepeatACountReq()
      this.getRepeatYCountReq()
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
      // 同步按钮
      cogradientData: function () {
        if (this.coPlatform === '') {
          this.$message('请选择同步平台!')
          return false
        }
        if (this.cogradient === '') {
          this.$message('请选择同步日期!')
          return false
        }
        this.refreshDataReq()
      },
      // AOS部门行合并
      rowspan() {
        this.spanArr = []
        this.position = 0
        this.groupData.forEach((item, index) => {
          if (index === 0) {
            this.spanArr.push(1)
            this.position = 0
          } else {
            if (this.groupData[index].group === this.groupData[index - 1].group) {
              this.spanArr[this.position] += 1 // 连续有几行项目名名称相同
              this.spanArr.push(0) // 名称相同后往数组里面加一项0
            } else {
              this.spanArr.push(1)
              this.position = index
            }
          }
        })
      },
      // AOS重复部门行合并
      rowsRepeatSpan() {
        this.spanRArr = []
        this.positionR = 0
        this.aosRepeatData.forEach((item, index) => {
          if (index === 0) {
            this.spanRArr.push(1)
            this.positionR = 0
          } else {
            if (this.aosRepeatData[index].group === this.aosRepeatData[index - 1].group) {
              this.spanRArr[this.positionR] += 1 // 连续有几行项目名名称相同
              this.spanRArr.push(0) // 名称相同后往数组里面加一项0
            } else {
              this.spanRArr.push(1)
              this.positionR = index
            }
          }
        })
      },
      objectSpanMethod: function ({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) { // 第一列进行合并
          const _row = this.spanArr[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      },
      // 云测部门行合并
      yunceRowspan() {
        this.yunceSpanArr = []
        this.yuncePosition = 0
        this.yunceData.forEach((item, index) => {
          if (index === 0) {
            this.yunceSpanArr.push(1)
            this.yuncePosition = 0
          } else {
            if (this.yunceData[index].group === this.yunceData[index - 1].group) {
              this.yunceSpanArr[this.yuncePosition] += 1 // 连续有几行项目名名称相同
              this.yunceSpanArr.push(0) // 名称相同后往数组里面加一项0
            } else {
              this.yunceSpanArr.push(1)
              this.yuncePosition = index
            }
          }
        })
      },
      // 云测重复部门行合并
      yunceRepeatRowspan() {
        this.yunceSpanArr = []
        this.yunceRPosition = 0
        this.yunceRepeatData.forEach((item, index) => {
          if (index === 0) {
            this.yunceRSpanArr.push(1)
            this.yunceRPosition = 0
          } else {
            if (this.yunceRepeatData[index].group === this.yunceRepeatData[index - 1].group) {
              this.yunceRSpanArr[this.yunceRPosition] += 1 // 连续有几行项目名名称相同
              this.yunceRSpanArr.push(0) // 名称相同后往数组里面加一项0
            } else {
              this.yunceRSpanArr.push(1)
              this.yunceRPosition = index
            }
          }
        })
      },
      yunceSpanMethod: function ({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) { // 第一列进行合并
          const _row = this.yunceSpanArr[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
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
      // getTodayDataReq: function () {
      //   let url = 'api/sourceadd/todaydata'
      //   this.$get(url).then(res => {
      //     if (res.code === 200) {
      //       this.toDayCount = res.data
      //     }
      //   }).catch(error => {
      //     console.log(error)
      //   })
      // },
      getDataCountReq: function () {
        let url = 'api/sourceadd/meritscount'
        let paramsArr = {}
        if (this.params.dateTime) paramsArr.dateTime = this.params.dateTime
        if (this.params.startTime) paramsArr.startTime = this.params.startTime
        if (this.params.endTime) paramsArr.endTime = this.params.endTime
        this.$get(url, paramsArr).then(res => {
          if (res.code === 200) {
            this.groupData = res.data
            this.rowspan()
          } else {
            this.groupData = []
            this.rowspan()
          }
        }).catch(error => {
          console.log(error)
        })
      },
      getYunceCountReq: function () {
        let url = 'api/sourceadd/yuncecount'
        let paramsArr = {}
        if (this.params.dateTime) paramsArr.dateTime = this.params.dateTime
        if (this.params.startTime) paramsArr.startTime = this.params.startTime
        if (this.params.endTime) paramsArr.endTime = this.params.endTime
        this.$get(url, paramsArr).then(res => {
          if (res.code === 200) {
            this.yunceData = res.data
            this.yunceRowspan()
          } else {
            this.yunceData = []
            this.yunceRowspan()
          }
        }).catch(error => {
          console.log(error)
        })
      },
      getRepeatACountReq: function () {
        let url = 'api/sourceadd/repeatACount'
        let paramsArr = {}
        if (this.params.dateTime) paramsArr.dateTime = this.params.dateTime
        if (this.params.startTime) paramsArr.startTime = this.params.startTime
        if (this.params.endTime) paramsArr.endTime = this.params.endTime
        this.$get(url, paramsArr).then(res => {
          if (res.code === 200) {
            this.aosRepeatData = res.data
            this.rowsRepeatSpan()
          } else {
            this.aosRepeatData = []
            this.rowsRepeatSpan()
          }
        }).catch(error => {
          console.log(error)
        })
      },
      getRepeatYCountReq: function () {
        let url = 'api/sourceadd/repeatYCount'
        let paramsArr = {}
        if (this.params.dateTime) paramsArr.dateTime = this.params.dateTime
        if (this.params.startTime) paramsArr.startTime = this.params.startTime
        if (this.params.endTime) paramsArr.endTime = this.params.endTime
        this.$get(url, paramsArr).then(res => {
          if (res.code === 200) {
            this.yunceRepeatData = res.data
            this.yunceRepeatRowspan()
          } else {
            this.yunceRepeatData = []
            this.yunceRepeatRowspan()
          }
        }).catch(error => {
          console.log(error)
        })
      },
      changeTime: function (item) {
        if (item !== '' && item !== 'diy') {
          this.params.dateTime = item
        } else {
          this.params.startTime = ''
          this.params.endTime = ''
        }
      },
      // 同步数据请求
      refreshDataReq: function () {
        let params = {}
        if (this.coPlatform) params.platform = this.coPlatform
        if (this.cogradient) params.dateTime = moment(this.cogradient).format('YYYY-MM-DD')
        let url = `api/sourceCount/transferData`
        this.$get(url, params).then(res => {
          if (res.code === 200) {
            this.$message({message: res.message, type: 'success'})
          } else {
            this.$message({message: res.message})
          }
        }).catch(() => {
          this.$message({message: '网络错误'})
        })
      }
    },
    watch: {
      params: {
        handler(val) {
          this.groupData = []
          this.yunceData = []
          this.getDataCountReq()
          this.getYunceCountReq()
          this.getRepeatACountReq()
          this.getRepeatYCountReq()
        },
        deep: true,
        immediate: false
      },
      dataRange: {
        handler(val) {
          if (Array.isArray(val) && val.length === 2) {
            this.params.startTime = moment(val[0]).format('YYYY-MM-DD')
            this.params.endTime = moment(val[1]).format('YYYY-MM-DD')
            console.log(this.params)
            this.params.dateTime = 'diy'
          } else {
            this.$message('请选择日期范围')
          }
        },
        deep: true,
        immediate: false
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
