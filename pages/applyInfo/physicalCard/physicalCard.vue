<template>
	<view class="viewBox">
		<view>
			<view
				class="worldpay-banner"
				:style="{ backgroundImage: `url(${applyCardInfo.img})` }"
			></view>
			<view class="worldpay-txt">{{ $t('home.applyCardType') }}</view>
			<view class="worldpay-title">
				{{ applyCardInfo.title }}
			</view>
			<view>
				<view class="title">{{ $t('home.cardholderInfo') }}</view>
				<view class="boxItem top">
					<view>{{ $t('home.phoneNumber') }}</view>
					<view class="boxItem-txt">
						{{ cardHolderInfo.userTel }}
					</view>
				</view>
				<view class="boxItem">
					<view>{{ $t('home.email') }}</view>
					<view class="boxItem-txt">
						{{ cardHolderInfo.userEmail }}
					</view>
				</view>
				<!-- #ifdef H5 -->
				<view
					style="width: 100vw; height: 1rpx; background: #0f0f0f"
				></view>
				<!-- #endif -->
				<view class="boxItem bottom">
					<view>{{ $t('home.idNumber') }}</view>
					<view class="boxItem-txt">
						{{ cardHolderInfo.userNumber }}
					</view>
				</view>
			</view>
			<view>
				<view class="title">{{ $t('home.cardRules') }}</view>
				<view class="boxItem top">
					<view>{{ $t('home.maxCardBalance') }}</view>
					<view class="boxItem-txt">
						{{ formatBalance(applyCardInfo.rechargeMaxLimit) }}
						{{ applyCardInfo.ccy }}
					</view>
				</view>
				<view class="boxItem bottom">
					<view>{{ $t('home.monthlyServiceFee') }}</view>
					<view class="boxItem-txt">
						{{ formatBalance(applyCardInfo.monthFee) }}
						{{ applyCardInfo.ccy }}
					</view>
				</view>
			</view>
			<!-- 费用 -->
			<view>
				<view class="title">{{ $t('home.applicationFee') }}</view>
				<view class="boxItem top" style="padding: 24rpx">
					<view style="display: flex; align-items: center">
						<SvgIcon name="icon1" width="64" height="64"></SvgIcon>
						<view
							class="boxItem-txt"
							style="font-weight: 500; margin-left: 12rpx"
						>
							USD
						</view>
					</view>
				</view>
				<!-- #ifdef H5 -->
				<view
					style="width: 100vw; height: 1rpx; background: #0f0f0f"
				></view>
				<!-- #endif -->
				<view class="boxItem bottom">
					<view>{{ $t('home.availableBalance') }}</view>
					<view class="boxItem-txt" style="display: flex">
						<view style="margin-right: 12rpx">
							{{ formatBalance(availableBalance) }}
							{{ applyCardInfo.ccy }}
						</view>
						<SvgIcon
							name="add"
							width="36"
							height="36"
							@click="toWalletRecharge"
						></SvgIcon>
					</view>
				</view>
			</view>
			<view>
				<view class="title">{{ $t('home.mailingAddress') }}</view>
				<view class="select-box" @click="openNationPop">
					<view>{{ $t('home.country') }}</view>
					<view class="select-box-right">
						<view v-if="mailingAddress.nation">
							{{ mailingAddress.nation }}
						</view>
						<view v-else>{{ $t('home.selectCountry') }}</view>
						<SvgIcon
							name="bottom"
							width="36"
							height="36"
							style="margin-left: 24rpx"
						></SvgIcon>
					</view>
				</view>
				<view class="select-box" @click="openProvincePop">
					<view>{{ $t('home.province') }}</view>
					<view class="select-box-right">
						<view v-if="mailingAddress.province">
							{{ mailingAddress.province }}
						</view>
						<view v-else>{{ $t('home.selectProvince') }}</view>
						<SvgIcon
							name="bottom"
							width="36"
							height="36"
							style="margin-left: 24rpx"
						></SvgIcon>
					</view>
				</view>
				<view class="select-box" @click="openCityPop">
					<view>{{ $t('home.city') }}</view>
					<view class="select-box-right">
						<view v-if="mailingAddress.city">
							{{ mailingAddress.city }}
						</view>
						<view v-else>{{ $t('home.selectCity') }}</view>
						<SvgIcon
							name="bottom"
							width="36"
							height="36"
							style="margin-left: 24rpx"
						></SvgIcon>
					</view>
				</view>
				<view class="select-box">
					<view>{{ $t('home.detailedAddress') }}</view>
					<view class="select-box-right">
						<input
							@blur="setAddressInfo"
							type="text"
							v-model="addressInfo"
							:placeholder="$t('home.enterDetailedAddress')"
							placeholder-style="color: #9191aa;"
						/>
					</view>
				</view>
				<view class="select-box">
					<view>{{ $t('home.postalCode') }}</view>
					<view class="select-box-right">
						<input
							@blur="setPostCode"
							type="text"
							v-model="postCode"
							:placeholder="$t('home.enterPostalCode')"
							placeholder-style="color: #9191aa;"
						/>
					</view>
				</view>
				<view class="select-box">
					<view>{{ $t('home.recipientName') }}</view>
					<view class="select-box-right">
						<input
							@blur="setCollectMan"
							type="text"
							v-model="collectMan"
							:placeholder="$t('home.enterRecipientName')"
							placeholder-style="color: #9191aa;"
						/>
					</view>
				</view>
				<view class="select-box">
					<view>{{ $t('home.recipientPhone') }}</view>
					<view class="select-box-right">
						<input
							@blur="setCollectTel"
							type="text"
							v-model="collectTel"
							:placeholder="$t('home.enterRecipientPhone')"
							placeholder-style="color: #9191aa;"
						/>
					</view>
				</view>
			</view>
			<view v-if="userInfo.kycState == 1 || userInfo.kycState == 4">
				<view class="title">{{ $t('home.identityInfo') }}</view>
				<view class="select-box" @click="openPaperworkPop">
					<view>{{ $t('home.idType') }}</view>

					<view class="select-box-right">
						<view v-if="kycData.paperworkType">
							{{ kycData.paperworkTypeName }}
						</view>
						<view v-else>{{ $t('home.selectIdType') }}</view>
						<SvgIcon
							name="bottom"
							width="36"
							height="36"
							style="margin-left: 24rpx"
						></SvgIcon>
					</view>
				</view>
				<view class="select-box">
					<view>{{ $t('home.idNumber') }}</view>
					<view class="select-box-right">
						<input
							v-model="paperworkNum"
							@blur="setPaperworkNum"
							type="text"
							:placeholder="$t('home.enterIdNumber')"
							placeholder-style="color: #9191aa;"
						/>
					</view>
				</view>
				<view class="select-box" @click="openEndTimePop">
					<view>{{ $t('home.idValidDate') }}</view>
					<view class="select-box-right">
						<view v-if="kycData.expirationTime">
							{{ kycData.expirationTime }}
						</view>
						<view v-else>{{ $t('home.selectDate') }}</view>
						<SvgIcon
							name="bottom"
							width="36"
							height="36"
							style="margin-left: 24rpx"
						></SvgIcon>
					</view>
				</view>
				<view class="select-box" @click="toUploadImg">
					<view>{{ $t('home.uploadIdInfo') }}</view>
					<view class="select-box-right">
						<view>{{ uploadProgress }}</view>
						<SvgIcon
							name="right"
							width="36"
							height="36"
							style="margin-left: 24rpx"
						></SvgIcon>
					</view>
				</view>
			</view>
			<view class="prompt">
				<view class="promptBox">
					<view>{{ $t('home.cardOpeningFee') }}</view>
					<view class="prompt-txt">
						{{ formatBalance(applyCardInfo.openCardCost) }}
						{{ applyCardInfo.ccy }}
					</view>
				</view>
				<!-- <view class="promptBox">
					<view>{{ $t('home.prepaymentFee') }}</view>
					<view class="prompt-txt">
						{{ formatBalance(applyCardInfo.preSaveCost) }}
						{{ applyCardInfo.ccy }}
					</view>
				</view> -->
				<view class="promptBox">
					<view>{{ $t('home.monthlyServiceFee') }}</view>
					<view class="prompt-txt">
						{{ formatBalance(applyCardInfo.monthFee) }}
						{{ applyCardInfo.ccy }}
					</view>
				</view>
				<view class="promptBox">
					<view class="prompt-txt">
						{{ $t('home.paymentAmount') }}
					</view>
					<view style="color: #ffe330">
						{{ formatBalance(totalFee) }}
						{{ applyCardInfo.ccy }}
					</view>
				</view>
			</view>
			<view class="button" @click="confirmApplication">
				{{ $t('home.confirmApplication') }}
			</view>
			<view class="button-placeholder"></view>
		</view>

		<view class="select-Popup">
			<!-- 国家选择 -->
			<up-picker
				v-model:show="nationShow"
				:columns="nationList"
				@confirm="setNation"
				keyName="name"
				valueName="id"
			></up-picker>
			<!-- 省选择 -->
			<up-picker
				v-model:show="provinceShow"
				:columns="provinceList"
				@confirm="setProvince"
				keyName="name"
				valueName="id"
			></up-picker>
			<!-- 市选择 -->
			<up-picker
				v-model:show="cityShow"
				:columns="cityList"
				@confirm="setCity"
				keyName="name"
				valueName="id"
			></up-picker>
			<!-- 证件类型选择 -->
			<up-picker
				v-model:show="typeShow"
				:columns="paperworkTypeList"
				@confirm="setPaperworkType"
				keyName="name"
				valueName="id"
			></up-picker>
		</view>

		<view class="select-Date-Popup">
			<up-datetime-picker
				@cancel="endTimeShow = false"
				v-model:show="endTimeShow"
				v-model="dateOfBirth"
				:minDate="4800000"
				:maxDate="2786778555000"
				confirmColor="#1e3ad6"
				mode="date"
				@confirm="setExpirationTime"
			></up-datetime-picker>
		</view>
		//余额不足
		<up-modal
			:show="applyShow"
			:showConfirmButton="false"
			bgColor="#141414"
		>
			<view class="applyModal">
				<view class="applyModal-title">
					<SvgIcon
						class="svg-icon"
						name="hint"
						width="36"
						height="36"
					></SvgIcon>
					<view>{{ $t('home.hint') }}</view>
				</view>
				<view class="applyModal-txt">
					{{ $t('home.insufficientBalanceTip') }}
				</view>
				<view class="applyModal-button">
					<view class="apply" @click="toWalletRecharge">
						{{ $t('home.walletRecharge') }}
					</view>
				</view>
			</view>
		</up-modal>
	</view>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { formatBalance, formatDate } from '@/utils/common.js';
