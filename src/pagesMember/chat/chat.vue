<template>
  <view class="caht-container">
    <!-- 头部 -->
    <RpTitle :title="'聊天'" />
    <scroll-view class="chat-content" :scroll-y="true">
      <view class="chat-list">
        <view
          class="chat-item"
          v-for="chat in messages?.messages"
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
import { useMessageSore } from "@/stores/messageStore";
import { storeToRefs } from "pinia";
import { onLoad } from "@dcloudio/uni-app";
import { sub, send, channelJoin } from "@/utils/goeasy";
import { emitter } from "@/utils/mitt";
import { onUnmounted, reactive, ref } from "vue";

// 获取聊天对象id
const { id } = defineProps(["id"]);
// 获取本用户仓库
const { userDate } = useUserStore();
const messageStore = useMessageSore();
const { sender, recipient } = storeToRefs(messageStore);
const senderId = userDate?.userId as number;

//创建频道
const channel = channelJoin(senderId, id);

//消息内容
const messages = ref<GroupedMessage>();

//消息对象
const messageObject = ref({
  sender: userDate?.userId as number,
  recipient: parseInt(id),
  messageContent: "",
  messageTime: new Date(),
});

//发送消息
const sendMessage = () => {
  //发送指定用户消息
  messageStore.saveData(
    messageObject.value.sender,
    messageObject.value.recipient
  );
  send(channel, messageObject.value);
};

const requestData = async () => {
  const {
    data: { groupedMessages },
  } = await getAllMessageAPI("", "", senderId, parseInt(id));
  messages.value = groupedMessages[0];
};

onLoad(async () => {
  //加载本用户消息
  await requestData()
  //监听频道
  sub(channel);
  emitter.on("empty", (val: any) => {
    messageObject.value.messageContent = "";
  });
  emitter.on("message", async () => {
    await requestData()
  });
});
onUnmounted(() => {
  emitter.off("empty");
  emitter.off("message");
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
        margin-left: auto;
      }

      .incoming {
        background-color: #e0e0e0;
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
