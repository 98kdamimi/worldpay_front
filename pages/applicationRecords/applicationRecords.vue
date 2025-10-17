<template>
	<view class="viewBox">
		<Navbar :title="$t('home.applicationRecordsTitle')" :showBack="true"></Navbar>
		<view v-if="cardList.length">
			<view class="box" v-for="(item, index) in cardList" :key="index"
				:style="{ backgroundImage: `url(${item.cardData.img})` }" @click="toApplicationDetails(item.id)">
				<view class="cont">
					<view>{{ item.cardData.title }}</view>
					<view>
						<view>
							{{ applyState(item.applyState) }}
						</view>
						<SvgIcon name="right" width="36" height="36"></SvgIcon>
					</view>
				</view>
			</view>
		</view>
		<view class="emty" v-else>
			<view class="emtyIcon">
				<image src="@/static/image/index/emty.png" alt="" mode="widthFix" />
			</view>
			<!-- 替换“暂无数据”为多语言变量，兼容i18n语法 -->
			<view>{{ $t('common.emptyData') }}</view>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { openCardApply } from '@/request/lapi.js';
import { onLoad, onReachBottom } from '@dcloudio/uni-app';
import { useUserStore } from '@/stores/user.js';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
const params = reactive({
	uid: userInfo.value.uid,
	pageNumber: 1,
	pageSize: 10,
	total: 0
});
const cardList = ref([]);
const loadMore = () => {
	if (cardList.value.length >= params.total) return;
	params.pageNumber++;
	getList();
};
const getList = async () => {
	const { data } = await openCardApply(params);
	cardList.value = [...cardList.value, ...data.list];
	params.total = data.total;
};

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

	const toApplicationDetails = (id) => {
		uni.navigateTo({
			url: `/pages/applicationDetails/applicationDetails?id=${id}`
		});
	};
	onLoad(async () => {
		await getList();
	});
	onReachBottom(() => {
		loadMore();
	});
</script>

<style lang="scss" scoped>
	@import './applicationRecords.scss';
</style>