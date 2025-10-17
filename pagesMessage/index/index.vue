<template>
	<view class="viewBox">
		<FixedStatusBar></FixedStatusBar>
		<view class="stickyContent" :style="{ top: notchHeight + 'px' }">
			<view class="header">
				<view class="header-left-logo">
					<image src="@/static/image/index/logoTitle.png" alt="" mode="widthFix" />
				</view>
			</view>
			<up-tabs style="padding: 0 32rpx" :list="list1" lineColor="#ffffff" @change="getChange"
				:activeStyle="{ color: '#ffffff', fontWeight: '500', fontSize: '30rpx' }"
				:inactiveStyle="{ color: '#999999', fontWeight: '400', fontSize: '30rpx' }"></up-tabs>
		</view>

		<!-- #ifdef APP -->
		<up-pull-refresh :refreshing="refreshing" @refresh="reload">
			<MessageListSlot :messageList="messageList" :goToPage="goToPage" />
		</up-pull-refresh>
		<!-- #endif -->

		<!-- #ifdef H5 -->
		<MessageListSlot :messageList="messageList" :goToPage="goToPage" />
		<!-- #endif -->
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue';
	import {
		onLoad,
		onReady,
		onReachBottom
	} from '@dcloudio/uni-app';
	import {
		useI18n
	} from 'vue-i18n';
	import {
		findAll
	} from '@/request/api.js';
	// 引入封装好的组件
	import MessageListSlot from './MessageListSlot.vue';

	const {
		t
	} = useI18n();

	// tabs切换列表
	const list1 = reactive([{
			name: t('notification.system')
		}, // 系统通知
		{
			name: t('notification.activity')
		} // 活动通知
	]);

	// 请求参数
	const requestParams = reactive({
		cardType: 1,
		pageNumber: 1,
		pageSize: 10,
		total: 0
	});

	// 状态管理
	const notchHeight = ref(0);
	const messageList = ref({});
	const refreshing = ref(false);

	// 页面就绪逻辑
	onReady(() => {
		uni.getSystemInfo({
			success: (res) => {
				notchHeight.value = res.safeArea?.top || 0;
				if (!notchHeight.value) {
					notchHeight.value = res.statusBarHeight || 0;
				}
			},
			fail: () => {
				// #ifdef APP-ANDROID
				notchHeight.value = 52;
				// #endif
				notchHeight.value = 0;
			}
		});
	});
	onLoad(() => {
		getFindAll();
	})

	// 获取消息列表
	const getFindAll = async () => {
		try {
			const {
				data
			} = await findAll({
				type: requestParams.cardType,
				pageNumber: requestParams.pageNumber,
				pageSize: requestParams.pageSize
			});
			// 分页数据处理
			if (requestParams.pageNumber > 1 && messageList.value?.list) {
				messageList.value.list = [...messageList.value.list, ...data.list];
			} else {
				messageList.value = data;
			}
			requestParams.total = data.total || 0;
		} catch (error) {
			console.error('获取通知列表失败:', error);
		} finally {
			uni.hideLoading();
			refreshing.value = false;
		}
	};

	// tabs切换
	const getChange = (e) => {
		requestParams.pageNumber = 1;
		requestParams.cardType = e.index === 0 ? 1 : 2;
		getFindAll();
	};

	// 跳转页面
	const goToPage = (address) => {
		uni.navigateTo({
			url: address
		});
	};

	// 下拉刷新
	const reload = () => {
		requestParams.pageNumber = 1;
		messageList.value = {};
		getFindAll();
	};

	// 触底加载更多
	const loadMore = () => {
		if (messageList.value?.list?.length >= requestParams.total) {
			return;
		}
		requestParams.pageNumber += 1;
		getFindAll();
	};
	onReachBottom(() => {
		loadMore();
	});
</script>

<style lang="scss" scoped>
	@import './index.scss';
</style>