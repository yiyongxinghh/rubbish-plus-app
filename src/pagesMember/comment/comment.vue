<template>
  <view class="comment-container"> 
    <!-- 头部 -->
    <RpTitle :title="'我的评价'" />
    <!-- 评价列表 -->
    <scroll-view scroll-y class="comment-content">
      <uni-list>
        <uni-list-item title="列表左侧带略缩图" note="列表描述信息"
          thumb="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" thumb-size="lg" rightText="右侧文字"
          v-for="item in 10" clickable></uni-list-item>
      </uni-list>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>

</script>

<style scoped lang="scss">
page{
  height: 100%;
}
.comment-container{
  height: 100%;
  .comment-content{
    height: calc(100% - 80rpx);
  }
}
</style>