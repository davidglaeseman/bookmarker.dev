<template>

	<div class="modal" v-if="modal && modal.active === true" :class="{active: modal.active}" @click.self="close()" v-hotkey="keymap">
		<div class="modal-container">
			<div class="modal-body">
				<div @click="close" aria-label="Close Modal" class="close">
					<i class="fas fa-times"></i>
				</div>
				<pre>{{modal}}</pre>
				<slot></slot>
			</div>
		</div>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				name: 'modal'
			}
		},
		computed: {
			keymap () {
				return {
					'esc': this.close
				}
			},
			modal(){
				return this.$store.getters['modal/modal'];
			}
		},
		mounted() {

		},
		methods: {
			close() {
				this.$store.commit('modal/modal', false);
			}
		},
		watch: {}
	}
</script>
