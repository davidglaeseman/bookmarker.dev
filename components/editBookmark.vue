<template>

	<form @submit.prevent="submit()">
		<h3>Edit Bookmark</h3>
		<div class="m-b-5">
			<input v-model="bookmark.name">
		</div>
		<div class="m-b-5">
			<input v-model="bookmark.url">
		</div>
		<div class="m-b-5">
			<input v-model="bookmark.icon">
		</div>

		<button :disabled="disabled" type="submit" class="success">
			Submit
		</button>
	</form>

</template>

<script>
	export default {
		props:['data'],
		data() {
			return {
				disabled: false,
				bookmark:{}
			}
		},
		computed: {

		},
		mounted() {
			this.bookmark = {...this.data.bookmark};
		},
		methods: {
			submit() {
				this.disabled = true;
				this.$store.commit('updateBookmark',this.bookmark);
				this.bookmark = {...this.$store.getters.bookmarks[this.bookmark.key]};
				setTimeout(()=>{
					this.disabled = false;
				},500);
			}
		},
		watch: {}
	}
</script>
