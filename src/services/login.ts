import type { successLogin } from "@/types/login"
import { http } from "@/utils/http"

/**
 * 邮箱登录方法 
 * @param {*} userEmail 
 * @param {*} userPass 
 * @returns 
 */
export const emailLoginAPI = (userEmail:string, userPass:string) => {
    return http<successLogin>({
        method: 'POST',
        url: '/user/login',
        data: {
            userEmail,
            userPass
        }
    })
}

/**
 * 注册方法
 * @param {*} data 
 * @returns 
 */
export const registerAPI = (userEmail:string, userPass:string, userName:string, userPhone:string, userAddress:string) => {
    return http({
        method: 'POST',
        url: '/user',
        data: {
            userEmail, userPass, userName, userPhone, userAddress
        }
    })
}

/**
 * 获取验证码
 * @param {*} userEmail 
 * @returns 
 */
export const getCodeAPI = (userEmail:string) => {
    return http({
        method: 'POST',
        url: '/user/email',
        data: {
            userEmail
        }
    })
}

/**
 * 验证码登录
 * @param {*} userEmail 
 * @param {*} codeVerification 
 * @returns 
 */
export const codeVerificationLoginAPI = (userEmail:string, codeVerification:string) => {
    return http<successLogin>({
        method: 'POST',
        url: '/user/codeLogin',
        data: {
            userEmail, codeVerification
        }
    })
}