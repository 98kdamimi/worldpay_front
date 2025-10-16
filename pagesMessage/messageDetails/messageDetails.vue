<template>
	<view class="viewBox">
		<Navbar :title="pageTitle" :showBack="true"></Navbar>
		<view class="time">{{ messageData.setTime }}</view>
		<view class="up-content">
			<!-- <up-parse :content="content"></up-parse> -->
			{{ messageData.content }}
		</view>
		<!-- <view class="time">10:24</view> -->
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		noticeFindById
	} from '@/request/api.js';
	// 存储从路由获取的title
	const pageTitle = ref('');
	// 存储从路由获取的messageId
	const messageId = ref('');
	// 创建响应式数据  
	const content = ref(`  
	<p>露从今夜白，月是故乡明</p>  
	<img src="https://cdn.uviewui.com/uview/swiper/2.jpg" alt="Image Description" />  `);
	const messageData = ref({})

	onLoad((options) => {
		pageTitle.value = options.title;
		messageId.value = options.messageId;

		if (messageId.value) {
			getNoticeFindById();
		}
	});
	const getNoticeFindById = async () => {
		try {
			const {
				data
			} = await noticeFindById({
				id: messageId.value
			});
			console.log(data)
			messageData.value = data
		} catch (error) {
			console.error('获取通知列表失败:', error);
		}
	}
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