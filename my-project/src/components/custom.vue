<template>
  <div class="customers container">
    <h1 class="page-header">用户管理系统</h1>
    <!-- v-if判断alter存在情况 -->
    <Alert v-if="alter" @toparents="getmsg" :message="alter" :classs="classs" v-show="flage"></Alert>
    <input type="text" class="form-control" placeholder="搜索" v-model="filterInput" />

    <!-- 接收子组件的值 -->
    <!-- <Alert  @toparents="getmsg" :message="alter" :classs="classs" v-show="flage"></Alert> -->
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
            <div
              class="btn btn-default"
              style="backgroundcolor:blue"
              @click="handleclick(item)"
            >查看详情</div>
          </td>
        </tr>
      </tbody>
    </table>
   <Page @page="getpage" class="PPage"></Page>
  </div>
</template>

<script>
import Alert from "./alter";
import Page from './page'
export default {
  name: "customers",
  data() {
    return {
      customer: [],
      alter: "",
      flage: true,
      classs: "alert alert-warning alert-dismissible",
      filterInput: "",
      childrenmag: "",
      page:1
    };
  },
  components: {
    Alert,
    Page
  },
  methods: {
    // 接收子组件的值
    getmsg(msg) {
      this.childrenmag = msg;
    },
    // 接收子组件的传值
    getpage(msg){
      this.page = msg
     this.fetchCustomers()
    },
    // 点击跳转到详情
    handleclick(item) {
      this.$router.push({
        path: "/customer/",
        query: {
          id: item._id
        }
      });
    },
    // 异步请求数据
    async fetchCustomers() {
      const res = await this.$http.post("/users", {
        page: this.page,
        rows: 2
      });
      this.customer = res.data.rows;
    },
    // 搜索
    filterBy(customers, inputvalue) {
      // filter方法遍历整个数组
      return customers.filter(customer => {
        //  match()将遍历的所有数据与搜索输入的数据比对后返回
        // 注意match不能遍里数字，true,false
        return customer.name.match(inputvalue);
      });
    }
  },

  created() {
    //   创建时判断存在query的渲染
    if (this.$route.query.alter || this.$route.query.classs) {
      (this.alter = this.$route.query.alter),
        (this.classs = this.$route.query.classs);
    }
    this.fetchCustomers();
  }
};
</script>

<style>
</style>