<template>
	<view>
		<up-tabbar
			:value="label"
			activeColor="#FFFFFF"
			:fixed="true"
			:placeholder="true"
			:safeAreaInsetBottom="true"
			backgroundColor="#1A1A1D"
			borderColor="rgba(100, 100, 121, 0.2)"
		>
			<template v-for="item in tabbarList" :key="item.label" >
				<up-tabbar-item :text="$t(item.name)" :name="item.label" @click="switchTab(item)">
					<template #active-icon>
						<SvgIcon :name="item.activeIcon" height="64" width="64"></SvgIcon>
					</template>
					<template #inactive-icon>
						<SvgIcon :name="item.inactiveIcon" height="64" width="64"></SvgIcon>
					</template>
				</up-tabbar-item>
			</template>
		</up-tabbar>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue';
const label = ref('home');
const tabbarList = reactive([
	{
		name: 'tabbar.home',
		label: 'home',
		activeIcon: 'homeActive',
		inactiveIcon: 'home',
		path: '/pages/index/index',
		text: '首页'
	},
	{
		name: 'tabbar.message',
		label: 'message',
		activeIcon: 'messageActive',
		inactiveIcon: 'message',
		path: '/pagesMessage/index/index',
		text: '消息'
	},
	{
		name: 'tabbar.mine',
		label: 'mine',
		activeIcon: 'mineActive',
		inactiveIcon: 'mine',
		path: '/pagesMine/index/index',
		text: '我的'
	}
]);

const switchTab = (e) => {
	label.value = e.label;
	uni.switchTab({
		url: e.path
	});
};
</script>

<style lang="scss"></style>
