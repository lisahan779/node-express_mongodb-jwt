<template>
<div class="user">
  <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">用户管理系统</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li><router-link to="/customers">主页</router-link></li>
            <li><router-link to="/about">关于我们</router-link></li>
          </ul>
          <ul class="nav navbar-nav nav-right">
            <li><router-link to="/add">添加用户</router-link></li>
             <li><router-link to="/login" @click="remove">退出系统</router-link></li></ul>
        </div>
      </div>
    </nav>
    <router-view></router-view>
    </div>
</template>

<script>
export default {
name:"user",
methods:{
    remove(){
    window.sessionStorage.removeItem("token");
    }
}
}

</script>

<style>

</style>