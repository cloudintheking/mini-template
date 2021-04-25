import {
    store as userStore
} from '../store/user'
import {
    getToken
} from '../utils/auth'
import {
    LoginRoutePath,
    DefaultRoutePath
} from '../store/constants'

import {
    createStoreBindings
} from 'mobx-miniprogram-bindings'

import wxp from '../utils/wxApiPromise'
/**
 * 检查是否登陆
 * @param {*} options 
 */
export function checkLogin(options) {
    console.log('开始检查登陆')
    let _onLoad = options.onLoad;
    options.onLoad = async function (e) {
        const token = getToken()
        const currentRoute = `/${this.route}`
        if (token) {
            if (!userStore.name) {
                //加载用户信息
                try {
                    await userStore.GetUserInfo()
                    _onLoad && _onLoad.call(this, e)
                } catch (error) {
                    //跳转到登录页
                    const result = await wxp.showModal({
                        title: '获取用户信息失败',
                        content: '',
                        showCancel: false,
                        confirmText: '确定',
                        confirmColor: '#3CC51F'
                    });
                    if (result.confirm) {
                        wx.redirectTo({
                            url: LoginRoutePath
                        });
                    }
                }
            } else {
                _onLoad && _onLoad.call(this, e)
            }

        } else {
            const result = await wxp.showModal({
                title: '请登陆',
                content: '',
                showCancel: false,
                confirmText: '确定',
                confirmColor: '#3CC51F'
            });
            if (result.confirm) {
                console.log('确认重登陆')
                wx.redirectTo({
                    url: LoginRoutePath
                });
            }
        }
    }
    console.log('结束检查登陆')
    return options
}
/**
 *  绑定store到page
 * @param {*} store 
 * @param {*} options 
 */
export function bindStore(store, options) {
    console.log('开始绑定store')
    let _onLoad = options.onLoad;
    options.onLoad = function (e) {
        this.storeBindings = createStoreBindings(this, {
            store,
            fields: ['name', 'info']
        })
        _onLoad && _onLoad.call(this, e)
    }
    let _onUnload = options.onUnload;
    options.onUnload = function (e) {
        this.storeBindings && this.storeBindings.destroyStoreBindings()
        _onUnload && _onUnload.call(this, e)
    }
    console.log('结束绑定store')
    return options
}

/**
 * 调用Page
 * @param {*} options 
 */
export function callPage(options) {
    Page(options)
}

// 获取当前页面    
function getPageInstance() {
    var pages = getCurrentPages();
    return pages[pages.length - 1];
}