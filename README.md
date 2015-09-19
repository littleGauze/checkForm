# checkForm
-------------
## 简介
自己写的 一个基于jQuery的 表单验证插件。  
前前后后也写了一些些的插件了，但是大多都是针对项目的重用性不大，自已也慢慢的积累一点东西。

## 使用方法

首先引入jQuery(基于jQuery的插件)然后引入jquery.checkForm.js或者jquery.checkForm.min.js

```javascript
<script src="./js/jquery.min.js"><script>
<script src="./js/jquery.checkForm.js"><script>
```

在表单 **input**, **textarea**（目前只支持这两个元素，可自行扩展）上添加相应的**验证标记**属性，进行表单验证，可用的验证标记有：
> 方括号里的内容为可选  
> 所有的验证类型都有默认的提示信息且可以自行设置，所以可以只写验证标记
> 这些验证均是再表单失去焦点（blur）的时候触发的

- `req[='tips info']`     字段为空的验证
- `email[='tips info']`   电子邮箱的验证
- `tel[='tips info']`     座机和手机号码验证（需要分开验证的可自行扩展）
- `qq[='tips info']`      QQ号码的验证
- `idcard[='tips info']`  身份证的验证
- `url[='tips info']`     URL地址的验证（支持path验证）
- `domain[='tips info']`  域名的验证
- `passgt6[='tips info']` 密码必须大于6位字符验证
- `cpass=firstPass`       该验证有点特殊，验证两次密码是否一致，该属性的值为第一次输入密码表单的name属性值（必须）


具体写法可以参考下面的图片：
![checkForm](http://7xlwka.com1.z0.glb.clouddn.com/checkForm.png)
[查看在线演示](http://demobygauze.sinaapp.com/index.html)

```html
<input type="text" name="username" req="用户名不能为空!">
验证不为空并且使用自定义的提示信息

<input type="password" name="userpass" req passgt6>
验证不为空并且密码大于6位字符

<input type="password" name="confirmpass" req cpass="userpass">  
验证不为空，并且验证和[name=userpass]元素的值是否一致

<input type="text" name="contact" req tel>
验证不为空，并且验证座机和手机电话号码

<input type="text" name="email" req email>
验证不为空，并且验证电子邮箱地址
```

> 注意： 提示信息是直接加到相应的表单后面的第一个元素内的。

```html
    <input type="text" name="username" req="用户名不能为空!">
    <span class="tips"></span>
```

其他的验证方法都是一样的就不一一列举了。

###### JS端初始化
该方法直接加到jQuery的属性上的，并没有加到原型链上，所以直接调用就行。
> 由于要监听表单元素，所以等文档加载完毕后再调用初始化。

```javascript
var ic;
$(function(){
  ic = $.checkForm(); //该方法返回一个对象，包含一个方法checkForm可用于提交表单的时候做验证
});

//接收一个参数为form表单元素
function checkForm(form){
  if(!ic.checkForm(form)){
      return false; //验证失败
  }
  
  //验证成功，可提交表单
  
}

```

`$.checkForm(options)` 可以接收一个包含默认提示信息的对象参数，默认的提示信息为：

```javascript
var tipText = {
		'req': '该项为必填项！',
		'cpass': '两次密码不一致',
		'email': '请输入正确的邮箱格式！',
		'tel': '请输入正确的电话号码！',
		'qq': '请输入正确的QQ号码！',
		'idcard': '请输入正确的身份证号码!',
		'url': '请输入正确的URL地址,必须以http://、https://或ftp://开头!',
		'domain': '请输入正确的域名!',
		'passgt6': '密码必须大于6个字符!'
	};
```
初始化时可以传入这样一个对象来覆盖提示信息，方便自定义和国际化。

提交表单时的验证可以这样写：
```html
<form action="" method="post" onsubmit="return checkForm(this);"></form>
```
> 注意 一定要return 不然验证失败后无法阻止表单的提交

#其他

这里还包含了两个限制输入的标记 **telOnly**, **numOnly**：（可自行扩展）
- telOnly 只允许输入数字和短横线[-]
- numOnly 只允许输入数字

目前就这两种，使用方法与验证的类似，直接加到表单上就Ok了，
```html
<input type="text" name="contact" req tel telOnly>
<input type="text" name="salary" numOnly>
```
#兼容
  IE9+ 支持IE9及以上的浏览器，应为用到了indexOf等一些函数。
  其他浏览器低版本的没有测试。。。

#注意
  其中用到的正则表达式大多是网上搜的，也有些是自己写的，可能有不对的地方就自己修改吧。
