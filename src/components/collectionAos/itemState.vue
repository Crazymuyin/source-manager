<template>
  <div class="itemState">
    <el-table :data="dataCount" :row-style="tableRowStyle" :header-row-style="tableHeaderRowColor" :cell-style="tableCellColor" :header-cell-style="tableHeaderColor" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="50px" align="center"></el-table-column>
      <el-table-column prop="sourceName" label="信源名称" width="220px" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="sourceAddress" label="信源地址" width="" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="area" label="地区" width="100px" align="center"></el-table-column>
      <el-table-column prop="industry" label="综合/行业" width="100px" align="center"></el-table-column>
      <el-table-column prop="priority" label="优先级" width="80px" align="center"></el-table-column>
      <el-table-column prop="lastCollectNum" label="最近一次采集数据量" width="150px" align="center"></el-table-column>
      <el-table-column prop="lastValidNum" label="上一天有效数据量" width="140px" align="center"></el-table-column>
      <el-table-column prop="lastValidTime" label="最近一次采集结束时间" width="180px" align="center"></el-table-column>
      <el-table-column prop="currentState" label="当前状态" width="150px" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script type="application/ecmascript">
  export default {
    name: 'itemState',
    data() {
      return {
        dataCount: [
          {id: 1, sourceName: '人民网-滚动人民网-滚动人民网-滚动', sourceAddress: 'file:///home/shmily/Item/web/sourceMap/index.html?to=29D144B1-5B4B-4B73-9AF1-2107AA8CD4FB', area: '乌鲁木齐', industry: '医疗卫生', priority: '3', lastCollectNum: '602', lastValidNum: '30', lastValidTime: '2019-03-05 15:12:05', currentState: '本轮采集已结束'},
          {id: 1, sourceName: '人民网-滚动人民网-滚动人民网-滚动', sourceAddress: 'file:///home/shmily/Item/web/sourceMap/index.html?to=29D144B1-5B4B-4B73-9AF1-2107AA8CD4FB', area: '乌鲁木齐', industry: '医疗卫生', priority: '3', lastCollectNum: '602', lastValidNum: '30', lastValidTime: '2019-03-05 15:12:05', currentState: '本轮采集已结束'},
          {id: 1, sourceName: '人民网-滚动人民网-滚动人民网-滚动', sourceAddress: 'file:///home/shmily/Item/web/sourceMap/index.html?to=29D144B1-5B4B-4B73-9AF1-2107AA8CD4FB', area: '乌鲁木齐', industry: '医疗卫生', priority: '3', lastCollectNum: '602', lastValidNum: '30', lastValidTime: '2019-03-05 15:12:05', currentState: '本轮采集已结束'},
          {id: 1, sourceName: '人民网-滚动人民网-滚动人民网-滚动', sourceAddress: 'file:///home/shmily/Item/web/sourceMap/index.html?to=29D144B1-5B4B-4B73-9AF1-2107AA8CD4FB', area: '乌鲁木齐', industry: '医疗卫生', priority: '3', lastCollectNum: '602', lastValidNum: '30', lastValidTime: '2019-03-05 15:12:05', currentState: '本轮采集已结束'},
          {id: 1, sourceName: '人民网-滚动人民网-滚动人民网-滚动', sourceAddress: 'file:///home/shmily/Item/web/sourceMap/index.html?to=29D144B1-5B4B-4B73-9AF1-2107AA8CD4FB', area: '乌鲁木齐', industry: '医疗卫生', priority: '3', lastCollectNum: '602', lastValidNum: '30', lastValidTime: '2019-03-05 15:12:05', currentState: '本轮采集已结束'},
          {id: 1, sourceName: '人民网-滚动人民网-滚动人民网-滚动', sourceAddress: 'file:///home/shmily/Item/web/sourceMap/index.html?to=29D144B1-5B4B-4B73-9AF1-2107AA8CD4FB', area: '乌鲁木齐', industry: '医疗卫生', priority: '3', lastCollectNum: '602', lastValidNum: '30', lastValidTime: '2019-03-05 15:12:05', currentState: '本轮采集已结束'},
          {id: 1, sourceName: '人民网-滚动人民网-滚动人民网-滚动', sourceAddress: 'file:///home/shmily/Item/web/sourceMap/index.html?to=29D144B1-5B4B-4B73-9AF1-2107AA8CD4FB', area: '乌鲁木齐', industry: '医疗卫生', priority: '3', lastCollectNum: '602', lastValidNum: '30', lastValidTime: '2019-03-05 15:12:05', currentState: '本轮采集已结束'},
          {id: 1, sourceName: '人民网-滚动人民网-滚动人民网-滚动', sourceAddress: 'file:///home/shmily/Item/web/sourceMap/index.html?to=29D144B1-5B4B-4B73-9AF1-2107AA8CD4FB', area: '乌鲁木齐', industry: '医疗卫生', priority: '3', lastCollectNum: '602', lastValidNum: '30', lastValidTime: '2019-03-05 15:12:05', currentState: '本轮采集已结束'}
        ]
      }
    },
    methods: {
      tableHeaderRowColor: function({row, rowIndex}) {
        return 'background-color: transparent;'
      },
      tableRowStyle: function ({row, rowIndex}) {
        return 'background-color: transparent; text-align:center;'
      },
      tableHeaderColor: function ({row, column, rowIndex, columnIndex}) {
        return 'border-right: 1px solid #777; border-bottom: 1px solid #777; padding: 5px 0; background-color: transparent; color: #444; font-weight: 500; text-align: center'
      },
      tableCellColor: function ({row, column, rowIndex, columnIndex}) {
        return 'border-right: 1px solid #777; border-bottom: 1px solid #777; padding: 5px 0; height: 20px;'
      }
    }
  }
</script>

<style scoped lang="less">
.itemState {
  width: 100%;
  height: 100%;
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
