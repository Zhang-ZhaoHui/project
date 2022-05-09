# 学生组织报名系统基本功能说明
## 报名界面
- 基本信息填写
- 对填写的内容实现表单验证
- 报名按钮将数据发送至服务器，并提示报名成功
- 如数据发送不成功，提示报名失败
## 后台登录界面
- 在报名界面点击后台登录可进入后台登录界面
- 账号密码进行了表单验证需符合一定的规则才能被提交
- 输入正确的账号密码提示登录成功，将登入后台数据界面（储存token）；否则提示账号密码错误
- 重置按钮将输入框内的内容清空
## 后台数据界面
- 默认展示首页欢迎界面
- 页面有实时时间显示
- 点击菜单中的学生信息，将展示从后台返回的提交数据
- 对报名数据可以设置一页展示的个数，和立即前往第几页
- 搜索框可以对已有数据进行搜索
- 数据可以进行修改
- 点击修改按钮，弹出修改界面，修改界面展示之前提交的数据
- 修改完成后，报名数据随之进行改变
- 点击退出按钮，将删除token
- 数据页面设置路由守卫，点击退出后，不能再后退进入数据界面
# 后期优化的功能
- 对报名和登录界面的表单添加验证，验证成功后才会向后台发送or获取数据
- 对展示数据页面，添加了路由守卫，点击退出按钮（删除token）后，将不能再进入
- 实时时间进行了格式化
- 使不同界面的title，随界面切换而变换
- 对部分样式，做了些改动
