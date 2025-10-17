<template>
	<up-popup v-model:show="visible" mode="bottom" bgColor="#141414">
		<div class="password-popup">
			<div class="popup-header">
				<span class="popup-title">{{ $t('recharge.passwordVerification') }}</span>
				<span class="popup-close" @click="close">
					<SvgIcon name="off" width="56" height="56" />
				</span>
			</div>
			<div class="popup-text">{{ $t('recharge.enterPassword') }}</div>
			<div class="popup-input">
				<up-code-input
					:maxlength="6"
					:dot="true"
					:focus="true"
					disabledDot
					@finish="finishInput"
				/>
			</div>
		</div>
	</up-popup>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
	show: {
		type: Boolean,
		default: false
	}
});

const emit = defineEmits(['finish', 'update:show']);

const visible = ref(props.show);

// 支持 v-model:show 双向绑定
watch(() => props.show, val => {
	visible.value = val;
});

watch(visible, val => {
	emit('update:show', val);
});

// const close = () => {
// 	visible.value = false;
// };

const finishInput = (value) => {
	console.log("拿到数据",value)
	emit('finish', value);
	// close();
};
</script>

<style lang="scss">
.password-popup {
	position: relative;
	padding: 40rpx 32rpx 80rpx;
	font-family: PingFangSC, PingFang SC;
	color: #fff;

	.popup-header {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		margin-bottom: 20rpx;

		.popup-title {
			font-size: 36rpx;
			font-weight: 500;
			text-align: center;
		}

		.popup-close {
			position: absolute;
			right: 0;
			top: 0;
			cursor: pointer;
		}
	}

	.popup-text {
		font-size: 30rpx;
		font-weight: 400;
		text-align: center;
		margin-bottom: 32rpx;
	}

	.popup-input {
		display: flex;
		justify-content: center;
	}
}

/* 自定义输入框样式 */
:deep(.u-code-input__item) {
	background-color: #fff;
	border-radius: 20rpx;
}
</style>
