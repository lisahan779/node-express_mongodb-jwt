<template>
  <div class="login">
    <el-form
      class="login-form"
      :label-position="labelPosition"
      label-width="80px"
      :model="formLabelAlign"
    >
   <h2 style="margin:0 0;">用户登录 <router-link to="/register" class="router">注册</router-link></h2>
      <el-form-item label="用户">
        <el-input v-model="formLabelAlign.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formLabelAlign.password"></el-input>
      </el-form-item>
      <el-button :plain="true" @click.prevent="login" class="login-button" type="primary">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "top",
      formLabelAlign: {
        username: "",
        password: ""
      },
      type: ""
    };
  },
  methods: {
    //登陆请求
    // 修改为同步执行
     login() {
      if (
        this.formLabelAlign.username == "" ||
        this.formLabelAlign.password == ""
      ) {
        this.$message.warning("不能为空");
      } else {
        // 这是获取的数据，使用await接受
        this.$http.post("/api/login",
           {username: this.formLabelAlign.username,
            password: this.formLabelAlign.password
        }).then(res=>{
          console.log(res.data.username)
//拿到返回值 这里的res就相当于ajax中成功的返回
        if (res.data.message == "用户不存在") {
          this.$message.success("用户不存在");
        } else if (res.data.message == "密码无效") {
          this.$message.success("密码错误");
        } else if(res.data.token){
          console.log(res.data.token)
            const token = window.sessionStorage;
            token.setItem("token", res.data.token);
            token.setItem("name",res.data.user.username)
            this.$router.push({ name: "customers" });
            this.$message.success("欢迎"+res.data.user.username);
        }
        });
        
      }
    }
  }
};
</script>

<style>
.login {
  background-color: #324153;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login .login-form {
  width: 100%;
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}
.login-button {
  width: 100%;
}
.router  {
  margin-left: 157px;
  font-size: 16px;
  font-weight: 500;
    text-decoration: none;
}
</style>