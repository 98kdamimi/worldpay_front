<template>
	<view class="viewBox">
		<Navbar :title="$t('remittance.title')" :showBack="true"></Navbar>
		<view class="searchBox">
			<SvgIcon name="search" width="56" height="56"></SvgIcon>
			<view>
				<input type="text" :placeholder="$t('remittance.searchPlaceholder')"
					placeholder-style="color: #999999;" />
			</view>
		</view>
		<up-sticky :offset-top="notchHeight" bgColor="#0f0f0f">
			<view style="margin: 0 32rpx;">
				<up-tabs :list="list1" @click="click" lineColor='#ffffff'
					:activeStyle="{ color: '#ffffff',fontWeight: '500',fontSize: '30rpx' }"
					:inactiveStyle="{ color: '#999999', fontWeight: '400',fontSize: '30rpx' }"></up-tabs>
			</view>
			<view class="transactionRecords">
				<view class="transactionRecords-title">
					<view>{{ $t('remittance.walletName') }}</view>
					<view class="transactionRecords-title-right">{{ $t('remittance.singleLimit') }}</view>
				</view>
			</view>
		</up-sticky>
		<view class="box">
			<view class="box-item" v-for="(item,index) in 5" :key="index" @click="applyShow = true">
				<view class="box-item-left">
					<view>
						<image src="@/static/image/zfb.png" mode=""></image>
					</view>
					<view>{{ $t('remittance.alipayWallet') }}</view>
				</view>
				<view class="box-item-right">
					<view>4K USD</view>
					<view>（8 USD +2%/)</view>
				</view>
			</view>
		</view>
		<up-modal :show="applyShow" :showConfirmButton='false' bgColor='#141414'>
			<view class="applyModal">
				<view class="applyModal-title">
					<view>{{ $t('remittance.userNotice') }}</view>
				</view>
				<view class="applyModal-txt">
					<span>{{ $t('remittance.notice1') }}</span>
					<span>{{ $t('remittance.notice2') }}</span>
					<span>{{ $t('remittance.notice3') }}</span>
					<span>{{ $t('remittance.notice4') }}</span>
				</view>
				<view class="applyModal-button">
					<view class="cancel" @click="applyShow = false">{{ $t('remittance.cancel') }}</view>
					<view class="apply" @click="goToPage('/pages/account/account')">{{ $t('remittance.confirm') }}
					</view>
				</view>
			</view>
		</up-modal>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue';
	import {
		onReady
	} from '@dcloudio/uni-app';
	import {
		useI18n
	} from 'vue-i18n'

	const {
		t
	} = useI18n()
	// tabs切换
	const list1 = reactive([{
			name: t('list.wallet') // 钱包
		},
		{
			name: t('list.country') // 国家
		},
		{
			name: t('list.household') // 家用
		}
	]);
	const applyShow = ref(false)
	// tabs下标
	const active = ref(0)
	// 刘海高度
	const notchHeight = ref(0);
	// 定义方法  
	function click(item) {
		active.value = item.index
	}
	const goToPage = (address) => {
		uni.navigateTo({
			url: address
		});
	};
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
				notchHeight.value = 20;
			}
		});
	});
</script>

<style lang="scss" scoped>
	@import './moneyTransfer.scss'
</style>