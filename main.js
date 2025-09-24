import App from './App'
import uviewPlus from '@/uni_modules/uview-plus'
import * as Pinia from 'pinia';
import i18n from '@/locale/index.js';
import {
	createSSRApp
} from 'vue'

export function createApp() {
	const app = createSSRApp(App)
	app.use(uviewPlus)
	app.use(Pinia.createPinia());
	app.use(i18n)
	return {
		app,
		Pinia
	}
}