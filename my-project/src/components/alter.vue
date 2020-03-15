<template>
  <div class="alter container">
      <div :class='classs' role="alert">
  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
  <strong>{{message}}</strong> 
</div>

  </div>
</template>

<script>
export default {
name:"alter",
props:["message","classs"],
data(){
  return{
    // classs:"alert alert-success alert-dismissible"
  }
}
}
</script>

<style>
.alter{
margin-left: -15px;
}
</style>