<template>
	<view class="viewBox">
		<view class="worldpay-banner"></view>
		<view class="worldpay-txt">申办卡别</view>
		<view class="worldpay-title">Worldpay 消费卡</view>
		<view>
			<view class="title">持卡人信息</view>
			<view class="boxItem top">
				<view>手机号</view>
				<view class="boxItem-txt">+862 55555744</view>
			</view>
			<view class="boxItem">
				<view>邮箱</view>
				<view class="boxItem-txt">sili75833@gamil.com</view>
			</view>
			<!-- #ifdef H5 -->
			<view style="width: 100vw;height: 1rpx;background: #0f0f0f;"></view>
			<!-- #endif -->
			<view class="boxItem bottom">
				<view>证件号码</view>
				<view class="boxItem-txt">24153411111111111111</view>
			</view>
		</view>
		<view>
			<view class="title">卡规则</view>
			<view class="boxItem top">
				<view>卡最大余额</view>
				<view class="boxItem-txt">100.000.00</view>
			</view>
			<view class="boxItem bottom">
				<view>月服务费</view>
				<view class="boxItem-txt">1.00</view>
			</view>
		</view>
		<view>
			<view class="title">邮寄地址（卡片收件地址）</view>
			<view class="select-box">
				<view>国家</view>
				<view class="select-box-right" @click="addressShow = true">
					<view>请选择国家</view>
					<SvgIcon name="bottom" width="36" height="36" style="margin-left: 24rpx;"></SvgIcon>
				</view>
			</view>
			<view class="select-box">
				<view>省</view>
				<view class="select-box-right" @click="addressShow = true">
					<view>请选择省份</view>
					<SvgIcon name="bottom" width="36" height="36" style="margin-left: 24rpx;"></SvgIcon>
				</view>
			</view>
			<view class="select-box">
				<view>市</view>
				<view class="select-box-right" @click="addressShow = true">
					<view>请选择市区</view>
					<SvgIcon name="bottom" width="36" height="36" style="margin-left: 24rpx;"></SvgIcon>
				</view>
			</view>
			<view class="select-box">
				<view>详细地址</view>
				<view class="select-box-right">
					<input type="text" placeholder="请输入详细地址" placeholder-style="color: #9191aa;" />
				</view>
			</view>
			<view class="select-box">
				<view>邮政编码</view>
				<view class="select-box-right">
					<input type="text" placeholder="请输入邮政编码" placeholder-style="color: #9191aa;" />
				</view>
			</view>
			<view class="select-box">
				<view>收件人电话</view>
				<view class="select-box-right">
					<input type="text" placeholder="请输入收件人电话" placeholder-style="color: #9191aa;" />
				</view>
			</view>
		</view>
		<view>
			<view class="title">身份信息</view>
			<view class="select-box">
				<view>身份证件类型</view>
				<view class="select-box-right" @click="addressShow = true">
					<view>请选择类型</view>
					<SvgIcon name="bottom" width="36" height="36" style="margin-left: 24rpx;"></SvgIcon>
				</view>
			</view>
			<view class="select-box">
				<view>身份证号</view>
				<view class="select-box-right">
					<input type="text" placeholder="请输入身份证号" placeholder-style="color: #9191aa;" />
				</view>
			</view>
			<view class="select-box">
				<view>身份证有效日期</view>
				<view class="select-box-right" @click="addressShow = true">
					<view>请选择日期</view>
					<SvgIcon name="bottom" width="36" height="36" style="margin-left: 24rpx;"></SvgIcon>
				</view>
			</view>
			<view class="title">上传身份证信息</view>
			<view class="idCard">
				<view>
					<view class="idImage">
						<up-upload :fileList="fileList1" name="1" :maxCount="1">
							<SvgIcon name="idcard2" width="336" height="224"></SvgIcon>
						</up-upload>
					</view>
					<view>证件正面</view>
				</view>
				<view>
					<view class="idImage">
						<up-upload :fileList="fileList2" name="1" :maxCount="1">
							<SvgIcon name="idcard1" width="336" height="224"></SvgIcon>
						</up-upload>
					</view>
					<view>证件反面</view>
				</view>
			</view>
			<view class="title">手持身份证图像</view>
			<view class="uploadBox">
				<SvgIcon name="upload" width="202" height="202" class="SvgIcon1"></SvgIcon>
				<SvgIcon name="uploadOff" width="36" height="36" class="SvgIcon2"></SvgIcon>
			</view>
		</view>
		<view class="prompt">
			<view class="promptBox">
				<view>开卡费</view>
				<view class="prompt-txt">3.00 USDT</view>
			</view>
			<view class="promptBox">
				<view>预存费</view>
				<view class="prompt-txt">20.00 USDT</view>
			</view>
			<view class="promptBox">
				<view>月服务费</view>
				<view class="prompt-txt">1.00 USDT</view>
			</view>
			<view class="promptBox">
				<view class="prompt-txt">支付数量</view>
				<view style="color: #FFE330;">24.00 USDT</view>
			</view>
			<view class="promptBox">
				<view class="prompt-txt">邮费</view>
				<view style="color: #FFE330;">0.00 USDT</view>
			</view>
		</view>
		<view class="button" @click="applyShow = true">确认申办</view>
		<view class="button-placeholder"></view>
		<view>
			<up-picker :show="addressShow" :columns="columns" @cancel="addressShow = false"
				@change="addressShow = false"></up-picker>
		</view>
		<up-modal :show="applyShow" :showConfirmButton='false' bgColor='#141414'>
			<view class="applyModal">
				<view class="applyModal-title">
					<SvgIcon class="svg-icon" name="hint" width="36" height="36"></SvgIcon>
					<view>提示</view>
				</view>
				<view class="applyModal-txt">申请卡片需要大约十几分钟，您可以返回
					其他页面进行操作，稍后会给您消息通知</view>
				<view class="applyModal-button" @click="applyShow = false">我知道了</view>
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