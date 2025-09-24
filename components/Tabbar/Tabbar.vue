<template>
	<view>
		<up-tabbar
			:value="value1"
			@change="change1"
			:fixed="true"
			:placeholder="true"
			:safeAreaInsetBottom="true"
			backgroundColor="#1A1A1D"
			borderColor="rgba(100, 100, 121, 0.2)"
		>
			<up-tabbar-item text="首页" icon="home" @click="click1" ></up-tabbar-item>
			<up-tabbar-item text="放映厅" icon="photo" @click="click1" ></up-tabbar-item>
			<up-tabbar-item text="直播" icon="play-right" @click="click1" ></up-tabbar-item>
		</up-tabbar>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	const value1 = ref(0)
	const change1 = (e) => {
		value1.value = e
	}
	const click1 = (e) => {
		value1.value = e
	}
</script>

<style lang="scss">

</style>