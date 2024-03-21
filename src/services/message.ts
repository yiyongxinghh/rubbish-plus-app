import type { Message } from "@/types/global"
import type { GroupedMessages } from "@/types/message"
import { http } from "@/utils/http"

/**
 * 获取所有消息列表
 * @returns 
 */
export const getAllMessageAPI = (page: number | '' = '', pageSize: number | '' = ''
    , senderId: number, recipientId: number) => {
    return http<GroupedMessages>({
        method: 'GET',
        url: '/message',
        params: {
            page,
            pageSize,
            senderId,
            recipientId
        }
    })
}

/**
 * 根据用户id获取所有聊天信息列表
 * @param userId 
 * @returns 
 */
export const getAllMessageByUserIdAPI = (userId: number) => {
    return http({
        method: 'GET',
        url: '/message/user',
        params: {
            userId
        }
    })
}

/**
 * 创建消息
 * @param message 
 * @param channel 
 * @returns 
 */
export const createMessageAPI = (message:Message,channel:string) => {
    return http({
        method: 'POST',
        url:'/message',
        params:{
            channel
        },
        data:{
            ...message
        }
    })
}