import {
	ref,
	reactive,
	computed
} from "vue";
import {
	defineStore
} from "pinia";



import i18n from "@/locale/index";

export const useCardStore = defineStore("card", () => {

	// 状态定义
	//要申请的卡片的信息
	const applyCardInfo = ref({})
	//持卡人信息
	const cardHolderInfo = ref({})
	
	//邮寄地址
	const mailingAddress = reactive({
		//nation国家
		nation: "",
		//province省
		province: "",
		//市
		city: "",
		//详细地址
		addressInfo: "",
		//postCode邮编
		postCode: "",
		//收件人
		collectMan: "",
		//收件人电话
		collectTel: "",
	})
	//kyc认证信息
	const kycData = reactive({
		//paperworkType证件类型
		paperworkType: "",
		paperworkTypeName: "",
		//paperworkNum证件编号
		paperworkNum: "",
		//expirationTime过期时间
		expirationTime: "",
		//frontPhotoId前置照id
		frontPhotoId: "",
		//frontPhotoUrl前置照url
		frontPhotoUrl: "",
		//backPhotoId后置照id
		backPhotoId: "",
		//backPhotoUrl后置照url
		backPhotoUrl: "",
		//handheldPhotoId手持照id
		handheldPhotoId: "",
		//handheldPhotoUrl手持照url
		handheldPhotoUrl: "",
	})

	

	// 设置状态
	const setKycDataForKey = (key, value) => {
		kycData[key] = value;
	}
	const setMailingAddressForKey = (key, value) => {
		mailingAddress[key] = value;
	}
	//清空数据
	const clearApplyCardData = () => {
		Object.keys(kycData).forEach(key => {
			kycData[key] = "";
		});
		Object.keys(mailingAddress).forEach(key => {
			mailingAddress[key] = "";
		});
	}
	const setCardInfo = (value) => {
		applyCardInfo.value = value;
	}
	const clearCardInfo = () => {
		applyCardInfo.value = {};
	}
	const setCardHolderInfo = (value) => {
		cardHolderInfo.value = value;
	}
	const clearCardHolderInfo = () => {
		cardHolderInfo.value = {};
	}

	return {
		applyCardInfo,
		cardHolderInfo,
		kycData,
		mailingAddress,
		setKycDataForKey,
		setMailingAddressForKey,
		clearApplyCardData,
		setCardInfo,
		clearCardInfo,
		setCardHolderInfo,
		clearCardHolderInfo,
		
	};
});