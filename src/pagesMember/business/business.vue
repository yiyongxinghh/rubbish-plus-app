<template>
  <scroll-view scroll-y>
    <!-- 头部 -->
    <RpTitle :title="'商家'" />
    <!-- 商家列表 -->
    <view class="business-list" v-for="user in userList"> 
        <view class="title">
            <view class="user">
                <image
                    src=""
                    mode="aspectFill"
                />
                <text>{{ user.userName }}</text>
            </view>
            <text>更多</text>
        </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { onLoad } from '@dcloudio/uni-app'
import { findAllUserAPI } from '@/services/user'

const userList = ref<any[]>([])

const findAllUser = async () => {
    const res = await findAllUserAPI()
    userList.value = res.data.users
    console.log(userList.value);
    
}

onLoad(()=>{
    findAllUser()
})
</script>

<style>
page {
  height: 100%;
  background-color: #f5f5f5;
}
</style>
<style scoped lang="scss">
.business-list {
    box-sizing: border-box;
    margin: 10rpx;
    padding: 10rpx;
    border-radius: 20rpx;
    background-color: #fff;
    box-shadow: 0 4px 15px rgba(165, 168, 171, 0.83) !important;
    height: 400rpx;
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 30rpx;
        font-weight: 700;
        color: #333;
        .user{
            display: flex;
            align-items: center;
            image {
                width: 100rpx;
                height: 100rpx;
                border-radius: 50%;
                margin-right: 20rpx;
            }
        }
    }
}
</style>
