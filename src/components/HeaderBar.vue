<template>
	<div class="box">
		<div class="wrap">
			<img class="logo" src="@/assets/logo2.png" alt="">
			<i class="fa fa-th-large" @click="collapseHandle"></i>
		</div>
		<div class="wrap-right">
			{{nickname}}
			<img class="right" :src="avatar" alt="">
		</div>
	</div>

</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				nickname: "",
				avatar: ""
			}
		},
		created() {
			this.getUserInfo();
		},
		methods: {
			collapseHandle() {
				this.$store.commit('collapseMenu');
			},
			getUserInfo() {
				this.$http.get('/api/user/info/', {
					params: {
						uid: sessionStorage.uid
					}
				}).then((res) => {
					// console.log(res)
					if (res.status) {
						this.nickname = res.data.nickname;
						this.avatar = res.data.avatar
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.logo {
		width: 100px;
		height: 30px;
		padding: 0;
		margin-right: 76px;
		border: 0;
	}

	.box {
		border: 0;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		img {
			border: 0;
		}
	}


	.wrap {
		display: flex;
		align-items: center;
	}

	.right {
		width: 40px;
		height: 40px;
	}

	.wrap-right {
		width: 100px;
		display: flex;
		align-items: center;
	}
</style>
