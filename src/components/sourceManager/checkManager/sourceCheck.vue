<template>
  <div class="checkDialog" v-show="sourceForm.isShow">
    <div class="bg"></div>
    <div class="con">
      <div class="nav clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="fn_left">
          <el-breadcrumb-item>{{sourceForm.data.type ? '审核通过' : '审核拒绝'}}</el-breadcrumb-item>
        </el-breadcrumb>
        <span class="el-icon-close close fn_right" @click="cancelDialogClick('')"></span>
      </div>
      <div v-if="sourceForm.data.type === 1" class="">
        <div class="checkType">
          <span>通过类型：</span>
          <span @click="sourceForm.data.sourceStatus = 1" :class="{'active': sourceForm.data.sourceStatus === 1}">长期信源</span>
          <span @click="sourceForm.data.sourceStatus = 2" :class="{'active': sourceForm.data.sourceStatus === 2}">临时信源</span>
        </div>
        <div class="checkRemark"></div>
      </div>
      <div class="checkRemarkContent">
        <span>{{sourceForm.data.type ? '备注信息（选择临时信源必填此项）' : '备注信息'}}</span>
        <el-input type="textarea" rows="10" v-model="sourceForm.data.remark" placeholder="请输入备注信息"></el-input>
      </div>
      <div class="checkBtnList">
        <el-button size="mini" type="info" @click="cancelDialogClick('')">取消</el-button>
        <el-button size="mini" type="primary" @click="submitDialogClick">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sourceCheck',
    props: ['sourceForm'],
    data() {
      return {
      }
    },
    methods: {
      closeClick() {
        this.sourceForm.isShow = false
      },
      /**
       * 关闭弹窗
       */
      cancelDialogClick(state) {
        this.$emit('cancelClose', state)
      },
      submitDialogClick() {
        let that = this
        if (this.sourceForm.data.type === 0) {
          this.sourceForm.data.sourceStatus = 3
          if (!this.sourceForm.data.remark) {
            this.$message({message: '请输入备注信息', type: 'warning'})
            return false
          }
        } else if (this.sourceForm.data.type === 1) {
          if (!this.sourceForm.data.sourceStatus) {
            this.$message({message: '请选择通过类型', type: 'warning'})
            return false
          }
        }
        this.updateUserSourceRequest((status) => {
          if (status) {
            this.cancelDialogClick(that.sourceForm.data.sourceStatus)
          }
        })
      },
      /**
       * 修改信源状态、审核
       */
      updateUserSourceRequest(callBack) {
        let params = {}
        if (this.sourceForm.data.id) params.id = this.sourceForm.data.id
        if (this.sourceForm.data.sourceStatus) {
          params.sourceStatus = this.sourceForm.data.sourceStatus
        }
        if (this.sourceForm.data.remark) params.remark = this.sourceForm.data.remark
        let url = `api/userSource/update`
        this.$post(url, params).then(response => {
          if (response.status === 200) {
            this.$message({message: response.message, type: 'success'})
            callBack(true)
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .checkDialog {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    .bg {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2);
    }
    .con {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 45%;
      z-index: 1005;
      background: white;
      box-shadow: -1px 1px 12px #808080;
      padding: 0 3vmin 3vmin 3vmin;
      .nav {
        padding: 2vmin;
        border-bottom: 1px solid #cccccc;
        margin-bottom: 2vmin;
        .el-breadcrumb {
          line-height: 2.5vmin;
        }
        & span.close {
          line-height: 2.5vmin;
          cursor: pointer;
        }
      }
      .checkType {
        display: flex;
        flex-flow: row nowrap;
        justify-content: left;
        align-content: flex-start;
        & span {
          font-size: 14px;
          padding: 5px 10px;
          margin: 0 10px;
          border: 1px solid #cccccc;
          border-radius: 5px;
          cursor: pointer;
        }
        & span:first-child {
          border: 0;
          margin: 0;
          cursor: default;
        }
        & span:nth-child(2) {
          margin-left: 0;
        }
        & span.active {
          border: 1px solid green;
          background: green;
          color: white;
        }
      }
      .checkRemarkContent {
        width: auto;
        margin-top: 20px;
        padding: 0 10px;
        & span {
        }
        .el-textarea {
          margin-top: 10px;
        }
      }
      .checkBtnList {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-content: flex-start;
        margin-top: 30px;
        & button:first-child {
          margin-right: 50px;
        }
      }
    }
  }
</style>
