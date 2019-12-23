<template>

	<div>
		<h3 class="m-b-15">Settings</h3>

		<div class="m-b-15">
			<label>
				Background Color
			</label>
			<div class="row">
				<div class="col col-6">
					<input type="color" v-model="backgroundColor">
				</div>
				<div class="col col-6">
					<input type="text" v-model="backgroundColor" maxlength="7">
				</div>
			</div>
		</div>

		<div class="m-b-15">
			<label for="backgroundImage">
				Background Image
			</label>
			<input id="backgroundImage" v-model="backgroundImage">
		</div>

		<button :disabled="disabled" @click="save()" class="success">
			Save Changes
		</button>

	</div>

</template>

<script>
	export default {
		props:['data'],
		data() {
			return {
				backgroundColor:'',
				backgroundImage:'',
				disabled: false
			}
		},
		computed: {
			settings(){
				return this.$store.getters.settings;
			}
		},
		mounted() {
			this.backgroundImage = this.settings.backgroundImage;
			this.backgroundColor = this.settings.backgroundColor;
		},
		methods: {
			save(){
				this.disabled = true;
				let settingsChanged = {
					backgroundColor: this.backgroundColor,
					backgroundImage: this.backgroundImage
				};

				this.$store.commit('updateSettings',settingsChanged);
				/**
				 * Placebo disabled/enabled
				 */
				setTimeout(()=>{
					this.disabled = false;
				},300);
			}
		},
		watch: {}
	}
</script>
