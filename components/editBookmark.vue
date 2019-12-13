<template>

	<form @submit.prevent="submit()" v-if="bookmark">

		<h3>Edit Bookmark</h3>
		<div class="m-b-5">
			<input v-model="bookmark.name" ref="name" id="name" @focus="setFocus('name')">
		</div>
		<div class="m-b-5">
			<input v-model="bookmark.url" ref="url" id="url" @focus="setFocus('url')">
		</div>
		<div class="m-b-5">
			<input v-model="bookmark.favicon" ref="favicon" id="favicon" @focus="setFocus('favicon')">
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

		<pre>{{bookmark}}</pre>

	</form>

</template>

<script>
	export default {
		data() {
			return {
				disabled: false,
				confirm: false,
				bookmark: false,
				focus: false
			}
		},
		computed: {
			modal(){
				return this.$store.getters['modal/modal'];
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			init(){
				this.bookmark = {...this.modal.bookmark};
			},
			setFocus(name){
				this.focus = name;
			},
			confirmDelete(){
				this.$store.commit('removeBookmark',this.bookmark);
				this.$store.commit('modal/modal', false);
			},
			submit() {
				if(this.focus == 'name'){
					if(!this.bookmark.name){
						return false;
					} else {
						this.$refs.url.focus();
					}
				} else if(this.focus == 'url'){
					if(!this.bookmark.url){
						return false;
					} else {
						this.$refs.favicon.focus();
					}
				}

				this.$store.commit('updateBookmark', this.bookmark);
				this.$nextTick(()=>{
					this.bookmark = {...this.bookmark};
				})
			}
		},
		watch: {}
	}
</script>
