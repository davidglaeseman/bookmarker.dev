<template>

	<div class="index">
		<div v-if="message">
			{{message}}
		</div>

		<div class="bookmarks" >

		</div>

		<div class="grid bookmarks">
			<div class="grid-item bookmark" v-if="bookmarks && Object.keys(bookmarks).length > 0" v-for="bookmark in bookmarks">
				<div class="edit-bookmark" @click="editBookmark(bookmark)">
					<i class="fas fa-ellipsis-v"></i>
				</div>
				<div class="link">
					<a :href="bookmark.url" target="_blank">
						<span class="icon" v-if="bookmark.icon">
							<img :src="bookmark.icon">
						</span>
						<span>
                        	{{bookmark.name}}
                    	</span>
					</a>
				</div>
			</div>
			<div class="grid-item settings" v-for="setting in settingsOptions" @click="triggerMethod(setting.method)">
				<i :class="setting.icon"></i>
			</div>
		</div>

		<modal></modal>

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
		data() {
			return {
				message: '',
				settingsOptions:[
					{name:'Add Bookmark', icon: 'fa fa-plus', method: 'addBookmark'},
					{name:'Settings', icon: 'fas fa-cog', method: 'changeSettings'},
				]
			}
		},
		computed: {
			bookmarks(){
				return this.$store.getters.bookmarks;
			},
			settings(){
				return this.$store.getters.settings;
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				let localStorageBookmarks = this.$getStorage('bookmarks');

				if(localStorageBookmarks){
					this.$store.commit('bookmarks',localStorageBookmarks);
				}
				let localStorageSettings = this.$getStorage('settings');
				if(localStorageSettings){
					this.$store.commit('settings', localStorageSettings);
				}
			},
			changeSettings(){
				this.$store.commit('modal/modal', {active: true, type: 'settings'});
			},
			addBookmark(){
				this.$store.commit('modal/modal', {active: true, type: 'addBookmark'});
			},
			triggerMethod(method){
				this[method]();
			},
			editBookmark(bookmark){
				this.$store.commit('modal/modal', {active: true, type: 'editBookmark', bookmark: bookmark});
			}
		},
		watch: {},
		head() {
			return {
				title: 'Bookmarker.dev - Bookmarks For People'
			}
		}
	}
</script>
