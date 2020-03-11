// components/flowpath/flowpath.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selectIndex: { // 属性名
      type: String, // 类型（必填），
      value: '1' // 属性初始值
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    titleDatas: [{
        "id": "1",
        "name": "贷款方案"
      },
      {
        "id": "2",
        "name": "基本信息"
      },
      {
        "id": "3",
        "name": "工作与财力" //工作与财力  工作财力
      },
      {
        "id": "4",
        "name": "紧急联系人" //紧急联系人 联系人员
      },
      {
        "id": "5",
        "name": "影像资料"
      }
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})