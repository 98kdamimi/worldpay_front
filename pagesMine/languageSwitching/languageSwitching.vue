<template>
	<view class="viewBox">
		<Navbar title="语言切换" :showBack="true"></Navbar>
		<view class="box">
			<view class="box-item" v-for="(item, index) in navList" :key="index">{{ item.name }}</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue';
	const navList = reactive([{
			name: '中文简体',
		},
		{
			name: 'Englins',
		}
	]);
</script>

<style lang="scss" scoped>
	@import './languageSwitching.scss'
</style>