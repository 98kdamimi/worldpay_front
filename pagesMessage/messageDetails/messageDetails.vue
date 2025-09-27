<template>
	<view class="viewBox">
		<Navbar title="详情" :showBack="true"></Navbar>
		<view class="time">2025-07-04</view>
		<view class="up-content">
			<up-parse :content="content"></up-parse>
		</view>
		<view class="time">10:24</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	// 创建响应式数据  
	const content = ref(`  
	<p>露从今夜白，月是故乡明</p>  
	<img src="https://cdn.uviewui.com/uview/swiper/2.jpg" alt="Image Description" />  
`);
</script>

<style lang="scss" scoped>
	@import "./messageDetails.scss"
</style>

<style lang="scss" scoped>
	.up-content {
		padding: 32rpx;
		color: #ffffff;
	}
</style>