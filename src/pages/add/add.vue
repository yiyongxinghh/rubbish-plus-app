<template>
    <!-- 头部 -->
    <RpTitle :title="'上传'" />
    <scroll-view scroll-y class="add-container">
        <input type="text" class="add-input name">
        <input type="text" class="add-input type">
        <uni-number-box class="number" @change="" />
        <uni-number-box class="number" @change="" />
        <input type="text" class="add-input">
        <input type="text" class="add-input">
        <input type="text" class="add-input">
        <input type="text" class="add-input">
    </scroll-view>
</template>

<script lang="ts">

</script>

<style scoped lang="scss">
page {
    height: 100%;
    background: linear-gradient(to right top,
            rgb(55, 58, 75) 0%,
            rgb(49, 51, 67) 20%,
            rgba(56, 59, 77, 0.9) 60%,
            rgba(53, 55, 73, 0.4) 100%);
    display: flex;
    flex-direction: column;
}

.add-container {
    margin-top: 80rpx;
    height: calc(100% - 80rpx);

    .add-input {
        position: relative;
        height: 100rpx;
        border-radius: 20rpx;
        margin: 20rpx;
        line-height: 100rpx;
        border: 1px solid #ccc;
        background-color: rgba(0, 0, 0, 0);
        color: #fff;
        font-size: 28rpx;
        padding-left: 100rpx;

        &::before {
            display: inline-block;
            width: 100rpx;
            height: 100rpx;
            color: rgb(113, 114, 119);
            position: absolute;
            top: 50%;
            left: 10rpx;
            transform: translate(0, -50%);
            white-space: nowrap;
        }

    }

    .number {
        margin: 20rpx;
    }

    .name {
        &::before {
            content: '废品名';
        }
    }

    .type {
        &::before {
            content: '类型';
        }
    }

    .category {
        &::before {
            content: '分类';
        }
    }
}
</style>