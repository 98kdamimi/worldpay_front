<template>
	<view class="viewBox" style="padding-bottom: 32rpx;">
		<!-- 导航栏标题多语言 -->
		<Navbar :title="$t('cardholderSelect.title')" :showBack="true">
			<template #right>
				<SvgIcon name="more" width="40" height="40" @click.stop="setOperationType()" />
			</template>
		</Navbar>

		<!-- 持卡人列表 -->
		<view v-if="dataList.length">
			<view class="box" v-for="(item, index) in dataList" :key="index"
				@click.stop="goToPage('/pages/applyInfo/applyInfo')">
				<view class="box-info">
					<SvgIcon name="avatar" width="80" height="80" style="margin-right: 24rpx;"></SvgIcon>
					<view>
						<view>Tong Wang</view>
						<view class="box-txt">sili75833@gamil.com</view>
					</view>
				</view>
				<!-- 修改图标 -->
				<SvgIcon name="revise" width="24" height="24" @click.stop="editFunct" v-if="operationType">
				</SvgIcon>
				<view class="box-del" @click.stop="delectFunct" v-else>{{ $t('cardholderSelect.delete') }}</view>
			</view>
		</view>
		<view v-else>
			<Emty></Emty>
		</view>

		<!-- 底部按钮多语言（根据状态切换） -->
		<view class="button" @click="goToPage('/pages/addCardholder/addCardholder')" v-if="operationType">
			<view>
				<!-- #ifdef APP -->
				<SvgIcon name="addto" width="32" height="32" style="margin-top: 5rpx; margin-right: 12rpx;"></SvgIcon>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<SvgIcon name="addto" width="32" height="32" style="margin-top: 4rpx; margin-right: 12rpx;"></SvgIcon>
				<!-- #endif -->
				<view>{{ $t('cardholderSelect.addCardholder') }}</view>
			</view>
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
	import {
		onReady
	} from '@dcloudio/uni-app';
	import {
		findByUid
	} from '@/request/api.js'

	const operationType = ref(true)
	const applyShow = ref(false)

	const dataList = ref([])

	// 获取系统信息
	onReady(() => {
		getFindByUid()
	});

	// 查询银行卡信息列表
	const getFindByUid = async () => {
		try {
			const res = await findByUid({
				uid: uni.getStorageSync('userInfo').uid
			})
			console.log("持卡人列表", res)
			if (res.rtncode == 200) {
				dataList.value = res.data
			}
		} catch (error) {
			console.error(error)
		}
	}

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