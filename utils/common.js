/**
 * 安全格式化银行卡号（支持超长数字，避免精度丢失）
 * @param {string | number} cardNum - 银行卡号（推荐传入字符串，避免大数字精度问题）
 * @returns {string} 格式化后的卡号（4位一组加空格）
 * @author tom
 */
export function formattedCard(cardNum) {
	// 1. 确保输入是字符串（若为数字，先转为字符串）
	let str = typeof cardNum === 'string' ? cardNum : String(cardNum);
	// 2. 过滤所有非数字字符
	const pureNum = str.replace(/\D/g, '');
	// 3. 从左到右每4位加空格（纯字符串操作，避免数字运算）
	return pureNum.replace(/(\d{4})/g, '$1 ').trim(); // 去除末尾可能的空格
}