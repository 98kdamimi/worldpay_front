<template>
	<view class="viewBox" style="padding-bottom: 32rpx;">
		<Navbar :title="$t('home.addCardholderTitle')" :showBack="true"></Navbar>
		<view class="box displayRow">
			<view class="small-box">
				<view class="box-title">{{ $t('home.firstName') }}</view>
				<view class="box-input">
					<input type="text" :placeholder="$t('home.enterFirstName')" placeholder-class="box-placeholderinput"
						v-model="parameterData.userName" />
				</view>
			</view>
			<view class="small-box">
				<view class="box-title">{{ $t('home.lastName') }}</view>
				<view class="box-input">
					<input type="text" :placeholder="$t('home.enterLastName')" placeholder-class="box-placeholderinput"
						v-model="parameterData.userSurname" />
				</view>
			</view>
		</view>
		<view class="box">
			<view class="box-title">{{ $t('home.phoneNumber') }}</view>
			<view class="displayRow">
				<view class="box-input displayCenter" style="flex: 1; margin-right: 24rpx;">
					<span>+</span><span>86</span>
					<SvgIcon name="right" width="36" height="36"></SvgIcon>
				</view>
				<view class="box-input" style="flex: 3;">
					<input type="text" :placeholder="$t('home.enterPhoneNumber')"
						placeholder-class="box-placeholderinput" v-model="parameterData.userTel" />
				</view>
			</view>
		</view>
		<view class="box">
			<view class="box-title">{{ $t('home.email') }}</view>
			<view class="box-input">
				<input type="text" :placeholder="$t('home.enterEmail')" placeholder-class="box-placeholderinput"
					v-model="parameterData.userEmail" />
			</view>
		</view>
		<view class="box">
			<view class="box-title">{{ $t('home.idNumber') }}</view>
			<view class="box-input">
				<input type="text" :placeholder="$t('home.enterIdNumber')" placeholder-class="box-placeholderinput"
					v-model="parameterData.userNumber" />
			</view>
		</view>
		<view class="box displayRow">
			<view class="small-box" @click="genderActive = 0">
				<view class="box-title">{{ $t('home.gender') }}</view>
				<view class="box-input displayRow " :class="genderActive == 0 ? 'active' : ''">
					<view style="margin-left: 64rpx;">{{ $t('home.male') }}</view>
					<SvgIcon name="hook" width="32" height="32" v-if="genderActive == 0"></SvgIcon>
				</view>
			</view>
			<view class="small-box" @click="genderActive = 1">
				<view class="box-title">{{ $t('home.gender') }}</view>
				<view class="box-input displayRow " :class="genderActive == 1 ? 'active' : ''">
					<view style="margin-left: 64rpx;">{{ $t('home.female') }}</view>
					<SvgIcon name="hook" width="32" height="32" v-if="genderActive == 1"></SvgIcon>
				</view>
			</view>
		</view>
		<view class="box">
			<view class="box-title">{{ $t('home.address') }}</view>
			<view class="box-input">
				<input type="text" :placeholder="$t('home.enterAddress')" placeholder-class="box-placeholderinput"
					v-model="parameterData.userAddress" />
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
			<up-datetime-picker :show="pickerShow" v-model="dateOfBirth" :minDate="4800000" :maxDate="1786778555000"
				mode="date" @cancel="pickerShow = false" @confirm="pickerShow = false"></up-datetime-picker>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		cardholderAdd
	} from '@/request/api.js'
	import {
		formatDate
	} from '@/utils/common.js'
	import {
		onReady
	} from '@dcloudio/uni-app';

	const genderActive = ref(0)
	const pickerShow = ref(false)
	const dateOfBirth = ref(Date.now());
	const parameterData = ref({
		uid: uni.getStorageSync('userInfo').uid,
		userName: "",
		userSurname: "",
		userTel: "",
		userEmail: "",
		userNumber: "",
		userSex: "",
		userAddress: "",
		userBirthday: ""
	})

	onReady(() => {
		loadCountryList()
	});

	// 新增持卡人
	const getCardholderAdd = async () => {
		parameterData.value.userBirthday = formatDate(dateOfBirth.value)
		parameterData.value.userSex = genderActive.value == 0 ? '男' : '女'
		console.log(parameterData.value)
		return
		try {
			const res = await cardholderAdd(parameterData.value)
			console.log("新增持卡人信息", res)
		} catch (error) {
			console.error(error)
		}
	}
</script>

<style lang="scss" scoped>
	@import './addCardholder.scss';
</style>