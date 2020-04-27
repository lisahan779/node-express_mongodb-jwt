<template>
  <div class="add container">
    <Alter v-show="flage" :message="alter" :class="classs" ></Alter>
    <h1 class="page-head">编辑用户</h1>
    <form @submit="updateCustomers">
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
      <button type="submit" class="btn btn-primary">修改</button>
    </form>
  </div>
</template>

<script>
import Alter from "./alter";
export default {
  name: "edit",
  data() {
    return {
      customers: [],
      alter: "",
      flage:false,
      classs: "alert alert-warning alert-dismissible"
    };
  },
  components: {
    Alter
  },
  methods: {
    // 获取对应id数据在页面展示
    fetchcustomers(id) {
      this.$http.get("/getusers/" + id).then(res => {
        this.customers = res.data;
        // console.log(res.data);
      });
    },
    // 更新数据
    updateCustomers(e) {
      // 阻止默认submit按钮事件
      e.preventDefault();
      if (
        !this.customers.name ||
        !this.customers.phone ||
        !this.customers.email
      ) {
        this.flage=true
        this.alter = "请填写对应的信息"
      } else {
        var regname = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
        if (!regname.test(this.customers.name)) {
          this.alter = "姓名格式不正确";
          this.flage=true
          // return;
        } else {
          var myreg = /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
          // 输入手机号不合适
          if (!myreg.test(this.customers.phone)) {
             this.flage=true
            this.alter = "手机号码格式不正确";
            return;
          } else {
            const regemail = /^[0-9a-zA-Z._-]+[@][0-9a-zA-Z._-]+([.][a-zA-Z]+){1,2}$/;
            if (!regemail.test(this.customers.email)) {
              this.flage=true
             this.alter = "邮箱格式不正确";
            } else {
              //  定义对象,
              let newupdate = {
                name: this.customers.name,
                phone: this.customers.phone,
                email: this.customers.email,
                education: this.customers.education,
                graduationschool: this.customers.graduationschool,
                job: this.customers.job,
                profile: this.customers.profile
              };
              //  获取要更新的那条数据对应的id,更新数据发送put请求
              this.$http
                .put(
                  "/getusers/update/" + this.$route.params.id,
                  newupdate
                )
                .then(res => {
                  console.log(res);
                  this.$router.push({
                    name: "customers",
                    query: {
                      alter: "用户信息更新成功",
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
  // 模板被创建拿到id
  created() {
    this.fetchcustomers(this.$route.params.id);
    console.log(this.$route.params.id);
  }
};
</script>

<style>
</style>