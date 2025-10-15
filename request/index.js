/**
 * @description 封装 uni.request 网络请求模块
 * 功能特性：
 * 1. 统一基础路径与超时时间
 * 2. 自动携带最新 Token（从 Pinia 实时获取）
 * 3. 统一错误提示（业务错误/网络错误）
 * 4. Token 失效自动跳登录页（防抖处理，防止多次跳转）
 * 5. 支持文件上传、国际化语言头
 */

import {
	useUserStore
} from '@/stores/user.js'

import {
	normalizeLang
} from '@/utils/common.js'

import {
	useAppStore
} from '@/stores/app.js'

import {
	storeToRefs
} from 'pinia'

// ------------------------- 常量定义 -------------------------
export const BASE_URL = 'http://192.168.3.9:8063'
const DEFAULT_TIMEOUT = 10000




// 防止 403 重复跳转登录页
let isNavigatingLogin = false

// ------------------------- Token 失效统一处理 -------------------------
function handleTokenInvalid(msg) {
	if (isNavigatingLogin) return
	isNavigatingLogin = true

	const userStore = useUserStore()
	userStore.logout?.() // 可选：如果你的 store 有 logout 方法

	uni.removeStorageSync('token')
	uni.showToast({
		title: msg || '登录已过期，请重新登录',
		icon: 'none',
		duration: 1500,
	})

	setTimeout(() => {
		uni.reLaunch({
			url: '/pagesAuth/login/login',
		})
		isNavigatingLogin = false
	}, 1500)
}

// ------------------------- 请求拦截器 -------------------------
function requestInterceptor(config) {
	const userStore = useUserStore()
	const appStore = useAppStore()

	const {
		language
	} = storeToRefs(appStore)

	const token = userStore.token

	// header 默认设置
	config.header = {
		'language': normalizeLang(language.value),
		...config.header,
	}

	// 动态添加 Token（实时取 store 值）
	if (token) {
		config.header.token = token
	}

	// 默认超时时间
	if (!config.timeout) config.timeout = DEFAULT_TIMEOUT

	return config
}

// ------------------------- 响应拦截器 -------------------------
function responseInterceptor(response) {
	const {
		data: res
	} = response

	// 后端返回结构中建议有 rtncode/msg/data
	switch (res.rtncode) {
		case 200:
			return res

		case 403:
			// 异步触发，避免 Promise 链阻断
			Promise.resolve().then(() => handleTokenInvalid(res.msg))
			throw new Error(res.msg || 'Token 失效')

		default:
			uni.showToast({
				title: res.msg || '请求错误',
				icon: 'none',
				duration: 2000,
			})
			throw new Error(res.msg || '请求错误')
	}
}



// ------------------------- Loading 管理 -------------------------
let loadingCount = 0 // 当前正在请求的数量

function showLoading() {
	if (loadingCount === 0) {
		uni.showLoading({

			mask: true,
		})
	}
	loadingCount++
}

function hideLoading() {
	if (loadingCount <= 0) return
	loadingCount--
	if (loadingCount === 0) {
		uni.hideLoading()
	}
}


// ------------------------- 核心请求函数 -------------------------
const request = (options) => {
	const config = requestInterceptor(options)

	// 默认是否显示 loading
	const showLoadingFlag = config.showLoading !== false

	if (showLoadingFlag) showLoading()

	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + config.url,
			method: (config.method || 'GET').toUpperCase(),
			data: config.data || {},
			header: config.header || {},
			timeout: config.timeout,

			success: (res) => {
				try {
					const result = responseInterceptor(
						res)
					resolve(result)
				} catch (err) {
					reject(err)
				}
			},

			fail: (err) => {
				const errorMsg = err.errMsg?.includes(
						'timeout') ?
					'请求超时，请检查网络' :
					'网络异常，请稍后重试'

				uni.showToast({
					title: errorMsg,
					icon: 'none',
					duration: 2000,
				})
				reject(new Error(errorMsg))
			},
			complete: () => {
				if (showLoadingFlag) hideLoading()
			},
		})
	})
}

// ------------------------- 请求方法快捷导出 -------------------------
export const http = {
	// GET 请求
	get: (url, params = {}, config = {}) => {
		return request({
			url,
			method: 'GET',
			data: params,
			...config
		})
	},

	// POST 请求（默认 application/json）
	post: (url, data = {}, config = {}) => {
		return request({
			url,
			method: 'POST',
			data,
			...config
		})
	},

	// // PUT 请求
	// put: (url, data = {}, config = {}) => {
	// 	return request({ url, method: 'PUT', data, ...config })
	// },

	// // DELETE 请求
	// delete: (url, data = {}, config = {}) => {
	// 	return request({ url, method: 'DELETE', data, ...config })
	// },
}

// 默认导出主函数
export default request