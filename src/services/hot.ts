import type { Garbage } from "@/types/global"
import { http } from "@/utils/http"

/**
 * 获取销量废品
 * @returns 
 */
export const getSoldOutGarbageAPI = ()=>{
    return http<Garbage[]>({
        method:'GET',
        url:'/garbage/soldOut'
    })
}