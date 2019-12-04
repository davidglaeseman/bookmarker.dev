<template>

	<div class="bookmarker">
		<nuxt />
	</div>

</template>

<script>
	export default {
		data() {
			return {
				name: 'default'
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
