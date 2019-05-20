<template>
	<div class="bg">
		<div class="register-box">
			<form action="">
				<div class="title">注册新账户</div>
				<div class="body">
					<label for="">
						<span>
							<i class="fa fa-user"></i>
						</span>
						<input type="text" placeholder="请输入账号" v-model="formDate.username">
					</label>
					<label for="">
						<span>
							<i class="fa fa-lock"></i>
						</span>
						<input type="password" placeholder="请输入密码" v-model="formDate.password">
						<i class="fa fa-keyboard-o"></i>
					</label>
					<label for="">
						<span>
							<i class="fa fa-tag"></i>
						</span>
						<input type="text" v-model="formDate.nickname" placeholder="请输入昵称">
					</label>
					<label for="">
						<span>
							<i class="fa fa-venus-mars"></i>
						</span>
						<span class="sex">
							<label for="man">
								<input type="radio" name="sex" id="man" value="男" v-model="formDate.sex">
								<span class="fa fa-mars"></span>
								<span>男</span>
							</label>
							<label for="women">
								<input type="radio" name="sex" id="women" value="女" v-model="formDate.sex">
								<span class="fa fa-venus"></span>
								<span>女</span>
							</label>
						</span>
					</label>
					<label for="">
						<span>
							<i class="fa fa-mobile"></i>
						</span>
						<input type="text" placeholder="请输入手机号" v-model="formDate.tel">
					</label>
					<div class="re-now" @click="verify">注册</div>
					<div class="more">
						<div class="login">
							<router-link to="/login">密码登陆</router-link>
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
		data() {
			return {
				formDate: {
					username: "",
					password: "",
					nickname: "",
					sex: "",
					tel: ""
				}
			}
		},
		methods: {
			verify() {
				// 表单验证
				// 提取数据
				console.log({ ...this.formDate
				});
				this.$http.post('/api/user/register', {
					...this.formDate
				}).then((res) => {
					if (res.status == true) {
						// 储存token,uid
						sessionStorage.token = res.data.token;
						sessionStorage.uid = res.data.id;
						this.$message({
							message: res.msg,
							onClose: () => {
								this.$router.push('index');
							},
							type: 'success'
						})

					} else {
						console.log(this);
						this.$message(res.msg)
					}
				});
			}
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
		user-select: none;

		.register-box {
			font-size: $fz14;
			background: white;
			border-radius: 4px;
			width: 300px;
			position: absolute;
			right: 10%;
			top: 30%;
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

		.sex {
			background: initial;
			width: 238px;
			vertical-align: top;
			position: relative;
			box-sizing: border-box;
			border-top-right-radius: 4px;
			border-bottom-right-radius: 4px;
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;

			label {
				position: relative;
				left: -35px;
				width: 84px;
				margin-bottom: initial;
			}

			span {
				background: initial;
				width: initial;
				height: initial;
				border: initial;
			}

			.fa {
				margin: 0 10px;
			}

			input {
				width: 15px;
				margin: 0;
			}
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

	.active {}
</style>
