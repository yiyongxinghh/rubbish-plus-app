<template>
    <view class="tabbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
        <view class="tabbar-item" v-for="item in tabbarList" @click="switchTab(item)" :key="item.id">
            <image class="tabbar-item-img" :src="selected === item.id ? item.activeIcon : item.staticIcon"
                mode="scaleToFill" />
            <view class="tabbar-item-text" :class="{ active: selected === item.id }">{{ item.text }}</view>
        </view>
    </view>
</template>

<script setup lang='ts'>
import { ref } from "vue";
//获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const props = defineProps({
    selected: {
        type: Number,
        default: 0
    }
})
const tabbarList = ref([
    {
        id: 0,
        staticIcon: '../static/gif/icons8-home-24.png',
        activeIcon: '../static/gif/icons8-home.gif',
        page: '/pages/index/index',
        text: '主页'
    },
    {
        id: 1,
        staticIcon: '../static/gif/icons8-trash-24.png',
        activeIcon: '../static/gif/icons8-trash.gif',
        page: '/pages/shop/shop',
        text: '商城'
    },
    {
        id: 2,
        staticIcon: '../static/gif/icons8-speech-bubble-24.png',
        activeIcon: '../static/gif/icons8-speech-bubble.gif',
        page: '/pages/message/message',
        text: '消息'
    },
    {
        id: 3,
        staticIcon: '../static/gif/icons8-key-24.png',
        activeIcon: '../static/gif/icons8-key.gif',
        page: '/pages/login/login',
        text: '个人'
    }
])

const switchTab = (item: any) => {
    uni.switchTab({
        url: item.page
    })
}

// 隐藏原生TabBar
uni.hideTabBar();
</script>

<style lang="scss">
.tabbar {
    position: fixed;
    box-sizing: border-box;
    width: 100%;
    bottom: 0;
    height: 100px;
    background: white;
    padding: 20rpx;
    border-radius: 30rpx 30rpx 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 15px rgba(165, 168, 171, 0.83) !important;

    .tabbar-item {
        display: flex;
        flex-direction: column;
        width: 25%;
        justify-content: center;
        align-items: center;

        .tabbar-item-img {
            width: 40rpx;
            height: 40rpx;
        }

        .tabbar-item-text {
            font-size: 14px;
        }

        .active {
            color: #7b8086;
        }
    }
}
</style>