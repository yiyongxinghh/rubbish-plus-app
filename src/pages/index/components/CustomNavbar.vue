<script setup lang="ts">
//获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
console.log(safeAreaInsets);

</script>

<template>
    <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
        <!-- logo文字 -->
        <view class="logo">
            <image class="logo-image" src="@/static/images/rubbish-white.png" mode="aspectFit"></image>
            <text class="logo-text">rubbish-plus</text>
        </view>
        <!-- 搜索条 -->
        <view class="search">
            <text class="icon-search">
                <text class="iconfont">&#xe62f;</text>
                <text>搜索商品</text> 
            </text>
            <text class="icon-scan"></text>
        </view>
    </view>
</template>

<style lang="scss">
/* 自定义导航条 */
.navbar {
    background-image: url(@/static/images/s_bg.png);
    background-size: cover;
    position: relative;
    display: flex;
    flex-direction: column;
    padding-top: 20px;

    .logo {
        display: flex;
        align-items: center;
        height: 64rpx;
        padding-left: 30rpx;
        padding-top: 20rpx;

        .logo-image {
            width: 78rpx;
        }

        .logo-text {
            flex: 1;
            line-height: 28rpx;
            font-family: 'Roboto', sans-serif;
            color: #fff;
            margin: 2rpx 0 0 20rpx;
            padding-left: 20rpx;
            border-left: 2rpx solid #fff;
            font-size: 32rpx;
        }
    }

    .search {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10rpx 0 26rpx;
        height: 64rpx;
        margin: 16rpx 20rpx;
        color: #fff;
        font-size: 28rpx;
        border-radius: 32rpx;
        background-color: rgba(255, 255, 255, 0.5);
    }

    .icon-search {
        display: flex;
        align-items: center;
    }

    .icon-scan {
        font-size: 30rpx;
        padding: 15rpx;
    }
}</style>