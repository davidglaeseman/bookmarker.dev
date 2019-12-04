<template>

	<div class="settings">
		{{name}}
	</div>

</template>

<style type="text/css" lang="scss">
	.settings {

	}
</style>

<script>
	//	import example from '@/components/example.vue'
	export default {
		//	components:{ example, },
		data() {
			return {
				name: 'settings'
			}
		},
		computed: {},
		mounted() {

		},
		methods: {
			example() {
				return this.name;
			}
		},
		watch: {}
	}
</script>
