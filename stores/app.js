import {
	ref,
	computed
} from "vue";
import {
	defineStore
} from "pinia";

import i18n from "@/locale/index";

export const useAppStore = defineStore("app", () => {

	// 状态定义
	const language = ref(uni.getStorageSync('locale') || uni.getLocale());

	// 设置多语言
	const setLanguage = (lang) => {
		console.log("i18ni18ni18ni18n",i18n)
		uni.setStorageSync('language', lang);
		uni.setLocale(lang);
		language.value = lang;
		i18n.global.locale = lang
	}

	return {
		language,
		setLanguage
	};
});