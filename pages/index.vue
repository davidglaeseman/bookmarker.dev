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
			<div class="grid-item" v-for="setting in settings" @click="triggerMethod(setting.method)">
				<i :class="setting.icon"></i>
			</div>
		</div>


		<modal>Modal Example</modal>

	</div>

</template>

<style type="text/css" lang="scss">
	.index {

	}
</style>

<script>
	import styles from '@/assets/sass/__Root.scss';
	import modal from '@/components/modal';
	export default {
		components:{
			modal
		},
		asyncData(){
			return {
				title: 'Bookmarker.dev - Bookmarks For People'
			}
		},
		data() {
			return {
				message: '',
				settings:[
					{name:'Settings', icon: 'fas fa-cog', method: 'changeSettings'},
					{name:'Add Bookmark', icon: 'fa fa-plus', method: 'addBookmark'}
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
			},
			changeSettings(){
				this.$store.commit('modal/modal', {active: true, title: 'changeSettings'});
			},
			addBookmark(){
				this.$store.commit('modal/modal', {active: true, title: 'addBookmark'});
			},
			triggerMethod(method){
				this[method]();
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