import { openCardApply, findCountry } from '@/request/api.js';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useCardStore } from '@/stores/card.js';
import { useUserStore } from '@/stores/user.js';

const { t } = useI18n();

const cardStore = useCardStore();
const userStore = useUserStore();

const { applyCardInfo, cardHolderInfo, mailingAddress, kycData } =
	storeToRefs(cardStore);

const {
	clearCardInfo,
	clearCardHolderInfo,
	setKycDataForKey,
	setMailingAddressForKey,
	clearApplyCardData
} = cardStore;

const { userInfo } = storeToRefs(userStore);

const applyShow = ref(false);

//国家列表
const nationList = ref([]);
//是否展示国家列表
const nationShow = ref(false);
//省列表
const provinceList = ref([]);
//是否展示省列表
const provinceShow = ref(false);
//市列表
const cityList = ref([]);
//是否展示市列表
const cityShow = ref(false);
//证件类型列表
const typeShow = ref(false);
//证件到期时间expirationTime
const endTimeShow = ref(false);

//当前时间
const dateOfBirth = ref(Date.now());
//详细地址
const addressInfo = ref(mailingAddress.value.addressInfo);
//postCode邮编
const postCode = ref(mailingAddress.value.postCode);
//收件人
const collectMan = ref(mailingAddress.value.collectMan);
//收件人电话
const collectTel = ref(mailingAddress.value.collectTel);
//证件号码
const paperworkNum = ref(kycData.value.paperworkNum);

