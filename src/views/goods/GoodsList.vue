<template>
	<el-container>
		<el-header>
		</el-header>
		<el-main>
			<el-table :data="tableData[0]" style="width: 100%">
				<el-table-column label="商品名称" width="500">
					<template slot-scope="scope">
						<div class="infoWrap">
							<img :src="scope.row.img_md" alt="">
							<div class="info">
								<div class="title">
									{{scope.row.name}}
								</div>
								<div class="des">
									商品货号
								</div>
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="price" label="价格" width="180">
				</el-table-column>
				<el-table-column prop="" label="库存">
				</el-table-column>
				<el-table-column prop="id" label="发布时间">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row)"><i class="fa fa-pencil"></i></el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"><i class="fa fa-trash"></i></el-button>
					</template>
				</el-table-column>
			</el-table>

		</el-main>
		<el-footer>
			<el-pagination :current-page="2" @current-change="currentHandle" background layout="prev, pager, next" :total="this.total">
			</el-pagination>
		</el-footer>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				total: 0,
				tableData: [],
				info: {
					pageSize: '',
					pageIndex: '',
					cate_1st: '',
					cate_2nd: '',
					cate_3rd: '',
					sortByPrice: '',
				},
			}
		},
		created() {
			this.getData()
		},
		methods: {
			handleEdit(index, row) {
				console.log(index, row);
				console.log(row.id);
				console.log(this.tableData[0][index])
				this.$router.push('/goods/edite-goods-list?id='+row.id+'');
				this.$store.commit('editeGoodMut', {
					amount: this.tableData[0][index],
				})
			},
			handleDelete(index, row) {
				// 删除模态框
				this.$confirm('此操作将永久删除' + row.name + ', 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$http.post('/api/goods/delete', {
						id: row.id
					})
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					// 删除成功后再次从数据库获取数据渲染页面
					this.currentHandle();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',
						type: 'warning'
					});
				});
				console.log(index, row);
			},
			getData() {
				// 1.表单验证
				// 2.发送ajax
				var pageNum = 4;
				this.$http.get('/api/goods/', {
					params: {
						pageSize: pageNum
					}
				}).then((res) => {
					this.tableData.push(res.data);
					console.log(this.tableData)
					console.log(res.data)
				});
				// 假查询总分页总数

				this.$http.get('/api/goods', {
					params: {
						pageSize: 100000
					}
				}).then((res) => {
					var length = res.data.length;
					console.log(length)
					this.total = 10 * (length / pageNum);
				});
			},
			// 点击分页器查询显示的商品数目
			currentHandle(val) {
				this.$http.get('/api/goods', {
					params: {
						pageSize: 4,
						pageIndex: val
					}
				}).then((res) => {
					// 还原数组数据
					this.tableData = []
					// 然后存入res的数据
					this.tableData.push(res.data);
				})
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	img {
		width: 16%;
		height: 80px;
		padding: 2px;
		box-sizing: border-box;
		border: 1px solid #eee;
		display: block;
	}


	.infoWrap {
		display: flex;
	}

	.info {
		padding-left: 2%;
		display: flex;
		flex-direction: column;
		// width: 80%;

	}

	.info:hover .title {
		-webkit-line-clamp: 2;
	}

	.title {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		text-overflow: ellipsis;
		overflow-y: hidden;
	}
</style>
