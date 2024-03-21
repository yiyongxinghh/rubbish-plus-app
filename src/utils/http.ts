import { useUserStore } from '@/stores/userStore'
import axios from "axios";
import axiosAdapterUniapp from 'axios-adapter-uniapp'

const plat = () => { 
    switch(uni.getSystemInfoSync().platform){
        case 'android':
            return true
        case 'ios':
            return true
        default:
            return false
    }
}

// 判断是否在移动端
export const http = axios.create({
    baseURL: 'https://server.rubbish-plus.top/',
    timeout: 10000,
    adapter: (plat() ? axiosAdapterUniapp : null) as any
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

