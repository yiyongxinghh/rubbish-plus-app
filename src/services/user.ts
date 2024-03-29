import { http } from "@/utils/http"
import type { Collection, Order } from "@/types/global"

export interface GarbageItem {
    id: number;
    quantity: number;
}

/**
 * 创建收藏夹
 * @param collection 
 * @returns 
 */
export const createCollectionAPI = (collection: Collection) => {
    return http({
        method: 'POST',
        url: '/collection',
        data: collection
    })
}

/**
 * 删除指定收藏夹
 * @param id 
 * @returns 
 */
export const removeCollectionAPI = (id: number) => {
    return http({
        method: 'DELETE',
        url: `/collection/${id}`
    })
}

/**
 * 根据用户id找到其所有的收藏夹
 * @param userId 
 * @returns 
 */
export const findAllCollectionAPI = (userId: number) => {
    return http({
        method: 'GET',
        url: `/collection/${userId}`
    })
}

/**
 * 在指定的收藏夹中加入指定的废品
 * @param collection 
 * @param garbage 
 * @returns 
 */
export const insertGarbageToCollectionAPI = (collectionToGarbage:any) => {
    return http({
        method: 'POST',
        url: '/collection-to-garbage',
        data:collectionToGarbage
    })
}

/**
 * 根据指定的收藏夹id获取所有收藏列
 * @param collectionId 
 * @returns 
 */
export const findCollectionAPI = (collectionId: number) => {
    return http({
        method: 'GET',
        url: `/collection-to-garbage/${collectionId}`
    })
}

/**
 * 通过指定的收藏夹id和废品id删除指定收藏夹中废品
 * @param collectionId 
 * @param garbageId 
 * @returns 
 */
export const removeGarbageFromCollectionAPI = (collectionId: number, garbageId: number) => {
    return http({
        method: 'DELETE',
        url: '/collection-to-garbage',
        data: {
            collectionId, garbageId
        }
    })
}

/**
 * 获取指定用户id，发送的所有评论
 * @param userId 
 * @returns 
 */
export const findAllUserCommentsAPI = (userId: number) => {
    return http({
        method: 'GET',
        url: `/comment/user/${userId}`
    })
}

/**
 * 获取用户所有订单，自带分页
 * @param userId 
 * @param userRank 
 * @param page 
 * @param pageSize 
 * @returns 
 */
export const findUserAllOrderAPI = (userId: number, userRank: number) => {
    return http({
        method: 'POST',
        url: `/order/findUserAllOrder`,
        data: {
            userId,
            userRank
        }
    })
}

/**
 * 创建订单
 * @param order 
 * @param garbage 
 * @returns 
 */
export const createOrderAPI = (order: Order, garbage: GarbageItem[]) => {
    return http({
        method: 'POST',
        url: `/order`,
        data: {
            order,
            garbage
        }
    })
}

/**
 * 上传文件
 * @param {*} file 
 * @returns 
 */
export const uploadAPI = (file: any) => {
    return http({
        method: 'POST',
        url: `/pic/upload`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: file
    })
}

/**
 * 添加废品
 * @param {*} data 
 * @returns 
 */
export const addGarbageAPI = (data: any) => {
    return http({
        method: 'POST',
        url: '/garbage',
        data: data
    })
}

/**
 * 用户更新
 * @param id 
 * @param user 
 * @returns 
 */
export const updateUserAPI = (id: number, user: any) => {
    return http({
        url: `/user/${id}`,
        method: 'PATCH',
        data:{
            user
        }
    })
}

/**
 * 根据用户id获取用户信息
 * @param id 
 * @returns 
 */
export const findOneUserAPI = (id: number) => {
    return http({
        url: `/user/${id}`,
        method: 'GET',
    })
}

/**
 * 获取所有用户
 * @returns 
 */
export const findAllUserAPI = () => {
    return http({
        url: `/user`,
        method: 'GET',
    })
}

/**
 * 获取所有用户废品数据
 * @returns 
 */
export const getUserGarbgaeAPI = () => {
    return http({
        url: `/user/getUserGarbage`,
        method:'GET'
    })
}