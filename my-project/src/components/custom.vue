<template>
  <div class="customers container">
    
    <h1 class="page-header">用户管理系统</h1>
    <input type="text" class="form-control" placeholder="搜索" v-model="filterInput"/>
    <!-- v-if判断alter存在情况 -->
    <Alert v-if="alter" :message="alter" :classs="classs" v-show="flage"></Alert>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>姓名</th>
          <th>电话</th>
          <th>邮箱</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <!-- 遍历搜索的东西，触发filterBy方法遍历的时候和搜索框内容进行匹配 例如name-->
        <!-- 如果不搜索，遍历的就是所有数据 -->
        <tr v-for="(item,index) in filterBy(customer,filterInput)" :key="index">
          <td>{{item.name}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.email}}</td>
          <!-- 通过对应的id查看详情  拼接id-->
          <!-- 在details中通过携带id发送后台请求数据:to是因为to现在的值是变量要绑定，如果是单纯的字符串就不需要绑定-->
          <td>
            <!-- <router-link class="btn btn-default" :to="'/customer/'+item[index]._id" style="backgroundcolor:blue ">查看详情</router-link> -->
            <!-- <router-link class="btn btn-default" :to="'/customer/'+item._id" style="backgroundcolor:blue " >查看详情</router-link> -->
            <div class="btn btn-default" style="backgroundcolor:blue" @click="handleclick(item)">查看详情</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Alert from "./alter";
export default {
  name: "customers",
  data() {
    return {
      customer: [],
      alter: "",
      flage:true,
      classs: "alert alert-warning alert-dismissible",
      filterInput:""
    };
  },
  components: {
    Alert
  },
  methods: {
    handleclick(item){
      console.log(item);
      // this.bus.$emit("message",item)
      this.$router.push({
        path: '/customer/',
        query: {
          id: item._id
        },

      })
    },
    // 异步请求数据
    async fetchCustomers() {
      const res = await this.$http.get("/users");
      this.customer = res.data;
      // console.log("333",this.customer)
    },
    // fetchCustomers() {
    // this.$http.get("users").then((res)=>{
    //   this.customers=res.data
    // })Z
    // }
    // 搜索
    
    filterBy(customers,inputvalue){
      // filter方法遍历整个数组
   return customers.filter((customer)=>{
    //  match()将遍历的所有数据与搜索输入的数据比对后返回
// 注意match不能遍里数字，true,false
    return customer.name.match(inputvalue)
   })
    }
  },

  created() {
    //   创建时判断存在query的渲染
    if (this.$route.query.alter || this.$route.query.classs) {
      (this.alter = this.$route.query.alter),
        (this.classs = this.$route.query.classs);
      // this.fetchCustomers()
    }
    this.fetchCustomers();
    console.log("customers页面")
  }
  // updated(){this.fetchCustomers()}
}

</script>

<style>

</style>