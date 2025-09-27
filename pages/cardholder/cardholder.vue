<template>
	<view class="viewBox" style="padding-bottom: 32rpx;">
		<!-- 导航栏标题多语言 -->
		<Navbar :title="$t('cardholderSelect.title')" :showBack="true">
			<template #right>
				<SvgIcon name="more" width="40" height="40" @click.stop="setOperationType()" />
			</template>
		</Navbar>

		<!-- 持卡人列表（文本多语言） -->
		<view class="box" v-for="(item, index) in 5" :key="index" @click.stop="goToPage('/pages/applyInfo/applyInfo')">
			<view class="box-info">
				<SvgIcon name="avatar" width="80" height="80" style="margin-right: 24rpx;"></SvgIcon>
				<view>
					<view>Tong Wang</view>
					<view class="box-txt">sili75833@gamil.com</view>
				</view>
			</view>
			<!-- 修改图标（保持不变） -->
			<SvgIcon name="revise" width="24" height="24" @click.stop="editFunct" v-if="operationType">
			</SvgIcon>
			<!-- 删除文本多语言 -->
			<view class="box-del" @click.stop="delectFunct" v-else>{{ $t('cardholderSelect.delete') }}</view>
		</view>

		<!-- 底部按钮多语言（根据状态切换） -->
		<view class="button" @click="goToPage('/pages/addCardholder/addCardholder')" v-if="operationType">
			<!-- #ifdef APP -->
			<SvgIcon name="addto" width="32" height="32" style="margin-top: 5rpx; margin-right: 12rpx;"></SvgIcon>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<SvgIcon name="addto" width="32" height="32" style="margin-top: 4rpx; margin-right: 12rpx;"></SvgIcon>
			<!-- #endif -->
			<view>{{ $t('cardholderSelect.addCardholder') }}</view>
		</view>
		<view class="button" v-else @click="setOperationType()">
			<view>{{ $t('cardholderSelect.finish') }}</view>
		</view>
		<view class="button-placeholder"></view>

		<!-- 删除确认弹窗多语言 -->
		<up-modal :show="applyShow" :showConfirmButton='false' bgColor='#141414'>
			<view class="applyModal">
				<view class="applyModal-title">
					<SvgIcon class="svg-icon" name="hint" width="36" height="36"></SvgIcon>
					<view>{{ $t('cardholderSelect.confirmDeleteTitle') }}</view>
				</view>
				<view class="applyModal-txt">{{ $t('cardholderSelect.confirmDeleteMsg') }}</view>
				<view class="applyModal-button">
					<view class="cancel" @click="applyShow = false">{{ $t('cardholderSelect.cancel') }}</view>
					<view class="apply" @click="applyShow = false">{{ $t('cardholderSelect.confirm') }}</view>
				</view>
			</view>
		</up-modal>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	const operationType = ref(true)
	const applyShow = ref(false)

	const editFunct = () => {
		console.log("修改")
	}
	const delectFunct = () => {
		applyShow.value = true
	}
	const setOperationType = () => {
		operationType.value = !operationType.value;
	};
	const goToPage = (address) => {
		uni.navigateTo({
			url: address
		});
	};
</script>

<style lang="scss" scoped>
	@import "./cardholder.scss";
</style>