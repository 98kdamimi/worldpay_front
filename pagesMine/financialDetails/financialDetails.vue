<template>
	<view class="viewBox">
		<Navbar title="理财详情" :showBack="true"></Navbar>
		<view class="list">
			<view class="list-item">
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
				<view class="box box-bottom displayRow">
					<view>订单金额</view>
					<view class="box-bottom-txt">88.88USD</view>
				</view>
				<view class="box box-bottom displayRow">
					<view>用户名称</view>
					<view class="box-bottom-txt">233655KSU</view>
				</view>
				<view class="box box-bottom displayRow">
					<view>订单编号</view>
					<view class="box-bottom-txt">888-541225-6522</view>
				</view>
				<view class="box box-bottom displayRow">
					<view>预计收益</view>
					<view class="box-bottom-txt">88.88USD</view>
				</view>
				<view class="box box-bottom displayRow bottom">
					<view>预计收益</view>
					<view class="box-bottom-txt">88.88USD</view>
				</view>
			</view>
		</view>
		<view class="product-info">
			<view>
				<view>产品状态</view>
				<view class="product-info-txt">已上架</view>
			</view>
			<view>
				<view>理财时间</view>
				<view class="product-info-txt">7日</view>
			</view>
			<view>
				<view>起购时间</view>
				<view class="product-info-txt">2025/12/24 14:12:58</view>
			</view>
			<view>
				<view>到期时间</view>
				<view class="product-info-txt">2025/12/24 14:12:58</view>
			</view>
		</view>
		<view class="introduce-title">产品介绍</view>
		<view class="introduce">
			<textarea class="intro-textarea" placeholder="请输入介绍内容（支持多行输入）"
				placeholder-style="color: #9191aa; font-size: 28rpx;" auto-height maxlength="500"
				show-confirm-bar="false"></textarea>
		</view>
		<view class="button">
			<view>赎回资金</view>
			<view class="white">回购</view>
		</view>
		<view class="button-placeholder"></view>
	</view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
	@import './financialDetails.scss'
</style>