# 配置 json -server 
 1. 安装json server 
`npm install -g json-server`

 2. 创建文件夹初始化packjson 
 `npm init`
 3. 安装json-server到packjson中
 `npm install json-server --save `
 4. 打开packjson 修改

 ```javascript 
   "scripts": {
    "test": "json-server --watch --port 3002 db.json",
    "remote":"json-server http://jsonplaceholder.typicode.com/db"
  }
  test和remote名字自定义
```
5. 创建db.json

```javascript
	{
		"A":{},
		"B":{}
	}
	A,B 对应就是localhost:3000后接的路径，

```
6. 在终端输入
`npm run test`
这样就启动了json server

### 获取所有用户信息 
http://localhost:3000/users

###  获取id为i的用户信息 
http://local了host:3000/users/1

###  同理获取公司的所有信息 
http://localhost:3000/companys

###  获取所有公司id 为3的用户 
http://localhost:3000/companys/3/users

###  通过名字获取信息 
http://localhost:3000/companys?name=Apple

###  根据多个名字获取公司信息 
http://localhost:3000/companys?name=Apple&name=Microft

###  获取一页中两条数据 
http://localhost:3000/companys?_page=1&_limit=2

<!-- 根据name升序排序获取数据 asc升序 desc降序 -->
http://localhost:3000/companys?_sort=name&_order=_asc

<!-- 根据id升序排序获取数据 asc升序 desc降序 -->
http://localhost:3000/companys?_sort=id&_order=desc

<!-- 获取年龄30以上的 -->
http://localhost:3000/users?age_gte=15

<!-- 获取年龄区间 -->
http://localhost:3000/users?age_gte=15&age_lte=17

<!-- 搜索用户信息中含有3的信息 -->
http://localhost:3000/users?q=3


<!-- post请求 -->

使用postman进行测试

post请求时要修改请求头

1. 设置Content-Type为application/json

2. 在body中写上数据，发送请求后就会在db.json中新增这条发送的数据
{
   "name":"deven",
	"age":14,
	"company":5,
	"email":"deven@qq.com"
}

<!-- 更新数据patch -->

比如更新用户id为3的信息中的name
选择patch,路径为http://localhost:3000/users/3

{
"name":"xiaohui"
}