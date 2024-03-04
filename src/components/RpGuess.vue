<script setup lang="ts">
import { getHomeGoodsGuessLikeAPI } from "@/services/home";
import type { Garbage, Page } from "@/types/global";
import { ref, onMounted } from "vue";

//分页参数
const pageParams: Required<Page> = {
    page: 1,
    pageSize: 4
}
//猜你喜欢列表
const guessList = ref<Garbage[]>([])
//已结束标记
const finish = ref(false)
//获取猜你喜欢数据
const getHomeGoodsGuessLikeData = async () => {
    if (finish.value) return uni.showToast({ title: "没有更多数据了", icon: "none" })
    const res = await getHomeGoodsGuessLikeAPI(pageParams)
    //数组追加
    guessList.value.push(...res.data.garbages)
    //分页条件
    if (res.data.total > guessList.value.length) {
        //页码追加
        pageParams.page++
    } else {
        finish.value = true
    }

}
//数据重置
const resetData = ()=>{
    pageParams.page = 1
    finish.value = false
    guessList.value = []
}
//组件挂载完毕
onMounted(() => {
    getHomeGoodsGuessLikeData()
})

//暴露方法
defineExpose({
    resetData,
    getMore: getHomeGoodsGuessLikeData
})
</script>

<template>
    <!-- 猜你喜欢 -->
    <view class="caption">
        <text class="text">猜你喜欢</text>
    </view>
    <view class="guess">
        <navigator class="guess-item" v-for="item in guessList" :key="item.garbageId"
            :url="`/pages/goods/goods?id=${item.garbageId}`">
            <image class="image" mode="aspectFill"
                :src="item.pic.picUrl"></image>
            <view class="name">
                <text>{{ item.garbageName }}</text>
                <text class="type">{{ item.garbageType }}</text>
            </view>
            <view class="price">
                <view>
                    <text class="small">¥</text>
                    <text>{{ item.garbagePrice.toFixed(2) }}</text>
                </view>
                <view class="amount">
                    <text>库存 </text>
                    <text>{{ item.garbageAmount }}</text>
                </view>
            </view>
        </navigator>
    </view>
    <view class="loading-text">
        {{ finish ? '没有更多数据了' : '加载中...'}}
    </view>
</template>

<style lang="scss">
:host {
    display: block;
}

/* 分类标题 */
.caption {
    display: flex;
    justify-content: center;
    line-height: 1;
    padding: 36rpx 0 40rpx;
    font-size: 32rpx;
    color: #262626;

    .text {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 28rpx 0 30rpx;

        &::before,
        &::after {
            content: '';
            width: 20rpx;
            height: 20rpx;
            background-image: url(@/static/images/bubble.png);
            background-size: contain;
            margin: 0 10rpx;
        }
    }
}

/* 猜你喜欢 */
.guess {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 20rpx;
    margin-bottom: 10px;

    .guess-item {
        width: 310rpx;
        padding: 24rpx 20rpx 20rpx;
        margin-bottom: 20rpx;
        border-radius: 10rpx;
        overflow: hidden;
        background-color: #fff;
    }

    .image {
        width: 304rpx;
        height: 304rpx;
    }

    .name {
        height: 75rpx;
        margin: 10rpx 0;
        font-size: 26rpx;
        color: #262626;
        overflow: hidden;
        text-overflow: ellipsis;
        display: flex;
        justify-content: space-between;
        align-items: center;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;

        .type {
            font-size: 70%;
            color: #666;
        }
    }

    .price {
        line-height: 1;
        padding-top: 4rpx;
        color: #cf4444;
        font-size: 26rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .small {
            font-size: 80%;
        }

        .amount {
            font-size: 80%;
            color: #666;
        }
    }


}

// 加载提示文字
.loading-text {
    text-align: center;
    font-size: 28rpx;
    color: #666;
    padding: 20rpx 0;
}
</style>