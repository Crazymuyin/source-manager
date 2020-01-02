<template>
  <div class="mySource">
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
                    @selection-change="handleSelectionChange" max-height="580" stripe border>
            <el-table-column type="selection" width="44" align="center"></el-table-column>
            <el-table-column label="ID" width="90" :show-overflow-tooltip="true"
                             align="center">
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
            <el-table-column label="优先级" width="70" :show-overflow-tooltip="true" align="center">
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
            <el-table-column fixed="right" label="操作" width="240">
              <template slot-scope="scope">
                <el-button size="mini" type="success" round @click="handleEdit(scope.row)">修改</el-button>
                <el-button size="mini" type="danger" round @click="handleDelete(scope.row)">删除</el-button>
                <el-button size="mini" type="primary" round @click="handleSubmit(scope.row)"
                           :disabled="scope.row.status === 1">提交
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div class="wrapper-submit">
      <el-row>
        <el-col :span="3">
          <el-button size="small" @click="handleSubmitAll">提交</el-button>
          <el-button size="small" @click="handleDeleteAll">删除</el-button>
        </el-col>
        <el-col :span="21"></el-col>
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
    <el-dialog
      :visible.sync="editShow"
      width="40%"
      center
      @close="handleCloseEditDialog"
    >
      <el-form :model="sourceForm" :rules="rules" ref="sourceForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="媒体类型" prop="type">
          <el-select v-model="sourceForm.type" placeholder="请选择">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="信源网站名称" prop="webName">
          <el-input class="webName" v-model="sourceForm.webName"></el-input>
        </el-form-item>
        <el-form-item label="信源网站链接" prop="webLink">
          <el-input class="webLink" v-model="sourceForm.webLink"></el-input>
        </el-form-item>
        <el-form-item label="信源等级" prop="sourceLevel">
          <el-select v-model="sourceForm.sourceLevel" placeholder="请选择">
            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="信源名称" prop="sourceName">
          <el-input class="sourceName" v-model="sourceForm.sourceName"></el-input>
        </el-form-item>
        <el-form-item label="信源链接" prop="sourceLink">
          <el-input class="sourceLink" v-model="sourceForm.sourceLink"></el-input>
        </el-form-item>
        <!--<el-form-item label="所属平台" prop="platform">-->
          <!--<el-select v-model="sourceForm.platform" placeholder="请选择">-->
            <!--<el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="所属行业" prop="industry">
          <el-select v-model="sourceForm.industry" placeholder="请选择" allow-create filterable>
            <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属地区" prop="region">
          <el-cascader :options="options5" v-model="sourceForm.region" allow-create filterable></el-cascader>
        </el-form-item>
        <el-form-item label="内容属性" prop="attribute">
          <el-cascader :options="options6" v-model="sourceForm.attribute" filterable change-on-select></el-cascader>
        </el-form-item>
        <el-form-item label="采集优先级" prop="priority">
          <el-select v-model="sourceForm.priority" placeholder="请选择">
            <el-option v-for="item in options7" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-row :gutter='10' type="flex" justify="center" align="middle">
          <el-col :span="8"></el-col>
          <el-col :span="4">
            <el-button type="info" @click="cancelForm('sourceForm')" class="save">取消</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="submitForm('sourceForm')" class="save">保存</el-button>
          </el-col>
          <el-col :span="8"></el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script type="application/ecmascript">
  // import {  provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
  import {regionDataPlus, CodeToText, TextToCode} from 'element-china-area-data'
  import {getLocalStorage} from '../../common/cookie'
  import {
    getPlatformOptions,
    getMediaTypeOptions,
    getStatusOptions,
    getSourceLevelOptions,
    getPriorityOptions
  } from '../../common/option.config'

  export default {
    name: 'mySource',
    data() {
      const checkHttp = (rule, value, callback) => {
        // const httpReg = /^((https|http|ftp|rtsp|mms){0,1}(:\/\/){0,1})www\.(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~])+$/
        const httpReg = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/
        if (!value) {
          return callback(new Error('请输入链接'))
        }
        setTimeout(() => {
          if (httpReg.test(value)) {
            callback()
          } else {
            callback(new Error('链接格式不正确'))
          }
        }, 1000)
      }
      return {
        platformList: getPlatformOptions(),
        typeList: getMediaTypeOptions(),
        statusList: getStatusOptions(),
        sourceLevelList: getSourceLevelOptions(),
        priorityList: getPriorityOptions(),
        // regionList: getAreaOptions(),
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
        editShow: false,
        sourceList: [],
        idList: [],
        pageInfo: {
          currentPage: 1,
          pageSize: 10,
          pageSizes: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 10000],
          total: 0
        },
        sourceForm: {
          id: '',
          type: '',
          webName: '',
          webLink: '',
          sourceLevel: '',
          sourceName: '',
          sourceLink: '',
          platform: '',
          industry: '',
          region: [''],
          attribute: [],
          priority: ''
        },
        options1: getMediaTypeOptions().splice(1),
        options2: getSourceLevelOptions().splice(1),
        options3: getPlatformOptions().splice(1),
        options4: [],
        options5: regionDataPlus,
        options6: [
          {
            value: '公共',
            label: '公共',
            children: [{
              value: '四川电力',
              label: '四川电力'
            }]
          }, {
            value: '私有',
            label: '私有',
            children: [{
              value: '四川电力',
              label: '四川电力'
            }]
          }],
        options7: getPriorityOptions().splice(1),
        rules: {
          type: [
            {required: true, message: '请选择媒体类型', trigger: 'change'}
          ],
          webName: [
            {required: true, message: '请输入信源网站名称', trigger: 'blur'},
            {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          webLink: [
            {validator: checkHttp, trigger: 'blur'}
          ],
          sourceLevel: [
            {required: true, message: '请选择信源等级', trigger: 'change'}
          ],
          sourceName: [
            {required: true, message: '请输入信源名称', trigger: 'blur'},
            {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
          sourceLink: [
            {validator: checkHttp, trigger: 'blur'}
          ],
          platform: [
            {required: true, message: '请选择信源平台', trigger: 'change'}
          ],
          industry: [
            {required: true, message: '请选择所属行业', trigger: 'change'}
          ],
          region: [
            {required: true, message: '请选择所属地区', trigger: 'change'}
          ],
          attribute: [
            {required: true, message: '请选择内容属性', trigger: 'change'}
          ],
          priority: [
            {required: true, message: '请选择采集优先级', trigger: 'change'}
          ]
        }
      }
    },
    created() {
      this.initParams.userId = getLocalStorage('userId')
    },
    methods: {
      changeSelect: function() {
        this.pageInfo.currentPage = 1
        this.init()
      },
      init: function () {
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
        let url = 'api/sourceAdd/mySource/getSourceList'
        this.$get(url, params).then(response => {
          console.log(response)
          if (response.status === 1) {
            this.sourceList = response.data
            this.pageInfo.total = response.total
          } else {
            this.$message({type: 'warning', message: response.message})
          }
        }).catch(error => {
          if (error) {
            this.$message({type: 'error', message: error})
          }
        })
      },
      initIndustry() {
        let params = {}
        if (this.initParams.platform) params.platform = this.initParams.platform
        let url = 'api/public/getIndustryList'
        this.$get(url, params).then(response => {
          let temp = []
          response.data.forEach(function (item) {
            temp.push({label: item.industry, value: item.industry})
          })
          this.options4 = temp
        }).catch(error => {
          this.$message({type: 'error', message: error})
        })
      },
      tableHeaderColor: function ({row, column, rowIndex, columnIndex}) {
        return 'background-color: transparent; color: #444; font-weight: 500; text-align: center'
      },
      handleSelectionChange: function (selectedList) { // 多选操作
        console.log(selectedList)
        this.idList.length = 0
        selectedList.forEach(item => {
          this.idList.push(item.id)
        })
      },
      handleEdit: function (list) {
        this.editShow = true
        this.initIndustry()
        let regionParam = ''
        if (list.region !== '') {
          let regionTemp = list.region.split('，')
          if (regionTemp.length === 1) {
            if (TextToCode[regionTemp[0]]) {
              regionParam = new Array(TextToCode[regionTemp[0]].code)
            } else {
              regionParam = new Array(TextToCode[regionTemp[0]])
            }
          } else if (regionTemp.length === 2) {
            regionParam = new Array(TextToCode[regionTemp[0]].code)
            if (TextToCode[regionTemp[0]][regionTemp[1]]) {
              regionParam.push(TextToCode[regionTemp[0]][regionTemp[1]].code)
            } else {
              regionParam.push(TextToCode[regionTemp[0]][regionTemp[1]])
            }
          } else {
            regionParam = new Array(TextToCode[regionTemp[0]].code)
            regionParam.push(TextToCode[regionTemp[0]][regionTemp[1]].code)
            regionParam.push(TextToCode[regionTemp[0]][regionTemp[1]][regionTemp[2]].code)
          }
          console.log(regionParam)
        }
        this.sourceForm = {
          id: list.id,
          type: list.type,
          webName: list.webName,
          webLink: list.webLink,
          sourceLevel: list.sourceLevel,
          sourceName: list.sourceName,
          sourceLink: list.sourceLink,
          platform: list.platform,
          industry: list.industry,
          region: regionParam,
          attribute: list.attribute.indexOf(',') === -1 ? [list.attribute] : list.attribute.split(','),
          priority: list.priority
        }
      },
      handleCloseEditDialog() {
        this.sourceForm = {
          id: '',
          type: '',
          webName: '',
          webLink: '',
          sourceLevel: '',
          sourceName: '',
          sourceLink: '',
          platform: '',
          industry: '',
          region: [''],
          attribute: [],
          priority: ''
        }
      },
      handleDelete(list) {
        this.$refs.multipleTable.clearSelection()
        this.idList.length = 0
        this.idList.push(list.id)
        this.deleteSourceReq()
      },
      handleDeleteAll() {
        if (this.idList.length !== 0) {
          this.deleteSourceReq()
        } else {
          this.$message({type: 'error', message: '当前尚未选择信源数据，无法进行删除操作。'})
        }
      },
      deleteSourceReq() {
        this.$confirm(`您确定要删除当前所选的这` + this.idList.length + `条数据吗？`, `提示`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {}
          Object.assign(params, {
            id: this.idList.length === 1 ? this.idList[0] : this.idList.join(','),
            userId: getLocalStorage('userId'),
            userName: getLocalStorage('username'),
            platform: this.initParams.platform
          })
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
          this.idList.length = 0
          this.$refs.multipleTable.clearSelection()
          this.$message({type: 'info', message: '已取消删除操作。'})
        })
      },
      handleSubmit: function (list) {
        this.$refs.multipleTable.clearSelection()
        this.idList.length = 0
        this.idList.push(list.id)
        this.handleSubmitAll()
      },
      handleSubmitAll() {
        if (this.idList.length !== 0) {
          this.$confirm(`您确定要提交当前所选的这` + this.idList.length + `条数据吗？`, `提示`, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let params = {}
            Object.assign(params, {
              id: this.idList.length === 1 ? this.idList[0] : this.idList.join(','),
              platform: this.initParams.platform
            })
            console.log(params)
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
            this.idList.length = 0
            this.$refs.multipleTable.clearSelection()
            this.$message({type: 'info', message: '已取消提交操作。'})
          })
        } else {
          this.$message({type: 'error', message: '当前尚未选择信源数据，无法进行提交操作。'})
        }
      },
      handleSizeChange(pageSize) {
        this.pageInfo.pageSize = pageSize
        this.init()
      },
      handleCurrentChange(currentPage) {
        this.pageInfo.currentPage = currentPage
        this.init()
      },
      cancelForm(formName) {
        this.$refs[formName].resetFields()
        this.editShow = false
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let paramRegion = []
            this.sourceForm.region.forEach(item => {
              paramRegion.push(CodeToText[item])
            })
            let params = {
              id: this.sourceForm.id,
              type: this.sourceForm.type,
              web_name: this.sourceForm.webName,
              web_link: this.sourceForm.webLink,
              source_level: this.sourceForm.sourceLevel,
              source_name: this.sourceForm.sourceName,
              source_link: this.sourceForm.sourceLink,
              platform: this.sourceForm.platform,
              industry: this.sourceForm.industry,
              region: paramRegion.toString(),
              attribute: this.sourceForm.attribute.toString(),
              priority: this.sourceForm.priority
            }
            let url = 'api/sourceAdd/mySource/updateSourceList'
            this.$post(url, params).then(response => {
              if (response.status === 1) {
                this.$message({type: 'success', message: response.message})
                this.editShow = false
                this.init()
              } else {
                this.$message({type: 'error', message: response.message})
              }
            }, error => {
              this.$message({type: 'error', message: 'error:' + error})
            })
          } else {
            return false
          }
        })
      }
    },
    watch: {
      initParams: {
        handler: function (newVal) {
          if (newVal) {
            this.init()
          }
        },
        deep: true,
        immediate: false
      }
    }
  }

</script>

<style lang="less" scoped>
  .mySource {
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
