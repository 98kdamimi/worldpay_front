import {
	ref,
	computed
} from 'vue'
import {
	useUserStore
} from "@/stores/user.js"
import {
	storeToRefs
} from "pinia";

export function useAuth() {

	const userStore = useUserStore()

	const {
		token
	} = storeToRefs(userStore)
	
	const isLogin = computed(()=>{
		return !!token
	})

	return {
		isLogin
	}

}