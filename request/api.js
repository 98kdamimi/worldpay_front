// 引入 request 文件
import request from './index.js'
 
// 注册接口
export const signUp = (data) => {
	return request({
		url: '/ucard/appUser/signUp',
		method: 'post',
		data,
	})
}
