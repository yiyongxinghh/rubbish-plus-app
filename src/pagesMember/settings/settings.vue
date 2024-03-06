<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";
//引入用户仓库
const userStore = useUserStore();

//登出
const logOut = () => {
  userStore.clearToken()
  userStore.clearUserData()
  uni.navigateTo({ url: "/pages/login/login" });
  uni.showToast({ title: "退出登录" });
}

</script>

<template>
  <view class="viewport">
    <!-- 列表1 -->
    <view class="list" v-if="true">
      <navigator url="/pagesMember/address/address" hover-class="none" class="item arrow">
        <text>我的收货地址</text>
        <text class="iconfont icon">&#xe663;</text>
      </navigator>
    </view>
    <!-- 列表2 -->
    <view class="list">
      <button hover-class="none" class="item arrow" open-type="openSetting">
        <text>授权管理</text>
        <text class="iconfont icon">&#xe663;</text>
      </button>
      <button hover-class="none" class="item arrow" open-type="feedback">
        <text>问题反馈</text>
        <text class="iconfont icon">&#xe663;</text>
      </button>
      <button hover-class="none" class="item arrow" open-type="contact">
        <text>联系我们</text>
        <text class="iconfont icon">&#xe663;</text>
      </button>
    </view>
    <!-- 列表3 -->
    <view class="list">
      <navigator hover-class="none" class="item arrow" url=" ">
        <text>关于废品回收系统</text>
        <text class="iconfont icon">&#xe663;</text>
      </navigator>
    </view>
    <!-- 操作按钮 -->
    <view class="action">
      <view class="button" @click="logOut">退出登录</view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
page {
  background-color: #f4f4f4;
}

.viewport {
  padding: 20rpx;
}

/* 列表 */
.list {
  padding: 0 20rpx;
  background-color: #fff;
  margin-bottom: 20rpx;
  border-radius: 10rpx;

  button{
    padding: 0;
  }

  .item {
    line-height: 90rpx;
    padding-left: 10rpx;
    font-size: 30rpx;
    color: #333;
    border-top: 1rpx solid #ddd;
    position: relative;
    text-align: left;
    border-radius: 0;
    background-color: #fff;

    &::after {
      width: auto;
      height: auto;
      left: auto;
      border: none;
    }

    &:first-child {
      border: none;
    }


  }

  .arrow {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      color: #e3d4d4;
      font-size: 48rpx;
      transform: rotateZ(90deg);
    }

  }
}

/* 操作按钮 */
.action {
  text-align: center;
  line-height: 90rpx;
  margin-top: 40rpx;
  font-size: 32rpx;
  color: #333;

  .button {
    background-color: #fff;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
  }
}
</style>