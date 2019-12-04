<template>

	<div class="add-edit-bookmark">
		{{name}}
	</div>

</template>

<style type="text/css" lang="scss">
	.add-edit-bookmark {

	}
</style>

<script>
	//	import example from '@/components/example.vue'
	export default {
		//	components:{ example, },
		data() {
			return {
				name: 'add-edit-bookmark'
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
