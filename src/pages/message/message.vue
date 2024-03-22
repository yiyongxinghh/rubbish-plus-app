<template>
  <view class="message-container" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <text class="message-tab">消息</text>
    <view class="message-title">
      <view class="title-item" v-for="item in messageTitle">
        <image :src="item.icon" mode="aspectFit" />
        <text>{{ item.title }}</text>
      </view>
    </view>
    <scroll-view scroll-y class="messgae-content">
      <uni-list>
        <uni-list-item
          :title="item.userName"
          :note="item.message"
          thumb="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
          thumb-size="lg"
          :rightText="item.time"
          v-for="item in messageList"
          clickable
          @click="toChat(item.userId)"
        ></uni-list-item>
      </uni-list>
    </scroll-view>
  </view>
  <!-- 底部导航 -->
  <RpTabbar :selected="2" />
</template>

<script setup lang="ts">
import type { MessageList } from "@/types/message";
import { getAllMessageByUserIdAPI } from "@/services/message";
import { useUserStore } from "@/stores/userStore";
import {  onShow } from "@dcloudio/uni-app";
import {  ref } from "vue";
//获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const { userDate } = useUserStore();

//聊天列表
const messageList = ref<MessageList[]>([]);

//头部导航
const messageTitle = [
  { title: "全部", icon: "../../static/images/all.png" },
  { title: "配送者", icon: "../../static/images/delivery.png" },
  { title: "管理员", icon: "../../static/images/manager.png" },
  { title: "客服", icon: "../../static/images/business.png" },
];

//跳转聊天
const toChat = (id: number) => {
  uni.navigateTo({
    url: `/pagesMember/chat/chat?id=${id}`,
  });
};

onShow(async () => {
  const { data } = await getAllMessageByUserIdAPI(userDate?.userId as number);
  data.forEach((item:any)=>{
    item.userId = (item.userId.filter((ele:any) => ele !==userDate?.userId))[0]
    item.userName = (item.userName.filter((ele:any) => ele !==userDate?.userName))[0]
  })
  messageList.value = data;
});
</script>

<style lang="scss" scoped>
page {
  height: 100%;
  background-color: #fff;
}

.message-container {
  display: flex;
  flex-direction: column;
  margin: 20rpx 10rpx;

  .message-tab {
    margin-left: 10rpx;
    font-size: 30rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
  }

  .message-title {
    width: 100%;
    white-space: nowrap;
    display: flex;
    .title-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 20rpx;
      box-sizing: border-box;
      padding: 10rpx;
      height: 100rpx;
      width: 200rpx;
      background-color: rgba(231, 242, 242, 0.5);
      margin: 10rpx;
      image {
        width: 60%;
        height: 60%;
      }
    }
  }

  .messgae-content {
    margin: 10rpx 0 100px 0;
  }
}
</style>
