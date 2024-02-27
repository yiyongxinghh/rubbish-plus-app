import type { Garbage } from "@/types/global"
import { http } from "@/utils/http"

export const getSoldOutGarbageAPI = ()=>{
    return http<Garbage[]>({
        method:'GET',
        url:'/garbage/soldOut'
    })
}