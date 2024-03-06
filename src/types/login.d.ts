import type { User } from "./global"

// 登录表单
export type userData = {
    userEmail:string,
    userPass:string
}

// 注册表单
export type registerData = {
    userName:string,
    userEmail:string,
    userPass:string,
    againPass:string,
    userPhone:string,
    userAddress:string
}   

// 成功数据
export type successLogin = {
    access_token:string,
    isLogin:boolean,
    message:string,
    user:User
}
