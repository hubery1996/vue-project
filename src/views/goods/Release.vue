<template>
	<el-container>
		<el-header>
			<Breadcrumb></Breadcrumb>
		</el-header>
		<el-main>
			<el-form ref="form" :model="form" :label-position="labelPosition" label-width="100px">
				<el-form-item label="商品分类">
					<el-select v-model="form.cate_1st" placeholder="请选择" @change="cateChangeHandle_1st">
						<el-option v-for="item in dataCategory_lst[0]" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
					<el-select v-model="form.cate_2nd" placeholder="请选择" @change="cateChangeHandle_2st">
						<el-option v-for="item in dataCategory_2st[0]" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
					<el-select v-model="form.cate_3rd" placeholder="请选择">
						<el-option v-for="item in dataCategory_3st[0]" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="商品名称">
					<el-input v-model="form.name"></el-input>
					<div class="text">商品标题名称最少3个字符,最多不超过300个字符</div>
				</el-form-item>
				<el-form-item label="商品卖点">
					<el-input type="textarea" v-model="form.hotPoint"></el-input>
					<div class="text">商品卖点不能超过140个汉字</div>
				</el-form-item>
				<el-form-item label="商品价格">
					<el-col :span="3">
						<el-input v-model="form.price" @blur="countDiscount">
							<template slot="append">元</template>
						</el-input>
					</el-col>
					<el-col :span="24">
						<div class="text">价格必须是0-999999之间的数字，且不能高出市场价<br>此价格为商品实际销售价格，如果商品存在违规，改价显示最低价格</div>
					</el-col>
				</el-form-item>
				<el-form-item label="市场价">
					<el-col :span="3">
						<el-input v-model="form.marketPrice" @blur="countDiscount">
							<template slot="append">元</template>
						</el-input>
					</el-col>
					<el-col :span="24">
						<div class="text">价格必须是0-999999之间的数字，此价格仅为市场参考价，请根据实际情况认真填写</div>
					</el-col>
				</el-form-item>
				<el-form-item label="成本价">
					<el-col :span="3">
						<el-input v-model="form.cost">
							<template slot="append">元</template>
						</el-input>
					</el-col>
					<el-col :span="24">
						<div class="text">价格必须是0-999999之间的数字，此价格为商户对所销售的商品的实际成本价进行备注记录，非必填选项，不会再前台销售页面中显示</div>
					</el-col>
				</el-form-item>
				<el-form-item label="折扣">
					<el-col :span="3">
						<el-input v-model="form.discount" disabled="disabled">
							<template slot="append">折</template>
						</el-input>
					</el-col>
					<el-col :span="24">
						<div class="text">根据销售价与市场价比例自动生成不需要编辑</div>
					</el-col>
				</el-form-item>
				<el-form-item label="商品库存">
					<el-col :span="3">
						<el-input v-model="form.inventory">
							<template slot="append">件</template>
						</el-input>
					</el-col>
					<el-col :span="24">
						<div class="text">价格必须是0-999999之间的数字<br>若启动了库存配置，则系统自动计算商品的总数，此处无需卖家填写</div>
					</el-col>
				</el-form-item>
				<el-form-item label="商品货号">
					<el-col :span="4">
						<el-input v-model="form.articleNo">
						</el-input>
					</el-col>
					<el-col :span="24">
						<div class="text">商品货号是商家管理的编号，买家不可见<br>最多输入20个字符，只支持中文、字母、数字、_ 、/ 、和小数点</div>
					</el-col>
				</el-form-item>
				</el-form-item>
				<el-form-item label="商品图片">
					<el-upload class="avatar-uploader" :headers="headers" action="/api/upload/goods/" :show-file-list="false"
					 :on-success="uploadSuccess" :before-upload="beforeUpload">
						<img width="100%" v-if="form.img_lg" :src="form.img_lg" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">

					</el-dialog>
					<el-col :span="24">
						<div class="text">上传商品默认主图，如多规格时默认将图片或分规格上传规格主图，支持jpg、gif、png格式上传或从图片空间选中，建议使用800*800像素以上，大小不超过1M的正方形图片,上传后的图片将自动保存在图片空间的默认分类中</div>
					</el-col>
				</el-form-item>
				<el-form-item label="商品轮播图">
					<el-upload class="avatar-uploader" :headers="headers" action="/api/upload/slider/" :show-file-list="true"
					 :on-success="listUploadSuccess" :before-upload="beforeUpload" list-type="picture-card">

						<i width="100%" class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisibleList">
						<img width="100%" v-if="form.slider" :src="form.slider" class="avatar">
					</el-dialog>
					<el-col :span="24">
						<div class="text">上传商品默认主图，如多规格时默认将图片或分规格上传规格主图，支持jpg、gif、png格式上传或从图片空间选中，建议使用800*800像素以上，大小不超过1M的正方形图片,上传后的图片将自动保存在图片空间的默认分类中</div>
					</el-col>
				</el-form-item>
				<div class="detail-bg">商品详情描述</div>
				<el-form-item label="商品品牌">
					<el-col :span="17">
						<el-input v-model="form.input7">
						</el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="商品描述">
					<Editor></Editor>
				</el-form-item>
				<div class="detail-bg">商品物流信息</div>
				<el-form-item label="所在地">
					<el-select v-model="form.region" placeholder="省">
						<el-option label="省一" value="shanghai"></el-option>
						<el-option label="省二" value="beijing"></el-option>
					</el-select>
					<el-select v-model="form.region2" placeholder="市">
						<el-option label="市一" value="shanghai"></el-option>
						<el-option label="市二" value="beijing"></el-option>
					</el-select>
					<el-select v-model="form.region3" placeholder="区">
						<el-option label="区一" value="shanghai"></el-option>
						<el-option label="区二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="运费">
					<el-col :span="3">
						<el-input placeholder="0" v-model="form.freight">
							<template slot="append">元</template>
						</el-input>
					</el-col>
					<el-col :span="24">
						<div class="text">运费设置为0元,前台商品将显示免费</div>
					</el-col>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">提交</el-button>
				</el-form-item>
			</el-form>
		</el-main>
	</el-container>

