<template>

	<form @submit.prevent="saveBookmark()">

		<h3 class="m-b-15">Add Bookmark</h3>

		<div class="m-b-10">
			<label for="name">
				Name
			</label>
			<input ref="name" id="name" v-model="name">
		</div>
		<div class="m-b-10">
			<label for="url">
				URL
			</label>
			<input ref="url" id="url" v-model="url">
		</div>
		<div class="m-b-10">
			<label for="favicon">
				Favicon
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
				name:'',
				url:'',
				favicon:'',
				faviconSuggestion: false
			}
		},
		computed: {
			length(){
				return this.$store.getters.bookmarks.length;
			}
		},
		mounted() {

		},
		methods: {
			saveBookmark() {
				let bookmark = {
					name: this.name,
					url: this.url,
					favicon: this.favicon,
					key: (this.length + 1)
				};
				this.$store.commit('addBookmark', bookmark);
				this.$nextTick(()=>{
					this.$store.commit('modal/modal', {active: true, type: 'editBookmark', bookmark: bookmark});
				});
			}
		},
		watch: {
		}
	}
</script>
