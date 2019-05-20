<template>
	<el-row class="headerTop">
		<el-col :span="12">
			<!-- <h1>导航</h1> -->
		</el-col>
		<el-col :span="12" class="rightCrumb">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/goods/Goodslist' }">用户列表</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/goods/release' }">发布商品</el-breadcrumb-item>
			</el-breadcrumb>
		</el-col>
	</el-row>
</template>

<script>
</script>

<style>
	.headerTop {
		border-bottom: 1px solid blue;
		display: flex;
		justify-content: space-between;
	}

	.el-col {
		display: flex;
		align-items: center;
		height: 60px;
	}

	.rightCrumb {
		justify-content: flex-end;
	}
</style>
