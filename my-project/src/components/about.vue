<!--
 * @Author: your name
 * @Date: 2020-03-07 17:05:46
 * @LastEditTime: 2020-03-18 10:57:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /all/my-project/src/components/about.vue
 -->
<template>
  <div class="about container">
    <button class="btn btn-default">
      <router-link to="/customers">返回主页</router-link>
    </button>
    <button>获取数据</button>
    <br>
    
    <h2>购物车</h2>

    <ul>
      <li v-for="(item,index) in this.list" :key="index">
        <div>
          <input type="checkbox" v-model="item.checked" />
          <span>{{item.title}}</span>
          <button class="btn btn-default" @click="reduce(index)">-</button>
          <span>{{item.num}}</span>
          <button class="btn btn-default" @click="add(index)">+</button>
          <span>价格：{{item.price}}</span>
          <button @click="del(index,item._id)" class="btn btn-default">删除</button>
        </div>
      </li>
    </ul>
    <input type="checkbox" v-model="allcheck" @click="checkall" />
    <button>合计:{{totalMoney}}</button>
  </div>
</template>

<script>
export default {
  name: "about",
  // 调用app.vue组件中的方法
  inject: ["reload"],
  data() {
    return {
      list: [],

      allcheck: false
    };
  },

  methods: {
    async getproduct() {
      const res = await this.$http.get("/goodslist");
      this.list = res.data;
      localStorage.setItem("shoppingcart", JSON.stringify(this.list));
      console.log(this.list);
    },
    add(i) {
      this.list[i].num++;
    },
    reduce(i) {
      if (this.list[i].num <= 1) {
        this.list[i].num = 0;
        return;
      }
      this.list[i].num--;
    },
    checkall() {
      //   console.log(this.allcheck);
      console.log(event.target.checked);
      this.list.forEach(item => {
        item.checked = event.target.checked;
        // console.log(item._id)
      });
    },
    async del(i, id) {
      const res = await this.$http.delete("/delfile/" + id);
      console.log(res);
      this.reload();
    }
  },
  computed: {
    totalMoney() {
      let allmoney = 0;
      let isAllCheck = true;
      for (let i in this.list) {
        if (this.list[i].checked) {
          allmoney += this.list[i].price * this.list[i].num;
        } else {
          isAllCheck = false;
        }
      }
      this.allcheck == isAllCheck;
      return allmoney;
    }
  },
  created() {
    this.getproduct();
  }
};
</script>

<style>
li {
  list-style: none;
}
</style>