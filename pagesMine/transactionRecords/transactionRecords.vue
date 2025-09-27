<template>
  <view class="viewBox">
    <Navbar title="交易记录" :showBack="true"></Navbar>
    <!-- 交易记录 -->
    <view class="transactionRecords">
      <!-- 吸顶标题 -->
      <view class="stickyContent" :style="{ top: `${notchHeight + 44}px` }">
        <up-tabs
          :list="list1"
          lineColor="#ffffff"
          :activeStyle="{
            color: '#ffffff',
            fontWeight: '500',
            fontSize: '30rpx',
          }"
          :inactiveStyle="{
            color: '#999999',
            fontWeight: '400',
            fontSize: '30rpx',
          }"
        ></up-tabs>
      </view>
      <view class="transactionRecords-list">
        <TransactionRecords :list="recordsList"></TransactionRecords>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";
import { onReady } from "@dcloudio/uni-app";

// 交易记录
const recordsList = ref([]);
// 刘海高度
const notchHeight = ref(0);
// tabs切换
const list1 = reactive([
  {
    name: "钱包记录",
  },
  {
    name: "卡片记录",
  },
]);

onReady(() => {
  // 获取刘海高度
  uni.getSystemInfo({
    success: (res) => {
      notchHeight.value = res.safeArea?.top || 0;
      if (!notchHeight.value) {
        notchHeight.value = res.statusBarHeight || 0;
      }
    },
    fail: () => {
      // #ifdef APP-ANDROID
      notchHeight.value = 52;
      // #endif
      notchHeight.value = 0;
    },
  });
});
</script>

<style lang="scss" scoped>
@import "./transactionRecords.scss";
</style>
