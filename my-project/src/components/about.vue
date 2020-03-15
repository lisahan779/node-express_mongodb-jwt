<template>
  <div class="about container">
    <button class="btn btn-default"><router-link to="/customers">返回主页</router-link></button>
      <button class="btn btn-default" @click="getproduct">获取数据</button>
      <h1 class="page-header">想了解我们的话请搜索微信lisa han</h1>
  </div>
</template>

<script>
export default {
name:"about",
methods:{
async getproduct(){
  const res= await this.$http.get("/users")
  console.log(res)
},
// mounted(){
//     this.fetchCustomers(this.$route);
//     console.log("详情页面");
//     console.log(this.$router)
//     console.log(111,window.location.href.split('/')[4])
//   }
}
}
</script>

<style>

</style>