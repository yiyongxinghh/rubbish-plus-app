import { useUserStore } from '@/stores/userStore'
//基地址
const baseURL = 'https://server.rubbish-plus.top'
// const baseURL = 'http://localhost:3000'

//添加拦截器
const httpInterceptor = {
    invoke(options: UniApp.RequestOptions) {
        //判断请求地址是否以http开头，如果不是则拼接基地址
        if (!options.url.startsWith('http')) {
            options.url = baseURL + options.url
        }
        //设置请求超时时间
        options.timeout = 100000

        options.header = {}

        //设置请求头 
        const user = useUserStore()
        // const token = user.userToken
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyUGFzcyI6IjE5MjAwNyIsInVzZXJFbWFpbCI6IjI5NzI4MDI3MDFAcXEuY29tIiwiaWF0IjoxNzA4Njg5NDA4LCJleHAiOjE3MDg3NzU4MDh9.nYnPo0vRTyJ2uljQdJ_iTRoT_Y3S9yN2-oG3Crfinfw'
        if (token) {
            options.header['Authorization'] = 'Bearer ' + token
        }

    }
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)


interface Data<T> {
    code: string,
    message: string,
    data: T
}

export const http = <T>(options: UniApp.RequestOptions) => {
    return new Promise<Data<T>>((resolve, reject) => {
        uni.request({
            ...options,
            success(res) {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(res.data as Data<T>)
                }else if(res.statusCode==401){
                    //token失效
                    const user = useUserStore()
                    user.clearToken()
                    uni.navigateTo({url:'/pages/login/login'})
                    reject(res)
                }else{
                    uni.showToast({
                        icon: 'none',
                        title: '请求错误',
                        duration: 2000
                    })
                    reject(res)
                }

            },
            fail(err) {
                uni.showToast({
                    icon: 'none',
                    title: '网络错误，换个网络试试',
                    duration: 2000
                })
                console.log(err); 
                reject(err)
            }
        })
    })
}