import { http } from "@/utils/http"
import type { Garbage } from "@/types/global"
import type { CategoryItem } from "@/types/shop"

/**
 * 获取分类
 */
export const getGarbageCategoryAPI = () => {
    return http<CategoryItem>({
        method: 'GET',
        url: '/category'
    })
}

/**
 * 获取指定分类的所有废品
 * @param id 
 * @returns 
 */
export const getTypeGarbageAPI = (id: number) => {
    return http<Array<Garbage[]>>({
        method: 'GET',
        url: `/garbage/getTypeGarbage?id=${id}`
    })
}

/**
 * 根据id获取指定的废品
 * @param id 
 * @returns 
 */
export const getGarbageAPI = (id: number) => {
    return http<Garbage>({
        method: 'GET',
        url: `/garbage/${id}`
    })
}