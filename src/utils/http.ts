import { useUserStore } from '@/stores/userStore'
import axios from "axios";

//创建基础的axios实例
export const http = axios.create({
    baseURL: 'https://server.rubbish-plus.top/',
    timeout: 10000,
})

//配置请求拦截器
http.interceptors.request.use((config) => {
    const store = useUserStore()
    const { userToken } = store
    if (userToken) config.headers['Authorization'] = `Bearer ${userToken}`
    return config
}, (err) => {
    Promise.reject(err)
})


//配置响应拦截器
http.interceptors.response.use((config) => {
    return config.data
}, (err) => {
    uni.showToast({
        icon: 'none',
        title: '网络错误，换个网络试试',
        duration: 2000
    })
    return Promise.reject(err)
})

