<template>
	<view class="viewBox" style="padding-bottom: 32rpx">
		<Navbar
			:title="$t('home.addCardholderTitle')"
			:showBack="true"
		></Navbar>
		<view class="box displayRow">
			<view class="small-box">
				<view class="box-title">{{ $t('home.firstName') }}</view>
				<view class="box-input">
					<input
						type="text"
						:placeholder="$t('home.enterFirstName')"
						placeholder-class="box-placeholderinput"
						v-model="parameterData.userName"
					/>
				</view>
			</view>
			<view class="small-box">
				<view class="box-title">{{ $t('home.lastName') }}</view>
				<view class="box-input">
					<input
						type="text"
						:placeholder="$t('home.enterLastName')"
						placeholder-class="box-placeholderinput"
						v-model="parameterData.userSurname"
					/>
				</view>
			</view>
		</view>
		<view class="box">
			<view class="box-title">{{ $t('home.phoneNumber') }}</view>
			<view class="displayRow">
				<view
					class="box-input displayCenter"
					style="flex: 1; margin-right: 24rpx"
					@click="showCountryModal = true"
				>
					<span>{{ selectedCountry.dial_code }}</span>
					<SvgIcon name="right" width="36" height="36"></SvgIcon>
				</view>
				<view class="box-input" style="flex: 3">
					<input
						type="text"
						:placeholder="$t('home.enterPhoneNumber')"
						placeholder-class="box-placeholderinput"
						v-model="parameterData.userTel"
					/>
				</view>
			</view>
		</view>
		<view class="box">
			<view class="box-title">{{ $t('home.email') }}</view>
			<view class="box-input">
				<input
					type="text"
					:placeholder="$t('home.enterEmail')"
					placeholder-class="box-placeholderinput"
					v-model="parameterData.userEmail"
				/>
			</view>
		</view>
		<view class="box">
			<view class="box-title">{{ $t('home.idNumber') }}</view>
			<view class="box-input">
				<input
					type="text"
					:placeholder="$t('home.enterIdNumber')"
					placeholder-class="box-placeholderinput"
					v-model="parameterData.userNumber"
				/>
			</view>
		</view>
		<view class="box displayRow">
			<view class="small-box" @click="genderActive = 0">
				<view class="box-title">{{ $t('home.gender') }}</view>
				<view
					class="box-input displayRow"
					:class="genderActive == 0 ? 'active' : ''"
				>
					<view style="margin-left: 64rpx">
						{{ $t('home.male') }}
					</view>
					<SvgIcon
						name="hook"
						width="32"
						height="32"
						v-if="genderActive == 0"
					></SvgIcon>
				</view>
			</view>
			<view class="small-box" @click="genderActive = 1">
				<view class="box-title">{{ $t('home.gender') }}</view>
				<view
					class="box-input displayRow"
					:class="genderActive == 1 ? 'active' : ''"
				>
					<view style="margin-left: 64rpx">
						{{ $t('home.female') }}
					</view>
					<SvgIcon
						name="hook"
						width="32"
						height="32"
						v-if="genderActive == 1"
					></SvgIcon>
				</view>
			</view>
		</view>
		<view class="box">
			<view class="box-title">{{ $t('home.address') }}</view>
			<view class="box-input">
				<input
					type="text"
					:placeholder="$t('home.enterAddress')"
					placeholder-class="box-placeholderinput"
					v-model="parameterData.userAddress"
				/>
			</view>
		</view>
		<view class="box">
			<view class="box-title">{{ $t('home.dateOfBirth') }}</view>
			<view class="box-input displayRow" @click="pickerShow = true">
				<view>{{ formatDate(dateOfBirth) }}</view>
				<SvgIcon name="bottom" width="36" height="36"></SvgIcon>
			</view>
		</view>
		<view class="button" @click="getCardholderAdd">
			<view>{{ $t('home.save') }}</view>
		</view>
		<view class="button-placeholder"></view>
		<view>
			<up-datetime-picker
				:show="pickerShow"
				v-model="dateOfBirth"
				:minDate="4800000"
				:maxDate="1786778555000"
				mode="date"
				@cancel="pickerShow = false"
				@confirm="pickerShow = false"
			></up-datetime-picker>
		</view>
		<up-popup
			:show="showCountryModal"
			mode="bottom"
			@close="showCountryModal = false"
		>
			<view class="country-popup">
				<view class="country-popup-header">
					<view class="country-popup-title">
						{{ $t('select.countryRegios') }}
					</view>
					<SvgIcon
						name="off"
						width="56"
						height="56"
						@click="showCountryModal = false"
					></SvgIcon>
				</view>
				<view class="country-popup-search">
					<input
						type="text"
						v-model="countrySearch"
						:placeholder="$t('select.countryRegiosCode')"
						class="country-search-input"
					/>
				</view>
				<scroll-view scroll-y style="height: 70vh">
					<view
						class="country-item"
						v-for="item in filteredCountryList"
						:key="item.code"
						@click="selectCountry(item)"
					>
						<view>{{ item.name }}</view>
						<view>{{ item.dial_code }}</view>
					</view>
				</scroll-view>
			</view>
		</up-popup>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { cardholderAdd } from '@/request/api.js';
