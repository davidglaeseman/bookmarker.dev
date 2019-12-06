<template>

	<div>
		<h1>Settings</h1>

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

		<div>
			Background Image(s)

			<div class="row m-b-10">
				<div class="col col-10">
					<input v-model="newBackgroundImage">
				</div>
				<div class="col col-2 align-right">
					<button @click="add()" :disabled="newBackgroundImage.length < 1" class="primary">Add</button>
				</div>
			</div>
			<div class="row m-b-5" v-for="(bg, key) in backgroundImages">
				<div class="col col-10">
					<input  :value="bg">
				</div>
				<div class="col col-2 align-right">
					<button @click="remove(bg, key)" class="danger">Remove</button>
				</div>
			</div>

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
				newBackgroundImage:'',
				backgroundImages:[],
				disabled: false
			}
		},
		computed: {
			settings(){
				return this.$store.getters.settings;
			}
		},
		mounted() {
			this.backgroundImages = [...this.settings.backgroundImages];
			this.backgroundColor = this.settings.backgroundColor;
		},
		methods: {
			add() {
				this.backgroundImages.push(this.newBackgroundImage);
				this.newBackgroundImage = '';
			},
			remove(bg, removeKey){
				this.backgroundImages = this.backgroundImages.filter((item, key) => {
					if(removeKey !== key){
						return item;
					}
				});
			},
			save(){
				this.disabled = true;
				let settingsChanged = {
					backgroundColor: this.backgroundColor,
					backgroundImages: this.backgroundImages
				};
				this.$store.commit('updateSettings',settingsChanged);
				setTimeout(()=>{
					this.disabled = false;
				},300);
			}
		},
		watch: {}
	}
</script>
