<template>
  <div class="importSource">
    <el-upload class="upload-demo"
               ref="upload"
               :data="userInfo"
               :action="action"
               :on-preview="handlePreview"
               :on-remove="handleRemove"
               :on-success="handleSuccess"
               :on-error="uploadError"
               :before-upload="beforeAvatarUpload"
               :file-list="fileList"
               :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">说明:导入文件格式模板下载 信源模板.excel,信源模板.csv</div>
    </el-upload>
  </div>
</template>

<script type="application/ecmascript">
    import {getLocalStorage} from '../../common/cookie'

    export default {
      name: 'importSource',
      data() {
        return {
          action: '/upload/importExcel',
          userInfo: {userId: getLocalStorage('userId'), username: getLocalStorage('username')},
          fileList: []
        }
      },
      methods: {
        submitUpload: function() {
          this.$refs.upload.submit()
        },
        handleRemove: function(file, fileList) {
          console.log(file, fileList)
        },
        handlePreview: function(file) {
          console.log(file)
        },
        handleSuccess: function (data) {
          this.$refs.upload.clearFiles()
          if (data.code === 200) {
            this.$message({
              message: data.message,
              type: 'success'
            })
          } else if (data.code === 404) {
            this.$message({
              message: data.message,
              type: 'error'
            })
          }
        },
        // eslint-disable-next-line
        uploadError: function (err, file) {
          this.$message.error('上传失败')
        },
        beforeAvatarUpload: function (file) {
          // const testmsg = "^.*\.(?:xlsx|xl|xla|xlt|xlm|xlc|xlw)$"
          const testmsg = /^.*\.(?:xlsx)$/.test(file.name)
          const isLt4M = file.size / 1024 / 1024 <= 4

          if (!testmsg) {
            this.$message.error('上传文件格式不对!')
            return
          }
          if (!isLt4M) {
            this.$message.error('上传文件大小不能超过4M!')
            return
          }
          return testmsg && isLt4M
        }
      }
    }
</script>

<style scoped lang="less">
.importSource {
  width: 100%;
  height: 100%;
  .upload-demo {
    width: 320px;
    margin: 150px auto 0;
  }
}
</style>
