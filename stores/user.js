import {
	ref,
	computed
} from "vue";
import {
	defineStore
} from "pinia";
import {
	loginApi,
	signOutApi,
	logoutApi,
	findToken
} from "@/request/api.js";
import {
	useAppStore
} from "./app";



export const useUserStore = defineStore("user", () => {
	const appStore = useAppStore();
	const {
		setLanguage
	} = appStore;

	// 状态定义
	const token = ref(uni.getStorageSync('token') || '');
	const userInfo = ref(uni.getStorageSync('userInfo') || "");


	// 加载状态：用于标识是否正在获取用户信息（避免重复请求）
	const isLoadingUserInfo = ref(false);

	// 获取用户信息
	const fetchUserInfoByToken = async () => {

		if (isLoadingUserInfo.value) {
			return null;
		}

		isLoadingUserInfo.value = true;

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
		

		// 更新用户信息
		userInfo.value = res;

		// 同步到本地存储
		uni.setStorageSync('userInfo', userInfo.value);

		isLoadingUserInfo.value = false;

		return userInfo.value; // 返回最新用户信息
	};





	// 清除用户信息
	const clearUserInfo = async () => {
		token.value = '';
		userInfo.value = null;
		uni.removeStorageSync('token');
		uni.removeStorageSync('userInfo');
		uni.reLaunch({
			url: '/pagesAuth/login/login'
		});
	};

	// 定义登录方法
	const login = async (userEmail, userPassword,cid) => {
		const res = await loginApi(userEmail, userPassword,cid);
		token.value = res;
		uni.setStorageSync('token', res);
		const userinfo = await fetchUserInfoByToken()
		return userinfo
	};
	
	// 退出登录
	const logout = async () => {
		await signOutApi();
		clearUserInfo();
	};
	
	// 注销账户
	const deleteAccount = async () => {
		// TODO: 实现注销账户的逻辑
		const params = {
			uid: userInfo.value.uid
		}
		await logoutApi(params)
		clearUserInfo();
	}

	//  计算属性
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
		login,
		logout,
		userNickname,
		userAvatar,
		isLogin,
		clearUserInfo,
		fetchUserInfoByToken
	};
});