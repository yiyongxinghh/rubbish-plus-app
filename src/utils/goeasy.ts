import GoEasy from 'goeasy'
import { createMessageAPI } from '@/services/message'
import type { Message } from '@/types/global';
import { emitter } from './mitt'

let isMessageHandled = false; // 标志变量，用于跟踪是否已经处理过消息

export const goEasy = GoEasy.getInstance({
    host: 'hangzhou.goeasy.io', //新加坡host：singapore.goeasy.io
    appkey: "BC-6febb09a75294669849fd6d7124c7e85", //替换为您的应用appkey
    modules: ['pubsub']
});

//初始化
export const init = () => {
    goEasy.connect({
        onSuccess: function (val: any) { //连接成功
            console.log("GoEasy connect successfully.") //连接成功
        },
        onFailed: function (error: any) { //连接失败
            console.log("Failed to connect GoEasy, code:" + error.code + ",error:" + error.content);
        }
    });

}

//订阅消息
export const sub = (channel: string) => {
    goEasy.pubsub.subscribe({
        channel,//替换为您自己的channel
        onMessage: function (message: any) { //收到消息
                console.log(message);
                emitter.emit('message')
        },
        onSuccess: function () {
            console.log("Channel订阅成功。");
        },
        onFailed: function (error: any) {
            console.log("Channel订阅失败, 错误编码：" + error.code + " 错误信息：" + error.content)
        }
    });
}

//发送消息
export const send = async (channel: string, message: Message) => {
    console.log(message);
    await goEasy.pubsub.publish({
        channel,//替换为您自己的channel
        message: message.messageContent,//替换为您想要发送的消息内容
        onSuccess: async () => {
            await createMessageAPI(message, channel)
            console.log("消息发布成功。");
            emitter.emit('empty')
        },
        onFailed: function (error: any) {
            console.log("消息发送失败，错误编码：" + error.code + " 错误信息：" + error.content);
        }
    });
}

//拼接频道号
export const channelJoin = (firstId: number, secondId: number) => {
    // 对ID进行排序 拼接频道号
    return [firstId, secondId].sort().join('-');
}