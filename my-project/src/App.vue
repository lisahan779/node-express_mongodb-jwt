<!--
 * @Author: your name
 * @Date: 2020-03-11 15:38:57
 * @LastEditTime: 2020-03-18 10:43:27
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /all/my-project/src/App.vue
 -->
<template>
  <div id="app">
   
    <router-view v-if="isRouterAlive"></router-view> 
  </div>

</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  provide (){
     return {
       reload:this.reload
     }
  },
  data(){
    return {
       isRouterAlive:true
    }
  },
  methods:{
    reload (){
       this.isRouterAlive = false
       this.$nextTick(function(){
          this.isRouterAlive = true
       })
    }
  },
  components:{
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
  width: 100%;
  height: 100%;
}
</style>