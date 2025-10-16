<template>
	<view class="viewBox">
		<Navbar :title="$t('logisticsInfo.title')" :showBack="true"></Navbar>
		<view
			class="logisticsContainer"
			v-if="logisticsInfo && logisticsInfo.length > 0"
		>
			<up-steps
				:current="0"
				dot
				direction="column"
				activeColor="#1E3AD6FF"
			>
				<view
					class="logisticsSteps"
					v-for="(item, index) in logisticsInfo"
					:key="index"
				>
					<up-steps-item>
						<template #title>
							<view class="logisticsContent">
								<view class="logisticsTime">
									{{
										`${item.time_raw.date} ${item.time_raw.time}`
									}}
								</view>
								<view>
									{{ item.description }}
								</view>
							</view>
						</template>
					</up-steps-item>
				</view>
			</up-steps>
		</view>
		<view class="emty" v-else>
			<view class="emtyIcon">
				<image
					src="@/static/image/index/emty.png"
					alt=""
					mode="widthFix"
				/>
			</view>
			<view>{{ $t('logisticsInfo.empty') }}</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { findLogistics } from '@/request/lapi.js';
const logisticsInfo = ref([]);

onLoad(async (options) => {
	const { data } = await findLogistics({
		logisticsNum: options.logisticsNum
	});
	logisticsInfo.value = data.logisticsInfo;
});
</script>

<style lang="scss" scoped>
.logisticsContainer {
	padding: 0 32rpx;
	color: #ffffff;
	.logisticsSteps {
		&:first-child {
			.logisticsTime{
				color: #1E3AD6FF;
			}
		}
	}
	:deep(.u-steps-item__wrapper) {
		background-color: #0f0f0f;
	}
}
.emty {
	width: 100vw;
	height: 750rpx;
	margin: 90rpx auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-family: PingFangSC, PingFang SC;
	font-weight: 400;
	font-size: 24rpx;
	color: #ffffff;

	.emtyIcon {
		width: 222rpx;
		height: 142rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 24rpx;
	}
}
</style>
