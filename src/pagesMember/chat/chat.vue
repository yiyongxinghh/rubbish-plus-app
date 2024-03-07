<template>
  <view class="caht-container">
    <!-- 头部 -->
    <RpTitle :title="'聊天'"/>
    <scroll-view class="chat-content" :scroll-y="true">
      <view class="chat-list">
        <view class="chat-item" v-for="chat in 20" :class="chat % 2 ? 'outgoing' : 'incoming'">
          <text>聊天内容</text>
        </view>
      </view>
    </scroll-view>
    <view class="chat-input">
      <input type="text" />
      <button>发送</button>
    </view>
  </view>
</template>

<script setup lang="ts">


const backMessage = () => {
  uni.navigateBack({
    delta: 1
  })
}
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