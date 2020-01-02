<template>
  <div class="wrapper">
    <el-form :model="sourceForm" :rules="rules" ref="sourceForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="媒体类型" prop="type">
        <el-select v-model="sourceForm.type" placeholder="请选择">
          <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="信源网站名称" prop="web_name">
        <el-input class="webname" v-model="sourceForm.web_name"></el-input>
      </el-form-item>
      <el-form-item label="信源网站链接" prop="web_link">
        <el-input class="webaddress" v-model="sourceForm.web_link"></el-input>
      </el-form-item>
      <div class="line"></div>
      <el-form-item label="信源等级" prop="source_level">
        <el-select v-model="sourceForm.source_level" placeholder="请选择">
          <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="信源名称" prop="source_name">
        <el-input class="infoname" v-model="sourceForm.source_name"></el-input>
      </el-form-item>
      <el-form-item label="信源链接" prop="source_link">
        <el-input class="infoaddress" v-model="sourceForm.source_link"></el-input>
      </el-form-item>
      <el-form-item label="所属平台" prop="platform">
        <el-select v-model="sourceForm.platform" placeholder="请选择" @change="getIndustry(sourceForm.platform)">
          <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否为政府网站">
        <el-switch v-model="sourceForm.govt_web"></el-switch>
      </el-form-item>
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
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" v-model="sourceForm.user_remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('sourceForm')" class="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {regionDataPlus, CodeToText} from 'element-china-area-data'
  import {getLocalStorage} from '../../common/cookie'

  export default {
    name: 'add-source',
    data() {
      const checkHttp = (rule, value, callback) => {
        // const httpReg = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*([?&]\w+=\w*)*$(\/)/
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
        sourceForm: {
          type: '',
          web_name: '',
          web_link: '',
          source_level: '',
          source_name: '',
          source_link: '',
          govt_web: false,
          platform: '',
          industry: '',
          region: [],
          attribute: [],
          owned_users: '',
          priority: '',
          user_remark: '',
          userId: ''
        },
        options1: [
          {
            value: '新闻',
            label: '新闻'
          }, {
            value: '微博',
            label: '微博'
          }, {
            value: '论坛',
            label: '论坛'
          }, {
            value: '平媒',
            label: '平媒'
          }, {
            value: '贴吧',
            label: '贴吧'
          }, {
            value: '微信',
            label: '微信'
          }, {
            value: '搜索',
            label: '搜索'
          }, {
            value: '留言板',
            label: '留言板'
          }],
        options2: [
          {
            value: 'A',
            label: 'A'
          }, {
            value: 'B',
            label: 'B'
          }, {
            value: 'C',
            label: 'C'
          }],
        options3: [
          {
            value: 'aos',
            label: 'aos'
          }, {
            value: '云测',
            label: '云测'
          }],
        options4: [],
        options5: regionDataPlus,
        options6: [
          {
            value: '公共',
            label: '公共'
          }, {
            value: '私有',
            label: '私有',
            children: [{
              value: '四川电力',
              label: '四川电力'
            }]
          }],
        options7: [
          {
            value: '3',
            label: '3'
          }, {
            value: '2',
            label: '2'
          }, {
            value: '1',
            label: '1'
          }],
        rules: {
          type: [
            { required: true, message: '请选择媒体类型', trigger: 'change' }
          ],
          web_name: [
            { required: true, message: '请输入信源网站名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          web_link: [
            { validator: checkHttp, trigger: 'blur' }
          ],
          source_level: [
            { required: true, message: '请选择信源等级', trigger: 'change' }
          ],
          source_name: [
            { required: true, message: '请输入信源名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          source_link: [
            { validator: checkHttp, trigger: 'blur' }
          ],
          platform: [
            { required: true, message: '请选择信源平台', trigger: 'change' }
          ],
          industry: [
            { required: true, message: '请选择所属行业', trigger: 'change' }
          ],
          region: [
            { required: true, message: '请选择所属地区', trigger: 'change' }
          ],
          attribute: [
            { required: true, message: '请选择内容属性', trigger: 'change' }
          ],
          priority: [
            { required: true, message: '请选择采集优先级', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      getIndustry (platform) {
        let params = {}
        if (platform) {
          params.platform = platform
        }
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
      getSourceAddReq: function () {
        let paramRegion = []
        this.sourceForm.region.forEach(item => {
          paramRegion.push(CodeToText[item])
        })
        let params = {
          id: this.sourceForm.id,
          type: this.sourceForm.type,
          web_name: this.sourceForm.web_name,
          web_link: this.sourceForm.web_link,
          source_level: this.sourceForm.source_level,
          source_name: this.sourceForm.source_name,
          source_link: this.sourceForm.source_link,
          platform: this.sourceForm.platform,
          industry: this.sourceForm.industry,
          region: paramRegion.toString(),
          attribute: this.sourceForm.attribute.toString(),
          priority: this.sourceForm.priority,
          govt_web: this.sourceForm.govt_web ? '是' : '否',
          userId: getLocalStorage('userId'),
          userName: getLocalStorage('username')
        }
        if (this.sourceForm.attribute.length === 2) {
          let arr = this.sourceForm.attribute
          params['attribute'] = arr[0]
          params['owned_users'] = arr[1]
        } else if (this.sourceForm.attribute.length === 1) {
          params['attribute'] = this.sourceForm.attribute[0]
        }
        let url = 'api/sourceadd/sourceadd'
        this.$post(url, params).then(res => {
          if (res.code === 200) {
            const loading = this.$loading({
              lock: true,
              text: '正在努力加载中',
              spinner: 'el-icon-loading',
              background: 'rgba(255, 255, 255, 0.1)'
            })
            setTimeout(() => {
              loading.close()
              this.$confirm('信源添加成功, 是否继续添加?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$refs['sourceForm'].resetFields()
              }).catch(() => {
                this.$router.push('/sourceAdd/mySource')
              })
            }, 2000)
          }
          if (res.code === 404) {
            this.$message.error(res.data.msg)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.getSourceAddReq()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .line {
    width: 800px;
    height: 2px;
    background-color: #409EFF;
    margin: 40px 0;
  }
  .wrapper{
    width: 800px;
    margin: 20px 100px;
    .el-form{
      .el-form-item {
        padding: 0 100px;
        width: 400px;
        .goon {
          padding: 12px 30px;
        }
        .save {
          margin-left: 50px;
          padding: 12px 50px;
        }
      }
      .el-form-item:last-child {
        margin-top: 40px;
      }
    }
  }
</style>
