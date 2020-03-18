<template>
  <div class="alter container">
      <div :class='classs' role="alert">
  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
  <strong>{{message}}</strong> 
  <!-- 向父组件发送信息 -->
  <button @click="toparents">传值给父组件</button>
</div>

  </div>
</template>

<script>
export default {
name:"alter",
props:["message","classs"],
data(){
  return{
    type:'我是子组件'
    // classs:"alert alert-success alert-dismissible"
  }
},
methods:{
  toparents(){
    this.$emit("toparents",this.type)
    console.log(this.type)
  }
}

}
</script>

<style>
.alter{
margin-left: -15px;
}
</style>