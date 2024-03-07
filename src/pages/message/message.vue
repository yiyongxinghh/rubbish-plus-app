<template>
    <view class="message-container">
        <text class="message-tab">消息</text>
        <scroll-view :scroll-x="true" class="message-title">
            <view class="title-item" v-for="item in messageTitle">
                <text>{{ item.title }}</text>
            </view>
        </scroll-view>
        <scroll-view scroll-y class="messgae-content">
            <uni-list>
                <uni-list-item title="列表左侧带略缩图" note="列表描述信息"
                    thumb="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" thumb-size="lg"
                    rightText="右侧文字" v-for="item in 10" clickable   @click="toChat(item)"></uni-list-item>
            </uni-list>
        </scroll-view>
    </view>
    <!-- 底部导航 -->
    <RpTabbar :selected="2" />
</template>

<script setup lang='ts'>

const messageTitle = [
    { title: '全部', icon: '' },
    { title: '配送者', icon: '' },
    { title: '管理员', icon: '' },
    { title: '客服', icon: '' }
]

const toChat = (id: number) => {
    uni.navigateTo({
        url: `/pagesMember/chat/chat?id=${id}`
    })
}
</script>

<style lang="scss" scoped>
page {
    height: 100%;
    background-color: #fff;
}


.message-container {
    display: flex;
    flex-direction: column;
    margin: 20rpx 10rpx;

    .message-tab {
        margin-left: 10rpx;
        font-size: 30rpx;
        font-weight: bold;
        margin-bottom: 20rpx;
    }

    .message-title {
        width: 100%;
        white-space: nowrap;

        .title-item {
            display: inline-block;
            border-radius: 20rpx;
            height: 150rpx;
            width: 200rpx;
            background-color: rgb(231, 242, 242);
            margin: 10rpx;
        }
    }

    .messgae-content {
        margin: 10rpx 0 100px 0;

    }

}
</style>