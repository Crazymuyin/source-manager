<template>
  <div class="runLog">
    <el-table :data="dataCount" :row-style="tableRowStyle" :header-row-style="tableHeaderRowColor" :cell-style="tableCellColor" :header-cell-style="tableHeaderColor" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="50px" align="center"></el-table-column>
      <el-table-column prop="sourceName" label="信源名称" width="240px" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="lastValidTime" label="时间" width="180px" align="center"></el-table-column>
      <el-table-column prop="sourceAddress" label="内容页面失败分析" width="" :show-overflow-tooltip="true"></el-table-column>
    </el-table>
  </div>
</template>

<script type="application/ecmascript">
  export default {
    name: 'runLog',
    data() {
      return {
        dataCount: [
          {id: 1, sourceName: '人民网-滚动人民网-滚动人民网-滚动', sourceAddress: 'file:///home/shmily/Item/web/sourceMap/index.html?to=29D144B1-5B4B-4B73-9AF1-2107AA8CD4FB', lastValidTime: '2019-03-05 15:12:05'},
          {id: 1, sourceName: '人民网-滚动人民网-滚动人民网-滚动', sourceAddress: 'file:///home/shmily/Item/web/sourceMap/index.html?to=29D144B1-5B4B-4B73-9AF1-2107AA8CD4FB', lastValidTime: '2019-03-05 15:12:05'},
          {id: 1, sourceName: '人民网-滚动人民网-滚动人民网-滚动', sourceAddress: 'file:///home/shmily/Item/web/sourceMap/index.html?to=29D144B1-5B4B-4B73-9AF1-2107AA8CD4FB', lastValidTime: '2019-03-05 15:12:05'},
          {id: 1, sourceName: '人民网-滚动人民网-滚动人民网-滚动', sourceAddress: 'file:///home/shmily/Item/web/sourceMap/index.html?to=29D144B1-5B4B-4B73-9AF1-2107AA8CD4FB', lastValidTime: '2019-03-05 15:12:05'},
          {id: 1, sourceName: '人民网-滚动人民网-滚动人民网-滚动', sourceAddress: 'file:///home/shmily/Item/web/sourceMap/index.html?to=29D144B1-5B4B-4B73-9AF1-2107AA8CD4FB', lastValidTime: '2019-03-05 15:12:05'},
          {id: 1, sourceName: '人民网-滚动人民网-滚动人民网-滚动', sourceAddress: 'file:///home/shmily/Item/web/sourceMap/index.html?to=29D144B1-5B4B-4B73-9AF1-2107AA8CD4FB', lastValidTime: '2019-03-05 15:12:05'},
          {id: 1, sourceName: '人民网-滚动人民网-滚动人民网-滚动', sourceAddress: 'file:///home/shmily/Item/web/sourceMap/index.html?to=29D144B1-5B4B-4B73-9AF1-2107AA8CD4FB', lastValidTime: '2019-03-05 15:12:05'},
          {id: 1, sourceName: '人民网-滚动人民网-滚动人民网-滚动', sourceAddress: 'file:///home/shmily/Item/web/sourceMap/index.html?to=29D144B1-5B4B-4B73-9AF1-2107AA8CD4FB', lastValidTime: '2019-03-05 15:12:05'},
          {id: 1, sourceName: '人民网-滚动人民网-滚动人民网-滚动', sourceAddress: 'file:///home/shmily/Item/web/sourceMap/index.html?to=29D144B1-5B4B-4B73-9AF1-2107AA8CD4FB', lastValidTime: '2019-03-05 15:12:05'}
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
.runLog {
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
