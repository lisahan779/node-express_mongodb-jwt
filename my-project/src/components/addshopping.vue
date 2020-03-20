<template>

    <div>

        <h2>{{name}}</h2>

            <!--购物车列表  -->

            <table>

                <tr>

                    <th>选中</th>

                    <th>商品名称</th>

                    <th>价格</th>

                    <th>数量</th>

                    <th>单品总价</th>

                    <th>操作</th>

                </tr>

                <tr v-for = " c in cartList" :key = "c.id">

                    <td>

                        <!-- 双向数据绑定 -->

                        <input type="checkbox" v-model="c.active">

                    </td>

                    <td>

                        {{c.name}}

                    </td>

                    <td>{{c.price}}</td>

                    <td>

                        <button @click = "addCount(c.id)">add</button>

                        {{c.count}}

                        <button @click = "minuxCount(c.id)">minus</button>

                    </td>

                    <td>{{c.count * c.price}}</td>

                    <td>

                        <button @click = "deleteFromCart(c.id)">删除</button>

                    </td>

                </tr>

                <tr v-if="this.cartList.length">

                    <td>总价格</td>

                    <!-- 计算属性的写法 -->

                    <td colspan="5">{{getTotal}}</td>

                </tr>

            </table>

 

            

    </div>

</template>

 

<script>

    //  我们做事情，脸皮要厚！

    export default {

          name:"cart",

          data(){

              return {

 

              }

          },

        //   接受参数的信息

          props:["name","cartList"],

          methods:{

              addCount(index){

                 const good =this.cartList.find(item=>item.id==index);

                 good.count++;   

              },

              minuxCount(index){

                     const good =this.cartList.find(item=>item.id==index);

                     if(good.count==0){

                         return;

                     }

                     good.count--;

              },

              deleteFromCart(index){

                  // 找到具体的商品

                   const good =this.cartList.find(item=>item.id==index);

                   if(window.confirm("您确定删除该商品嘛？")){

                  ()=>{ //亨达全球HantecGlobal返佣 http://www.kaifx.cn/broker/hantecglobal.html

                       // 在这里执行删除操作

                       let i = this.cartList.indexOf(good);

                       // splice 删除操作，可以修改原数组，昨天我们学过！ 不要忘记了

                       this.cartList.splice(i,1);

                   }

              }

 

          },
          },

          computed:{

              //计算总价格

              getTotal(){

                  var sum = 0;

                  this.cartList.forEach(element => {

                      if(element.active){

                        sum+=element.price*element.count;

                      }

                  });

                  return sum;

              }

          }

 

    }

</script>

<style  scoped>

    .cart_box{

        width:600px;

        margin: 10px auto;

    }

</style>