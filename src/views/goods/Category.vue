<template>
	<el-container>
		<el-header>
			<Breadcrumb></Breadcrumb>
		</el-header>
		<el-main>
			<div class="custom-tree-container">
				<div class="block">
					<el-tree :data="data" :expand-on-click-node="false" :props="defaultProps" :load="loadNode" lazy>
						<span class="custom-tree-node" slot-scope="{ node, data }">
							<span>{{ node.label }}</span>
							<span>
								<el-button type="text" size="mini" @click="openEditeModel(node,data)">
									编辑
								</el-button>
								<el-button type="text" size="mini" @click="openAddModel(node,data)">
									添加
								</el-button>
								<el-button type="text" size="mini" @click="openRemoveModel(node,data)">
									删除
								</el-button>
							</span>
						</span>
					</el-tree>
				</div>
				<el-dialog title="编辑节点" :visible.sync="editeModelVisible">
					<el-form :model="editForm" :label-position="'left'" label-width="80px">
						<el-form-item label="活动名称" :label-width="formLabelWidth">
							<el-input v-model="editForm.name" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="活动区域" :label-width="formLabelWidth">
							<el-upload class="avatar-uploader" :headers="headers" action="/api/upload/common/" :show-file-list="false"
							 :on-success="editUploadSuccess" :before-upload="beforeUpload">
								<img v-if="editForm.img" :src="editForm.img" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="editeModelVisible = false">取 消</el-button>
						<el-button type="primary" @click="confimEditHandle">确 定</el-button>
					</div>
				</el-dialog>
				<el-dialog title="添加节点" :visible.sync="addModelVisible">
					<el-form :model="addForm" :label-position="'left'" label-width="80px">
						<el-form-item label="活动名称" :label-width="formLabelWidth">
							<el-input v-model="addForm.name" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="活动区域" :label-width="formLabelWidth">
							<el-upload class="avatar-uploader" :headers="headers" action="/api/upload/common/" :show-file-list="false"
							 :on-success="uploadSuccess" :before-upload="beforeUpload">
								<img v-if="addForm.img" :src="addForm.img" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="addModelVisible = false">取 消</el-button>
						<el-button type="primary" @click="confimAddHandle">确 定</el-button>
					</div>
				</el-dialog>
			</div>
		</el-main>
	</el-container>
</template>
<script>
	import Breadcrumb from '@/components/Breadcrumb.vue';
	let id = 1000;

	export default {
		components: {
			Breadcrumb,
		},
		data() {
			return {
				data: [{
					name: ""
				}],
				defaultProps: {
					label: 'name'
				},
				headers: {
					Authorization: `Bearer ${sessionStorage.token}`
				},
				editeModelVisible: false,
				addModelVisible: false,
				formLabelWidth: '120px',
				addForm: {
					name: '',
					pId: '',
					img: ''
				},
				editForm: {
					name: '',
					id: '',
					pId: '',
					img: ''
				},
				currentNodeData: ''
			}
		},
		methods: {
			// 上传之前的图片的检查
			beforeUpload(file) {
				const isJPG = file.type === 'image/jpeg' || 'images/png';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 或 PNG 是格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			// 上传成功
			uploadSuccess(res, file) {
				this.addForm.img = res.src;
			},
			created() {
				this.loadNode()
			},
			loadNode(node, resolve) {
				let id = node.data.id || 0;
				this.$http.get('/api/category/sub/', {
					params: {
						pId: id
					}
				}).then((res) => {
					resolve(res.data)
				})
			},
			// 关闭弹窗清空表单

			openAddModel(node, data) {
				// 开启编辑模态框
				this.addModelVisible = true;
				this.addForm.pId = data.id;
				this.addForm.name = '',
					this.addForm.img = '',
					// 转存data
					this.currentNodeData = data;
			},
			// 确认添加节点
			confimAddHandle() {
				// 1.表单验证
				// 2.发送ajax
				this.$http.post('/api/category/add', {
					...this.addForm
				}).then((res) => {
					if (res.status) {
						this.$message(res.msg);
						// 添加子节点
						let data = this.currentNodeData;
						let newChild = { ...this.addForm,
							id: res.data.id
						}
						if (!data.children) {
							this.$set(data, 'children', []);
						}
						data.children.push(newChild);
						this.addModelVisible = false;
					}
				})
			},
			// 删除
			openRemoveModel(node, data) {
				this.$confirm('此操作将永久删除' + data.name + '分类, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$http.post('/api/category/delete/', {
						id: data.id
					})
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

			},
			openEditeModel(node, data) {
				this.editeModelVisible = true;
				this.addForm.pId = data.pId;
				this.editForm.name = data.name;
				this.editForm.img = data.img;
				this.editForm.id = data.id;
				this.editForm.pId = data.pId;
				// 转存data
				this.currentNodeData = data;

			},
			confimEditHandle() {
				// 1.表单验证
				// 2.发送ajax
				this.$http.post('/api/category/update', {
					...this.editForm
				}).then((res) => {
					this.$message(res.msg);
					this.editeModelVisible = false;
				})
			},
			editUploadSuccess(res, file) {
				this.editForm.img = res.src;
			},

		}

	}
</script>

<style scoped="scoped">
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px !important;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
