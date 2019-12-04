<template>

	<div class="index">
		<h1>{{name}}</h1>
	</div>

</template>

<style type="text/css" lang="scss">
	.index {

	}
</style>

<script>
	import styles from '@/assets/sass/__Root.scss';
	export default {
		asyncData(){
			return {
				title: 'Bookmarker.dev - Bookmarks For People'
			}
		},
		data() {
			return {
				name: 'Bookmarker.dev'
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
		watch: {},
		head() {
			return {
				title: this.name
			}
		}
	}
</script>
