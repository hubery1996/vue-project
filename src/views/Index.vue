<template>
	<el-container class="container">
		<el-header>
			<HeaderBar></HeaderBar>
		</el-header>
		<el-container class="aside">
				<LeftMenu></LeftMenu>
			<el-main class="main">
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>
<style scoped="scoped" lang="scss">
	.container {
		width: 100%;
		height: 100vh;
		background-color: rgb(84, 92, 100);
	}

	.el-header {
		color: #333;
		line-height: 60px;
	}

	.el-aside {
		color: #333;
		background-color: rgb(84, 92, 100);
	}
	.el-main{
		background: white;
	}
	
</style>
<script>
	// @ is an alias to /src
import HeaderBar from '@/components/HeaderBar.vue';
import LeftMenu from '@/components/LeftMenu.vue';

	export default {
		name: 'index',
		components:{
			HeaderBar,
			LeftMenu
		}
	}
</script>
