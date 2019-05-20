import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
import {
	Message
} from 'element-ui'
Vue.use(Vuex)
let userModule = {
	state: {
		uid: '',
		role: '',
		token: '',
	},
	mutations: {
		saveUserInfo(state, user) {
			// 存储信息
			state.uid = user.uid;
			state.role = user.role;
			state.token = user.token;
		}
	},
	actions: {
		// 异步操作
		Login({
			commit,
			state
		}, FormData) {
			axios.post('/api/user/login', FormData).then((res) => {
				console.log(res)
				if (!res.status) {
					Message.error(res.msg);
					return false;
				}
				// 储存token,uid,role(1-超级管理员，2-管理员，3-运营人员)
				sessionStorage.role = res.data.role;
				sessionStorage.token = res.data.token;
				sessionStorage.uid = res.data.id;
				// 储存到state里面
				commit('saveUserInfo', res.data);
				Message.success({
					message: res.msg,
					onClose: () => {
						// 判断参数有无，有的话则跳转到之前页面
						if (this.redirect) {
							this.$router.push(this.redirectv);
							return;
						}
						// 路由跳转
						router.push('/index')
					},
					type: 'success'
				});

			})
		}
	}
}
let menuModule = {
	state: {
		isCollapse: false,
	},
	mutations: {
		// 同步操作
		collapseMenu(state) {
			state.isCollapse = !state.isCollapse
		}

	},
	actions: {}
}
let wangEditorModule = {
	state: {
		editorContent: '',
		editeGood: '',
		editeDetail: ''

	},
	mutations: {
		// 同步操作
		increment(state, payload) {
			state.editorContent = payload.amount;
		},
		// 编辑商品时把部分数据存到state中
		editeGoodMut(state, payload) {
			state.editeGood = payload.amount;
		},
		editeDetailMut(state, payload) {
			state.editeDetail = payload.amount
		}

	},
	actions: {}
}

export default new Vuex.Store({
	modules: {
		user: userModule,
		menu: menuModule,
		wangEditor: wangEditorModule,
	}
})
