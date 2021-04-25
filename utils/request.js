/*
 * @Date: 2020-05-07 18:34:11
 * @Description: 基于 wx.request 的promise 封装
 */

import config from '../config'
import network from "../utils/network"
import {
    getToken,
    removeToken
} from '../utils/auth'
import {
    LoginRoutePath
} from '../store/constants'

import wxp from '../utils/wxApiPromise'

// 公用header参数 
const commonHeaders = function () {
    const headers = new Object();
    // 系统信息
    headers['Content-Type'] = 'application/json';
    headers['app-id'] = config.appid;
    headers['app-version'] = config.version;
    headers['client-name'] = 'mini-program';
    // 用户信息
    return () => {
        headers['Authorization'] = getToken();
        return headers
    }
}


export const request = async (params) => {
    let {
        url,
        data = {},
        header,
        timeout,
        method,
        responseIntercept = true
    } = params || {}

    //无网
    const netWorkType = await network.getNetworkType()
    console.log('当前request网络状态', netWorkType)
    if (!netWorkType) {
        wx.showToast({
            title: '加载失败，请先打开网络',
            icon: 'none',
            duration: 2000,
            complete: () => reject('network none')
        })
    }
    return new Promise((resolve, reject) => {
        url = url || request.defaultParameters.url
        method = method || request.defaultParameters.method
        method = method.toUpperCase()
        timeout = timeout || request.defaultParameters.timeout
        header = {
            ...request.defaultParameters.header(),
            ...header
        }
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        wxp.request({
                ...params,
                url: config.API_HOST + url,
                data,
                method,
                header,
                timeout,
            })
            .then(res => {
                if (res.statusCode === 401) {
                    removeToken()
                    const pages = getCurrentPages();
                    const currentPage = pages[pages.length - 1];
                    const currentPath = `/${currentPage.route}`;
                    if (LoginRoutePath != currentPath) {
                        //跳转到登录页
                        wxp.showModal({
                                title: '请重新登陆',
                                content: '',
                                showCancel: false,
                                confirmText: '确定',
                                confirmColor: '#3CC51F',
                                mask: true
                            })
                            .then(result => {
                                if (result.confirm) {
                                    wx.redirectTo({
                                        url: LoginRoutePath
                                    });
                                }
                            })
                            .catch(error => {});
                    }
                }
                if (res.statusCode >= 400) {
                    if (responseIntercept) {
                        wx.showToast({
                            title: res.data.detail || "未知异常",
                            icon: 'error',
                            mask: true,
                            duration: 1200,
                            complete: () => {
                                reject(res)
                            }
                        })
                    }

                } else {
                    resolve(res)
                }
            })
            .catch(error => {
                if (error.errMsg === 'request:fail timeout') {
                    wx.showToast({
                        title: '请求超时',
                        icon: 'none',
                        duration: 2000,
                    })
                }
                reject(error)
            })
            .finally(() => {
                wx.hideLoading()
            })
    })
}

// 默认的请求参数 
request.defaultParameters = {
    url: '',
    data: {},
    header: commonHeaders(),
    timeout: 10 * 1000,
    method: 'GET',
}


export const get = (params) => request({
    method: 'GET',
    ...params
})
export const post = (params) => request({
    method: 'POST',
    ...params
})