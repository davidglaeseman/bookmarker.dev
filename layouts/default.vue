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
				if(this.settings.backgroundImages){
					let random = Math.floor(Math.random() * this.settings.backgroundImages.length);
					style+= 'background-image:url('+this.settings.backgroundImages[random]+');';
				}

				window.onNuxtReady(() => {
					document.body.style = style;
				})
			}
		},
		watch: {},
		head: {
			bodyAttrs: {

			}
		}
	}
</script>
