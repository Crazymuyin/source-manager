<template>
  <div class="itemPage">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="项目属性" name="first">
        <item-attribute :model="typeModel" @page="getPageInfo"></item-attribute>
      </el-tab-pane>
      <!--<el-tab-pane label="项目信源状态" name="second">-->
        <!--<item-state></item-state>-->
      <!--</el-tab-pane>-->
      <!--<el-tab-pane label="运行日志" name="third">-->
        <!--<run-log></run-log>-->
      <!--</el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<script type="application/ecmascript">
  import ItemAttribute from './itemAttribute'
  import ItemState from './itemState'
  import RunLog from './runLog'

  export default {
    name: 'itemPage',
    components: {
      ItemAttribute, ItemState, RunLog
    },
    data() {
      return {
        activeName2: 'first',
        params: '',
        pageSize: 10,
        typeModel: {
          sourceCountList: {},
          dataList: [],
          loading: true,
          pageInfo: {
            current: 1,
            total: 0
          }
        }
      }
    },
    methods: {
      init: function() {
        this.typeModel.sourceCountList = {}
        let params = {}
        if (this.params) params.type = this.params
        let url = `system/nature/info`
        this.$get(url, params).then(res => {
          if (res.code === 200) {
            this.typeModel.sourceCountList = res.data
          } else {
            this.typeModel.sourceCountList = {}
            this.$message(res.message)
          }
        }).catch(error => {
          if (error) {
            this.typeModel.sourceCountList = {}
            this.$message(error)
          }
        })
      },
      getListReq: function() {
        this.typeModel.loading = true
        let params = {}
        if (this.params) params.type = this.params
        params.currentPage = this.typeModel.pageInfo.current
        params.pageSize = this.pageSize
        let url = `system/nature/list`
        this.$get(url, params).then(res => {
          if (res.code === 200) {
            this.typeModel.loading = false
            this.typeModel.dataList = res.data.data
            this.typeModel.pageInfo.total = res.data.total
          } else {
            this.typeModel.loading = false
            this.typeModel.pageInfo.total = 0
            this.$message(res.message)
            this.typeModel.dataList = []
          }
        }).catch(error => {
          if (error) {
            this.typeModel.loading = false
            this.typeModel.pageInfo.total = 0
            this.$message({type: 'error', message: error})
            this.typeModel.dataList = []
          }
        })
      },
      getPageInfo(current) {
        this.typeModel.pageInfo.current = current
        this.getListReq()
      },
      handleClick: function (tab, event) {
        console.log(tab, event)
      }
    },
    watch: {
      '$route': {
        handler: function (val) {
          if (val) {
            let pathArr = val.path.split('/')
            let path = pathArr[pathArr.length - 1]
            this.params = path
            this.typeModel.pageInfo.current = 1
            // this.typeModel.dataList = []
            this.init()
            this.getListReq()
          }
        },
        deep: true,
        immediate: true
      }
    }
  }
</script>

<style scoped lang="less">
.itemPage {
  width: 100%;
  height: 100%;
}
</style>
