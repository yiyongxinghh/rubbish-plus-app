<script setup lang="ts">
import { ref } from "vue";

//子调父
const emit = defineEmits<{
  (event: "close", value?: number | string): void;
}>();

//计数器
const count = ref(1);
</script>

<template>
  <view class="service-panel">
    <!-- 标题 -->
    <view class="title">
      <text class="text">选择数量</text>
      <!-- 关闭按钮 -->
      <text class="close iconfont" @click="emit('close')">&#xe623;</text>
    </view>
    <!-- 内容 -->
    <view class="content">
      <view class="item">
        <text>数量</text>
        <uni-number-box
          v-model="count"
          background="#27ba9b"
          color="#fff"
          :min="1"
          :max="99"
        />
      </view>
    </view>
    <view class="footer">
      <view class="button primary" @click="emit('close', count)">确定</view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.service-panel {
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
  padding: 20rpx 20rpx 50rpx 20rpx;

  .item {
    display: flex;
    justify-content: space-between;
    align-self: center;
    margin-top: 20rpx;
    text {
      font-size: 28rpx;
      color: #444;
    }
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