//paperworkTypeList
const paperworkTypeList = ref([
	[
		{
			id: 1,
			name: t('card.realNameRecognitionIDCard'),
			value: 'NATIONAL_ID'
		},
		{
			id: 2,
			name: t('card.realNameRecognitionPassport'),
			value: 'PASSPORT'
		}
	]
]);

const availableBalance = computed(() => {
	return (
		parseFloat(userInfo.value.walletBalance) -
		parseFloat(userInfo.value.freezeBalance)
	);
});

const totalFee = computed(() => {
	return (
		parseFloat(applyCardInfo.value.openCardCost) +
		parseFloat(applyCardInfo.value.monthFee)
	);
});

const uploadProgress = computed(() => {
	const ids = [
		kycData.value.frontPhotoId,
		kycData.value.backPhotoId,
		kycData.value.handheldPhotoId
	];
	const uploadedCount = ids.filter((id) => !!id).length;

	if (uploadedCount === 0) return t('home.uploadIdInfoPlaceholder');
	if (uploadedCount === 1) return '1/3';
	if (uploadedCount === 2) return '2/3';
	return t('card.realNameRecognitionProgressSuccess');
});

//获取国家列表
const getNationList = async () => {
	const res = await findCountry();
	nationList.value = [res.data];
	provinceList.value = [];
	cityList.value = [];
};
//获取省列表
const getProvinceList = async (nationId) => {
	const res = await findCountry({
		parentId: nationId
	});
	provinceList.value = [res.data];
	cityList.value = [];
};
//获取市列表
const getCityList = async (provinceId) => {
	const res = await findCountry({
		parentId: provinceId
	});
	cityList.value = [res.data];
};

