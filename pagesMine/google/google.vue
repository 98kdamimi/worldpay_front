<template>
	<view class="viewBox">
		<Navbar :title="$t('googleAuth.title')" :showBack="true"></Navbar>
		<view>
			<view class="title">{{ $t('googleAuth.codeLabel') }}</view>
			<view class="inputBox">
				<input :type="passWordType ? 'password' : 'text'" :placeholder="$t('googleAuth.noCodePlaceholder')"
					placeholder-style="color: #9191aa;" disabled v-model="dataContent" />
				<SvgIcon name="renew" width="36" height="36"
					style="margin-right: 12px; transition: transform 0.3s ease;" :class="{ 'rotate-icon': isRotating }"
					v-if="isCode" @click="getIssueGoogleSecretkey()"></SvgIcon>
				<view @click="passWordType = !passWordType">
					<SvgIcon name="eye3" width="36" height="36" v-if="passWordType"></SvgIcon>
					<SvgIcon name="eye4" width="36" height="36" v-else></SvgIcon>
				</view>
			</view>
		</view>
		<view class="button" v-if="isCode" @click="getUpGoogleSecretkey()">{{ $t('googleAuth.applyCode') }}</view>
		<view class="button" v-else>
			<up-copy :content="dataContent">
				<view>{{ $t('googleAuth.copyCode') }}</view>
			</up-copy>
		</view>
		<view class="button-placeholder"></view>
	</view>
</template>

<script setup>
	import {
		ref,
		watch
	} from 'vue';
	import {
		onShow
	} from "@dcloudio/uni-app"
	import {
		IssueGoogleSecretkey,
		upGoogleSecretkey
	} from '@/request/api.js';
	import {
		useUserStore
	} from '@/stores/user';
	import {
		storeToRefs
	} from 'pinia';
	import {
		useI18n
	} from 'vue-i18n';

	const {
		t
	} = useI18n();

	const userStore = useUserStore();
	const {
		userInfo
	} = storeToRefs(userStore);
	const {
		fetchUserInfoByToken
	} = userStore

	// 判断是否有谷歌验证码
	const isCode = ref(true)
	// 查看谷歌验证码
	const passWordType = ref(true)
	// 谷歌验证码
	const dataContent = ref("")
	// 控制刷新图标旋转状态
	const isRotating = ref(false);
	onShow(() => {
		isCode.value = !userInfo.value.googleState;
		dataContent.value = userInfo.value.googleSecretkey;
		if (!userInfo.value.googleState) {
			getIssueGoogleSecretkey();
		}
	})
	// 监听 googleState 变化，实时更新 isCode
	watch(
		() => userInfo.value.googleState,
		(newGoogleState) => {
			isCode.value = !newGoogleState;
			if (!newGoogleState) {
				getIssueGoogleSecretkey();
			}
		}, {
			immediate: false
		}
	);
	// 签发谷歌验证密钥
	const getIssueGoogleSecretkey = async () => {
		isRotating.value = true;
		try {
			const {
				data
			} = await IssueGoogleSecretkey({
				uid: userInfo.value.uid
			});
			console.log(data)
			dataContent.value = data
		} catch (error) {
			console.error('获取通知列表失败:', error);
		} finally {
			setTimeout(() => {
				isRotating.value = false;
			}, 500);
		}
	}
	// 签发谷歌验证密钥
	const getUpGoogleSecretkey = async () => {
		try {
			const {
				data
			} = await upGoogleSecretkey({
				uid: userInfo.value.uid,
				googleSecretkey: dataContent.value
			});
			console.log(data)
			uni.showToast({
				title: t('googleAuth.applicationSuccessful'),
				icon: 'none'
			});
			fetchUserInfoByToken()
		} catch (error) {
			console.error('获取通知列表失败:', error);
		}
	}
</script>

<style lang="scss" scoped>
	@import './google.scss';

	// 旋转动画样式
	.rotate-icon {
		animation: rotate .5s linear forwards;
	}

	// 定义旋转动画（360度顺时针旋转）
	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}
</style>