<template>

	<div class="bookmarker">
		<nuxt />
	</div>

</template>

<script>
	export default {
		data() {
			return {
				name: 'default',
				dataLoaded: false
			}
		},
		computed: {
			settings(){
				return this.$store.getters.settings;
			},
			modal(){
				return this.$store.getters['modal/modal'];
			}
		},
		mounted() {
			this.setStyles();
		},
		methods: {
			setStyles() {
				let style = '';
				if(this.settings.backgroundColor){
					style+= 'background-color:'+this.settings.backgroundColor+';'
				}
				if(this.settings.backgroundImage){
					style+= 'background-image:url('+this.settings.backgroundImage+');';
				}
				document.body.style = style;
			}
		},
		watch: {
			settings:{
				handler(data){
					this.setStyles();
				},
				deep: true
			}
		}
	}
</script>

