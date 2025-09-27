<template>
	<view class="viewBox">
		<view class="worldpay-banner"></view>
		<view class="worldpay-txt">{{ $t('home.applyCardType') }}</view>
		<view class="worldpay-title">{{ $t('home.worldpayConsumerCard') }}</view>
		<view>
			<view class="title">{{ $t('home.cardholderInfo') }}</view>
			<view class="boxItem top">
				<view>{{ $t('home.phoneNumber') }}</view>
				<view class="boxItem-txt">+862 55555744</view>
			</view>
			<view class="boxItem">
				<view>{{ $t('home.email') }}</view>
				<view class="boxItem-txt">sili75833@gamil.com</view>
			</view>
			<!-- #ifdef H5 -->
			<view style="width: 100vw;height: 1rpx;background: #0f0f0f;"></view>
			<!-- #endif -->
			<view class="boxItem bottom">
				<view>{{ $t('home.idNumber') }}</view>
				<view class="boxItem-txt">24153411111111111111</view>
			</view>
		</view>
		<view>
			<view class="title">{{ $t('home.cardRules') }}</view>
			<view class="boxItem top">
				<view>{{ $t('home.maxCardBalance') }}</view>
				<view class="boxItem-txt">100.000.00</view>
			</view>
			<view class="boxItem bottom">
				<view>{{ $t('home.monthlyServiceFee') }}</view>
				<view class="boxItem-txt">1.00</view>
			</view>
		</view>
		<view>
			<view class="title">{{ $t('home.mailingAddress') }}</view>
			<view class="select-box">
				<view>{{ $t('home.country') }}</view>
				<view class="select-box-right" @click="addressShow = true">
					<view>{{ $t('home.selectCountry') }}</view>
					<SvgIcon name="bottom" width="36" height="36" style="margin-left: 24rpx;"></SvgIcon>
				</view>
			</view>
			<view class="select-box">
				<view>{{ $t('home.province') }}</view>
				<view class="select-box-right" @click="addressShow = true">
					<view>{{ $t('home.selectProvince') }}</view>
					<SvgIcon name="bottom" width="36" height="36" style="margin-left: 24rpx;"></SvgIcon>
				</view>
			</view>
			<view class="select-box">
				<view>{{ $t('home.city') }}</view>
				<view class="select-box-right" @click="addressShow = true">
					<view>{{ $t('home.selectCity') }}</view>
					<SvgIcon name="bottom" width="36" height="36" style="margin-left: 24rpx;"></SvgIcon>
				</view>
			</view>
			<view class="select-box">
				<view>{{ $t('home.detailedAddress') }}</view>
				<view class="select-box-right">
					<input type="text" :placeholder="$t('home.enterDetailedAddress')"
						placeholder-style="color: #9191aa;" />
				</view>
			</view>
			<view class="select-box">
				<view>{{ $t('home.postalCode') }}</view>
				<view class="select-box-right">
					<input type="text" :placeholder="$t('home.enterPostalCode')" placeholder-style="color: #9191aa;" />
				</view>
			</view>
			<view class="select-box">
				<view>{{ $t('home.recipientPhone') }}</view>
				<view class="select-box-right">
					<input type="text" :placeholder="$t('home.enterRecipientPhone')"
						placeholder-style="color: #9191aa;" />
				</view>
			</view>
		</view>
		<view>
			<view class="title">{{ $t('home.identityInfo') }}</view>
			<view class="select-box">
				<view>{{ $t('home.idType') }}</view>
				<view class="select-box-right" @click="addressShow = true">
					<view>{{ $t('home.selectIdType') }}</view>
					<SvgIcon name="bottom" width="36" height="36" style="margin-left: 24rpx;"></SvgIcon>
				</view>
			</view>
			<view class="select-box">
				<view>{{ $t('home.idNumber') }}</view>
				<view class="select-box-right">
					<input type="text" :placeholder="$t('home.enterIdNumber')" placeholder-style="color: #9191aa;" />
				</view>
			</view>
			<view class="select-box">
				<view>{{ $t('home.idValidDate') }}</view>
				<view class="select-box-right" @click="addressShow = true">
					<view>{{ $t('home.selectDate') }}</view>
					<SvgIcon name="bottom" width="36" height="36" style="margin-left: 24rpx;"></SvgIcon>
				</view>
			</view>
			<view class="title">{{ $t('home.uploadIdInfo') }}</view>
			<view class="idCard">
				<view>
					<view class="idImage">
						<up-upload :fileList="fileList1" name="1" :maxCount="1">
							<SvgIcon name="idcard2" width="336" height="224"></SvgIcon>
						</up-upload>
					</view>
					<view>{{ $t('home.idFront') }}</view>
				</view>
				<view>
					<view class="idImage">
						<up-upload :fileList="fileList2" name="1" :maxCount="1">
							<SvgIcon name="idcard1" width="336" height="224"></SvgIcon>
						</up-upload>
					</view>
					<view>{{ $t('home.idBack') }}</view>
				</view>
			</view>
			<view class="title">{{ $t('home.holdIdImage') }}</view>
			<view class="uploadBox">
				<SvgIcon name="upload" width="202" height="202" class="SvgIcon1"></SvgIcon>
				<SvgIcon name="uploadOff" width="36" height="36" class="SvgIcon2"></SvgIcon>
			</view>
		</view>
		<view class="prompt">
			<view class="promptBox">
				<view>{{ $t('home.cardOpeningFee') }}</view>
				<view class="prompt-txt">3.00 USDT</view>
			</view>
			<view class="promptBox">
				<view>{{ $t('home.prepaymentFee') }}</view>
				<view class="prompt-txt">20.00 USDT</view>
			</view>
			<view class="promptBox">
				<view>{{ $t('home.monthlyServiceFee') }}</view>
				<view class="prompt-txt">1.00 USDT</view>
			</view>
			<view class="promptBox">
				<view class="prompt-txt">{{ $t('home.paymentAmount') }}</view>
				<view style="color: #FFE330;">24.00 USDT</view>
			</view>
			<view class="promptBox">
				<view class="prompt-txt">{{ $t('home.shippingFee') }}</view>
				<view style="color: #FFE330;">0.00 USDT</view>
			</view>
		</view>
		<view class="button" @click="applyShow = true">{{ $t('home.confirmApplication') }}</view>
		<view class="button-placeholder"></view>
		<view>
			<up-picker :show="addressShow" :columns="columns" @cancel="addressShow = false"
				@change="addressShow = false"></up-picker>
		</view>
		<up-modal :show="applyShow" :showConfirmButton='false' bgColor='#141414'>
			<view class="applyModal">
				<view class="applyModal-title">
					<SvgIcon class="svg-icon" name="hint" width="36" height="36"></SvgIcon>
					<view>{{ $t('home.hint') }}</view>
				</view>
				<view class="applyModal-txt">{{ $t('home.cardApplicationTip') }}</view>
				<view class="applyModal-button" @click="applyShow = false">{{ $t('home.iKnow') }}</view>
			</view>
		</up-modal>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue';

	const addressShow = ref(false)
	const applyShow = ref(false)

	const columns = reactive([
		['中国', '美国']
	]);

	const fileList1 = ref([]);
	const fileList2 = ref([]);

	// 保留原有注释代码，不改动逻辑
	// // 删除图片
	// const deletePic = (event) => {
	// 	fileList1.value.splice(event.index, 1);
	// };

	// // 新增图片
	// const afterRead = async (event) => {
	// 	// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
	// 	let lists = [].concat(event.file);
	// 	let fileListLen = fileList1.value.length;
	// 	lists.map((item) => {
	// 		fileList1.value.push({
	// 			...item,
	// 			status: 'uploading',
	// 			message: '上传中',
	// 		});
	// 	});
	// 	for (let i = 0; i < lists.length; i++) {
	// 		const result = await uploadFilePromise(lists[i].url);
	// 		let item = fileList1.value[fileListLen];
	// 		fileList1.value.splice(fileListLen, 1, {
	// 			...item,
	// 			status: 'success',
	// 			message: '',
	// 			url: result,
	// 		});
	// 		fileListLen++;
	// 	}
	// };

	// const uploadFilePromise = (url) => {
	// 	return new Promise((resolve, reject) => {
	// 		let a = uni.uploadFile({
	// 			url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
	// 			filePath: url,
	// 			name: 'file',
	// 			formData: {
	// 				user: 'test',
	// 			},
	// 			success: (res) => {
	// 				setTimeout(() => {
	// 					resolve(res.data.data);
	// 				}, 1000);
	// 			},
	// 		});
	// 	});
	// };
</script>

<style lang="scss" scoped>
	@import './physicalCard.scss';
</style>