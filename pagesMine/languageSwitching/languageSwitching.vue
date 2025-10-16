<template>
	<view class="viewBox">
		<Navbar :title="$t('languageSwitch.title')" :showBack="true"></Navbar>
		<view class="box">
			<view
				class="box-item"
				v-for="(item, index) in navList"
				:key="index"
				@click="setLanguage(item.lang)"
			>
				<view class="">
					{{ item.name }}
				</view>
				<SvgIcon
					name="svg3"
					width="32"
					height="32"
					v-if="item.lang === language"
				></SvgIcon>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stores/app.js';
const appStore = useAppStore();
const { language } = storeToRefs(appStore);
const { setLanguage } = appStore;
const navList = reactive([
	{
		name: '中文简体',
		lang: 'zh-Hans'
	},
	{
		name: '中文繁體',
		lang: 'zh-Hant'
	},
	{
		name: 'Englins',
		lang: 'en'
	}
]);
watch(
	language,
	(newValue) => {
		console.log(newValue);
	},
	{ immediate: true }
);
</script>

<style lang="scss" scoped>
@import './languageSwitching.scss';
</style>
