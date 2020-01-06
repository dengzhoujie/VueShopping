<template>
    <div class="app_container">
       <!--顶部header区域-->
       <mt-header fixed title="华润万家超市欢迎您"></mt-header>

       <!--中间路由router-view区域-->
       <router-view></router-view>

       <!--底部的tabbar区域-->
       <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link  class="mui-tab-item" to="/shoppingcart">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">0</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" to="/search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
    
</script>

<style scoped>
    .app_container{
        padding-top: 40px;
    }

    .mui-bar{
        background-color: #fff;
    }
</style>