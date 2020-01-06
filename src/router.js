import VueRouter from 'vue-router'

import home from './components/tabbar/HomeContainer.vue'        //导入对应的路由组件

import member from './components/tabbar/MemberContainer.vue'

import shoppingcart from './components/tabbar/ShoppingcartContainer.vue'

import search from './components/tabbar/SearchContainer.vue'

//创建路由对象
var route = new VueRouter({
    routes: [   //配置路由规则
       { path: '/',redirect: '/home' },
       { path: '/home', component: home },
       { path: '/member', component: member },
       { path: '/shoppingcart', component: shoppingcart },
       { path: '/search', component: search },
    ],
    linkActiveClass: 'mui-active'     //自定义路由高亮类
})


export default route   //router.js是一个独立的模块，如果想要向外暴露一个router的话，需要通过export default 向外暴露这个router对象