//打开国家选择
const openNationPop = async () => {
	await getNationList();
	nationShow.value = true;
};
//打开省选择
const openProvincePop = async () => {
	provinceShow.value = true;
};
//打开市选择
const openCityPop = async () => {
	cityShow.value = true;
};
//打开证件类型选择
const openPaperworkPop = async () => {
	typeShow.value = true;
};
//打开时间选择
const openEndTimePop = async () => {
	endTimeShow.value = true;
};

//设置国家
const setNation = (e) => {
	setMailingAddressForKey('nation', e.value[0].name);
	getProvinceList(e.value[0].id);
};
//设置省
const setProvince = (e) => {
	setMailingAddressForKey('province', e.value[0].name);
	getCityList(e.value[0].id);
};
//设置市
const setCity = (e) => {
	setMailingAddressForKey('city', e.value[0].name);
};
//设置详细地址
const setAddressInfo = (e) => {
	setMailingAddressForKey('addressInfo', e.detail.value);
};
//设置邮编
const setPostCode = (e) => {
	setMailingAddressForKey('postCode', e.detail.value);
};
//设置收件人
const setCollectMan = (e) => {
	setMailingAddressForKey('collectMan', e.detail.value);
};
//设置收件人电话
const setCollectTel = (e) => {
	setMailingAddressForKey('collectTel', e.detail.value);
};
//设置证件类型
const setPaperworkType = (e) => {
	console.log(e.value[0]);
	setKycDataForKey('paperworkType', e.value[0].value);
	setKycDataForKey('paperworkTypeName', e.value[0].name);
};
//设置证件号码
const setPaperworkNum = (e) => {
	setKycDataForKey('paperworkNum', e.detail.value);
};

//设置证件到期时间
const setExpirationTime = (e) => {
	endTimeShow.value = false;
	setKycDataForKey('expirationTime', formatDate(e.value));
};

const toUploadImg = () => {
	uni.navigateTo({
		url: '/pages/applyInfo/physicalCard/upLoadIdImg'
	});
};

