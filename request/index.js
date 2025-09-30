/**
 * 封装uni.request网络请求
 * 功能特性：
 * 1. 统一基础路径与超时时间
 * 2. 自动携带Token（从Storage获取）
 * 3. 区分JSON/FormData请求头
 * 4. 统一错误提示（业务错误/网络错误）
 * 5. Token失效自动跳登录页
 * 6. 可配置加载提示
 * @param {Object} params - 请求参数
 * @param {string} params.url - 接口路径（相对路径，如'/api/user/register'）
 * @param {string} [params.method='get'] - 请求方法（get/post/put/delete）
 * @param {Object} [params.data={}] - 请求数据
 * @param {Object} [params.header={}] - 自定义请求头（会覆盖默认头）
 * @param {boolean} [params.showLoading=true] - 是否显示加载提示
 * @param {boolean} [params.isFormData=false] - 是否为FormData格式（用于文件上传）
 * @returns {Promise<Object>} - 接口返回的业务数据（data.data）
 */

// 基础配置（根据项目实际情况修改）
const baseConfig = {
	baseUrl: 'http://f46ddc66.natappfree.cc', // 后端基础地址
	timeout: 8000, // 请求超时时间（毫秒）
	tokenKey: 'token', // Storage中Token的存储键名
	loginPage: '/pagesAuth/login/login', // Token失效跳转的登录页路径
	defaultLoadingText: '加载中...' // 默认加载提示文本
};

// 封装请求函数
const request = (params) => {
	// 1. 解构并处理入参默认值
	const {
		url,
		method = 'get',
		data = {},
		header = {},
		showLoading = true,
		isFormData = false
	} = params;

	// 2. 处理加载提示
	let loadingInstance = null;
	if (showLoading) {
		loadingInstance = uni.showLoading({
			title: params.loadingText || baseConfig.defaultLoadingText,
			mask: true // 遮罩防止穿透点击
		});
	}
	const token = uni.getStorageSync('token');
	// 3. 构建请求头（优先级：自定义header > 默认header）
	const defaultHeader = {
		'Content-Type': isFormData ?
			'multipart/form-data' // 文件上传用FormData
			:
			'application/json' // 普通请求用JSON
	};
	try {
		if (token) {
			defaultHeader.token = token;
		}
	} catch (error) {
		console.warn("请求拦截器添加 token 失败：", error);
	}
	const finalHeader = {
		...defaultHeader,
		...header
	};

	// 4. 发起请求并返回Promise
	return new Promise((resolve, reject) => {
		uni.request({
			// 拼接完整URL（处理相对路径开头的'/'，避免重复）
			url: `${baseConfig.baseUrl}${url.startsWith('/') ? '' : '/'}${url}`,
			method: method.toUpperCase(), // 统一转为大写（避免大小写问题）
			header: finalHeader,
			data: data,
			timeout: baseConfig.timeout,

			// 5. 成功回调（处理HTTP状态码和业务状态码）
			success: (response) => {
				const {
					statusCode,
					data: resData
				} = response;

				// 5.1 处理HTTP状态码错误（如404、500）
				if (statusCode !== 200) {
					const errorMsg = `网络错误 [${statusCode}]`;
					uni.showToast({
						title: errorMsg,
						icon: 'none',
						duration: 2000
					});
					return reject(new Error(errorMsg));
				}

				// 5.2 处理业务状态码（根据后端实际约定调整）
				// 假设：200=成功，401=Token失效，其他=业务错误
				switch (resData.rtncode) {
					case 200:
						resolve(resData); // 仅返回业务数据（简化调用层处理）
						break;
					case 401:
						// Token失效：清除无效Token + 跳登录页（避免重复跳转）
						uni.removeStorageSync('token');
						uni.showToast({
							title: '登录已过期，请重新登录',
							icon: 'none',
							duration: 2000
						});
						// 延迟跳转，确保提示能显示
						setTimeout(() => {
							uni.navigateTo({
								url: baseConfig.loginPage
							});
						}, 2000);
						reject(new Error('Token已失效'));
						break;
					default:
						// 其他业务错误（如参数错误、接口异常）
						const errMsg = resData.msg || '操作失败，请稍后重试';
						uni.showToast({
							title: errMsg,
							icon: 'none',
							duration: 2000
						});
						reject(new Error(errMsg));
						break;
				}
			},

			// 6. 失败回调（处理网络错误，如断网、超时）
			fail: (err) => {
				const errorMsg = err.errMsg.includes('timeout') ?
					'请求超时，请检查网络' :
					'网络异常，请稍后重试';
				uni.showToast({
					title: errorMsg,
					icon: 'none',
					duration: 2000
				});
				reject(new Error(errorMsg));
			},

			// 7. 完成回调（无论成功/失败，关闭加载提示）
			complete: () => {
				if (showLoading && loadingInstance) {
					uni.hideLoading();
				}
			}
		});
	});
};

// 导出常用请求方法（简化调用，可选）
export const http = {
	// GET请求
	get: (url, params = {}, options = {}) => {
		return request({
			url,
			method: 'get',
			data: params,
			...options
		});
	},

	// POST请求（默认JSON格式）
	post: (url, data = {}, options = {}) => {
		return request({
			url,
			method: 'post',
			data,
			...options
		});
	},

	// 表单上传请求（FormData格式，用于文件）
	upload: (url, data = {}, options = {}) => {
		return request({
			url,
			method: 'post',
			data,
			isFormData: true,
			...options
		});
	},

	// PUT请求
	put: (url, data = {}, options = {}) => {
		return request({
			url,
			method: 'put',
			data,
			...options
		});
	},

	// DELETE请求
	delete: (url, params = {}, options = {}) => {
		return request({
			url,
			method: 'delete',
			data: params,
			...options
		});
	}
};

// 导出默认请求函数（兼容灵活调用场景）
export default request;