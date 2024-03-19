import type { Message } from '@/types/global.d.ts'

//消息列表类型
export type MessageList = {
    message: string,
    time: Date,
    userId: number,
    userName: string
}

//单独消息类型
export type GroupedMessage = {
    messages: Message[],
    userId: [number, number],
    userName: [string, string]
}

//单独消息组类型
export type GroupedMessages = {
    groupedMessages:GroupedMessage[],
    total:number
}