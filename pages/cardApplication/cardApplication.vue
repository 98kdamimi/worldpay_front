<template>
	<view class="viewBox">
		<Navbar title="卡片申请" :showBack="true"></Navbar>
		<up-sticky>
			<view style="margin: 0 32rpx;">
				<up-tabs :list="list1" @click="click" lineColor='#ffffff'
					:activeStyle="{ color: '#ffffff',fontWeight: '500',fontSize: '30rpx' }"
					:inactiveStyle="{ color: '#999999', fontWeight: '400',fontSize: '30rpx' }"></up-tabs>
			</view>
		</up-sticky>
		<view class="swiper-Box">
			<CardSwiper :images="imgList"></CardSwiper>
		</view>
		<view class="advantages" v-if="active == 0">
			<view>
				<view>
					<SvgIcon name="advantages" width="40" height="40"></SvgIcon>
					<view>支持线上支付</view>
				</view>
				<view>
					<SvgIcon name="advantages" width="40" height="40"></SvgIcon>
					<view>快速卡片申请</view>
				</view>
			</view>
			<view style="margin-top: 32rpx;">
				<view>
					<SvgIcon name="advantages" width="40" height="40"></SvgIcon>
					<view>快速充值</view>
				</view>
				<view>
					<SvgIcon name="advantages" width="40" height="40"></SvgIcon>
					<view>额度灵活</view>
				</view>
			</view>
		</view>
		<view class="advantages" v-if="active == 1">
			<view>
				<view>
					<SvgIcon name="advantages" width="40" height="40"></SvgIcon>
					<view>支持线上支付</view>
				</view>
				<view>
					<SvgIcon name="advantages" width="40" height="40"></SvgIcon>
					<view>快速卡片申请</view>
				</view>
			</view>
			<view style="margin-top: 32rpx;">
				<view>
					<SvgIcon name="advantages" width="40" height="40"></SvgIcon>
					<view>快速充值</view>
				</view>
				<view>
					<SvgIcon name="advantages" width="40" height="40"></SvgIcon>
					<view>额度灵活</view>
				</view>
			</view>
			<view style="margin-top: 32rpx;">
				<view>
					<SvgIcon name="advantages" width="40" height="40"></SvgIcon>
					<view>快速取现</view>
				</view>
				<view>
					<SvgIcon name="advantages" width="40" height="40"></SvgIcon>
					<view>卡片邮寄到家</view>
				</view>
			</view>
		</view>
		<view class="rule-title">卡规则</view>
		<view class="rule-box top">
			<view>开卡费</view>
			<view class="rule-box-txt">3.00</view>
		</view>
		<view class="rule-box">
			<view>预存费</view>
			<view class="rule-box-txt">20.00</view>
		</view>
		<view class="rule-box bottom">
			<view>月服务费</view>
			<view class="rule-box-txt">1.00</view>
		</view>
		<view class="hint-txt">
			<span>Worldpay消费卡：具备广泛的消费场景，一卡在手
				全球无忧！</span>
			<span class="span-txt">1.适用在 淘宝 京东 拼多多 亚马逊 等各大电商平台、旅游平
				台、日常生活类APP绑定使用。</span>
			<span class="span-txt">1.适用在 淘宝 京东 拼多多 亚马逊 等各大电商平台、旅游平
				台、日常生活类APP绑定使用。</span>
		</view>
		<view class="button" @click="goToPage('/pages/cardholder/cardholder')">立即申请</view>
		<view class="button-placeholder"></view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';
	// tabs切换
	const list1 = reactive([{
			name: '虚拟卡'
		},
		{
			name: '实体卡'
		},
	]);
	const imgList = [
		'@/static/image/apply1.png',
		'@/static/image/apply2.png',
		'@/static/image/apply1.png',
		'@/static/image/apply2.png',
	]
	// tabs下标
	const active = ref(0)
	// 定义方法  
	function click(item) {
		active.value = item.index
	}
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

	/* 自定义卡片样式（若使用自定义插槽） */
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