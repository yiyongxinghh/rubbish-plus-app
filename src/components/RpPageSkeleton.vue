<template>
  <view class="skeleton-container">
    <view class="skeleton-carousel">
      <view class="skeleton-carousel-item"></view>
    </view>
    <view class="skeleton-product-list">
      <view v-for="index in 6" :key="index" class="skeleton-product-item"></view>
    </view>
  </view>
</template>
  
<style scoped>
.skeleton-container {
  max-width: 800px;
  margin: 0 auto;
}

.skeleton-carousel {
  height: 300px;
  background-color: #f3f3f3;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
}

.skeleton-carousel-item {
  width: 100%;
  height: 100%;
  background-color: #ddd;
  position: absolute;

}

.skeleton-product-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.skeleton-product-item {
  width: 100%;
  height: 0;
  padding-top: 150%;
  background-color: #f3f3f3;
  position: relative;
  animation: skeleton-product-animation 1.2s ease-in-out infinite;
}

@keyframes skeleton-product-animation {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
}
</style>