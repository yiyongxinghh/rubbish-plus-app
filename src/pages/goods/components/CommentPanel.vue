<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";
import { reactive } from "vue";
import type { Comment } from "@/types/global";
const { userDate } = useUserStore();

const fromData = reactive({
  commentContent: "",
  commentScore: 5,
  commentTime: new Date(),
});

defineProps<{
  readDetail?: boolean;
  commentDetail?: Comment;
}>();

//子调父
const emit = defineEmits<{
  (event: "close", value?: object): void;
}>();
</script>

<template>
  <view class="address-panel">
    <!-- 标题 -->
    <view class="title">
      <text class="text">评论</text>
      <!-- 关闭按钮 -->
      <text class="close iconfont" @click="emit('close')">&#xe623;</text>
    </view>
    <!-- 内容 -->
    <view class="content" v-if="!readDetail">
      <view class="item">
        <text>评论:</text>
        <textarea class="text" auto-height v-model="fromData.commentContent" />
      </view>
      <view class="item">
        <text>评分:</text>
        <uni-rate :max="10" v-model="fromData.commentScore" />
      </view>
    </view>
    <view class="content" v-else>
      <view class="item">
        <text>评论:</text>
        <textarea
          class="text"
          auto-height
          v-model="commentDetail.commentContent"
          disabled
        />
      </view>
      <view class="item">
        <text>评分:</text>
        <uni-rate :max="10" :value="commentDetail.commentScore" readonly />
      </view>
    </view>
    <view class="footer">
      <view v-if="!readDetail" class="button primary" @click="emit('close',fromData)">确定</view>
      <view v-else class="button primary" @click="emit('close')">确定</view>
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
  min-height: 210rpx;
  max-height: 440rpx;
  overflow: auto;
  padding: 10rpx;
  display: flex;
  flex-direction: column;
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30rpx;
    .text {
      border-radius: 10rpx;
      border: 1rpx solid #ddd;
      padding: 20rpx;
      box-sizing: border-box;
      margin-left: 10rpx;
      width: 92%;
      height: 100%;
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
