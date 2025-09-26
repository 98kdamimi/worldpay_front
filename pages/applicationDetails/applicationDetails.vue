<template>
	<view class="viewBox">
		<Navbar title="申请详情" :showBack="true"></Navbar>
		<view class="line"></view>
		<view class="box top">
			<view>申请状态</view>
			<view class="txt">已完成</view>
		</view>
		<view class="box bottom">
			<view>卡片类型</view>
			<view class="txt">实体卡</view>
		</view>
		<!-- 实体卡 -->
		<view v-if="typy == '实体卡'">
			<view class="line"></view>
			<view class="box top">
				<view>快递服务商</view>
				<view class="txt">-</view>
			</view>
			<view class="box bottom">
				<view>快递单号</view>
				<view class="txt">-</view>
			</view>
			<view class="line"></view>
			<view class="box top">
				<view>收货姓名</view>
				<view class="txt">WANG HAI DONG</view>
			</view>
			<view class="box ">
				<view>收货电话</view>
				<view class="txt">86-1254566655</view>
			</view>
			<view class="box">
				<view>收货地址</view>
				<view class="txt">地球省地球市地球村地球
					街道八排888号</view>
			</view>
			<view class="box bottom">
				<view>已绑定推广码/优惠码</view>
				<view class="txt">sdfasda45fww</view>
			</view>
			<view class="button">重新申请</view>
		</view>
		<!-- 虚拟卡 -->
		<view v-else>
			<view class="line"></view>
			<view class="box top">
				<view>手机号</view>
				<view class="txt">+862 55555744</view>
			</view>
			<view class="box">
				<view>邮箱</view>
				<view class="txt">sili75833@gamil.com</view>
			</view>
			<view class="box bottom">
				<view>证件号码</view>
				<view class="txt">3636563333336335</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	const typy = ref('实体卡')
</script>

<style lang="scss" scoped>
	@import './applicationDetails.scss';
</style>