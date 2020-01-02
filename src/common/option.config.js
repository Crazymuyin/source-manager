function platform() {
  return [{
    value: 'AOS',
    label: 'AOS'
  }, {
    value: '云测',
    label: '云测'
  }]
}

function mediaType() {
  return [{
    value: 'all',
    label: '全部'
  }, {
    value: '新闻',
    label: '新闻'
  }, {
    value: '论坛',
    label: '论坛'
  }, {
    value: '贴吧',
    label: '贴吧'
  }, {
    value: '平媒',
    label: '平媒'
  }, {
    value: '微信',
    label: '微信'
  }, {
    value: '微博',
    label: '微博'
  }, {
    value: '留言板',
    label: '留言板'
  }, {
    value: '搜索',
    label: '搜索'
  }]
}

function statusOption() {
  return [{
    value: 'all',
    label: '全部'
  }, {
    value: 0,
    label: '未提交'
  }, {
    value: 1,
    label: '已提交（未审）'
  }, {
    value: 2,
    label: '已审'
  }, {
    value: 3,
    label: '退回'
  }]
}

function sourceLevelOption() {
  return [{
    value: 'all',
    label: '全部'
  }, {
    value: 'A',
    label: 'A'
  }, {
    value: 'B',
    label: 'B'
  }, {
    value: 'C',
    label: 'C'
  }]
}

function priorityOption() {
  return [{
    value: 'all',
    label: '全部'
  }, {
    value: '3',
    label: '3'
  }, {
    value: '2',
    label: '2'
  }, {
    value: '1',
    label: '1'
  }]
}

function areaOption() {
  return [
    {
      value: '全国',
      label: '全国'
    }, {
      value: '四川',
      label: '四川',
      children: [{
        value: '成都',
        label: '成都',
        children: [{
          value: '锦江区',
          label: '锦江区'
        }, {
          value: '高新区',
          label: '高新区'
        }, {
          value: '青羊区',
          label: '青羊区'
        }, {
          value: '金牛区',
          label: '金牛区'
        }]
      }, {
        value: '南充',
        label: '南充',
        children: [{
          value: '嘉陵区',
          label: '嘉陵区'
        }, {
          value: '西充县',
          label: '西充县'
        }]
      }]
    }, {
      value: '重庆',
      label: '重庆',
      children: [{
        value: '渝北区',
        label: '渝北区'
      }, {
        value: '江北区',
        label: '江北区'
      }, {
        value: '合川区',
        label: '合川区'
      }]
    }, {
      value: '北京',
      label: '北京',
      children: [{
        value: '海淀区',
        label: '海淀区'
      }, {
        value: '丰台区',
        label: '丰台区'
      }, {
        value: '朝阳区',
        label: '朝阳区'
      }]
    }
  ]
}

module.exports = {
  getPlatformOptions: platform,
  getMediaTypeOptions: mediaType,
  getStatusOptions: statusOption,
  getSourceLevelOptions: sourceLevelOption,
  getPriorityOptions: priorityOption,
  getAreaOptions: areaOption
}
