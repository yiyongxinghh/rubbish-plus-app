<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";
const { userDate } = useUserStore();
//子调父
const emit = defineEmits<{
  (event: "close", value?: number | string): void;
}>();
</script>

<template>
  <view class="address-panel">
    <!-- 标题 -->
    <view class="title">
      <text class="text">配送至</text>
      <!-- 关闭按钮 -->
      <text class="close iconfont" @click="emit('close')">&#xe623;</text>
    </view>
    <!-- 内容 -->
    <view class="content">
      <view class="item">
        <view class="user"
          >{{ userDate.userName }} {{ userDate.userPhone }}</view
        >
        <view class="address">{{ userDate.userAddress }}</view>
        <text class="icon icon-ring"></text>
      </view>
    </view>
    <view class="footer">
      <view class="button primary" @click="emit('close', userDate.userAddress)"
        >确定</view
      >
    </view>
  </view>
</template>

<style lang="scss" scoped>
.address-panel {
  padding: 0 30rpx;
  border-radius: 10rpx 10rpx 0 0;
  position: relative;
  background-color: #fff;
}

.title {
  display: flex;
  position: relative;
  align-items: center;
  padding: 40rpx 0;
  text-align: center;
  font-size: 32rpx;
  font-weight: normal;
  border-bottom: 1rpx solid #ddd;
  color: #444;
  .text {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
  }
  .close {
    transform: rotate(45deg);
    font-size: 58rpx;
  }
}

.content {
  min-height: 110rpx;
  max-height: 240rpx;
  overflow: auto;
  padding: 20rpx;
  .item {
    padding: 30rpx 50rpx 30rpx 60rpx;
    background-size: 40rpx;
    background-repeat: no-repeat;
    background-position: 0 center;
    background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/locate.png);
    position: relative;
  }
  .icon {
    color: #999;
    font-size: 40rpx;
    transform: translateY(-50%);
    position: absolute;
    top: 50%;
    right: 0;
  }
  .icon-checked {
    color: #27ba9b;
  }
  .icon-ring {
    color: #444;
  }
  .user {
    font-size: 28rpx;
    color: #444;
    font-weight: 500;
  }
  .address {
    font-size: 26rpx;
    color: #666;
  }
}

.footer {
  display: flex;
  justify-content: space-between;
  padding: 20rpx 0 40rpx;
  font-size: 28rpx;
  color: #444;

  .button {
    flex: 1;
    height: 72rpx;
    text-align: center;
    line-height: 72rpx;
    margin: 0 20rpx;
    color: #fff;
    border-radius: 72rpx;
  }

  .primary {
    color: #fff;
    background-color: #27ba9b;
  }

  .secondary {
    background-color: #ffa868;
  }
}
</style>
