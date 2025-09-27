<template>
	<view class="viewBox">
		<Navbar :title="$t('home.applicationDetailsTitle')" :showBack="true"></Navbar>
		<view class="line"></view>
		<view class="box top">
			<view>{{ $t('home.applicationStatus') }}</view>
			<view class="txt">{{ $t('home.completed') }}</view>
		</view>
		<view class="box bottom">
			<view>{{ $t('home.cardType') }}</view>
			<view class="txt">{{ $t('home.physicalCard') }}</view>
		</view>
		<!-- 实体卡 -->
		<view v-if="typy == $t('home.physicalCard')">
			<view class="line"></view>
			<view class="box top">
				<view>{{ $t('home.courierService') }}</view>
				<view class="txt">-</view>
			</view>
			<view class="box bottom">
				<view>{{ $t('home.trackingNumber') }}</view>
				<view class="txt">-</view>
			</view>
			<view class="line"></view>
			<view class="box top">
				<view>{{ $t('home.recipientName') }}</view>
				<view class="txt">WANG HAI DONG</view>
			</view>
			<view class="box ">
				<view>{{ $t('home.recipientPhone') }}</view>
				<view class="txt">86-1254566655</view>
			</view>
			<view class="box">
				<view>{{ $t('home.recipientAddress') }}</view>
				<view class="txt">地球省地球市地球村地球街道八排888号</view>
			</view>
			<view class="box bottom">
				<view>{{ $t('home.boundPromoCode') }}</view>
				<view class="txt">sdfasda45fww</view>
			</view>
			<view class="button">{{ $t('home.reapply') }}</view>
		</view>
		<!-- 虚拟卡 -->
		<view v-else>
			<view class="line"></view>
			<view class="box top">
				<view>{{ $t('home.phoneNumber') }}</view>
				<view class="txt">+862 55555744</view>
			</view>
			<view class="box">
				<view>{{ $t('home.email') }}</view>
				<view class="txt">sili75833@gamil.com</view>
			</view>
			<view class="box bottom">
				<view>{{ $t('home.idNumber') }}</view>
				<view class="txt">3636563333336335</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	// 变量值也使用多语言，确保条件判断与显示文本一致
	const typy = ref($t('home.physicalCard'))
</script>

<style lang="scss" scoped>
	@import './applicationDetails.scss';
</style>