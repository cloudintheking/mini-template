import device from '../../utils/device'

Component({
    properties: {
        title: String,
        topHeight: String,
        isFixed: Boolean
    },
    data: {
        statusBarHeight: 0
    },
    lifetimes: {
        attached: function () {
            this.setNavSize();
        },
        detached: function () {
            // 在组件实例被从页面节点树移除时执行
        },
    },
    methods: {
        // 通过获取系统信息计算导航栏高度
        setNavSize: function () {
            var that = this
            that.setData({
                statusHeight: statusHeight,
                screenWidth: device.screenWidth,
                navHeight: device.remainHeight,
                height: statusHeight + device.remainHeight + (+that.data.topHeight)
            })
            that.triggerEvent('ready', {height: statusHeight + device.remainHeight + (+that.data.topHeight)})
        },
        navigateBack() {
            wx.navigateBack()
        }
    }
})