</template>

<script>
	import Editor from '@/components/Editor.vue';
	import Breadcrumb from '@/components/Breadcrumb.vue';
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			Editor,
			Breadcrumb
		},
		data() {
			return {
				labelPosition: 'left',
				dialogImageUrl: '',
				dialogVisible: false,
				dialogVisibleList: false,
				headers: {
					Authorization: `Bearer ${sessionStorage.token}`
				},
				form: {
					cate_1st: '',
					cate_2nd: '',
					cate_3rd: '',
					name: '',
					hotPoint: '',
					price: '',
					marketPrice: '',
					cost: '',
					discount: '',
					inventory: '',
					articleNo: '',
					img_lg: '',
					img_md: '',
					slider: '',
					brand: '',
					detail: '',
					freight: '',
					id: ''
				},
				dataCategory_lst: [],
				dataCategory_2st: [],
				dataCategory_3st: [],

			}
		},
		created() {
			this.Category_lst();
		},
		computed: mapState({
			// 计算属性获得数据让后转存从仓库获得的数据
			editorContent: state => state.wangEditor.editorContent,

		}),
		methods: {
			onSubmit() {
				console.log('submit!');
				// 把store里的数据收到放在data.form里面
				this.form.detail = this.editorContent;
				console.log(this.form);
				// 1.表单验证
				// 2.发送ajax
				this.$http.post('/api/goods/release', {
					...this.form
				}).then((res) => {
					console.log(res.msg);

				})
			},

			cateChangeHandle_1st() {
				// 清除下一级的选择项
				this.form.cate_2nd = '';
				// 调用下一级的查询函数
				this.Category_2st();
			},
			cateChangeHandle_2st() {
				// 清除下一级的选择项
				this.form.cate_3rd = '';
				// 调用下一级的查询函数
				this.Category_3st();

			},
			Category_lst() {
				// 还原数组
				this.dataCategory_lst = [];
				this.$http.get('/api/category/sub/', {
					params: {
						pId: 1
					}
				}).then((res) => {
					this.dataCategory_lst.push(res.data);
				});

			},
			Category_2st() {
				// 获取上一级选择的选项
				let id = this.form.cate_1st;
				// 还原数组
				this.dataCategory_2st = [];
				this.$http.get('/api/category/sub/', {
					params: {
						pId: id
					}
				}).then((res) => {
					this.dataCategory_2st.push(res.data);
				})
			},
			Category_3st() {
				// 获取上一级选择的选项
				let id = this.form.cate_2nd;
				// 还原数组
				this.dataCategory_3st = [];
				this.$http.get('/api/category/sub/', {
					params: {
						pId: id
					}
				}).then((res) => {
					this.dataCategory_3st.push(res.data);
				})
			},
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
				this.form.img_lg = res.lgImg;
				this.form.img_md = res.mdImg;
				// console.log(res)
			},
			listUploadSuccess(res, file) {
				this.form.slider += res.src;
				console.log(file)
				console.log(res)
			},
			countDiscount() {
				this.form.discount = this.form.price / this.form.marketPrice
			}
		}
	}
</script>

<style>
	.el-form-item__label {
		padding-right: 30px !important;
	}

	.detail-bg {
		background: #eee;
		padding: 1vw;
		margin-bottom: 1vw;
	}

	.el-button--primary {
		background: green;
		color: white;
	}

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9 !important;
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

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9 !important;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		width: 178px;
		height: 178px;
		background-color: white;
	}

	.el-upload-list__item {
		width: 173px !important;
		height: 175px !important;
	}
</style>