//校验用户是否填写完整
const isValid = (kycData, mailingAddress) => {
	// 如果两个对象任意一个为空，直接 false
	if (!kycData || !mailingAddress) return false;

	// 获取两个对象的所有值
	const kycValues = Object.values(kycData);
	const addressValues = Object.values(mailingAddress);

	// 检查是否存在任意一个为假值（null、undefined、空字符串等）
	const hasEmptyKyc = kycValues.some(
		(v) => v === null || v === undefined || v === ''
	);
	const hasEmptyAddress = addressValues.some(
		(v) => v === null || v === undefined || v === ''
	);

	// 如果任意对象有空值，返回 false
	return !(hasEmptyKyc || hasEmptyAddress);
};
const isValidMailingAddress = (mailingAddress) => {
	// 如果对象任意一个为空，直接 false
	if (!mailingAddress) return false;

	// 获取对象的所有值
	const addressValues = Object.values(mailingAddress);

	// 检查是否存在任意一个为假值（null、undefined、空字符串等）

	const hasEmptyAddress = addressValues.some(
		(v) => v === null || v === undefined || v === ''
	);

	// 如果任意对象有空值，返回 false
	return !hasEmptyAddress;
};
const toWalletRecharge = () => {
	uni.reLaunch({
		url: '/pages/walletRecharge/walletRecharge',
		success: function () {
			clearCardInfo();
			clearCardHolderInfo();
			clearApplyCardData();
		}
	});
};

const confirmApplication = async () => {
	console.log(totalFee.value);
	console.log(availableBalance.value);
	if (totalFee.value > availableBalance.value) {
		applyShow.value = true;
		return;
	}
	let isValidUser;
	if (userInfo.value.kycState == 1 || userInfo.value.kycState == 4) {
		isValidUser = isValid(kycData.value, mailingAddress.value);
	} else {
		isValidUser = isValidMailingAddress(mailingAddress.value);
	}
	if (!isValidUser) {
		uni.showToast({
			title: t('card.realNameRecognitionFillInAll'),
			icon: 'none'
		});
		return;
	}

	const params = {
		cardId: applyCardInfo.value.id,
		holderId: cardHolderInfo.value.id,
		topupType: 1,
		uid: userInfo.value.uid,
		kycData: kycData.value,
		mailingAddress: mailingAddress.value
	};
	const res = await openCardApply(params);
	uni.showToast({
		title: t('home.cardApplicationTip'),
		icon: 'none'
	});
	setTimeout(() => {
		uni.reLaunch({
			url: '/pages/index/index',
			success: function () {
				clearCardInfo();
				clearCardHolderInfo();
				clearApplyCardData();
			}
		});
	}, 2000);
};

onLoad(() => {});
</script>

<style lang="scss" scoped>
@import './physicalCard.scss';

.select-Popup {
	:deep(.u-popup__content) {
		background: #16171a;
		border-radius: 30rpx;
		.u-toolbar {
			font-weight: 500;
			.u-toolbar__wrapper__cancel {
				padding: 0 40rpx;
			}
			.u-toolbar__wrapper__confirm {
				padding: 0 40rpx;
			}
		}
		.u-picker__view__column {
			.u-picker__view__column__item {
				color: #fff;
			}

			.uni-picker-view-mask {
				background-image: none;
			}
			.uni-picker-view-indicator {
				background-color: #88888830;
				border-radius: 30rpx;
				&::after {
					border: none;
				}
				&::before {
					border: none;
				}
			}
		}
	}
}

.select-Date-Popup {
	:deep(.u-popup__content) {
		background: #16171a;
		border-radius: 30rpx;
		.u-toolbar {
			font-weight: 500;
			.u-toolbar__wrapper__cancel {
				padding: 0 40rpx;
			}
			.u-toolbar__wrapper__confirm {
				padding: 0 40rpx;
			}
		}
		.u-picker__view__column {
			.u-picker__view__column__item {
				color: #fff;
			}
			.uni-picker-view-mask {
				background-image: none;
			}
			.uni-picker-view-indicator {
				background-color: #88888830;
				&::after {
					border: none;
				}
				&::before {
					border: none;
				}
			}
			&:first-child {
				.uni-picker-view-indicator {
					border-radius: 30rpx 0 0 30rpx;
				}
			}
			&:last-child {
				.uni-picker-view-indicator {
					border-radius: 0 30rpx 30rpx 0;
				}
			}
		}
	}
}
</style>
