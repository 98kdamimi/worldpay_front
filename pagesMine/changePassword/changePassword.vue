<template>
	<view class="viewBox">
		<Navbar :title="title" :showBack="true"></Navbar>
		<view v-if="pageType == 1 || (pageType == 2 && isPassword)">
			<view class="title">{{ $t('passwordModify.oldPassword') }}</view>
			<view class="inputBox">
				<input
					:type="passWordType ? 'password' : 'text'"
					:placeholder="$t('passwordModify.enterOldPassword')"
					placeholder-style="color: #9191aa;"
					v-model="requestParams.formerPassword"
				/>
				<view @click="passWordType = !passWordType">
					<SvgIcon
						name="eye3"
						width="36"
						height="36"
						v-if="passWordType"
					></SvgIcon>
					<SvgIcon
						name="eye4"
						width="36"
						height="36"
						v-else
					></SvgIcon>
				</view>
			</view>
		</view>
		<view>
			<view class="title">{{ $t('passwordModify.newPassword') }}</view>
			<view class="inputBox">
				<input
					:type="passWordType1 ? 'password' : 'text'"
					:placeholder="$t('passwordModify.enterNewPassword')"
					placeholder-style="color: #9191aa;"
					v-model="requestParams.newPassword"
				/>
				<view @click="passWordType1 = !passWordType1">
					<SvgIcon
						name="eye3"
						width="36"
						height="36"
						v-if="passWordType1"
					></SvgIcon>
					<SvgIcon
						name="eye4"
						width="36"
						height="36"
						v-else
					></SvgIcon>
				</view>
			</view>
		</view>
		<view>
			<view class="title">
				{{ $t('passwordModify.confirmNewPassword') }}
			</view>
			<view class="inputBox">
				<input
					:type="passWordType2 ? 'password' : 'text'"
					:placeholder="$t('passwordModify.reenterNewPassword')"
					placeholder-style="color: #9191aa;"
					v-model="newPassword2"
				/>
				<view @click="passWordType2 = !passWordType2">
					<SvgIcon
						name="eye3"
						width="36"
						height="36"
						v-if="passWordType2"
					></SvgIcon>
					<SvgIcon
						name="eye4"
						width="36"
						height="36"
						v-else
					></SvgIcon>
				</view>
			</view>
		</view>
		<view>
			<view class="title">
				{{ $t('passwordModify.emailVerificationCode') }}
			</view>
			<view class="smallInput">
				<view>
					<!-- 请输入验证码 -->
					<input
						type="text"
						:placeholder="$t('passwordModify.emailPassword')"
						placeholder-style="color: #9191aa;"
						v-model="verifyCode"
					/>
				</view>
				<view
					class="input-button"
					:style="{
						background: isCounting ? '#95969D' : '',
						color: isCounting ? '#fff' : ''
					}"
					@click="sendCode"
				>
					<!-- 发送 / 倒计时（含秒单位） -->
					{{
						isCounting
							? count + $t('auth.secondUnit')
							: $t('auth.sendCode')
					}}
				</view>
			</view>
		</view>
		<view class="button" @click="getPasswordVerification()">
			{{ $t('passwordModify.confirmModify') }}
		</view>
		<view class="button-placeholder"></view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { updaePwd, sendEmailCode } from '@/request/api.js';
import {
	setPayPassword,
	changePayPassword,
	hasPayPassword
} from '@/utils/payPassword.js';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

// 退出登录
const { logout } = userStore;

