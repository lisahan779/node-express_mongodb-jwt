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
    <br />

    <h2>购物车</h2>
    <ul>
      <li v-for="(item,index) in this.list" :key="index">
        <div>
          <h3>{{item.productName}}</h3>
          <input type="checkbox" v-model="item.checked" /> 
          <span>{{item.produceName}}</span>
          <button class="btn btn-default" @click="editCart('minu',item)">-</button>
          <span>{{item.productNum}}</span>
          <button class="btn btn-default" @click="editCart('add',item)">+</button>
          <span>价格：{{item.salePrice}}</span>
          <button @click="del(index,item._id)" class="btn btn-default">删除</button>
        </div>
      </li>
    </ul>
    <input type="checkbox" v-model="allcheck" @click="checkall" />
    <button>合计:{{totalMoney}}</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
    editCart(flag,item) {
      if (flag == "add") {
        // 添加商品数量
          item.productNum++;
          console.log(Number(item.productNum) )
      } else if ((flag =="minu")) {
        // 减少商品数量
        if (item.productNum <= 1) {
          return;
        }
        item.productNum--;
        // console.log(Number(item.productNum) )
      } else {
        // 商品控制选中
        item.checked = item.checked == "1" ? "1" : "0";
      }
      this.$http.post("/cartEdit", {
          productId: item.productId,
          productNum: item.productNum,
          checked: item.checked
        })
        .then(response => {
          let res = response.data;
          console.log(res)
        });
        
    },
    checkall() {
      console.log(event.target.checked);
      this.list.forEach(item => {
        item.checked = event.target.checked;
      });
    },
    async del(i, id) {
      const res = await this.$http.delete("/cartDel/"+id);
      console.log(res);
      this.reload();
    }
  },
  computed: {
    totalMoney() {
      let allmoney = 0;
      // let isAllCheck = true;
      for (let i in this.list) {
        if (this.list[i].checked) {

          allmoney += this.list[i].productNum * this.list[i].salePrice;
        } else {
          // isAllCheck = false;
        }
      }
      // this.allcheck == isAllCheck;
      return allmoney;
    },
    ...mapGetters({
      // 调用getters拿数据,拿到的是express中的data
      cartinfo: "GETCART"
    })
  },
  created() {
    // this._initPageData()
    // 发送存数据指令调用actions里的方法，如果没哟这步，是获取不到数据的
    // 'INITCART'是actions里的[INITCART]的实例
    // store是main.js里定义的实例化的vuex
    this.$store.dispatch("INITCART");
    this.getproduct()
    
  },
  }

</script>

<style>
li {
  list-style: none;
}
</style>