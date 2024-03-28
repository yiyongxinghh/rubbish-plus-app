<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { onLoad } from '@dcloudio/uni-app'
import { findOneUserAPI } from '@/services/user'
// 获取用户信息
const userStore = useUserStore()

const picUrl = ref()

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
// 订单选项
const orderTypes = [
  { type: 1, text: '我的订单', icon: '../../static/my/order.png' ,url:'/pagesMember/order/order'},
  { type: 2, text: '我的存款', icon: '../../static/my/money.png' ,url:'/pagesMember/money/money'},
  { type: 3, text: '我的收藏', icon: '../../static/my/collect.png' ,url:'/pagesMember/collect/collect'},
  { type: 4, text: '我的评价', icon: '../../static/my/comment.png' ,url:'/pagesMember/comment/comment'},
]

onLoad(async ()=>{
  // 获取用户信息
  const {data} = await findOneUserAPI(userStore.userDate!.userId)
  picUrl.value = data.pic.picUrl
})
</script>

<template>
  <scroll-view class="viewport" scroll-y enable-back-to-top>
    <!-- 个人资料 -->
    <view class="profile" :style="{ paddingTop: safeAreaInsets!.top + 'px' }">
      <!-- 情况1：已登录 -->
      <view class="overview" v-if="userStore.userDate">
        <navigator url="/pagesMember/profile/profile" hover-class="none">
          <image class="avatar" mode="aspectFill" :src="picUrl"></image>
          <!-- <image class="avatar" mode="aspectFill" src="https://server.rubbish-plus.top/files/1708689963958.jpg"></image> -->
        </navigator>
        <view class="meta">
          <view class="nickname">{{ userStore.userDate.userName }}</view>
          <navigator class="extra" :url="`/pagesMember/profile/profile?id=${userStore.userDate.userId }`" hover-class="none">
            <text class="update">修改个人信息</text>
          </navigator>
        </view>
      </view>
      <!-- 情况2：未登录 -->
      <view class="overview" v-else>
        <navigator url="/pages/login/login" hover-class="none">
          <image class="avatar gray" mode="aspectFill"
            src="http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-06/db628d42-88a7-46e7-abb8-659448c33081.png">
          </image>
        </navigator>
        <view class="meta">
          <navigator url="/pages/login/login" hover-class="none" class="nickname">
            未登录
          </navigator>
          <view class="extra">
            <text class="tips">点击登录账号</text>
          </view>
        </view>
      </view>
      <navigator class="settings" url="/pagesMember/settings/settings" hover-class="none">
        设置
      </navigator>
    </view>
    <!-- 个人中心 -->
    <view class="orders">
      <view class="title">
        <text>个人中心</text>
        <navigator class="navigator" url="/pagesOrder/list/list?type=0" hover-class="none">
          查看更多<text class="icon-right"></text>
        </navigator>
      </view>
      <view class="section">
        <!-- 订单 -->
        <navigator v-for="item in orderTypes" :key="item.type" 
          :url="item.url" class="navigator" hover-class="none">
          <image class="icon" :src="item.icon"></image>
          <text>{{ item.text }}</text>
        </navigator>
      </view>
    </view>
    <!-- 猜你喜欢 -->
    <view class="guess">
      <RpGuess ref="guessRef" />
    </view>
  </scroll-view>
  <!-- 底部导航 -->
  <RpTabbar :selected="3" />
</template>

<style lang="scss" scoped>
page {
  height: 100%;
  overflow: hidden;
  background-color: #f7f7f8;
}

.viewport {
  height: 100%;
  background-repeat: no-repeat;
  background-image: url('@/static/images/back.jpg');
  background-size: 100% auto;
}

/* 用户信息 */
.profile {
  margin-top: 20rpx;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .overview {
    display: flex;
    height: 120rpx;
    padding: 0 36rpx;
    color: #fff;
  }

  .avatar {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    background-color: #eee;
  }

  .gray {
    filter: grayscale(100%);
  }

  .meta {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    line-height: 30rpx;
    padding: 16rpx 0;
    margin-left: 20rpx;
  }

  .nickname {
    max-width: 350rpx;
    margin-bottom: 16rpx;
    font-size: 30rpx;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .extra {
    display: flex;
    font-size: 20rpx;
  }

  .tips {
    font-size: 22rpx;
  }

  .update {
    padding: 3rpx 10rpx 1rpx;
    color: rgba(255, 255, 255, 0.8);
    border: 1rpx solid rgba(255, 255, 255, 0.8);
    margin-right: 10rpx;
    border-radius: 30rpx;
  }

  .settings {
    padding: 0 30rpx;
    font-size: 30rpx;
    color: #fff;
  }
}

/* 我的订单 */
.orders {
  position: relative;
  z-index: 99;
  padding: 30rpx;
  margin: 50rpx 20rpx 0;
  background-color: #fff;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 6rpx rgba(240, 240, 240, 0.6);

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 40rpx;
    line-height: 40rpx;
    font-size: 28rpx;
    color: #1e1e1e;

    .navigator {
      font-size: 24rpx;
      color: #939393;
    }
  }

  .section {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 30rpx 0;

    .navigator{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .icon{
        width: 100rpx;
        height: 100rpx;
      }

      text:nth-child(2){
        margin-top: 6rpx;
        font-size: 22rpx;
      }

      &::before {
        display: block;
        font-size: 60rpx;
        color: #ff9545;
      }
    }

    .contact {
      padding: 0;
      margin: 0;
      border: 0;
      background-color: transparent;
      line-height: inherit;
    }
  }
}

/* 猜你喜欢 */
.guess {
  background-color: #f7f7f8;
  margin-top: 20rpx;
  padding: 0;
}
</style>