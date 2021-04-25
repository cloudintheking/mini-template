import {
    observable,
    action
} from 'mobx-miniprogram'

import {
    setToken,
    removeToken
} from '../utils/auth'
import {
    loginPass as login,
    getUserInfo,
    logout
} from '../api/login'

export const store = observable({
    token: '',
    name: '',
    info: {},
    // 登陆
    Login: action(function (params) {
        return new Promise((resolve, reject) => {
            login(params)
                .then(res => {
                    const data = res.data || {}
                    setToken(data.tokenPrefix + ' ' + data.token); //将token存至storage
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }),
    //获取登陆用户详情
    GetUserInfo: action(function () {
        return new Promise((resolve, reject) => {
            getUserInfo()
                .then(res => {
                    const data = res.data || {}
                    this.name = data.username
                    this.info = data
                    resolve(res)
                })
                .catch(error => {
                    reject(error)
                })

        })
    }),
    //登出
    LogOut: action(function () {
        return new Promise((resolve, reject) => {
            logout()
                .then(res => resolve(res))
                .catch(err => reject(err))
                .finally(() => {
                    removeToken() //将token移出storage
                })
        })

    })

})