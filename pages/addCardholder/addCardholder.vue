<template>
	<view class="viewBox" style="padding-bottom: 32rpx;">
		<Navbar title="新增持卡人" :showBack="true"></Navbar>
		<view class="box displayRow">
			<view class="small-box">
				<view class="box-title">英文名</view>
				<view class="box-input">
					<input type="text" placeholder="请输入英文名" placeholder-class="box-placeholderinput" />
				</view>
			</view>
			<view class="small-box">
				<view class="box-title">英文姓</view>
				<view class="box-input">
					<input type="text" placeholder="请输入英文姓" placeholder-class="box-placeholderinput" />
				</view>
			</view>
		</view>
		<view class="box">
			<view class="box-title">手机号</view>
			<view class="displayRow">
				<view class="box-input displayCenter" style="flex: 1; margin-right: 24rpx;">
					<span>+</span><span>86</span>
					<SvgIcon name="right" width="36" height="36"></SvgIcon>
				</view>
				<view class="box-input" style="flex: 3;">
					<input type="text" placeholder="请输入手机号" placeholder-class="box-placeholderinput" />
				</view>
			</view>
		</view>
		<view class="box">
			<view class="box-title">邮箱</view>
			<view class="box-input">
				<input type="text" placeholder="请输入邮箱" placeholder-class="box-placeholderinput" />
			</view>
		</view>
		<view class="box">
			<view class="box-title">证件号码</view>
			<view class="box-input">
				<input type="text" placeholder="请输入证件号码" placeholder-class="box-placeholderinput" />
			</view>
		</view>
		<view class="box displayRow">
			<view class="small-box" @click="genderActive = 0">
				<view class="box-title">性别</view>
				<view class="box-input displayRow " :class="genderActive == 0 ? 'active' : ''">
					<view style="margin-left: 64rpx;">男</view>
					<SvgIcon name="hook" width="32" height="32" v-if="genderActive == 0"></SvgIcon>
				</view>
			</view>
			<view class="small-box" @click="genderActive = 1">
				<view class="box-title">性别</view>
				<view class="box-input displayRow " :class="genderActive == 1 ? 'active' : ''">
					<view style="margin-left: 64rpx;">女</view>
					<SvgIcon name="hook" width="32" height="32" v-if="genderActive == 1"></SvgIcon>
				</view>
			</view>
		</view>
		<view class="box">
			<view class="box-title">住址</view>
			<view class="box-input">
				<input type="text" placeholder="请输入住址" placeholder-class="box-placeholderinput" />
			</view>
		</view>
		<view class="box">
			<view class="box-title">出生日期</view>
			<view class="box-input displayRow" @click="pickerShow = true">
				<view>{{ formatDate(dateOfBirth) }}</view>
				<SvgIcon name="bottom" width="36" height="36"></SvgIcon>
			</view>
		</view>
		<view class="button">保存</view>
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
		formatDate
	} from '@/utils/common.js'

	const genderActive = ref(0)
	const pickerShow = ref(false)
	const dateOfBirth = ref(Date.now());
</script>

<style lang="scss" scoped>
	@import './addCardholder.scss';
</style>