const title = ref('修改密码');
// 查看旧密码
const passWordType = ref(true);
// 查看新密码
const passWordType1 = ref(true);
// 查看确认密码
const passWordType2 = ref(true);
// 页面类型 登录密码/支付密码
const pageType = ref('');
// 是否发送邮箱验证码
const isCounting = ref(false);
// 接口参数
const requestParams = reactive({
	uid: userInfo.value.uid,
	formerPassword: '',
	newPassword: ''
});
// 新密码
const newPassword2 = ref('');
// 邮箱验证码
const verifyCode = ref('');
// 验证码倒计时
const count = ref(60);
// 是否设置支付密码
const isPassword = ref(true);
onLoad((options) => {
	isPassword.value = hasPayPassword();
	pageType.value = options.pageType;
	title.value = t('passwordModify.title');
	if (options.pageType == 2 && !hasPayPassword()) {
		title.value = t('passwordModify.setPaymentPassword');
	}
});
// 修改密码校验
const getPasswordVerification = () => {
	const needCheckOldPassword =
		pageType.value == 1 || (pageType.value == 2 && isPassword.value);
	if (needCheckOldPassword && !requestParams.formerPassword) {
		uni.showToast({
			title: t('passwordModify.enterOldPassword'),
			icon: 'none'
		});
		return;
	}
	if (!requestParams.newPassword) {
		uni.showToast({
			title: t('passwordModify.enterNewPassword'),
			icon: 'none'
		});
		return;
	}
	if (pageType.value == 2) {
		const isSixDigitNumber = /^\d{6}$/.test(requestParams.newPassword);
		if (!isSixDigitNumber) {
			uni.showToast({
				title: t('passwordModify.payPasswordMustBeSixDigits'),
				icon: 'none'
			});
			return;
		}
	}
	if (!newPassword2.value) {
		uni.showToast({
			title: t('passwordModify.reenterNewPassword'),
			icon: 'none'
		});
		return;
	}
	if (requestParams.newPassword != newPassword2.value) {
		uni.showToast({
			title: t('passwordModify.passwordInconsistency'),
			icon: 'none'
		});
		return;
	}
	if (!verifyCode.value) {
		uni.showToast({
			title: t('passwordModify.emailPassword'),
			icon: 'none'
		});
		return;
	}
	switch (pageType.value) {
		case '1':
			getUpdaePwd(); // 注意：这里可能是拼写错误，应为getUpdatePwd
			break;
		case '2':
			if (!isPassword.value) {
				if (setPayPassword(requestParams.newPassword)) {
					uni.showToast({
						title: t('passwordModify.passwordSetSuccessfully'),
						icon: 'none'
					});
					clearInput();
					setTimeout(() => {
						uni.navigateBack();
					}, 1000);
				}
			} else {
				if (
					changePayPassword(
						requestParams.formerPassword,
						requestParams.newPassword
					)
				) {
					uni.showToast({
						title: t('passwordModify.passwordChangedSuccessfully'),
						icon: 'none'
					});
					clearInput();
					setTimeout(() => {
						uni.navigateBack();
					}, 1000);
				} else {
					uni.showToast({
						title: t(
							'passwordModify.oldPasswordWasEnteredIncorrectly'
						),
						icon: 'none'
					});
				}
			}
			break;
	}
};
// 修改密码接口
const getUpdaePwd = async () => {
	try {
		const { data } = await updaePwd(requestParams);
		uni.showToast({
			title: t('passwordModify.passwordChangedSuccessfully'),
			icon: 'none'
		});
		logout();
	} catch (error) {
		console.error('获取通知列表失败:', error);
	}
};
// 发送验证码
const sendCode = async () => {
	if (isCounting.value) return;
	try {
		await sendEmailCode({
			userEmail: userInfo.value.userEmail
		});
		// 开始倒计时
		isCounting.value = true;
		count.value = 60;
		timer = setInterval(() => {
			count.value--;
			if (count.value <= 0) {
				clearInterval(timer);
				isCounting.value = false;
				count.value = 60;
			}
		}, 1000);
	} catch (error) {
		console.error(error);
	}
};
// 清空输入框
const clearInput = () => {
	requestParams.formerPassword = '';
	requestParams.newPassword = '';
	newPassword2.value = '';
	verifyCode.value = '';
	isCounting.value = false;
	count.value = 60;
};
</script>

<style lang="scss" scoped>
@import './changePassword.scss';
</style>
