<template>

	<div class="index">
		<div v-if="message">
			{{message}}
		</div>

		<div class="bookmarks" >

		</div>

		<div class="grid">
			<div class="grid-item bookmark" v-if="bookmarks && bookmarks.length > 0" v-for="bookmark in bookmarks">
				{{bookmark.name}}
			</div>
			<div class="grid-item" v-for="setting in settings">
				<i :class="setting.icon"></i>
			</div>
		</div>

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
				message: '',
				settings:[
					{name:'Settings', icon: 'fas fa-cog'},
					{name:'Add Bookmark', icon: 'fa fa-plus'}
				]
			}
		},
		computed: {
			bookmarks(){
				return this.$store.getters.bookmarks;
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				let bookmarks = localStorage.getItem('bookmarks');
				if(bookmarks){
					bookmarks = JSON.parse(bookmarks);
					this.$store.commit('bookmarks',bookmarks);
				} else {
					this.message = 'You have no saved bookmarks';
				}
			}
		},
		watch: {},
		head() {
			return {
				title: this.title
			}
		}
	}
</script>
