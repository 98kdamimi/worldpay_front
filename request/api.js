// @/request/api.js
import {
	http
} from './index.js';

// 发送邮箱验证码
export const sendEmailCode = (data) => {
	return http.get('/ucard/appUser/sendEmailCode', data, {
		showLoading: true, // 显示加载提示
		loadingText: '发送验证码中...' // 自定义加载文本
	});
};

// 用户注册
export const signUp = (data) => {
	return http.post('/ucard/appUser/signUp', data, {
		showLoading: true,
		loadingText: '注册中...'
	});
};

// 用户登录
export const login = (data) => {
	return http.post('/ucard/appUser/login', data, {
		showLoading: true,
		loadingText: '登录中...'
	});
};

// 获取用户信息
export const findToken = (data) => {
	return http.get('/ucard/appUser/findToken', data, {
		showLoading: true,
		loadingText: '登录中...'
	});
};

// 银行卡总资产
export const findUserCardAssets = (data) => {
	return http.get('/ucard/appUserCard/findUserCardAssets', data, {
		showLoading: false,
	});
};

// 查询用户持有银行卡
export const findUserCardList = (data) => {
	return http.post('/ucard/appUserCard/findUserCardList', data, {
		showLoading: false,
	});
};

// 查询银行卡信息列表
export const findList = (data) => {
	return http.post('/ucard/card/findList', data, {
		showLoading: false,
	});
};

// 查询用户持卡人
export const findByUid = (data) => {
	return http.get('/ucard/cardholder/findByUid', data, {
		showLoading: false,
	});
};

// 新增持卡人
export const cardholderAdd = (data) => {
	return http.post('/ucard/cardholder/add', data, {
		showLoading: false,
	});
};