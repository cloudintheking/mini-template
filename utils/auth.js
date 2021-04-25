import {
    ACCESS_TOKEN
} from '../store/constants'

/**
 * 获取token
 * @returns  
 */
export function getToken() {
    return wx.getStorageSync(ACCESS_TOKEN);
}

/**
 * 设置token
 * @returns  
 */
export function setToken(data) {
    wx.setStorageSync(ACCESS_TOKEN, data);
}
/**
 * 移除token 
 * @returns 
 */
export function removeToken() {
    wx.removeStorageSync(ACCESS_TOKEN);
}