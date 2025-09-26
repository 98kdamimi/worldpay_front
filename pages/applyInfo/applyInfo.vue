<template>
	<view class="viewBox" style="padding-bottom: 32rpx;">
		<Navbar title="确认申办信息" :showBack="true"></Navbar>
		<!-- 虚拟卡 -->
		<view v-if="true">
			<virualCard></virualCard>
		</view>
		<!-- 实体卡 -->
		<view v-else>
			<physicalCard></physicalCard>
		</view>
	</view>
</template>

<script setup>
	import virualCard from './virtualCard/virtualCard.vue'
	import physicalCard from './physicalCard/physicalCard.vue'
</script>

<style lang="scss" scoped>

</style>