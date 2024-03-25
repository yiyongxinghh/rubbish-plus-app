import { http } from "@/utils/http"
import type { Garbage, Order } from "@/types/global"
import type { CategoryItem } from "@/types/shop"

interface GarbageItem {
    id: number;
    quantity: number;
}


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

/**
 * 创建购买订单
 * @param order 
 * @param garbage 
 * @returns 
 */
export const createOrderAPI = (order: Order, garbage: GarbageItem[]) => {
    return http({
        method: 'POST',
        url: '/order',
        data: {
            order,
            garbage
        }
    })
}

/**
 * 创建回收订单
 * @param order 
 * @returns 
 */
export const createRecoverOrderAPI = (order: Order) => {
    return http({
        method: 'POST',
        url: '/order/recover',
        data: order
    })
}

/**
 * 获取所有配送者为空的订单
 * @returns 
 */
export const findNullDeliveryman = ()=>{
    return http({
        method: 'GET',
        url: '/order/nullDeliveryman'
    })
}