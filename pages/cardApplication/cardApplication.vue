<template>
	<view class="viewBox">
		<!-- 导航栏：标题多语言 -->
		<Navbar :title="$t('cardApply.title')" :showBack="true"></Navbar>

		<!-- 粘性Tabs：选项多语言 -->
		<up-sticky :offset-top="notchHeight" bgColor="#0f0f0f">
			<view style="margin: 0 32rpx;">
				<up-tabs :list="tabList" @click="click" lineColor='#ffffff'
					:activeStyle="{ color: '#ffffff',fontWeight: '500',fontSize: '30rpx' }"
					:inactiveStyle="{ color: '#999999', fontWeight: '400',fontSize: '30rpx' }"></up-tabs>
			</view>
		</up-sticky>

		<!-- 卡片轮播 -->
		<view class="swiper-Box">
			<CardSwiper :images="imgList"></CardSwiper>
		</view>

		<!-- 虚拟卡优势：文本多语言 -->
		<view class="advantages" v-if="active == 0">
			<view>
				<view>
					<SvgIcon name="advantages" width="40" height="40"></SvgIcon>
					<view>{{ $t('cardApply.advantage.onlinePayment') }}</view>
				</view>
				<view>
					<SvgIcon name="advantages" width="40" height="40"></SvgIcon>
					<view>{{ $t('cardApply.advantage.quickApplication') }}</view>
				</view>
			</view>
			<view style="margin-top: 32rpx;">
				<view>
					<SvgIcon name="advantages" width="40" height="40"></SvgIcon>
					<view>{{ $t('cardApply.advantage.quickRecharge') }}</view>
				</view>
				<view>
					<SvgIcon name="advantages" width="40" height="40"></SvgIcon>
					<view>{{ $t('cardApply.advantage.flexibleLimit') }}</view>
				</view>
			</view>
		</view>

		<!-- 实体卡优势：文本多语言 -->
		<view class="advantages" v-if="active == 1">
			<view>
				<view>
					<SvgIcon name="advantages" width="40" height="40"></SvgIcon>
					<view>{{ $t('cardApply.advantage.onlinePayment') }}</view>
				</view>
				<view>
					<SvgIcon name="advantages" width="40" height="40"></SvgIcon>
					<view>{{ $t('cardApply.advantage.quickApplication') }}</view>
				</view>
			</view>
			<view style="margin-top: 32rpx;">
				<view>
					<SvgIcon name="advantages" width="40" height="40"></SvgIcon>
					<view>{{ $t('cardApply.advantage.quickRecharge') }}</view>
				</view>
				<view>
					<SvgIcon name="advantages" width="40" height="40"></SvgIcon>
					<view>{{ $t('cardApply.advantage.flexibleLimit') }}</view>
				</view>
			</view>
			<view style="margin-top: 32rpx;">
				<view>
					<SvgIcon name="advantages" width="40" height="40"></SvgIcon>
					<view>{{ $t('cardApply.advantage.quickWithdrawal') }}</view>
				</view>
				<view>
					<SvgIcon name="advantages" width="40" height="40"></SvgIcon>
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

		<!-- 立即申请按钮：文本多语言 -->
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

	// Tabs列表：使用多语言变量定义选项（替代原list1，与多语言包对应）
	const tabList = reactive([{
			name: '虚拟卡'
		},
		{
			name: '实体卡'
		}
	]);

	// 轮播图数据（保持不变）
	const imgList = [
		'http://gips2.baidu.com/it/u=3944689179,983354166&fm=3028&app=3028&f=JPEG&fmt=auto?w=1024&h=1024',
		'http://gips3.baidu.com/it/u=3886271102,3123389489&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960',
		'http://gips3.baidu.com/it/u=617385017,3644165978&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960',
	];

	// Tabs激活下标（保持不变）
	const active = ref(0);

	// 刘海高度（保持不变）
	const notchHeight = ref(0);

	// Tabs切换方法（保持不变）
	function click(item) {
		active.value = item.index;
	}

	// 获取系统信息（保持不变）
	onReady(() => {
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

	// 页面跳转方法（保持不变）
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