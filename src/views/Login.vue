<template>
	<div class="bg">
		<div class="register-box">
			<form action="">
				<div class="title">欢迎登陆</div>
				<div class="body">
					<label for="">
						<span>
							<i class="fa fa-user"></i>
						</span>
						<input type="text" v-model="formDate.username" placeholder="请输入账号">
					</label>
					<label for="">
						<span>
							<i class="fa fa-lock"></i>
						</span>
						<input type="password" v-model="formDate.password" placeholder="请输入密码">
						<i class="fa fa-keyboard-o"></i>
					</label>
					<div class="re-now" @click="loginHandle">登陆</div>
					<div class="more">
						<div class="login">
							<router-link to="/register">注册账号</router-link>
						</div>
						<div class="forgot"><a href="">忘记密码 ?</a></div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['redirect'],
		data() {
			return {
				formDate: {
					username: "",
					password: ""
				}
			}
		},
		created() {
			// console.log(this.$route.query)查看路由参数
			console.log(this.redirect);
			
		},
		methods: {
			loginHandle() {
				this.$store.dispatch('Login',{...this.formDate})
			}
// 			loginHandle() {
// 				console.log({ ...this.formDate
// 				})
// 				this.$http.post('/api/user/login', {
// 					...this.formDate
// 				}).then((res) => {
// 					console.log(res);
// 					if (res.status == true) {
// 						// 储存token,uid,role(1-超级管理员，2-管理员，3-运营人员)
// 						sessionStorage.role = res.data.role;
// 						sessionStorage.token = res.data.token;
// 						sessionStorage.uid = res.data.id;
// 						this.$message({
// 							message: res.msg,
// 							onClose: () => {
// 								// 判断参数有无，有的话则跳转到之前页面
// 								if (this.redirect) {
// 									this.$router.push(this.redirectv);
// 									return;
// 								}
// 								this.$router.push('/index');
// 							},
// 							type: 'success'
// 						})
// 
// 					} else {
// 						console.log(this);
// 						this.$message(res.msg)
// 					}
// 				})
// 			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	$blue:#2d8cf0;
	$fz14:14px;
	$fz12:12px;

	.bg {
		width: 100vw;
		height: 100vh;
		background: url(../assets/img/reg/login-bg.jpg);
		background-size: cover;
		position: relative;

		.register-box {
			font-size: $fz14;
			background: white;
			border-radius: 4px;
			width: 300px;
			position: absolute;
			right: 10%;
			top: 20%;
		}


		.title {
			line-height: 20px;
			font-size: 14px;
			color: #17233d;
			font-weight: 700;
			padding: 14px 16px;

		}

		.body {
			padding: 16px;

		}

		label {
			display: inline-block;
			margin-bottom: 24px;
			text-align: center;
			line-height: 32px;
			position: relative;
			box-sizing: border-box;
		}

		.fa-keyboard-o {
			position: absolute;
			top: 8px;
			right: 10px;
			font-size: $fz14;
		}

		.more {
			display: flex;
			justify-content: space-between;
		}

		span {
			display: inline-block;
			background: #eee;
			width: 30px;
			height: 32px;
			box-sizing: border-box;
			border-top-left-radius: 4px;
			border-bottom-left-radius: 4px;
			border: 1px solid #eee;

		}

		input {
			padding: 4px 7px;
			font-size: $fz12;
			box-sizing: border-box;
			height: 32px;
			border-radius: 4px;
			border-top-left-radius: 0px;
			border-bottom-left-radius: 0px;
			border: 1px solid #eee;
			vertical-align: top;
			width: 238px;

		}
	}

	.more {
		a {
			color: #666666;
			text-decoration: none;

			&:hover {
				color: black;
			}

			&:active {
				color: black;
			}
		}
	}

	.re-now {
		background: #2D8CF0;
		color: white;
		height: 32px;
		line-height: 32px;
		border-radius: 4px;
		text-align: center;
		margin-bottom: 10px;
	}
</style>
