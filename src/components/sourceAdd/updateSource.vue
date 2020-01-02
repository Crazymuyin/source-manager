  <template>
<div class="wrapper">
  <ul class="kind">
    <li>
      <label>媒体类型</label>
      <el-select v-model="value1" placeholder="请选择">
        <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </li>
    <li>
      <label>信源网站名称</label>
      <el-input class="webname" v-model="input1"></el-input>
    </li>
    <li>
      <label>信源网站链接</label>
      <el-input class="webaddress" v-model="input2"></el-input>
    </li>
  </ul>
  <ul class="content">
    <li>
      <label>信源等级</label>
      <el-select v-model="value2" placeholder="请选择">
        <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </li>
    <li>
      <label>信源名称</label>
      <el-input class="infoname" v-model="input3"></el-input>
    </li>
    <li>
      <label>信源链接</label>
      <el-input class="infoaddress" v-model="input4"></el-input>
    </li>
    <li>
      <label>所属平台</label>
      <el-select v-model="value3" placeholder="请选择">
        <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </li>
    <li>
      <label>所属行业</label>
      <el-select v-model="value4" placeholder="请选择">
        <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </li>
    <li>
      <label>所属地区</label>
      <el-select v-model="value5" placeholder="请选择">
        <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-select v-model="value6" placeholder="请选择">
        <el-option v-for="item in options6" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </li>
    <li>
      <label>内容属性</label>
      <el-select v-model="value7" placeholder="请选择">
        <el-option v-for="item in options7" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-select v-model="value8" placeholder="请选择">
        <el-option v-for="item in options8" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </li>
    <li>
      <label>采集优先级</label>
      <el-select v-model="value9" placeholder="请选择">
        <el-option v-for="item in options9" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </li>
  </ul>
  <div class="btn">
    <el-button class="update">修改</el-button>
  </div>
</div>
</template>

<script>
export default {
  name: 'update-source',
  data() {
    return {
      options1: [
        {
          value: '1',
          label: '新闻'
        }, {
          value: '2',
          label: '微博'
        }, {
          value: '3',
          label: '论坛'
        }, {
          value: '4',
          label: '平媒'
        }, {
          value: '5',
          label: '贴吧'
        }, {
          value: '6',
          label: '微信'
        }, {
          value: '7',
          label: '搜索'
        }, {
          value: '8',
          label: '留言板'
        }],
      value1: '1',
      options2: [
        {
          value: '1',
          label: 'A'
        }, {
          value: '2',
          label: 'B'
        }, {
          value: '3',
          label: 'C'
        }],
      value2: '1',
      options3: [
        {
          value: '1',
          label: 'aos'
        }, {
          value: '2',
          label: '云测'
        }],
      value3: '1',
      options4: [
        {
          value: '1',
          label: '综合'
        }, {
          value: '2',
          label: '教育'
        }, {
          value: '3',
          label: '能源'
        }, {
          value: '4',
          label: '党政'
        }],
      value4: '1',
      options5: [
        {
          value: '1',
          label: '全国'
        }, {
          value: '2',
          label: '四川'
        }, {
          value: '3',
          label: '重庆'
        }, {
          value: '4',
          label: '北京'
        }, {
          value: '5',
          label: '陕西'
        }],
      value5: '1',
      options6: [
        {
          value: '1',
          label: '成都'
        }, {
          value: '2',
          label: '绵阳'
        }, {
          value: '3',
          label: '南充'
        }],
      value6: '1',
      options7: [
        {
          value: '1',
          label: '公共'
        }, {
          value: '2',
          label: '私有'
        }],
      value7: '1',
      options8: [
        {
          value: '1',
          label: '四川电力'
        }],
      value8: '1',
      options9: [
        {
          value: '1',
          label: '3'
        }, {
          value: '2',
          label: '2'
        }, {
          value: '3',
          label: '1'
        }],
      value9: '1',
      input1: '人民网',
      input2: 'http://www.people.com.cn/',
      input3: '滚动',
      input4: 'http://news.people.com.cn/'
    }
  }
}
</script>

<style scoped lang="less">
ul{
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.wrapper{
  width: 800px;
  margin: 20px 100px;
  & ul{
    padding-left: 20px;
    & li{
      margin-top: 20px;
      & label{
        width: 130px;
        display: inline-block;
        margin-right: 30px;
        text-align: right;
        font-size: 14px;
      }
    }
  }
  .kind{
    padding-bottom: 40px;
    border-bottom: 2px solid #409EFF;
    .webname{
      width: 215px;
    }
    .webaddress{
      width: 300px;
    }
  }
  .content{
    margin-top: 40px;
    .infoname{
      width: 215px;
    }
    .infoaddress{
      width: 300px;
    }
  }
  .btn{
    width: 800px;
    margin: 50px auto;
    .update{
      padding-left: 50px;
      padding-right: 50px;
      margin-left: 250px;
      color: white;
      background-color: #409EFF;
    }
  }
}
</style>
