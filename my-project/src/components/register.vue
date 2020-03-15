<template>
  <div class="login">
    <el-form
      class="login-form"
      :label-position="labelPosition"
      label-width="80px"
      :model="formLabelAlign"
    >
      <h2 style="margin:0 0;">用户注册</h2>
      <el-form-item label="用户">
        <el-input v-model="formLabelAlign.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formLabelAlign.password"></el-input>
      </el-form-item>
      <el-button :plain="true" @click.prevent="register" class="login-button" type="primary">注册</el-button>
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
      }
    };
  },
  methods: {
    //登陆请求
    register() {
      this.$http.post("/api/register", 
            {username: this.formLabelAlign.username,
            password: this.formLabelAlign.password
        })
        .then(res => {
          if(res.status==200){
            this.$router.push({name:'login'})
          }
          console.log(res);
        });
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
</style>