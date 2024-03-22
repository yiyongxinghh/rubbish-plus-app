<template>
    <view class="title" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
        <text class="iconfont icon" @click="back">&#xe663;</text>
        <text>{{ title }}</text>
    </view>
</template>

<script setup lang='ts'>
//获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
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
    z-index: 1;
    background-color: #fbfbfb;
    height: 80rpx;
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;

    .icon {
        font-size: 70rpx;
        transform: rotateZ(-90deg);
    }

    & text:nth-child(2) {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        font-weight: bold;
    }
}
</style>