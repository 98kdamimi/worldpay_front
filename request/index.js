/**
 * 封装uni.request
 * @param {Object} params
 * @returns {Promise}
 */

const base_url = 'http://192.168.3.9:8063'
// 请求超出时间
const timeout = 5000

// 需要修改token，和根据实际修改请求头
const request = (params) => {
	let url = params.url;
	let method = params.method || "get";
	let data = params.data || {};
	let header = {
		'Authorization': uni.getStorageSync('token') || '',
		...params.header
	}
	// if (method == "post") {
	// 	header = {
	// 		'Content-Type': 'multipart/form-data'
	// 	};
	// }
	return new Promise((resolve, reject) => {
			uni.request({
					url: base_url + url,
					method: method,
					header: header,
					data: data,
					timeout,
					success(response) {
						const {
							data
						} = response
						if (data.rtncode == 200) {
							resolve(data);
						} else {
							uni.showToast({
								title: data.msg,
								icon: "none"
							})
							reject(new Error(data.msg || "Error"));

						}
					}
				},
				fail(err) {
					reject(err);
				}
			});
	}).catch(() => {});
};

export default request;