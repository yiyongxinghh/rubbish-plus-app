import { http } from "@/utils/http"
import type { Collection } from "@/types/global"

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
        method:'GET',
        url:`/collection/${userId}`
    })
}

/**
 * 在指定的收藏夹中加入指定的废品
 * @param collection 
 * @param garbage 
 * @returns 
 */
export const insertGarbageToCollectionAPI = (collection:number,garbage:number)=>{
    return http({
        method:'POST',
        url:'/collection-to-garbage'
    })
}

/**
 * 根据指定的收藏夹id获取所有收藏列
 * @param collectionId 
 * @returns 
 */
export const findCollectionAPI = (collectionId:number)=>{
    return http({
        method:'GET',
        url:`/collection-to-garbage/${collectionId}` 
    })
}

/**
 * 通过指定的收藏夹id和废品id删除指定收藏夹中废品
 * @param collectionId 
 * @param garbageId 
 * @returns 
 */
export const removeGarbageFromCollectionAPI = (collectionId:number,garbageId:number)=>{
    return http({
        method:'DELETE',
        url:'/collection-to-garbage',
        data:{
            collectionId,garbageId
        }
    })
}

/**
 * 获取指定用户id，发送的所有评论
 * @param userId 
 * @returns 
 */
export const findAllUserCommentsAPI = (userId:number)=>{
    return http({
      method:'GET',
      url:`/comment/user/${userId}`  
    })
}   
