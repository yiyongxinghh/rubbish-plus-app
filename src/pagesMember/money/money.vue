<template>
  <view class="money-container">
    <!-- 头部 -->
    <RpTitle :title="'我的存款'" />
    <view class="money-content">
      <view>
        <text class="iconfont">&#xe620;</text>
        <text>钱包</text>
      </view>
      <text>{{ userStore.userDate.userAmount.toFixed(2) }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()
</script>

<style scoped lang="scss">
page {
  height: 100%;
}

.money-container {
  height: 100%;

  .money-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    view {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      & text:nth-child(1) {
        font-size: 200rpx;
        color: #999;
      }

      & text:nth-child(2) {
        font-size: 60rpx;
        color: #999;
      }
    }

    & text:nth-child(2) {
      font-size: 60rpx;
      font-weight: bolder;
      color: #000;
    }

  }
}
</style>