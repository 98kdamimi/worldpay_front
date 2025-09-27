<template>
	<view class="viewBox">
		<Navbar title="转账" :showBack="true"></Navbar>
		<view class="title">转账金额</view>
		<view class="inputBox">
			<view>
				<input type="text" placeholder="请输入转账金额" placeholder-class="placeholderClass" />
			</view>
			<view class="inputBox-right">全部</view>
		</view>
		<view class="title-txt">钱包余额：0.00USD</view>
		<view class="title">充值卡号</view>
		<view class="box">
			<SvgIcon name="icon1" width="88" height="88"></SvgIcon>
			<view style="margin-left: 24rpx;">
				<view>Worldpay 虚拟卡</view>
				<view class="box-txt">{{ formattedCard('9999999999999999') }}</view>
			</view>
			<view class="switch-button" @click="cardShow = true">切换</view>
		</view>
		<view class="button" @click="popupShow = true">下一步</view>
		<view class="button-placeholder"></view>
		<!-- 选择卡号  -->
		<up-popup :show="cardShow" mode="bottom">
			<view class="cardpopup">
				<view class="cardpopup-title">
					<view style="width: 56rpx;height: 56rpx;"></view>
					<view>选择卡号</view>
					<SvgIcon name="off" width="56" height="56" @click="cardShow = false"></SvgIcon>
				</view>
				<view v-for="(itme, index) in 5" :key="index">
					<view :class="cardActive == index ? 'box cardActive' : 'box'" @click="cardActive = index">
						<SvgIcon name="icon1" width="88" height="88"></SvgIcon>
						<view style="margin-left: 24rpx;">
							<view>Worldpay 虚拟卡</view>
							<view class="box-txt">{{ formattedCard('9999999999999999') }}</view>
						</view>
					</view>
				</view>
				<view class="button">确认</view>
				<view class="button-placeholder"></view>
			</view>
		</up-popup>
		<!-- 选择卡号  -->
		<up-popup :show="popupShow" mode="bottom">
			<view class="cardpopup">
				<view class="cardpopup-title">
					<view style="width: 56rpx;height: 56rpx;"></view>
					<view>确认信息</view>
					<SvgIcon name="off" width="56" height="56" @click="popupShow = false"></SvgIcon>
				</view>
				<view class="infoBox top">
					<view>转账金额</view>
					<view>888</view>
				</view>
				<view class="infoBox bottom">
					<view>接收账户：</view>
					<view>88888888888888888888</view>
				</view>
				<view class="button" @click="passwordShow = true">确认</view>
				<view class="button-placeholder"></view>
			</view>
		</up-popup>
		<!-- 密码验证 -->
		<up-popup :show="passwordShow" mode="bottom" bgColor='#141414'>
			<view class="passwordPopup">
				<view class="passwordPopup-title">密码验证</view>
				<view class="passwordPopup-off" @click="passwordShow = false">
					<SvgIcon name="off" width="56" height="56"></SvgIcon>
				</view>
				<view class="passwordPopup-txt">输入密码</view>
				<view class="passwordPopup-input">
					<up-code-input :maxlength="6" :dot="true" borderColor='#ffffff' color='#ffffff'
						@finish='finish()'></up-code-input>
				</view>
			</view>
		</up-popup>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		formattedCard
	} from '@/utils/common.js'

	const cardShow = ref(false)
	const popupShow = ref(false)
	const passwordShow = ref(false)
	const cardActive = ref(0)

	const finish = (e) => {
		popupShow.value = false
		passwordShow.value = false
	};
</script>

<style lang="scss" scoped>
	@import "./transfer.scss"
</style>