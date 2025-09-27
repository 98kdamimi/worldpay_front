<template>
	<view class="viewBox" style="padding-bottom: 32rpx;">
		<Navbar title="金融理财" :showBack="true">
			<template #right>
				<view class="header-right">理财记录</view>
			</template>
		</Navbar>
		<view class="balance">
			<view class="balance-title">总持仓</view>
			<view class="balance-txt">$ 88.00</view>
			<view class="balance-right">
				<view>持仓明细</view>
				<!-- #ifdef APP -->
				<SvgIcon name="right1" width="24" height="24" style="margin: 5rpx 0 0 8rpx;"></SvgIcon>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<SvgIcon name="right1" width="24" height="24" style="margin: -5rpx 0 0 8rpx;"></SvgIcon>
				<!-- #endif -->
			</view>
		</view>
		<view class="worldpay">
			<view class="worldpay-txt">为你量身打造理财项目～</view>
		</view>
		<up-sticky :offset-top="notchHeight" bgColor="#0f0f0f">
			<view style="margin: 0 32rpx;">
				<up-tabs :list="list1" @click="click" lineColor='#ffffff'
					:activeStyle="{ color: '#ffffff',fontWeight: '500',fontSize: '30rpx' }"
					:inactiveStyle="{ color: '#999999', fontWeight: '400',fontSize: '30rpx' }"></up-tabs>
			</view>
		</up-sticky>
		<view class="list">
			<view class="list-item" v-for="(item, index) in 3" :key="index">
				<view class="box top displayRow">
					<view class="box-top displayRow">
						<SvgIcon name="icon1" width="88" height="88"></SvgIcon>
						<view class="box-top-left">
							<view>定期USDT理财</view>
							<view class="box-top-left-button">
								<view class="red">定期</view>
								<view class="green" style="margin-left: 12rpx;">USDT</view>
							</view>
						</view>
					</view>
					<view class="box-top-right">
						<view>88%</view>
						<view class="box-top-right-txt">年利率</view>
					</view>
				</view>
				<view class="box bottom">
					<view class="list-item-txt displayRow">
						<view>产品状态</view>
						<view class="list-item-txt-right">已上架</view>
					</view>
					<view class="list-item-txt displayRow">
						<view>起购金额</view>
						<view class="list-item-txt-right">10 USDT</view>
					</view>
					<view class="list-item-txt displayRow">
						<view>理财时间</view>
						<view class="list-item-txt-right">7日</view>
					</view>
					<view class="item-button" @click="passwordShow = true">申购</view>
				</view>
			</view>
		</view>
		<up-popup :show="passwordShow" mode="bottom" bgColor='#141414'>
			<view class="passwordPopup">
				<view class="passwordPopup-title">安全验证</view>
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
		ref,
		reactive
	} from 'vue';
	import {
		onReady
	} from '@dcloudio/uni-app';
	// tabs切换
	const list1 = reactive([{
			name: '全部'
		},
		{
			name: '定期'
		},
		{
			name: '活期'
		},
		{
			name: '余额宝'
		}
	]);
	const applyShow = ref(false)
	const passwordShow = ref(false)
	// tabs下标
	const active = ref(0)
	// 刘海高度
	const notchHeight = ref(0);
	// 定义方法  
	function click(item) {
		active.value = item.index
	}
	const finish = (e) => {
		passwordShow.value = false
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
	@import './financialManagement.scss'
</style>