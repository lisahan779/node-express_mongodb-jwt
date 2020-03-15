<template>
  <div class="add container">
    <!-- 弹出框 -->
    <Alter v-show="flage" :message="alter" :class="classs"></Alter>
    <h1 class="page-head">添加用户</h1>
    <form @submit="addcustomers">
      <div class="well">
        <h4>用户信息</h4>
        <div class="form-group">
          <label for>姓名</label>
          <br />
          <input type="text" class="form-control" placeholder="name" v-model="customers.name" />
          <br />
          <label for>电话</label>
          <br />
          <input type="text" class="form-control" placeholder="phone" v-model="customers.phone" />
          <br />
          <label for>邮箱</label>
          <br />
          <input type="text" class="form-control" placeholder="email" v-model="customers.email" />
          <br />
          <label for>学历</label>
          <br />
          <input
            type="text"
            class="form-control"
            placeholder="education"
            v-model="customers.education"
          />
          <br />
          <label for>毕业学校</label>
          <br />
          <input
            type="text"
            class="form-control"
            placeholder="graduationschool"
            v-model="customers.graduationschool"
          />
          <br />
          <label for>职业</label>
          <br />
          <input type="text" class="form-control" placeholder="job" v-model="customers.job" />
          <br />
          <label for>个人简介</label>
          <br />
          <textarea name="profile" class="form-control" rows="10" v-model="customers.profile"></textarea>
        </div>
      </div>
      <!-- 如果这个按钮是submit就会触发系统的方法，如果在form中绑定submit 触发的就是自己写的方法 -->
      <button type="submit" class="btn btn-primary">添加</button>
    </form>
  </div>
</template>

<script>
import Alter from "./alter";
export default {
  name: "add",
  data() {
    return {
      customers: [],
      alter: "",
      flage:false,
      classs: "alert alert-danger alert-dismissible"
    };
  },
  components: {
    Alter
  },
  methods: {
    addcustomers(e) {
      // 阻止默认submit按钮事件
      e.preventDefault();
      if (
        !this.customers.name ||
        !this.customers.phone ||
        !this.customers.email
      ) {
        this.alter = "请填写完整的信息",
          this.flage=true
      } else {
        var regname = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
        if (!regname.test(this.customers.name)) {
          this.alter = "姓名格式不正确";
          this.flage=true
          return;
        } else {
          var myreg = /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
          // 输入手机号不合适
          if (!myreg.test(this.customers.phone)) {
            this.alter = "手机号码格式不正确";
            this.flage=true
            return;
          } else {
            const regemail = /^[0-9a-zA-Z._-]+[@][0-9a-zA-Z._-]+([.][a-zA-Z]+){1,2}$/;
            if (!regemail.test(this.customers.email)) {
              this.alter = "邮箱格式不正确";
              this.flage=true
            } else {
              //  定义对象
              let newCustomers = {
                name: this.customers.name,
                phone: this.customers.phone,
                email: this.customers.email,
                education: this.customers.education,
                graduationschool: this.customers.graduationschool,
                job: this.customers.job,
                profile: this.customers.profile
              };
              //  将数据发送到后端
              this.$http
                .post("/api/users", newCustomers)
                .then(res => {
                  console.log(res);
                  // query 将地址栏的信息传给alter组件展示
                  this.$router.push({
                    name: "customers",
                    query: {
                      alter: "用户信息添加成功",
                      classs: "alert alert-success alert-dismissible"
                    }
                  });
                });
            }
          }
        }
      }
    }
  },
  created() {
    console.log("添加用户页面");
  }
};
</script>

<style>
</style>