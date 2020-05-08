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
    <!-- 方法，需不需要禁用，false，滚动距离里下面多远触发方法 -->
    <button class="btn btn-default">
      <router-link to="/customers">返回主页</router-link>
    </button>
    <br />
    <button @click="sortGoods">降序排列</button>
    <ul>
      <li v-for="(item,index) in this.list" :key="index">
        <div>
          <h3>{{item.productName}}</h3>
          <img src="../assets/img/q.jpg" alt width="100px" height="300px" />
          <input type="checkbox" v-model="item.checked" @change="_checkAll" />
          <span>{{item.produceName}}</span>
          <button class="btn btn-default" @click="editCart('minu',item)">-</button>
          <span>{{item.productNum}}</span>
          <button class="btn btn-default" @click="editCart('add',item)">+</button>
          <span>价格：{{item.salePrice}}</span>
          <button @click="del(item._id)" class="btn btn-default">删除</button>
        </div>
        <button @click="addcart(item._id)">加入购物车</button>
      </li>
    </ul>
    <div
      class="load-more"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="30"
    >{{msg}}</div>
    <input type="checkbox" id="allCheckBox" v-model="allcheck" @click="checkall" />
    <button>合计:{{totalMoney}}</button>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
export default {
  name: "about",
  // 调用app.vue组件中的方法
  inject: ["reload"],
  data() {
    return {
      msg: "加载中。。。",
      busy: true,
      list: [],
      page: 1,
      allcheck: false,
      sortfalg: true,
      priceChecked: false
    };
  },
  // 总价的实时监听
  computed: {
    totalMoney() {
      let allmoney = 0;
      let isAllCheck = true;
      for (let i in this.list) {
        if (this.list[i].checked) {
          allmoney += this.list[i].productNum * this.list[i].salePrice;
        } else {
          isAllCheck = false;
        }
      }
      this.allcheck == isAllCheck;
      return allmoney;
    }
  },
  methods: {
    loadMore() {
      // 停止加载事件的触发
      this.busy = true;
      console.log("记载");
      //  滚动条会触发多条发送事件，造成服务器压力，使用延时函数等第一条请求结束后发送第二个请求
      setTimeout(() => {
        this.page++;
        // 调用请求后端数据方法由于数据需要累加，故请求时传参，如果已经加载了数据，就进行累加处理。
        this.getproduct(true);
      }, 1000);
    },
    // 请求后端数据
    async getproduct(flag) {
      // 传参
      let param = {
        page: this.page,
        row: 1,
        sort: 1
      };
      const res = await this.$http.get("/goodslist", { params: param });
      if (flag) {
        // concat实现数据的叠加
        this.list = this.list.concat(res.data.result.list);
        // 如果后端数据条数为0 停止加载事件的触发
        if (res.data.result.count == 0) {
          this.busy = true;
          this.msg = "数据加载完成";
          console.log("完成");
        } else {
          this.busy = false;
        }
      } else {
        this.list = res.data.result.list;
        // 默认falg是false,就不执行前面的if语句，不会触发loadmore()
        this.busy = false;
      }
      localStorage.setItem("shoppingcart", JSON.stringify(this.list));
      console.log(this.list[0].productImage);
    },
    // 数量
    editCart(flag, item) {
      if (flag == "add") {
        // 添加商品数量
        item.productNum++;
      } else if (flag == "minu") {
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
      this.$http
        .post("/cartEdit", {
          productId: item.productId,
          productNum: item.productNum
          // checked: item.checked
        })
        .then(response => {
          let res = response.data;
          console.log(111, res);
        });
    },
    // 全选
    checkall() {
      console.log(event.target.checked);
      this.list.forEach(item => {
        item.checked = event.target.checked;
      });
    },
    // 反选
    _checkAll() {
      //  遍历所有的数据如果都选中则全选选中
      if (this.list.every(item => item.checked)) {
        this.allcheck = true;
      } else {
        this.allcheck = false;
      }
    },
    // 删除商品
    async del(id) {
      const res = await this.$http.delete("/cartDel/" + id);
      console.log(res);
      this.reload();
    },
    // 价格过滤
    setpricefilter(index) {
      this.level = index;
      this.page = 1;
      this.getproduct(true);
    },
    // 商品降序
    sortGoods() {
      this.sortfalg = !this.sortfalg;
      this.page = 1;
      this.getproduct(true);
    },
    // 加入购物车
    addcart(id) {
      this.$http
        .post("/goods/addcart", {
          _id: id
        })
        .then(res => {
          if (res.status == 200) {
            alert("加入成功");
          } else {
            alert("加入失败");
          }
        });
    }
  },
  mounted() {
    this.getproduct();
  }
};
</script>

<style>
li {
  list-style: none;
}
.load-more {
  text-align: center;
}
</style>