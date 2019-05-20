<template>
	<el-menu router default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" 
	 active-text-color="#ffd04b" :collapse="isCollapse">
		<el-submenu index="1">
			<template slot="title">
				<i class="el-icon-location"></i>
				<span>商品管理</span>
			</template>
			<el-menu-item index="/goods/category">商品分类</el-menu-item>
			<el-menu-item index="/goods/release">发布商品</el-menu-item>
			<el-menu-item index="/goods/list">商品列表</el-menu-item>
			<!-- <el-menu-item index="/goods/edite-goods-list">编辑页面</el-menu-item> -->
		</el-submenu>
		<el-submenu index="2">
			<template slot="title">
				<i class="el-icon-document"></i>
				<span>用户管理</span>
			</template>
			<el-menu-item index="/client">
				<i class="el-icon-document"></i>
				<span slot="title">用户列表</span>
			</el-menu-item>
			<el-menu-item>
				<i class="el-icon-document"></i>
				<span slot="title">用户权限</span>
			</el-menu-item>
			<el-menu-item>
				<i class="el-icon-document"></i>
				<span slot="title">用户角色</span>
			</el-menu-item>
		</el-submenu>
		<el-menu-item index="/goods/indent">
			<i class="el-icon-setting"></i>
			<span slot="title">订单管理</span>
		</el-menu-item>
	</el-menu>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		computed: mapState({
			isCollapse: state => state.menu.isCollapse,
			role: state => state.user.role,
		})
	}
</script>

<style>
	.el-menu{
		width: 200px;
	}
</style>
