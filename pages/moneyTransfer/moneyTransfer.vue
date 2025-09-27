<template>
	<view class="viewBox">
		<Navbar title="国际汇款" :showBack="true"></Navbar>
		<view class="searchBox">
			<SvgIcon name="search" width="56" height="56"></SvgIcon>
			<view>
				<input type="text" placeholder="请输入关键词查找钱包" placeholder-style="color: #999999;" />
			</view>
		</view>
		<up-sticky>
			<view style="margin: 0 32rpx;">
				<up-tabs :list="list1" @click="click" lineColor='#ffffff'
					:activeStyle="{ color: '#ffffff',fontWeight: '500',fontSize: '30rpx' }"
					:inactiveStyle="{ color: '#999999', fontWeight: '400',fontSize: '30rpx' }"></up-tabs>
			</view>
			<view class="transactionRecords">
				<view class="transactionRecords-title">
					<view>钱包名称</view>
					<view class="transactionRecords-title-right">单笔限额</view>
				</view>
			</view>
		</up-sticky>
		<view class="box">
			<view class="box-item" v-for="(item,index) in 5" :key="index" @click="applyShow = true">
				<view class="box-item-left">
					<view>
						<image src="@/static/image/zfb.png" mode=""></image>
					</view>
					<view>支付宝钱包</view>
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
					<view>用户须知</view>
				</view>
				<view class="applyModal-txt">
					<span>1.付款成功当日到账</span>
					<span>2.部分情况需要手动收款</span>
					<span>3.预计到账时间为24小时</span>
					<span>4.支付失败，将于3日内退还本金和手续费</span>
				</view>
				<view class="applyModal-button">
					<view class="cancel" @click="applyShow = false">取消</view>
					<view class="apply" @click="goToPage('/pages/account/account')">确认</view>
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
	// tabs切换
	const list1 = reactive([{
			name: '钱包'
		},
		{
			name: '国家'
		},
		{
			name: '家用'
		}
	]);
	const applyShow = ref(false)
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
	@import './moneyTransfer.scss'
</style>