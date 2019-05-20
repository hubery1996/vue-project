<template>
	<div id="app">
<!-- <p> -->
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
   <!-- <router-link to="/login">登陆</router-link>
    <router-link to="/register">注册</router-link>
  </p> -->
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>

	</div>
</template>
<script>
	export default {
		components: {
		}
	}
</script>

<style lang="scss">
	$blue:#2d8cf0;
	$fz14:14px;
	$fz12:12px;
	@import './assets/lib/font-awesome/font-awesome-4.7.0/css/font-awesome.css';
	html,
	body {
		margin: 0;
	}
</style>