import { formatDate } from '@/utils/common.js';
import { onReady } from '@dcloudio/uni-app';
import { countrycode_zh, countrycode_en } from '@/utils/countrycode.js';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const genderActive = ref(0);
const pickerShow = ref(false);
const dateOfBirth = ref(Date.now());
const parameterData = ref({
	uid: uni.getStorageSync('userInfo').uid,
	userName: '',
	userSurname: '',
	userTelDialCode: '',
	userTelCode: '',
	userTel: '',
	userEmail: '',
	userNumber: '',
	userSex: '',
	userAddress: '',
	userBirthday: ''
});

const showCountryModal = ref(false);
const countrySearch = ref('');
const selectedCountry = ref({
	name: '中国',
	dial_code: '+86',
	code: 'CN'
});

const countryList = computed(() => {
	return uni.getLocale() === 'en' ? countrycode_en : countrycode_zh;
});

const filteredCountryList = computed(() => {
	if (!countrySearch.value) return countryList.value;
	const keyword = countrySearch.value.trim().toLowerCase();
	return countryList.value.filter(
		(item) =>
			item.name.toLowerCase().includes(keyword) ||
			item.dial_code.replace(/\s/g, '').includes(keyword)
	);
});

const selectCountry = (item) => {
	selectedCountry.value = item;
	showCountryModal.value = false;
	countrySearch.value = '';
};

// 新增持卡人
const getCardholderAdd = async () => {
	// 名字
	if (!parameterData.value.userName.trim()) {
		uni.showToast({
			title: t('home.enterFirstName'),
			icon: 'none'
		});
		return;
	}

	// 姓氏
	if (!parameterData.value.userSurname.trim()) {
		uni.showToast({
			title: t('home.enterLastName'),
			icon: 'none'
		});
		return;
	}

	// 手机号
	if (!parameterData.value.userTel.trim()) {
		uni.showToast({
			title: t('home.enterPhoneNumber'),
			icon: 'none'
		});
		return;
	}

	// 邮箱
	if (!parameterData.value.userEmail) {
		uni.showToast({
			title: t('home.enterEmail'),
			icon: 'none'
		});
		return;
	}

	// 身份证号
	if (!parameterData.value.userNumber.trim()) {
		uni.showToast({
			title: t('home.enterIdNumber'),
			icon: 'none'
		});
		return;
	}

	// 地址
	if (!parameterData.value.userAddress.trim()) {
		uni.showToast({
			title: t('home.enterAddress'),
			icon: 'none'
		});
		return;
	}

	parameterData.value.userBirthday = formatDate(dateOfBirth.value);
	parameterData.value.userSex = genderActive.value == 0 ? '男' : '女';
	parameterData.value.userTelDialCode = selectedCountry.value.dial_code;
	parameterData.value.userTelCode = selectedCountry.value.code;
	try {
		await cardholderAdd(parameterData.value);
		uni.navigateBack({
			delta: 1,
			success() {
				uni.showToast({
					title: t('cardholder.addSuccess'),
					icon: 'none'
				});
			}
		});
	} catch (error) {
		console.error(error);
	}
};
</script>

<style lang="scss" scoped>
@import './addCardholder.scss';
</style>
