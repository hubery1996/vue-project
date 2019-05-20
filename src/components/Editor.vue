<template>
	<div>
		<div ref="editor" style="text-align:left"></div>
	</div>
</template>

<script>
	import E from 'wangeditor';
	import {
		mapState
	} from 'vuex';
	export default {
		name: 'editor',
		data() {
			return {
				editorContent: ''
			}
		},
		created() {
			this.changeHandle();
		},
		computed: mapState({
			// 计算属性获得数据让后转存从仓库获得的数据
			editeDetail: state => state.wangEditor.editeDetail,

		}),
		methods: {
			changeHandle() {
				this.$store.commit('increment', {
					amount: this.editorContent
				})
			},
		},
		mounted() {
			var editor = new E(this.$refs.editor);
			// editor.customConfig.uploadImgShowBase64 = true;
			// 配置请求头
			editor.customConfig.uploadImgHeaders = {
				Authorization: `Bearer ${sessionStorage.token}`
			};
			// 设置跨域传输
			editor.customConfig.withCredentials = true;
			editor.customConfig.uploadFileName = 'file';
			// 配置服务器端地址
			editor.customConfig.uploadImgServer = '/api/upload/editor/';

			editor.customConfig.onchange = (html) => {
				this.editorContent = html;
				this.changeHandle();
			}
			editor.create()
			editor.txt.html(this.editeDetail)
		}
	}
</script>

<style scoped>
</style>
