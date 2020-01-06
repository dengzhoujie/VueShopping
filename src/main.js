import Vue from 'vue'

import app from './app.vue'

import { Header,Swipe,SwipeItem } from 'mint-ui'

import './lib/mui/css/mui.css'

import './lib/mui/css/icons-extra.css'

import VueRouter from 'vue-router'     //导入路由

import route from './router.js'                   //导入自己的路由模块

import VueResource from 'vue-resource'

Vue.use(VueRouter)                     //安装路由模块
Vue.use(VueResource)
Vue.component(Header.name,Header)
Vue.component(Swipe.name,Swipe)
Vue.component(SwipeItem.name,SwipeItem)


var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router: route                      //挂载路由对象

})

