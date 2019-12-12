<template>

	<form @submit.prevent="saveBookmark()">

		<div class="m-b-15">
			<label for="name">
				Name
			</label>
			<input ref="name" id="name" v-model="name">
		</div>
		<div class="m-b-15">
			<label for="url">
				url
			</label>
			<input ref="url" id="url" v-model="url">
		</div>
		<div class="m-b-15">
			<label for="favicon">
				favicon
			</label>
			<input ref="favicon" id="favicon" v-model="favicon">
		</div>

		<div>
			<button type="submit" class="success">
				Save
			</button>
		</div>
	</form>

</template>

<script>
	export default {
		props:['data'],
		data() {
			return {
				name:'reddit',
				url:'https://www.reddit.com',
				favicon:'https://www.redditstatic.com/desktop2x/img/favicon/apple-icon-144x144.png',
			}
		},
		computed: {

		},
		mounted() {

		},
		methods: {
			saveBookmark() {
				let bookmark = {
					name: this.name,
					url: this.url,
					favicon: this.favicon
				};
				this.$store.commit('addBookmark', bookmark);
			}
		},
		watch: {}
	}
</script>
