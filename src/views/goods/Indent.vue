<template>
	<el-container>
		<el-main>
			<el-table :data="tableData[0]" style="width: 100%">
				<el-table-column label="商品名称" width="480">
					<template slot-scope="scope">
						<div class="text-photo">
							<div class="">
								<img class="photo" :src="scope.row.goodsList[0].img_md"/>
							</div>
							<div class="">
								<span style="margin-left: 10px">{{ scope.row.goodsList[0].name }}</span>
								<br />
								<span style="margin-left: 10px">{{ scope.row.goodsList[1].name }}</span>
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="价格" width="180">
					<template slot-scope="scope">
						<span style="margin-left: 10px">{{ scope.row.payment }}</span>
					</template>
				</el-table-column>
				<el-table-column label="数量">
					<template slot-scope="scope">
						<span style="margin-left: 10px">无</span>
					</template>
				</el-table-column>

				<el-table-column label="下单时间">
					<template slot-scope="scope">
						<span style="margin-left: 10px">{{ scope.row.create_time }}</span>
					</template>
				</el-table-column>
				<el-table-column label="状态">
					<template slot-scope="scope">
						<span style="margin-left: 10px">{{ scope.row.status }}</span>
					</template>
				</el-table-column>

				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row)"><i class="fa fa-edit "></i></el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"><i class="fa fa-trash"></i></el-button>
					</template>
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
	export default {
		data() {
			return {
				tableData: [],
				total:0
			}
		},
		created() {
			this.getIndentDate();
		},
		methods: {
			getIndentDate() {
				let pageNum = 4;
				this.$http.post('/api/order/list/', {
					pageSize: pageNum
				}).then((res) => {
					if (res.status) {
						this.tableData.push(res.data);
						console.log(this.tableData);
					}
				});
				// 假查询总分页总数
				this.$http.post('/api/order/list', {
					pageSize: 100000
				}).then((res) => {
					if (res.status) {
						var length = res.data.length;
						this.total = 10*(length/pageNum);
					}
				});
				
			},
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.text-photo {
		display: flex;

		.photo {
			width: 40px;
			height: 40px;
		}

	}
</style>
