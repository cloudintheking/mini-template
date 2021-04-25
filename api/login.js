import {
    request,
    get,
    post
} from '../utils/request'

const USER_API = "/api/web/members/"

/**
 * 密码登陆
 * @param {*} data 
 * @returns 
 */
export function loginPass(data) {
    return post({
        url: USER_API + "login-password",
        data
    })
}
/**
 * 短信登陆
 * @param {*} data 
 * @returns 
 */
export function loginSms(data) {
    return post({
        url: USER_API + "login-sms",
        data
    })
}
/**
 * 获取用户信息
 * @returns 
 */
export function getUserInfo() {
    return get({
        url: USER_API + "self"
    })
}
/**
 * 登出
 * @returns 
 */
export function logout() {
    return get({
        url: USER_API + "logout"
    })
}