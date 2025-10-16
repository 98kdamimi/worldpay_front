// @/request/api.js
import {
	http
} from './index.js';

// 查询用户持仓
export const userAssets = (data) => {
	return http.get('/ucard/product/userAssets', data);
};
export const openCardApply = (data) => {
	return http.post('/ucard/cardApply/openCardApply', data);
};
export const openCardApplyInfo = (data) => {
	return http.get('/ucard/cardApply/openCardApplyInfo', data);
};
// 查询用户物流信息
export const findLogistics = (data) => {
	return http.get('/ucard/card/findLogistics', data);
};


