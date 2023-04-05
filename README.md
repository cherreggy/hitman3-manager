## <font color=red>杀手 3</font>任务管理系统 🩸

##### <font color=grey>作者：宣正吉&nbsp;&nbsp;&nbsp;&nbsp;开发时长：10 小时左右</font>

项目 GitHub 链接：https://github.com/cherreggy/hitman3-manager

部署链接：https://hitman3-manager-lmnw4xmt-cherreggy.4everland.app/
打开上面的部署链接可以直接查看所写系统的呈现效果！！！

##### <font color=darkred>技术栈：React、Ant Design、js-cookie 等</font>

---

#### 🩸 基本需求介绍

<span style="display:inline-block;width:20px;height:20px;background-color:red;color:white;text-align:center;line-height:20px;border-radius:5px;font-weight:400">1</span> 做一个登录页，登录完之后，cookie 种入标识，防止下次再重复登录(提示：cookie 有过期时间)
<span style="display:inline-block;width:20px;height:20px;background-color:red;color:white;text-align:center;line-height:20px;border-radius:5px;font-weight:400">2</span> 设计一个权限管理，然后给 1 中用户分配一些权限
<span style="display:inline-block;width:20px;height:20px;background-color:red;color:white;text-align:center;line-height:20px;border-radius:5px;font-weight:400">3</span> 做一个列表页和表单填写页

---

### 🩸 登录页面

#### 登陆页面设计

登录页面采用红白黑配色，利用 Ant Design 进行页面组件的设计，登录页面很简单，只包含用户名、密码的输入框和提交按钮，这里中间较窄的面板采用多列等高布局方法，使得元素大小和浏览器高度相同：
<image src="1.png"/>

而后为登录页面添加逻辑，用 state 保存用户名和密码，但是现在需要考虑主页的跳转逻辑，编写静态页面暂时利用 token 存储两个虚拟用户的用户名和密码：

> 用户名：123
> 密码：123

> 用户名：111
> 密码：111

这里实际上用了`Spin`组件作为页面加载动画，但是组件加载太快了，基本肉眼看不出来，将网络速度模拟调整之后，调成低速 3G 可以看到动画：
<image src="2.png"/>

#### Cookie 存储登录信息

使用 cookie 需要安装一个管理 cookie 的包`js-cookie`，对原来的代码进行修改。

**在刚刚登录时：** 在 Cookie 中获取用户名，如果存在说明刚刚登录过，取出 token 赋值给 state，自动跳转到页面内；如果 cookie 中 token 为空，说明没有登录信息或者信息过期，这时如果验证成功登录时将 token 存储下来，并赋值给 state 进入主页面。

**在退出登录时：** 清除 cookie 的存储并将 state 重置。

补充：cookie 时长设置项`expires`设置的正整数含义是天数，其也可以自定义过期时长，例如：

```js
let seconds = 10;

let expires = new Date(new Date() * 1 + seconds * 1000);

Cookies.set("username", "tanggaowei", { expires: expires }); // 10 秒后失效
```

---

### 🩸 主页面

#### 主页面设计

主页面在登陆后呈现，注意登出的部分需要调用一下 `token` 和 `setToken` 实现退出效果：
<image src="3.png"/>

表单部分采用栅格布局，将整个板块划分为 6 个部分，每个部分填入一个表单项，在`<Form>`组件外部添加两个按钮，分别用于重置内容和添加内容到下面的表格展示当中：
<image src="4.png"/>

#### 表格展示区域

表格展示区域使用`<Table>`组件完成，其中带有 Tag，前面的表单部分为了符合表格展示要求，将几个组件替换为下拉选择组件：
<image src="5.png"/>

其逻辑部分先将主页面的信息保存在一个 state 当中，添加信息时将内容保存在 Local Storage 当中，主页面组件刷新时自动获取存储的数据，并读入到表格当中。

删除操作需要为源数据添加 id 指示所删除的对象，因此在点击添加按钮时还要为当前数据对象添加一个 id 属性，这里值设置为`new Date()`的当前时间戳，不会重复。

实现效果：
<image src="6.png"/>

#### 本地存储

首先点击添加能够更新本地存储内容，将当前用户 id 作为 key 存储数据。

当组件刷新时，将 data 设置为本地存储中的值，根据用户的 token 获取其在本地存储的数据信息。

<font color=red style="font-weight:700">注意：</font>本地存储`localStorage`方法存储的只能是字符串变量，因此需要使用`JSON.stringify`和`JSON.parse`实现数据的存取。

实现效果，甚至还可以添加更多想要的用户：

<image src="7.png"/>
<image src="8.png"/>

#### 查看细节

细节查看用了弹窗组件`Modal`，点击查看细节按钮显示对话框并填入细节信息，点击确定按钮可以修改数据信息。

这里新建另外一个`form`参数用于存储细节弹窗中输入的内容，存储信息都可以进行修改，修改后点击修改按钮将当前内容替换到现在`curr`对象所在`id`对象上，即可实现修改。

实现效果：
<image src="9.png"/>
