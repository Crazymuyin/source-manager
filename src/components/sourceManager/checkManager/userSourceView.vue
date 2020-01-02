<template>
  <div class="userSourceView" v-if="detail.isShow">
    <div class="nav clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="fn_left">
        <el-breadcrumb-item>信源管理</el-breadcrumb-item>
        <el-breadcrumb-item>信源审核</el-breadcrumb-item>
        <el-breadcrumb-item>信源详细</el-breadcrumb-item>
      </el-breadcrumb>
      <span class="el-icon-close close fn_right" @click="closeClick('')"></span>
    </div>
    <div class="viewContent">
      <div class="checkBtn">
        <el-button size="mini" type="primary" @click="showCheckDialog(detail.data, 1)" :disabled="detail.data.source_status !== 0">审核通过</el-button>
        <el-button size="mini" type="danger" @click="showCheckDialog(detail.data, 0)" :disabled="detail.data.source_status !== 0">审核拒绝</el-button>
      </div>
      <div class="steps">
        <el-steps :active="detail.data.source_status === 0 ? 2 : 3" simple>
          <el-step title="提交审核" icon="el-icon-upload2"></el-step>
          <el-step title="等待审核" icon="el-icon-edit-outline"></el-step>
          <el-step title="审核完成" icon="el-icon-check"></el-step>
        </el-steps>
      </div>
      <div class="content">
        <div class="sourceName"><span>信源名称：</span><span>{{detail.data.source_name}}</span></div>
        <div class="sourceUrl">
          <span>信源链接：</span>
          <el-input type="textarea" rows="8" v-model="detail.data.source_url" :disabled="true"></el-input></div>
        <div class="sourceCheck">
          <span>信源动态：</span>
          <div class="dynamics-list">
            <div class="dynamics" v-if="detail.data.source_status === 1">
              <i class="el-icon-s-custom"></i>
              <span>平台</span>
              <p>信源审核通过，通过类型：长期信源，已入库。原因备注：{{detail.data.remark ? detail.data.remark : '无'}}</p>
              <span>{{detail.data.update_time | moment}}</span>
            </div>
            <div class="dynamics" v-if="detail.data.source_status === 2">
              <i class="el-icon-s-custom"></i>
              <span>平台</span>
              <p>信源审核通过，通过类型：临时信源，已入库。原因备注：{{detail.data.remark ? detail.data.remark : '无'}}</p>
              <span>{{detail.data.update_time | moment}}</span>
            </div>
            <div class="dynamics" v-if="detail.data.source_status === 3">
              <i class="el-icon-s-custom"></i>
              <span>平台</span>
              <p>审核未通过,原因备注：{{detail.data.remark ? detail.data.remark : '无'}}</p>
              <span>{{detail.data.update_time | moment}}</span>
            </div>
            <div class="dynamics" v-if="detail.data.source_status === 0 || detail.data.source_status === 1 || detail.data.source_status === 2 || detail.data.source_status === 3">
              <i class="el-icon-s-custom"></i>
              <span>{{detail.data.user_name}}</span>
              <p>已提交审核</p>
              <span>{{detail.data.create_time | moment}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <source-check :sourceForm="sourceForm" @cancelClose="cancelDialogClick"></source-check>
  </div>
</template>

<script>
  import sourceCheck from './sourceCheck'
  export default {
    name: 'userSourceView',
    props: ['detail'],
    components: {
      sourceCheck
    },
    data() {
      return {
        sourceForm: {
          isShow: false,
          data: {
            id: '',
            type: '',
            sourceStatus: '',
            remark: ''
          }
        }
      }
    },
    methods: {
      closeClick(state) {
        this.$emit('closeClick', state)
      },
      /**
       * 打开审核界面
       * @param type
       */
      showCheckDialog(obj, type) {
        this.sourceForm.isShow = true
        this.sourceForm.data.type = type
        this.sourceForm.data.id = obj.id
      },
      /**
       * 关闭弹窗
       */
      cancelDialogClick(state) {
        this.sourceForm.isShow = false
        this.sourceForm.data.type = ''
        this.sourceForm.data.id = ''
        this.sourceForm.data.sourceStatus = ''
        this.sourceForm.data.remark = ''
        if (state) {
          this.detail.data.source_status = state
          this.closeClick(state)
        }
      }
    }
  }
</script>

<style scoped lang="less">
.userSourceView {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  z-index: 1000;
  box-shadow: -1px 1px 12px #808080;
  background: white;
  .nav {
    padding: 2vmin;
    border-bottom: 1px solid #cccccc;
    .el-breadcrumb {
      line-height: 2.5vmin;
    }
    & span.close {
      line-height: 2.5vmin;
      cursor: pointer;
    }
  }
  .viewContent {
    width: 70%;
    padding: 2vmin;
    .checkBtn {
      margin-bottom: 2vmin;
    }
    .steps {
      margin-bottom: 2vmin;
    }
    .content {
      .sourceName {
        display: flex;
        justify-content: left;
      }
      .sourceUrl {
        display: flex;
        justify-content: left;
      }
      .sourceCheck {
        display: flex;
        justify-content: left;
        .dynamics-list {
          width: 100%;
          .dynamics {
            font-size: 14px;
            position: relative;
            width: 98%;
            min-height: 50px;
            line-height: 20px;
            background: #eeeeee;
            padding: 10px 10px 30px 10px;
            & i {
              font-size: 20px;
            }
            & p {
              margin-top: 5px;
            }
            & span:last-child {
              position: absolute;
              right: 5px;
              bottom: 5px;
              width: auto !important;
              padding-right: 5px;
            }
          }
        }
      }
      & div {
        margin-bottom: 10px;
      }
      & span:first-child {
        width: 80px;
        font-size: 14px;
      }
    }
  }
}
</style>
