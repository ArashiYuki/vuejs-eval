<template>
	<button class="btn" :class="`btn-${variant} btn-${size}`" >
		<i v-if="iconLeft" :class="['bi', `bi-${iconLeft}`, { 'icon-left': $slots.default }]"></i>
		<slot></slot>
		<i v-if="iconRight" :class="['bi', `bi-${iconRight}`, { 'icon-right': $slots.default }]"></i>
	</button>
</template>

<script setup>

defineProps({
	iconLeft: {
		type: String,
		required: false,
	},
	iconRight: {
		type: String,
		required: false,
	},
	variant: {
		type: String,
		default: 'primary',
		validator(value) {
			return ['primary', 'secondary', 'danger', 'warning', 'success', 'light', 'black', 'info'].includes(value);
		},
	},
	size: {
		type: String,
		default: 'md',
		validator(value) {
			return ['sm', 'md', 'lg'].includes(value);
		},
	}
})

</script>

<style>

.icon-left {
	margin-right: .5rem;
}

.icon-right {
	margin-left: .5rem;
}
</style>