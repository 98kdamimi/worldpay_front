<template>
	<view class="viewBox">
		<!-- 导航栏：标题多语言 -->
		<Navbar :title="$t('cardDetail.title')" :showBack="true"></Navbar>

		<!-- 卡号区域：标题多语言 -->
		<view class="box top">
			<view class="box-title">{{ $t('cardDetail.cardNumber') }}</view>
			<view class="box-txt">
				<view style="margin-right: 12rpx">
					<span>{{ formattedCard(data.cardInfo?.cardNo) }}</span>
				</view>
				<up-copy :content="data.cardInfo?.cardNo">
					<SvgIcon name="copy" width="36" height="36"></SvgIcon>
				</up-copy>
			</view>
		</view>

		<!-- 有效日期+安全码区域：标题多语言 -->
		<view class="smallBox">
			<view>
				<view class="smallBox-title">
					{{ $t('cardDetail.validDate') }}
				</view>
				<view class="smallBox-txt">{{ data.endtime }}</view>
			</view>
			<view>
				<view class="smallBox-title">
					{{ $t('cardDetail.securityCode') }}
				</view>
				<view class="smallBox-cvv">
					<view v-if="data.isShowCVV" class="smallBox-txt">
						{{ data.cvv }}
					</view>
					<view v-else class="smallBox-txt star">
						{{ '***' }}
					</view>
					<view @click="ShowCVV">
						<SvgIcon
							name="eye1"
							width="32"
							height="32"
							v-if="data.isShowCVV"
						></SvgIcon>
						<SvgIcon
							name="eye2"
							width="32"
							height="32"
							v-else
						></SvgIcon>
					</view>
				</view>
			</view>
		</view>

		<!-- 持卡人区域：标题多语言 -->
		<view class="bottomBox bottom">
			<view>
				<view>{{ $t('cardDetail.cardholder') }}</view>
				<view class="name">
					{{
						data.cardInfo?.holderData?.userName +
						' ' +
						data.cardInfo?.holderData?.userSurname
					}}
				</view>
			</view>
		</view>

		<!-- 基础信息区域：标题+内容多语言 -->
		<view class="title">{{ $t('cardDetail.basicInfo') }}</view>
		<view class="boxItem top">
			<view>{{ $t('home.cardType') }}</view>
			<view class="boxItem-txt">
				{{ data.cardInfo?.cardData?.bankCardType }}
			</view>
		</view>
		<view class="boxItem">
			<view>{{ $t('cardDetail.issuer') }}</view>
			<view class="boxItem-txt">
				{{ data.cardInfo?.cardData?.bankCardSource }}
			</view>
		</view>
		<!-- #ifdef H5 -->
		<view style="width: 100vw; height: 1rpx; background: #0f0f0f"></view>
		<!-- #endif -->
		<view class="boxItem bottom">
			<view>{{ $t('cardDetail.cardStatus') }}</view>
			<view class="boxItem-txt">
				{{
					data.cardInfo?.cardData?.enable
						? $t('cardDetail.inUse')
						: $t('cardDetail.unUse')
				}}
			</view>
		</view>

		<!-- 费用区域：标题+内容多语言 -->
		<view class="title">{{ $t('cardDetail.fees') }}</view>
		<view class="boxItem top">
			<view>{{ $t('home.monthlyServiceFee') }}</view>
			<view class="boxItem-txt">
				{{ formatBalance(data.cardInfo?.cardData?.monthFee) }}
			</view>
		</view>
		<view class="boxItem bottom">
			<view>{{ $t('cardDetail.RechargeFee') }}</view>
			<view class="boxItem-txt">
				{{ toPercent(data.cardInfo?.cardData?.rechargeFee) }}
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { formattedCard, toPercent, formatBalance } from '@/utils/common.js';
import {
	findUserCardInfo,
	findCardExpirationTime,
	findCardCvv
} from '@/request/api.js';
import { onLoad } from '@dcloudio/uni-app';

const data = reactive({
	id: '',
	cardInfo: {},
	endtime: '',
	cvv: '',
	isShowCVV: false
});

const ShowCVV = () => {
	data.isShowCVV = !data.isShowCVV;
};

// 页面跳转方法（保持原逻辑）
const goToPage = (address) => {
	uni.navigateTo({
		url: address
	});
};

onLoad(async (options) => {
	console.log(options);
	data.id = options.id;
	try {
		const res = await findUserCardInfo({ id: options.id });
		data.cardInfo = res.data;
		const endtime = await findCardExpirationTime({ id: options.id });
		data.endtime = endtime.data;
		const cvv = await findCardCvv({ id: options.id });
		data.cvv = cvv.data;
	} catch (err) {
		console.log(err);
	}
});
</script>

<style lang="scss" scoped>
@import './cardDetail.scss';
</style>
