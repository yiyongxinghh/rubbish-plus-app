<script setup lang="ts">
import { ref } from 'vue'
import type { BannerItem } from '@/types/home';
import { getHomeBannerAPI } from '@/services/home';
import { getGarbageCategoryAPI, getTypeGarbageAPI } from '@/services/shop';
import { onLoad } from '@dcloudio/uni-app';
import type { Category, Garbage } from '@/types/global';

//获取分类列表
const categoryList = ref<Category[]>([])
const getCategoryList = async () => {
    const res = await getGarbageCategoryAPI()
    categoryList.value = res.data.category
}

//获取指定分类下的废品列表
const goodsList = ref<Array<Garbage[]>>([])
const getGoodsList = async (id: number) => {
    const res = await getTypeGarbageAPI(id)
    goodsList.value = res.data
    console.log(res.data, goodsList.value);
}

//控制激活
let active = ref(0)
const handleActive = async (id: number) => {
    active.value = id - 1
    await getGoodsList(id)
}

//获取首页轮播图数据
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
    const res = await getHomeBannerAPI(1, 5)
    bannerList.value = res.data.pics
}

//是否加载数据完毕
const isFinished = ref(false)

//页面加载
onLoad(async () => {
    await Promise.all([getCategoryList(), getHomeBannerData(), getGoodsList(1)])
    isFinished.value = true
})
</script>

<template>
    <view class="viewport" v-if="isFinished">
        <!-- 搜索框 -->
        <view class="search">
            <view class="input">
                <text><text class="iconfont">&#xe62f;</text>搜索物品</text>
            </view>
        </view>
        <!-- 分类 -->
        <view class="categories">
            <!-- 左侧：一级分类 -->
            <scroll-view class="primary" scroll-y>
                <view v-for="(item, index) in categoryList" :key="item.categoryId" class="item"
                    :class="{ active: index === active }" @click="handleActive(item.categoryId)">
                    <text class="name"> {{ item.categoryName }} </text>
                </view>
            </scroll-view>
            <!-- 右侧：二级分类 -->
            <scroll-view class="secondary" scroll-y>
                <!-- 焦点图 -->
                <RpSwiper class="banner" :bannerList="bannerList" />
                <!-- 内容区域 -->
                <view class="panel" v-for="(items, index) in goodsList" :key="index">
                    <view class="title">
                        <text class="name">{{ items[0].garbageType }}</text>
                        <navigator class="more" hover-class="none">全部<text class="iconfont">&#xe663;</text></navigator>
                    </view>
                    <view class="section">
                        <navigator v-for="goods in items" :key="goods.garbageId" class="goods" hover-class="none"
                            :url="`/pages/goods/goods?id=${goods.garbageId}`">
                            <image class="image" :src="goods.pic.picUrl"></image>
                            <view class="name ellipsis">{{ goods.garbageName }}</view>
                            <view class="price">
                                <text class="symbol">¥</text>
                                <text class="number">{{ goods.garbagePrice.toFixed(2) }}</text>
                            </view>
                        </navigator>
                    </view>
                </view>
            </scroll-view>
        </view>
    </view>
    <!-- 骨架屏 -->
    <RpPageSkeleton v-else />
    <!-- 底部导航 -->
    <RpTabbar :selected="1" />
</template>

<style lang="scss" scoped>
page {
    height: 100%;
    overflow: hidden;
}

.viewport {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.search {
    margin-top: 20rpx;
    padding: 0 30rpx 20rpx;
    background-color: #fff;

    .input {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 64rpx;
        padding-left: 26rpx;
        color: #8b8b8b;
        font-size: 28rpx;
        border-radius: 32rpx;
        background-color: #f3f4f4;
    }
}

/* 分类 */
.categories {
    flex: 1;
    min-height: 400rpx;
    display: flex;
}

/* 一级分类 */
.primary {
    overflow: hidden;
    width: 180rpx;
    flex: none;
    background-color: #f6f6f6;

    .item {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 96rpx;
        font-size: 26rpx;
        color: #595c63;
        position: relative;

        &::after {
            content: '';
            position: absolute;
            left: 42rpx;
            bottom: 0;
            width: 96rpx;
            border-top: 1rpx solid #e3e4e7;
        }
    }

    .active {
        background-color: #fff;

        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 8rpx;
            height: 100%;
            background-color: #333434;
        }
    }
}

.primary .item:last-child::after,
.primary .active::after {
    display: none;
}

/* 二级分类 */
.secondary {
    background-color: #fff;
    height: calc( 100% - 140rpx);

    .carousel {
        height: 200rpx;
        margin: 0 30rpx 20rpx;
        border-radius: 4rpx;
        overflow: hidden;
    }

    .panel {
        margin: 0 30rpx 0rpx;

        .title {
            .name {
                border-left: 3px solid #333;
                padding-left: 5px;
            }
        }
    }

    .title {
        height: 60rpx;
        line-height: 60rpx;
        color: #333;
        font-size: 28rpx;
        border-bottom: 1rpx solid #f7f7f8;

        .more {
            float: right;
            padding-left: 20rpx;
            font-size: 24rpx;
            color: #999;
        }
    }

    .section {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding: 20rpx 0;

        .goods {
            width: 150rpx;
            margin: 0rpx 30rpx 20rpx 0;

            &:nth-child(3n) {
                margin-right: 0;
            }

            image {
                width: 150rpx;
                height: 150rpx;
            }

            .name {
                padding: 5rpx;
                font-size: 22rpx;
                color: #333;
            }

            .price {
                padding: 5rpx;
                font-size: 18rpx;
                color: #cf4444;
            }

            .number {
                font-size: 24rpx;
                margin-left: 2rpx;
            }
        }
    }
}
</style>