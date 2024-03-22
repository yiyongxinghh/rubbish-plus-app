<template>
  <view class="order-container">
    <!-- 头部 -->
    <RpTitle :title="'我的订单'" />
    <!-- 订单列表 -->
    <scroll-view scroll-y class="order-content">
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
page {
  height: 100%;
}
.order-container{
  height: 100%;
  .order-content{
    height: calc(100% - 80rpx);
  }
}
</style>