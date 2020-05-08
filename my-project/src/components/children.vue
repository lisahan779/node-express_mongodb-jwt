<template>
  <div class="viewBox" style="height: 90%;" ref="viewBox" @scroll="Scroll">
    <ul ref="uls">
      <li v-for="(item,index) in lists" :key="'read'+index">
        <p>{{item.name}}</p>
        <p :class="{ 'red' : index+1<4 }">NO.{{index+1}}</p>
        <p style="color:#FF3B0D;">
          <span>{{item.score}}</span>分
        </p>
      </li>
    </ul>
  </div>
</template>
 
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  watch: {},
  data() {
    return {
      name: "懒加载的列表",
      nowPage: 1, //当前页码
      ulH: 0, //滚动内容实际的高度
      ulHsj: 0, //滚动内容实际的高度
      space: 0, //差值
      lists: [
        {},
        {},
        {},
        {},
        {},
        {},
        {}
      ]
    };
  },
  created() {},
  mounted() {
    //页面添加滚动事件
    document.addEventListener("scroll", this.Scroll);
    this.initScroll();
  },
  methods: {
    /**
     * 初始化赋值
     * */
    initScroll() {
      this.ulH = this.$refs.viewBox.clientHeight; //滚动条盒子的高度
      this.ulHsj = this.$refs.uls.clientHeight; //滚动内容实际的高度
      this.space = this.ulHsj - this.ulH; //差值
    },
    /**
     * 滚动条滚动到底部触发
     * */
    Scroll() {
      let scrollHeight = this.$refs.viewBox.scrollTop; //在盒子内部滚动高度
      if (scrollHeight >= this.space) {
        let newArr = [
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
        ];
        this.lists = this.lists.concat(newArr);
        this.initScroll(); //调用下初始化方法
      }
    }
  },
  components: {},
  beforeDestroy() {}
};
</script>
<style  scoped>
.viewBox {
  width: 100%;
  height: 50%;
  overflow-y: auto;
  padding: 10px;}
  li {
    display: flex;
    border-bottom: 1px solid #eee;}
    p {
      width: 33.33%;
      text-align: center;
      font-size: 0.7291666666666667vw;
      line-height: 1.3541666666666667vw;
    }
      span {
        display: inline-block;
        width: 2.0833333333333335vw;
        text-align: right;
        margin-right: 2px;
      }
</style>