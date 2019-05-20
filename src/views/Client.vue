<template>
	<el-container>
		<el-header class="breadHeader">
			<Breadcrumb></Breadcrumb>
			<div class="btn">
				<div>
					<el-input v-model="input" placeholder="手机号码"></el-input>
				</div>
				<div>
					<el-button type="primary">主要按钮</el-button>
				</div>
			</div>
		</el-header>
		<el-main>
			<el-table ref="singleTable" :data="tableData" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
				<el-table-column type="index" width="50">
				</el-table-column>
				<el-table-column label="头像" width="180">
					<img :src="avatar" alt="">
				</el-table-column>
				<el-table-column prop="username" label="账号" sortable width="180">
				</el-table-column>
				<el-table-column prop="nickname" label="昵称" sortable width="180">
				</el-table-column>
				<el-table-column prop="sex" label="性别" sortable width="180">
				</el-table-column>
				<el-table-column prop="tel" label="手机号码" sortable width="180">
				</el-table-column>
			</el-table>
		</el-main>
		<el-footer>
			<el-pagination background layout="prev, pager, next" :total="this.total">
			</el-pagination>
		</el-footer>
	</el-container>

</template>

<script>
	import Breadcrumb from '@/components/Breadcrumb.vue';
	export default {
		components: {
			Breadcrumb,
		},
		data() {
			return {
				tableData: [],
				currentRow: null,
				input: '',
				total:0,
				avatar: []
			}
		},
		created() {
			this.getUserInfo();
		},
		methods: {
			getUserInfo() {
				this.$http.get('/api/user/list/', {
					
				}).then((res) => {
					if (res.status) {
						// console.log(res)
						this.tableData = res.data;
						let length = res.data.length;
						// console.log(length)
						for (let i = 0; i < length; i++) {
							// console.log(res.data[i].avatar)
							this.avatar = res.data[i].avatar;
						}
					}
				});
				// 假查询总分页总数
				this.$http.post('/api/order/list', {
					pageSize: 10000
				}).then((res) => {
					if (res.status) {
						var length = res.data.length;
						var pageNum = 10;
						this.total = 10*(length/pageNum);
					}
				})
				
			},
			setCurrent(row) {
				this.$refs.singleTable.setCurrentRow(row);
			},
			handleCurrentChange(val) {
				this.currentRow = val;
			},

		}
	}
</script>

<style scoped="scoped" lang="scss">
	.breadHeader{
		height: 115px !important;
	}

	.btn {
		display: flex;
	}

	img {
		width: 30px;
		height: 30px;
		border-radius: 20px;
	}
</style>
