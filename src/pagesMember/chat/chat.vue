<template>
  <view class="caht-container">
    <!-- 头部 -->
    <RpTitle :title="'聊天'" />
    <scroll-view class="chat-content" :scroll-y="true">
      <view class="chat-list">
        <view
          class="chat-item"
          v-for="chat in messageContent?.messages"
          :class="chat.senderId === senderId ? 'outgoing' : 'incoming'"
        >
          <text>{{ chat.messageContent }}</text>
        </view>
      </view>
    </scroll-view>
    <view class="chat-input">
      <input type="text" v-model="messageObject.messageContent" />
      <button @click="sendMessage">发送</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { getAllMessageAPI } from "@/services/message";
import type { GroupedMessage, GroupedMessages } from "@/types/message";
import { useUserStore } from "@/stores/userStore";
import { onLoad } from "@dcloudio/uni-app";
//引入socket
import { socket, send, over } from "@/utils/socket";
import { reactive, ref } from "vue";

// 获取聊天对象id
const { id } = defineProps(["id"]);
// 获取本用户仓库
const { userDate } = useUserStore();
const senderId = userDate?.userId as number;
//用户消息列表
let userList:any = null;

//消息内容
const messageContent = ref<GroupedMessage>();

//消息对象
const messageObject = reactive({
  sender: userDate?.userId,
  recipient: parseInt(id),
  messageContent: "",
  messageTime: new Date(),
});

//发送消息
const sendMessage = () => {
  if (userList) {
    //截取接收者
    const sender = userList.find((user:any) => {
      return user.userId === messageObject.recipient;
    });
    //截取发送者
    const recipient = userList.find((user:any) => {
      return user.userId === userDate?.userId;
    });
    //发送指定用户消息
    send({
      messageObject,
      sender,
      recipient,
    });
  } else {
    send({ messageObject });
  }
  messageObject.messageContent = "";
};

onLoad(async () => {
  //加载本用户消息
  const {
    data: { groupedMessages, total },
  } = await getAllMessageAPI("", "", senderId, parseInt(id));
  messageContent.value = groupedMessages[0];
  //接收消息
  socket.on("message-over", (data) => {
    data.senderId = data.sender;
    data.recipientId = data.recipient;
    messageContent.value?.messages.push(data);
  });
  //监听用户消息，并返回列表
  socket.on("load", (data) => {
    console.log(data);
    userList = data;
  });
  console.log(messageObject);
});
</script>

<style scoped lang="scss">
page {
  height: 100%;
}

.caht-container {
  height: 100%;
  position: relative;
  overflow: hidden;

  .chat-content {
    margin-top: 80rpx;
    height: calc(100% - 180rpx);

    .chat-list {
      display: flex;
      flex-direction: column;

      .chat-item {
        width: 60%;
        margin: 10rpx 10rpx 0;
        padding: 20rpx;
        box-sizing: border-box;
        border-radius: 12rpx;
        background-color: #4f4fbd;
      }

      .outgoing {
        background-color: #3498db;
        color: #fff;
        align-self: end;
      }

      .incoming {
        background-color: #e0e0e0;
        align-self: start;
      }
    }
  }

  .chat-input {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    background-color: #fbfbfb;
    box-sizing: border-box;
    padding: 10rpx;
    height: 100rpx;
    width: 100%;

    input {
      padding: 0 10rpx;
      height: 50rpx;
      width: 100%;
      border: 1rpx solid #ccc;
      border-radius: 10rpx;
    }

    button {
      width: 150rpx;
      height: 50rpx;
      line-height: 50rpx;
      border-radius: 10rpx;
      border: 1rpx solid #ccc;
      outline: 0;
      margin-left: 20rpx;
      font-size: 26rpx;
      padding: 0;
    }
  }
}
</style>
