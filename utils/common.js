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

/**
 * maskBankCard - 脱敏银行卡号
 *
 * @param {string} card         原始卡号（可含空格/'-'）
 * @param {object} opts         配置项（可选）
 * @param {number} opts.start   保留开头位数（默认 4）
 * @param {number} opts.end     保留结尾位数（默认 4）
 * @param {string} opts.mask    掩码字符（默认 '*'）
 * @param {boolean} opts.group  是否按 4 位分组输出（默认 true）
 * @param {string} opts.sep     分组分隔符（默认 ' '）
 * @returns {string|null}       脱敏后的字符串，失败时返回 null（或根据 strict）
 */
export function maskBankCard(card, opts = {}) {
	const {
		start = 4,
			end = 4,
			mask = '*',
			group = true,
			sep = ' ',
	} = opts;

	if (card == null) return null;

	// 保留原始以便在 strict = false 时可以恢复部分格式（但我们主要返回标准化分组）
	const str = String(card).trim();

	// 移除空格/连字符等非数字字符
	const digits = str.replace(/\D+/g, '');


	// 如果长度太短，直接返回全部掩码或原样（这里选择掩码全部可见部分以避免泄露完整号）
	const len = digits.length;
	if (len === 0) return '';

	// 计算保留位数上限
	const visibleStart = Math.max(0, Math.min(start, len));
	const visibleEnd = Math.max(0, Math.min(end, len - visibleStart));
	const maskedLen = Math.max(0, len - visibleStart - visibleEnd);

	// 构建掩码字符串
	const masked =
		digits.slice(0, visibleStart) +
		(maskedLen > 0 ? mask.repeat(maskedLen) : '') +
		(visibleEnd > 0 ? digits.slice(len - visibleEnd) : '');

	if (!group) return masked;

	// 按常用的每4位分组从左到右
	const groups = [];
	for (let i = 0; i < masked.length; i += 4) {
		groups.push(masked.slice(i, i + 4));
	}
	return groups.join(sep);
}



/**
 * 银行卡号全部脱敏（全星号 + 格式化）
 * @param {string|number} value - 原始卡号
 * @param {object} opts - 配置项
 * @param {string} [opts.mask='*'] - 替换字符
 * @param {string} [opts.sep=' '] - 分隔符
 * @param {number} [opts.group=4] - 每几位分隔
 * @returns {string}
 */
export function maskFullBankCard(value, opts = {}) {
	const {
		mask = '*', sep = ' ', group = 4
	} = opts
	if (!value) return ''

	// 取纯数字
	const digits = String(value).replace(/\D/g, '')
	if (!digits) return ''

	// 全部替换成掩码字符
	const masked = mask.repeat(digits.length)

	// 按指定分组格式化
	const regex = new RegExp(`(.{${group}})`, 'g')
	return masked.replace(regex, `$1${sep}`).trim()
}





// 时间戳转换为YYYY-MM-DD格式
export const formatDate = (timestamp) => {
	// 处理秒级时间戳
	if (timestamp && timestamp.toString().length === 10) {
		timestamp = timestamp * 1000;
	}

	// 处理无效时间戳
	if (!timestamp || isNaN(timestamp)) {
		return '';
	}

	const date = new Date(timestamp);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
};

// 检查文字是否超出
export const checkOverflow = (id, flagRef) => {
	uni.createSelectorQuery()
		.select(`#${id}`)
		.boundingClientRect(rect => {
			if (rect) {
				uni.createSelectorQuery()
					.select(`#${id} span`)
					.boundingClientRect(spanRect => {
						if (spanRect && spanRect.width > rect
							.width) {
							flagRef.value = true
							console.log(id, '需要滚动')
						} else {
							flagRef.value = false
							console.log(id, '不需要滚动')
						}
					})
					.exec()
			}
		})
		.exec()
}


//处理多语言
export function normalizeLang(locale) {
	if (!locale) return 'en'
	const lower = locale.toLowerCase()
	if (lower.startsWith('zh')) {
		// 中文简体（zh-Hans）、繁体（zh-Hant）统一处理
		if (lower.includes('hant') || lower.includes('tw') || lower.includes(
				'hk')) {
			return 'tw'
		}
		return 'zh'
	}
	if (lower.startsWith('en')) return 'en'
	return 'en' // 默认英文
}

/**
 * 将小数转为百分比字符串
 * @param {number|string} value - 小数，例如 0.1234 或 "0.1234"
 * @param {number} decimals - 保留的小数位数，默认 2
 * @returns {string} 百分比字符串，例如 "12.34%"
 */
export function toPercent(value, decimals = 2) {
	if (value === null || value === undefined || isNaN(value)) return '--';
	const num = Number(value);
	return (num * 100).toFixed(decimals) + '%';
}

// 格式化余额
export function formatBalance(amount, decimals = 2) {
  if (amount == null) return '0';
  let num = Number(amount).toFixed(decimals);
  let parts = num.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}


//日期格式化 仅保留月日
export function formatToMonthDay(dateStr) {
	const date = new Date(dateStr);
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');
	return `${month}/${day}`;
}