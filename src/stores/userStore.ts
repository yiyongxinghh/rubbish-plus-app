import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types/global'

export const useUserStore = defineStore('user', () => {
    //用户信息
    const userDate = ref<User | null>(null)
    //token
    const userToken = ref('')
    //保存token
    const saveToken = (token:string) => {
        userToken.value = token
    }

    //清空token
    const clearToken = () => {
        userToken.value = ''
    }

    //保存用户信息
    const saveUserData = (date:User) => {
        userDate.value = date
    }

    //清空用户信息
    const clearUserData = () => {
        userDate.value = null
    }
    return {
        userDate,
        userToken,
        saveToken,
        clearToken,
        saveUserData,
        clearUserData
    }
},
    {
        persist: {
            storage: {
                getItem(key) {
                    return uni.getStorageSync(key)
                },
                setItem(key, value) {
                    uni.setStorageSync(key, value)
                }
            }
        }
    })