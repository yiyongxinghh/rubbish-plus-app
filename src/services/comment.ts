import {http} from '@/utils/http';
import type { Comment } from "@/types/global";

/**
 * 根据指定的废品id，获取其相关的所有评论
 * @param garbageId 
 * @returns 
 */
export const findAllGarbagCommentsAPI = (garbageId:number) => {
    return http<Comment[]>({
        method: 'GET',
        url: `/comment/garbage`,
        params: { garbageId }
    })
}

/**
 * 发送评论
 * @param comment 
 * @returns 
 */
export const sendCommentAPI = (comment:Comment) => {
    return http<Comment>({
        method:'POST',
        url:'/comment',
        data:comment  
    })
}

/**
 * 删除指定评论
 * @param commentId 
 * @returns 
 */
export const deleteCommentAPI = (commentId:number) => {
    return http({
        method:'DELETE',
        url:`/comment/${commentId}`,
    })
}