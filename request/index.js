/**
 * 封装uni.request网络请求
 * 功能特性：
 * 1. 统一基础路径与超时时间
 * 2. 自动携带Token（从Storage获取）
 * 3. 统一错误提示（业务错误/网络错误）
 * 4. Token失效自动跳登录页

 * @param {Object} params - 请求参数
 * @param {string} params.url - 接口路径（相对路径，如'/api/user/register'）
 * @param {string} [params.method='get'] - 请求方法（get/post/put/delete）
 * @param {Object} [params.data={}] - 请求数据
 * @param {Object} [params.header={}] - 自定义请求头（会覆盖默认头）
 * @returns {Promise<Object>} - 接口返回的业务数据（data.data）
 */



import {
	useUserStore
} from "@/stores/user.js"



const BASE_URL = 'http://f46ddc66.natappfree.cc';

// 请求拦截器
function requestInterceptor(config) {
	const userStore = useUserStore()
	const token = userStore.token;
	if (token) {
		config.header = {
			...config.header,
			token,
		};
	}
	config.data = {
		...config.data,
	};
	// 默认超时 10 秒，可在请求中自定义
	if (!config.timeout) config.timeout = 10000;
	console.log('请求拦截器处理后的config:', config);
	return config;
}




// 封装请求函数
const request = (options) => {
	const config = requestInterceptor(options);

	return new Promise((resolve, reject) => {
		uni.request({
			// 拼接完整URL（处理相对路径开头的'/'，避免重复）
			url: BASE_URL + config.url,
			method: (config.method || 'GET').toUpperCase() // 统一转为大写（避免大小写问题）
			data: config.data || {},
			header: config.header || {},
			timeout: config.timeout,


			// 5. 成功回调（处理HTTP状态码和业务状态码）
			success: (response) => {
				const {
					data: res
				} = response;

				console.log("调用接口", res)

				// 200=成功，403=Token失效，其他=业务错误
				switch (res.rtncode) {
					case 200:
						resolve(res.data || {}); // 仅返回业务数据（简化调用层处理）
						break;
					case 403:
						// Token失效：清除无效Token + 跳登录页（避免重复跳转）
						uni.removeStorageSync('token');
						uni.navigateTo({
							url: '/pagesAuth/login/login',
							success: () => {
								uni.showToast({
									title: res.msg || "Error",
									icon: 'none',
									duration: 2000
								});
							}
						});

						reject(new Error(res.msg || "Error"));
						break;
					default:
						uni.showToast({
							title: res.msg || "Error",
							icon: 'none',
							duration: 2000
						});
						reject(new Error(res.msg || "Error"));
						break;
				}
			},

			// 6. 失败回调（处理网络错误，如断网、超时）
			fail: (err) => {
				const errorMsg = err.errMsg && err.errMsg.includes('timeout') ?
					'请求超时，请检查网络' :
					'网络异常，请稍后重试';
				uni.showToast({
					title: errorMsg,
					icon: 'none',
					duration: 2000
				});
				reject(new Error(errorMsg));
			},
		});
	});
};

// 导出常用请求方法（简化调用，可选）
export const http = {
	// GET请求
	get: (url, params = {}) => {
		return request({
			url,
			method: 'GET',
			data: params,
		});
	},

	// POST请求（默认JSON格式）
	post: (url, data = {}) => {
		return request({
			url,
			method: 'POST',
			data,
		});
	},



};

// 导出默认请求函数（兼容灵活调用场景）
export default request;