<template>
  <div class="power">
    <input @change="uploadPhoto($event)" type="file" class="kyc-passin" />
    <img :src="base64" alt />
    <!-- // 这种可以打开相机或文件，"jpg,png,gif"这种打开只能上传特定文件且没有相机 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline:{
        img:''
      },
      base64:''
      }
  },
  methods: {
    uploadPhoto(e) {
      // 利用fileReader对象获取file
      var file = e.target.files[0];
      var filesize = file.size;
      var filename = file.name;
      console.log(filename)
      // 2,621,440   2M
      if (filesize > 2101440) {
        // 图片大于2MB
      }
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e)=> {
        // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
        var imgcode = e.target.result;
        // let that=this;
        this.formInline.img = imgcode;
        console.log(111,imgcode);
      this.$http.post('/uploads/transfer',{
            "filename": filename,
            "filesize": filesize,
            "base64": imgcode
          }).then(res=>{
            this.base64=res.data.base64
        console.log(res.data)
        console.log("图片上传成功！");
      })
      }
    },


  }
};
</script>

<style scoped>
.one {
  width: 3rem;
  height: 3rem;
}
.one img {
  width: 3rem;
  height: 3rem;
}
</style>
