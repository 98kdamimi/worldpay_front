<template>
	<view class="viewBox">
		<Navbar :title="$t('walletRecharge.title')" :showBack="true"></Navbar>
		<view class="title">{{ $t('walletRecharge.currency') }}</view>
		<view class="selectCurrency">
			<view>
				<SvgIcon name="USDT" width="64" height="64"></SvgIcon>
				<span>USDT</span>
			</view>
			<!-- <SvgIcon name="bottom" width="36" height="36"></SvgIcon> -->
		</view>
		<view class="qrCodeBox top">
			<view class="qrCode">
				<l-qrcode :value="usdtAddress" />
			</view>
		</view>
		<view class="box bottom" style="padding: 34rpx 24rpx">
			<view>{{ $t('walletRecharge.address') }}TRC2152365226322****</view>
			<SvgIcon name="copy1" width="36" height="36"></SvgIcon>
		</view>
		<view class="hint">
			<span>{{ $t('walletRecharge.tip1') }}</span>
			<span>{{ $t('walletRecharge.tip2') }}</span>
		</view>
		<!-- <view>
			<up-picker :show="currencyShow" :columns="columns" @cancel="currencyShow = false"
				@change="currencyShow = false"></up-picker>
		</view> -->
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { topinUsdtAddress } from '@/request/api.js';

import { useUserStore } from '@/stores/user.js';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();

const { userInfo } = storeToRefs(userStore);
const currencyShow = ref(false);
const columns = reactive([['中国', '美国']]);
const usdtAddress = ref('');
topinUsdtAddress({ uid: userInfo.value.uid }).then((res) => {
	usdtAddress.value = res.data;
});
</script>

<style lang="scss" scoped>
@import './walletRecharge.scss';
</style>
