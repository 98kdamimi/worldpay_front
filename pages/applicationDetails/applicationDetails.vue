<template>
	<view class="viewBox">
		<Navbar
			:title="$t('home.applicationDetailsTitle')"
			:showBack="true"
		></Navbar>
		<view class="line"></view>
		<view class="box top">
			<view>{{ $t('home.applicationStatus') }}</view>
			<view class="txt">{{ applyState(cardInfo?.applyState) }}</view>
		</view>
		<view class="box bottom">
			<view>{{ $t('home.cardType') }}</view>
			<view class="txt">{{ cardType(cardInfo?.cardType) }}</view>
		</view>
		<!-- 实体卡 -->
		<view v-if="cardInfo?.cardType == 'PHYSICAL'">
			<view class="line"></view>
			<!-- <view class="box top">
				<view>{{ $t('home.courierService') }}</view>
				<view class="txt">-</view>
			</view> -->
			<view class="box bottom">
				<view>{{ $t('home.trackingNumber') }}</view>
				<view
					class="box-right"
					v-if="cardInfo?.userCardData?.logisticsNum"
					@click="toLogisticsInformation"
				>
					<view class="txt">
						{{ cardInfo?.userCardData?.logisticsNum }}
					</view>
					<SvgIcon name="right" width="30" height="30"></SvgIcon>
				</view>
				<view class="txt" v-else>-</view>
			</view>
			<view class="line"></view>
			<view class="box top">
				<view>{{ $t('home.recipientName') }}</view>
				<view class="txt">
					{{
						`${cardInfo?.applyManData?.userName} ${cardInfo?.applyManData?.userSurname}`
					}}
				</view>
			</view>
			<view class="box">
				<view>{{ $t('home.recipientPhone') }}</view>
				<view class="txt">{{ cardInfo?.applyManData?.userTel }}</view>
			</view>
			<view class="box">
				<view>{{ $t('home.recipientAddress') }}</view>
				<view class="txt">
					{{ `${cardInfo?.applySendData?.addressInfo}` }}
				</view>
			</view>
			<!-- <view class="box bottom">
				<view>{{ $t('home.boundPromoCode') }}</view>
				<view class="txt">sdfasda45fww</view>
			</view> -->
		</view>
		<!-- 虚拟卡 -->
		<view v-else>
			<view class="line"></view>
			<view class="box top">
				<view>{{ $t('home.phoneNumber') }}</view>
				<view class="txt">{{ cardInfo?.applyManData?.userTel }}</view>
			</view>
			<view class="box">
				<view>{{ $t('home.email') }}</view>
				<view class="txt">{{ cardInfo?.applyManData?.userEmail }}</view>
			</view>
			<!-- <view class="box bottom">
				<view>{{ $t('home.idNumber') }}</view>
				<view class="txt">3636563333336335</view>
			</view> -->
		</view>
		<!-- <view class="button">{{ $t('home.reapply') }}</view> -->
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { openCardApplyInfo } from '@/request/lapi.js';
import { onLoad } from '@dcloudio/uni-app';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const cardInfo = ref({});
const applyState = (state) => {
	switch (state) {
		case 1:
			return t('applyState.one');
		case 2:
			return t('applyState.two');
		case 3:
			return t('applyState.three');
	}
};
const cardType = (type) => {
	switch (type) {
		case 'PHYSICAL':
			return t('home.physicalCard');
		case 'VIRTUAL':
			return t('home.virtualCard');
	}
};
const toLogisticsInformation = () => {
	uni.navigateTo({
		url: `/pages/logisticsInformation/logisticsInformation?logisticsNum=${cardInfo.value?.userCardData?.logisticsNum}`
	});
};

onLoad(async (opt) => {
	const { data } = await openCardApplyInfo({ id: opt.id });
	cardInfo.value = data;
});
</script>

<style lang="scss" scoped>
@import './applicationDetails.scss';
</style>
