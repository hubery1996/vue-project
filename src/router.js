// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(Router)
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 1. import 进来views文件夹下的页面级组件。
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Index from './views/Index.vue';
import Category from './views/goods/Category.vue';
import GoodsList from './views/goods/GoodsList.vue';
import Release from './views/goods/Release.vue';
import Indent from './views/goods/Indent.vue';
import Client from './views/Client.vue';
import EditeGoodsList from './views/goods/EditeGoodsList.vue';
/**
 * 2. 定义路由
 * 每个路由应该映射一个组件。
 * 其中"component" 可以是通过 Vue.extend() 创建的组件构造器，
 * 或者，只是一个组件配置对象。
 */
const routes = [{
		path: '/register',
		component: Register,
		name: 'Register',
	},
	{
		path: '/login/',
		component: Login,
		props: (route) => route.query,
		name: 'Login',
		alias: "/",
	},
	{
		path: '/index',
		component: Index,
		name: 'Index',
		children: [{
				path: '/goods/category',
				component: Category,
				name: 'Category',
				meta: {
					requiresAuth: true
				},
			}, {
				path: '/goods/list',
				component: GoodsList,
				name: 'GoodsList',
				meta: {
					requiresAuth: true
				},
			}, {
				path: '/goods/release',
				component: Release,
				name: 'Release',
				alias: "/",
				meta: {
					requiresAuth: true
				},
			}, {
				path: '/goods/edite-goods-list',
				component: EditeGoodsList,
				name: 'EditeGoodsList',
				alias: "/",
				meta: {
					requiresAuth: true
				},
			}, {
				path: '/goods/indent',
				component: Indent,
				name: 'Indent',
				meta: {
					requiresAuth: true
				},
			},
			{
				path: '/client',
				component: Client,
				name: 'Client',
				meta: {
					requiresAuth: true
				},
			}
		]
	},


]

// 3. 创建 router 实例，然后传 `routes` 配置。
const router = new Router({
	routes // (缩写) 相当于 routes: routes
})
// 4.全局路由守卫
router.beforeEach((to, from, next) => {
	console.log(to);
	if (to.matched.some(record => record.meta.requiresAuth)) {
		// 未登录时无token进行判断路由
		if (!sessionStorage.token) {
			console.log('未登录');
			next({
				path: "/login",
				// 定义参数
				query: {
					redirect: to.fullPath
				}
			});
			return;
		}
		// 已登录
		next();
	} else {
		next();
	}

	console.log(from)
});
export default router
