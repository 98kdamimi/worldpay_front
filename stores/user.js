import {
	ref,
	computed
} from "vue";
import {
	defineStore
} from "pinia";
import {
	findToken
} from "@/request/api.js";

export const useUserStore = defineStore("user", () => {
	// 1. 状态初始化：兼容旧数据
	const initUserInfo = (() => {
		const storedData = uni.getStorageSync('userInfo');
		return storedData ? (storedData.data !== undefined ? storedData.data : storedData) : null;
	})();

	// 状态定义
	const token = ref(uni.getStorageSync('token') || '');
	const userInfo = ref(initUserInfo);
	// 加载状态：用于标识是否正在获取用户信息（避免重复请求）
	const isLoadingUserInfo = ref(false);

	// 2. 核心方法：获取/更新用户信息
	const fetchUserInfoByToken = async () => {
		// 避免重复请求
		if (isLoadingUserInfo.value) {
			return null;
		}

		try {
			isLoadingUserInfo.value = true; // 开始加载

			if (!token.value) {
				uni.showToast({
					title: '请先登录',
					icon: 'none',
					duration: 1500
				});
				return null;
			}

			const res = await findToken({
				token: token.value
			});

			if (!res) {
				uni.showToast({
					title: '接口响应异常',
					icon: 'none',
					duration: 1500
				});
				return null;
			}

			if (res.rtncode === 200) {
				if (!res.data || typeof res.data !== 'object') {
					uni.showToast({
						title: '用户信息格式错误',
						icon: 'none',
						duration: 1500
					});
					return null;
				}

				// 合并/更新用户信息
				const hasLocalInfo = !!userInfo.value;
				userInfo.value = hasLocalInfo ? {
						...userInfo.value,
						...res.data
					} :
					res.data;

				// 同步到本地存储
				uni.setStorageSync('userInfo', userInfo.value);
				return userInfo.value; // 返回最新用户信息
			} else {
				const errorMsg = res.msg || `获取失败（${res.rtncode}）`;
				uni.showToast({
					title: errorMsg,
					icon: 'none',
					duration: 1500
				});

				if (res.rtncode === 401) {
					await clearUserInfo(); // Token无效时清除信息
				}
				return null;
			}
		} catch (error) {
			console.error('获取用户信息异常:', error);
			uni.showToast({
				title: '获取用户信息失败，请重试',
				icon: 'none',
				duration: 1500
			});
			return null;
		} finally {
			isLoadingUserInfo.value = false; // 结束加载（无论成功失败）
		}
	};

	// 3. 改造setToken：返回用户信息的Promise
	const setToken = async (val) => {
		// 入参校验
		if (!val || typeof val !== 'string' || val.trim() === '') {
			uni.showToast({
				title: 'Token格式错误',
				icon: 'none',
				duration: 1500
			});
			return null;
		}

		try {
			// 存储Token
			token.value = val;
			uni.setStorageSync('token', val);

			// 等待用户信息加载完成，并返回结果
			const newUserInfo = await fetchUserInfoByToken();
			return newUserInfo; // 关键：返回最新用户信息
		} catch (error) {
			console.error('setToken过程中发生错误:', error);
			return null;
		}
	};

	// 4. 清除用户信息
	const clearUserInfo = async () => {
		token.value = '';
		userInfo.value = null;
		uni.removeStorageSync('token');
		uni.removeStorageSync('userInfo');
		uni.navigateTo({
			url: '/pagesAuth/login/login'
		});
	};

	// 5. 计算属性
	const userNickname = computed(() => {
		return userInfo.value?.nickname ||
			userInfo.value?.userEmail ||
			userInfo.value?.mobileNumber ||
			'未登录用户';
	});

	const userAvatar = computed(() => {
		return userInfo.value?.avatar || '@/static/image/default-avatar.png';
	});

	const isLogin = computed(() => {
		return !!token.value && !!userInfo.value;
	});

	return {
		token,
		userInfo,
		isLoadingUserInfo, // 暴露加载状态（可选）
		userNickname,
		userAvatar,
		isLogin,
		setToken, // 现在返回用户信息的Promise
		clearUserInfo,
		fetchUserInfoByToken
	};
});