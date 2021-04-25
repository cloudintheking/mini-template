/*
 * @Date: 2020-05-07 18:38:06
 * @Description: 项目入口
 */
import device from './utils/device'
import network from './utils/network'
import config from './config'
require('./utils/mixins')

export default () => {
    // 监听网络状态
    network.startListener()
    // 获取设备信息
    device.initialize()

    if (config.release) {
        // 生产屏蔽 console
        console = {
            ...console,
            info: () => {},
            log: () => {},
            warn: () => {},
            debug: () => {},
            error: () => {},
        }
        wx.onError((e) => {
            console.log(e)
            // TODO:错误捕获
        })

    }
}