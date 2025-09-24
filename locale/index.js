import {
	createI18n
} from 'vue-i18n'
import en from './en.json'
import zhHans from './zh-Hans.json'
import zhHant from './zh-Hant.json'

const messages = {
	en,
	'zh-Hans': zhHans,
	'zh-Hant': zhHant
}

let i18nConfig = {
	locale: uni.getLocale(), // 获取已设置的语言
	messages
}

console.log("获取到当前语言设置",uni.getLocale())

const i18n = createI18n(i18nConfig)

export default i18n;