<template>
	<view>
		<Navbar :title="$t('home.uploadIdInfo')" :showBack="true"></Navbar>
		<view class="id_info_container">
			<view class="page_title item_title">实名认证</view>
			<view class="item_title">证件正面照片</view>
			<view class="img_upload_container" @click="uploadImg(0)">
				<view
					class="img_container"
					v-if="tempFilePaths && tempFilePaths[0]"
				>
					<view class="clear_btn" @click.stop="removeImg(0)">
						<SvgIcon name="off" width="40" height="40"></SvgIcon>
					</view>
					<image :src="tempFilePaths[0]" mode="aspectFill" />
				</view>
				<view class="img_upload" v-else>
					<SvgIcon
						name="uploadImg"
						width="120"
						height="120"
					></SvgIcon>
					<view class="img_upload_title">添加图片</view>
				</view>
			</view>
			<view class="item_title">证件背面照片</view>
			<view class="img_upload_container" @click="uploadImg(1)">
				<view
					class="img_container"
					v-if="tempFilePaths && tempFilePaths[1]"
				>
					<view class="clear_btn" @click.stop="removeImg(1)">
						<SvgIcon name="off" width="40" height="40"></SvgIcon>
					</view>
					<image :src="tempFilePaths[1]" mode="aspectFill" />
				</view>
				<view class="img_upload" v-else>
					<SvgIcon
						name="uploadImg"
						width="120"
						height="120"
					></SvgIcon>
					<view class="img_upload_title">添加图片</view>
				</view>
			</view>
			<view class="item_title">手持证件照片</view>
			<view class="img_upload_container" @click="uploadImg(2)">
				<view
					class="img_container"
					v-if="tempFilePaths && tempFilePaths[2]"
				>
					<view class="clear_btn" @click.stop="removeImg(2)">
						<SvgIcon name="off" width="40" height="40"></SvgIcon>
					</view>
					<image :src="tempFilePaths[2]" mode="aspectFill" />
				</view>
				<view class="img_upload" v-else>
					<SvgIcon
						name="uploadImg"
						width="120"
						height="120"
					></SvgIcon>
					<view class="img_upload_title">添加图片</view>
				</view>
			</view>
			<view class="confirm_btn">提交</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { BASE_URL } from '@/request/index.js';
import { useUserStore } from '@/stores/user.js';
import { useCardStore } from '@/stores/card.js';
import { storeToRefs } from 'pinia';
const cardStore = useCardStore();
const { kycData } = storeToRefs(cardStore);
const { setKycDataForKey } = cardStore;

const tempFilePaths = ref([
	kycData.value.frontPhotoUrl,
	kycData.value.backPhotoUrl,
	kycData.value.handheldPhotoUrl
]);

console.log(tempFilePaths.value);

const userStore = useUserStore();
const uploadImg = (index) => {
	uni.chooseImage({
		count: 1,
		sizeType: ['original', 'compressed'],
		sourceType: ['album', 'camera'],
		extension: ['png', 'jpg', 'jpeg'],
		success: function (res) {
			
			uni.uploadFile({
				url: `${BASE_URL}/ucard/wiki/apiUploadImage`,
				header: {
					token: userStore.token
				},
				formData: {
					uid: userStore.userInfo.uid,
					type: index + 1
				},
				filePath: res.tempFilePaths[0],
				name: 'file',

				success: (uploadFileRes) => {
					const { data } = JSON.parse(uploadFileRes.data);
					tempFilePaths.value[index] = data.documentFileUrl;
					console.log(data);
					switch (data.documentType) {
						case 1:
							setKycDataForKey(
								'frontPhotoId',
								data.documentFileId
							);
							setKycDataForKey(
								'frontPhotoUrl',
								data.documentFileUrl
							);
							break;
						case 2:
							setKycDataForKey(
								'backPhotoId',
								data.documentFileId
							);
							setKycDataForKey(
								'backPhotoUrl',
								data.documentFileUrl
							);
							break;
						case 3:
							setKycDataForKey(
								'handheldPhotoId',
								data.documentFileId
							);
							setKycDataForKey(
								'handheldPhotoUrl',
								data.documentFileUrl
							);
							break;
					}
				}
			});
		}
	});
};
const removeImg = (index) => {
	tempFilePaths.value[index] = '';
	switch (index) {
		case 0:
			setKycDataForKey('frontPhotoId', '');
			setKycDataForKey('frontPhotoUrl', '');
			break;
		case 1:
			setKycDataForKey('backPhotoId', '');
			setKycDataForKey('backPhotoUrl', '');
			break;
		case 2:
			setKycDataForKey('handheldPhotoId', '');
			setKycDataForKey('handheldPhotoUrl', '');
			break;
	}
};
</script>

<style lang="scss" scoped>
.id_info_container {
	color: #9191aaff;
	font-size: 28rpx;
	display: flex;
	gap: 32rpx;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 32rpx;
	padding-bottom: 160rpx;
	.page_title {
		font-weight: 500;
		font-size: 40rpx;
		color: #ffffff;
		line-height: 40rpx;
		text-align: left;
		font-style: normal;
	}
	.item_title {
		width: 100%;
		text-align: left;
	}
	.img_upload_container {
		width: 100%;
		height: 400rpx;
		background: #16171a;
		border-radius: 24rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		.img_upload {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 20rpx;
			.img_upload_title {
				text-align: center;
			}
		}
		.img_container {
			width: 100%;
			height: 400rpx;
			border-radius: 24rpx;
			overflow: hidden;
			position: relative;
			image {
				width: 100%;
				height: 100%;
			}
			.clear_btn {
				z-index: 9;
				position: absolute;
				top: 10rpx;
				right: 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				background: #16171a;
				border-radius: 0 0 0 24rpx;
			}
		}
	}
	.confirm_btn {
		width: 654rpx;
		height: 100rpx;
		background: #1e3ad6;
		border-radius: 50rpx;
		position: fixed;
		bottom: 0;
		margin-bottom: 30rpx;
		font-size: 36rpx;
		font-weight: 500;
		color: #ffffff;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>
