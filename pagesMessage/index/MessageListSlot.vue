<!-- components/MessageListSlot.vue -->
<template>
	<!-- 消息列表核心内容（原重复代码） -->
	<view style="padding-bottom: 32rpx;" v-if="messageList && messageList.list && messageList.list.length">
		<view v-for="(item, index) in messageList.list" :key="index"
			@click="goToPage(`/pagesMessage/messageDetails/messageDetails?title=${item.title}&messageId=${item.id}`)">
			<!-- <view class="time">{{ item.date || '2025-07-04' }}</view> -->
			<view class="box">
				<view>{{ item.title }}</view>
				<view class="box-cont">{{ item.content }}</view>
				<view class="box-time">{{ item.setTime }}</view>
			</view>
		</view>
	</view>
	<!-- 空状态（原重复代码） -->
	<view class="emty" v-else>
		<view class="emtyIcon">
			<image src="@/static/image/index/emty.png" alt="空状态图标" mode="widthFix" />
		</view>
		<view>{{ $t('message.empty') }}</view>
	</view>
</template>

<script setup>
	import {
		useI18n
	} from 'vue-i18n';

	// 保留i18n国际化功能
	const {
		t
	} = useI18n();

	// 接收父页面传递的必要数据和方法
	const props = defineProps({
		messageList: {
			type: Object,
			default: () => ({}) // 接收消息列表数据
		},
		goToPage: {
			type: Function,
			required: true // 接收跳转页面方法
		}
	});
</script>

<style lang="scss" scoped>
	@import './index.scss';
</style>