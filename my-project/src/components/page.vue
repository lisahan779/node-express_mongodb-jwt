<template>
  <div class="page-bar">
    <ul class="pageul">
      <li>
        <a @click="sendmessage('reduce')" class="page">上一页</a>
      </li>
      <li v-for="index in indexs" :key="index" :class="{ 'active': cur == index}">
        <a @click="btnClick(index)">{{ index }}</a>
      </li>
      <li>
        <a class="page" @click="sendmessage('add')">下一页</a>
      </li>
      <li>
        <a class="page">共{{all}}页</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "page",
  data() {
    return {
      all: 20, //总页数
      cur: 1 //当前页码}
    };
  },
  computed: {
    indexs() {
      var left = 1;
      var right = this.all;
      var ar = [];
      if (this.all >= 11) {
        if (this.cur > 5 && this.cur < this.all - 4) {
          left = this.cur - 5;
          right = this.cur + 4;
        } else {
          if (this.cur <= 5) {
            left = 1;
            right = 10;
          } else {
            right = this.all;
            left = this.all - 9;
          }
        }
      }
      while (left <= right) {
        ar.push(left);
        left++;
      }
      return ar;
    },
    showLast() {
      if (this.cur == this.all) {
        return false;
      }
      return true;
    },
    showFirst() {
      if (this.cur == 1) {
        return false;
      }
      return true;
    }
  },
  //   watch: {
  //     cur: function(oldValue,newValue) {
  //       console.log(oldValue);
  //     }
  //   },
  methods: {
    btnClick: function(data) {
      //页码点击事件
      if (data != this.cur) {
        this.cur = data;
      }
      this.$emit("page", this.cur);
    },
    // 注意增减的顺序
    sendmessage(flag) {
      if (flag == "add") {
        if (this.cur >= 20) {
          this.cur === 20;
          return false;
        }
        this.cur++;
      } else if (flag == "reduce") {
        if (this.cur <= 1) {
          this.cur == 1;
          return false;
        }
        this.cur--;
      }
      this.$emit("page", this.cur);
    }
  }
};
</script>

<style  scoped>
li {
  list-style: none;
  float: left;
}
.page-bar {
  position: absolute;
  width: 100%;
  min-width: 615px;
  bottom: 0;
}
.page-bar a {
  border: 1px solid #ddd;
  text-decoration: none;
  width: 43px;
  text-align: center;
  margin-left: -1px;
  line-height: 1.42857143;
  color: #337ab7;
  cursor: pointer;
  display: inline-block;
}
.page {
  display: inline-block !important;
  width: 50px !important;
}
.page-bar a:hover {
  background-color: #eee;
}
.page-bar .active a {
  color: #fff;
  cursor: default;
  background-color: #337ab7;
  border-color: #337ab7;
}
.page-bar i {
  font-style: normal;
  color: #d44950;
  margin: 0px 4px;
  font-size: 12px;
}
</style>