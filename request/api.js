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
export const loginApi = (data) => {
	return http.post('/ucard/appUser/login', data);
};
// 退出登录
export const signOutApi = (data) => {
	return http.get('/ucard/appUserSys/signOut', data);
}
// 注销账户
export const logoutApi = (data) => {
	return http.get('/ucard/appUserSys/logout', data);
}


// 获取用户信息
export const findToken = (data) => {
	return http.get('/ucard/appUser/findToken', data);
};

// 查询用户持有银行卡总资产
export const findUserCardAssets = (data) => {
	return http.get('/ucard/appUserCard/findUserCardAssets', data);
};

// 查询用户持有全部银行卡列表
export const findUserCardList = (data) => {
	return http.post('/ucard/appUserCard/findUserCardList', data);
};
// 查询用户持有银行卡详情
export const findUserCardInfo = (data) => {
	return http.get('/ucard/appUserCard/findUserCardInfo', data);
};

// 查询银行卡详情
export const findById = (data) => {
	return http.get('/ucard/card/findById', data);
};

// 查询充值账户详情
export const findFirmAccount = (data) => {
	return http.get('/ucard/firmAccount/find', data);
};

// 查询开卡银行卡信息列表
export const findList = (data) => {
	return http.post('/ucard/card/findList', data);
};
// 查询用户银行卡到期时间
export const findCardExpirationTime = (data) => {
	return http.get('/ucard/appUserCard/findCardExpirationTime', data);
};
// 查询用户银行卡安全码
export const findCardCvv = (data) => {
	return http.get('/ucard/appUserCard/findCardCvv', data);
};
// 钱包充值到银行卡
export const topUp = (data) => {
	return http.post('/ucard/card/topUp', data);
};

// 查询持卡人信息列表
export const findByUid = (data) => {
	return http.get('/ucard/cardholder/findByUid', data);
};

// 新增持卡人
export const cardholderAdd = (data) => {
	return http.post('/ucard/cardholder/add', data);
};

// 删除持卡人
export const cardholderDelete = (data) => {
	return http.get('/ucard/cardholder/delete', data);
};

// 查询理财订单
export const orderList = (data) => {
	return http.post('/ucard/product/orderList', data);
};
// 查询交易记录
export const findTransaction = (data) => {
	return http.post('/ucard/appUserCard/findTransaction', data);
};

// 查询钱包交易记录
export const walletLog = (data) => {
	return http.post('/ucard/wallet/walletLog', data);

}
// 获取usdt地址
export const topinUsdtAddress = (data) => {
	return http.get('/ucard/wallet/topinUsdtAddress', data);

}
// 获取用户持仓总资产
export const userAssets = (data) => {
	return http.get('/ucard/product/userAssets', data);
}
//获取国家->省->市级联
export const findCountry = (data) => {
	return http.get('/ucard/dic/findCountry', data);
}

//申请开卡
export const openCardApply = (data) => {
	return http.post('/ucard/card/openCardApply', data);
}
