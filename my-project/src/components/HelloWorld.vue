<template>
  <!--  每个组件必须有一个根组件，这点要明确的知道！ -->
  <div>
    <h1>{{ msg }}</h1>

    <!--  商品列表信息 -->

    <ul>
      <li>
        <button @click="addItem(index)">添加到购物车</button>
      </li>
    </ul>
    <div>{{cartinfo}}</div>
    <!--  购物车信息 -->

    <!--  使用注册进来的组件 -->

    <!-- <cart name="action" :cartList="cartList"></cart> -->
  </div>
</template>

 

<script>
// 我彻底蒙了， 除了一些特别的是函数，别的都是:

// 导入购物车组件

// import Cart from "./addshopping.vue";
import { mapGetters } from "vuex";
export default {
  name: "HelloWorld",
  data() {
    return {
      show: false,
    }
  },
  props: {
    // 指定接受参数的类型

    msg: String
  },

  methods: {
    addItem(index) {
      // 得到该商品

      const good = this.goods[index];

      const item = this.cartList.find(item => item.id == good.id);

      // 如果item 不为空，则表示已经添加到购车中了

      if (item) {
        item.count += 1;
      } else {
        this.cartList.push({
          ...good,
          count: 1,

          active: true
        });
      }
    }
  },
  computed: {
    // 就相当于vuex.mapGetters
    // 解构赋值
    // computed里面的数据不需要在data中定义接收
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
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;

  padding: 0;
}

li {
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>