import {
	ref,
	computed
} from "vue";

import {
	defineStore
} from "pinia";

export const useUserStore = defineStore("user", () => {
	const token = ref(uni.getStorageSync('token') || 11111111111)
	const userInfo = ref(uni.getStorageSync('token') || null)
	const setToken = (val) => {
		token.value = val
	}
	const clearUserInfo = async () => {
		token.value = ''
		userInfo.value = {}
	}
	return {
		token,
		clearUserInfo,
		userInfo,
		setToken
	}
})