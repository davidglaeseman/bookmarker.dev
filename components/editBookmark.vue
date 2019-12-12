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
			<input v-model="bookmark.favicon">
		</div>

		<button :disabled="disabled" type="submit" class="success">
			Submit
		</button>
		<button v-if="confirm===false" @click="confirm = true" class="error" type="button">
			Delete Bookmark
		</button>
		<button v-else="" @click="confirmDelete()" class="danger" type="button">
			Confirm Delete Bookmark
		</button>
	</form>

</template>

<script>
	export default {
		props:['data'],
		data() {
			return {
				disabled: false,
				bookmark:{},
				confirm: false
			}
		},
		computed: {

		},
		mounted() {
			this.bookmark = {...this.data.bookmark};
			this.bookmark.key = this.data.key;
		},
		methods: {
			confirmDelete(){
				this.$store.commit('removeBookmark',this.bookmark);
				this.$store.commit('modal/modal', false);
			},
			submit() {
				this.disabled = true;
				this.$store.commit('updateBookmark',this.bookmark);
				setTimeout(()=>{
					this.disabled = false;
				},500);
			}
		},
		watch: {}
	}
</script>
