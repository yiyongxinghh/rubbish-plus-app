<template>
    <view class="title">
        <text class="iconfont icon" @click="back">&#xe663;</text>
        <text>{{ title }}</text>
    </view>
</template>

<script setup lang='ts'>
const props = defineProps({
  title: String
})

const back = () => {
    uni.navigateBack({
        delta: 1
    })
}
defineExpose({
    back
})
</script>

<style scoped lang="scss">
.title {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    background-color: #fbfbfb;
    height: 80rpx;
    width: 100%;
    display: flex;
    align-items: center;

    .icon {
        font-size: 70rpx;
        transform: rotateZ(-90deg);
    }

    & text:nth-child(2) {
        font-weight: bold;
        margin: 0 auto;
    }
}
</style>