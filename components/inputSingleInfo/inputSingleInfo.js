// components/verMsgBlock/verMsgBlock.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否显示
    isShow: {
      type: Boolean,
      value: true
    },
    // 弹框标题
    title: {
      type: String,
      value: ''
    },
    // 弹框内容
    modalMsg_placeholder: {
      type: String,
      value: ''
    },
    // 是否显示取消按钮
    showCancel: {
      type: Boolean,
      value: true
    },
    // 确认按钮文本
    confirmText: {
      type: String,
      value: '同意'
    },
    // 确认按钮的open-type
    open_type: {
      type: String,
      value: ''
    },
    // bindSuccess 在HTML使用该属性可将 使用页面 的函数绑定到确认按钮的事件当中去
    // bindCancel 在HTML使用该属性可将 使用页面 的函数绑定到取消按钮的事件当中去
  },

  /**
   * 组件的初始数据
   */
  data: {
    modalMsg:""
  },
  /**
   * 组件的方法列表
   */
  methods: {
    
    modal_click_Hidden: function () {
      this.setData({
        isShow: false,
      })
    },
    // 确定
    Sure: function () {
      if (this.data.modalMsg == '') {
        wx.showToast({
          title: '请录入信息',
          icon: 'none'
        })
        return
      } else {
        // 提交到页面
        this.setData({
          isShow: false,
        })
      }
    },
    changeModalMsg: function (e) {
      this.setData({
        modalMsg: e.detail.value
      })
    },

  }
})

