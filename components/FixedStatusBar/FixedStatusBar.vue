<template>
	<view class="status_bar_fixed"></view>
	<view class="status_bar"></view>
</template>

<script>
export default {
	name: 'StatusBar',
	data() {
		return {};
	}
};
</script>

<style>
.status_bar_fixed {
	height: var(--status-bar-height);
	background: #0f0f0f;
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9999;
}
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
}
</style>
