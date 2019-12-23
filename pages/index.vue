<template>

	<div class="index">

		<div class="grid bookmarks" >
			<draggable handle=".re-order-icon" class="grid-container" v-model="bookmarkList" @start="drag=true" @end="drag=false">
				<div class="grid-item bookmark"   v-for="bookmark in bookmarks">
					<div class="edit-bookmark" @click="editBookmark(bookmark, key)">
						<i class="fas fa-ellipsis-v"></i>
					</div>
					<div class="re-order-bookmark">
						<i class="fas fa-arrows-alt re-order-icon"></i>
					</div>
					<div class="link">
						<a :href="bookmark.url" target="_blank">
							<span class="icon" v-if="bookmark.favicon">
								<img :src="bookmark.favicon">
							</span>
							<span class="name">
                        		{{bookmark.name}}
                    		</span>
						</a>
					</div>
				</div>

				<div class="grid-item settings" v-for="setting in settingsOptions" @click="triggerMethod(setting.method)">
					<i :class="setting.icon"></i>
				</div>

			</draggable>



		</div>

		<modal></modal>

	</div>

</template>

<script>
	import styles from '@/assets/sass/__Root.scss';
	import modal from '@/components/modal';
	import draggable from 'vuedraggable'
	export default {
		components:{
			modal,
			draggable
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
			bookmarkList:{
				get(){
					return this.$store.getters.bookmarks;
				},
				set(bookmarks){
					this.$store.commit('reorderBookmarks',bookmarks);
				}
			},
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
			editBookmark(bookmark, key){
				let book = {...bookmark};
				this.$store.commit('modal/modal', {active: true, type: 'editBookmark', bookmark: book});
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
