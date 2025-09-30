// @/request/api.js
import {
	http
} from './index.js';

// 发送邮箱验证码
export const sendEmailCode = (data) => {
	return http.get('/ucard/appUser/sendEmailCode', data);
};

// 用户注册
export const signUp = (data) => {
	return http.post('/ucard/appUser/signUp', data);
};

// 用户登录
export const login = (data) => {
	return http.post('/ucard/appUser/login', data);
};

// 获取用户信息
export const findToken = (data) => {
	return http.get('/ucard/appUser/findToken', data);
};

// 银行卡总资产
export const findUserCardAssets = (data) => {
	return http.get('/ucard/appUserCard/findUserCardAssets', data);
};

// 查询用户持有银行卡
export const findUserCardList = (data) => {
	return http.post('/ucard/appUserCard/findUserCardList', data);
};

// 查询银行卡信息列表
export const findList = (data) => {
	return http.post('/ucard/card/findList', data);
};

// 查询用户持卡人
export const findByUid = (data) => {
	return http.get('/ucard/cardholder/findByUid', data);
};

// 新增持卡人
export const cardholderAdd = (data) => {
	return http.post('/ucard/cardholder/add', data);
};

// 删除持卡人
export const cardholderDelete = (data) => {
	return http.get('/ucard/cardholder/delete', data, );
};

// 查询理财订单
export const orderList = (data) => {
	return http.post('/ucard/product/orderList', data);
};