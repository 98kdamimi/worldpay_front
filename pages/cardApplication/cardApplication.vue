<template>
	<view class="viewBox">
		<!-- 导航栏 -->
		<!-- <view class="stickyContent" :style="{ top: notchHeight + 'px' }"> -->
		<Navbar :title="$t('cardApply.title')" :showBack="true"></Navbar>
		<view class="stickyContent" style="padding: 0 32rpx;" :style="{ top: notchHeight + 44 + 'px' }">
			<up-tabs :list="tabList" @click="setActive" lineColor='#ffffff'
				:activeStyle="{ color: '#ffffff',fontWeight: '500',fontSize: '30rpx' }"
				:inactiveStyle="{ color: '#999999', fontWeight: '400',fontSize: '30rpx' }"></up-tabs>
		</view>
		<!-- </view> -->

		<!-- 卡片轮播 -->
		<view class="swiper-Box">
			<CardSwiper :images="imgList"></CardSwiper>
		</view>

		<!-- 虚拟卡 -->
		<view class="advantages" v-if="active == 0">
			<view>
				<view>
					<view class="svg">
						<SvgIcon name="advantages" width="40" height="40"></SvgIcon>
					</view>
					<view>{{ $t('cardApply.advantage.onlinePayment') }}</view>
				</view>
				<view>
					<view class="svg">
						<SvgIcon name="advantages" width="40" height="40"></SvgIcon>
					</view>
					<view>{{ $t('cardApply.advantage.quickApplication') }}</view>
				</view>
			</view>
			<view style="margin-top: 32rpx;">
				<view>
					<view class="svg">
						<SvgIcon name="advantages" width="40" height="40"></SvgIcon>
					</view>
					<view>{{ $t('cardApply.advantage.quickRecharge') }}</view>
				</view>
				<view>
					<view class="svg">
						<SvgIcon name="advantages" width="40" height="40"></SvgIcon>
					</view>
					<view>{{ $t('cardApply.advantage.flexibleLimit') }}</view>
				</view>
			</view>
		</view>

		<!-- 实体卡 -->
		<view class="advantages" v-if="active == 1">
			<view>
				<view>
					<view class="svg">
						<SvgIcon name="advantages" width="40" height="40"></SvgIcon>
					</view>
					<view>{{ $t('cardApply.advantage.onlinePayment') }}</view>
				</view>
				<view>
					<view class="svg">
						<SvgIcon name="advantages" width="40" height="40"></SvgIcon>
					</view>
					<view>{{ $t('cardApply.advantage.quickApplication') }}</view>
				</view>
			</view>
			<view style="margin-top: 32rpx;">
				<view>
					<view class="svg">
						<SvgIcon name="advantages" width="40" height="40"></SvgIcon>
					</view>
					<view>{{ $t('cardApply.advantage.quickRecharge') }}</view>
				</view>
				<view>
					<view class="svg">
						<SvgIcon name="advantages" width="40" height="40"></SvgIcon>
					</view>
					<view>{{ $t('cardApply.advantage.flexibleLimit') }}</view>
				</view>
			</view>
			<view style="margin-top: 32rpx;">
				<view>
					<view class="svg">
						<SvgIcon name="advantages" width="40" height="40"></SvgIcon>
					</view>
					<view>{{ $t('cardApply.advantage.quickWithdrawal') }}</view>
				</view>
				<view>
					<view class="svg">
						<SvgIcon name="advantages" width="40" height="40"></SvgIcon>
					</view>
					<view>{{ $t('cardApply.advantage.cardDelivery') }}</view>
				</view>
			</view>
		</view>

		<!-- 卡规则区域：标题+内容多语言 -->
		<view class="rule-title">{{ $t('home.cardRules') }}</view>
		<view class="rule-box top">
			<view>{{ $t('home.cardOpeningFee') }}</view>
			<view class="rule-box-txt">3.00</view>
		</view>
		<view class="rule-box">
			<view>{{ $t('home.prepaymentFee') }}</view>
			<view class="rule-box-txt">20.00</view>
		</view>
		<view class="rule-box bottom">
			<view>{{ $t('home.monthlyServiceFee') }}</view>
			<view class="rule-box-txt">1.00</view>
		</view>

		<!-- 提示文本：多语言拆分（避免重复键） -->
		<view class="hint-txt">
			<span>{{ $t('cardApply.hint.txt1') }}</span>
			<span class="span-txt">{{ $t('cardApply.hint.txt2') }}</span>
			<span class="span-txt">{{ $t('cardApply.hint.txt2') }}</span>
		</view>

		<!-- 立即申请按钮 -->
		<view class="button" @click="goToPage('/pages/cardholder/cardholder')">
			{{ $t('cardApply.applyNow') }}
		</view>
		<view class="button-placeholder"></view>
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

	// Tabs列表：使用多语言变量定义选项（替代原list1，与多语言包对应）
	const tabList = reactive([{
			name: t('cardType.virtualCard') // 虚拟卡
		},
		{
			name: t('cardType.physicalCard') // 实体卡
		}
	]);

	// Tabs激活下标
	const active = ref(0);

	// 刘海高度
	const notchHeight = ref(0);

	// 轮播图数据
	const imgList = ref([
		'/static/image/card/worldpay1.png',
		'/static/image/card/worldpay2.png',
		'/static/image/card/worldpay3.png',
	]);

	// Tabs切换方法
	function setActive(item) {
		console.log(1111)
		active.value = item.index;
		if (item.index == 0) {
			imgList.value = [
				'/static/image/card/worldpay1.png',
				'/static/image/card/worldpay2.png',
				'/static/image/card/worldpay3.png',
			];
		}
		if (item.index == 1) {
			imgList.value = [
				'/static/image/card/worldpay4.png',
				'/static/image/card/worldpay5.png',
			];
		}
	}

	// 获取系统信息
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
				notchHeight.value = 40;
				// #endif
				notchHeight.value = 0;
			}
		});
	});

	// 页面跳转方法
	const goToPage = (address) => {
		uni.navigateTo({
			url: address
		});
	};
</script>

<style lang="scss" scoped>
	@import "./cardApplication.scss";

	.page-container {
		padding-top: calc(var(--status-bar-height, 0) + 44px); // 适配状态栏+导航栏高度
		box-sizing: border-box;
	}

	/* 自定义卡片样式（若使用自定义插槽，保持注释） */
	/* .custom-card {
	  width: 100%;
	  height: 100%;
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	}
	.custom-img {
	  width: 80%;
	  height: 60%;
	  border-radius: 24rpx;
	}
	.custom-desc {
	  margin-top: 20rpx;
	  font-size: 26rpx;
	  color: #ffffff;
	} */
</style>