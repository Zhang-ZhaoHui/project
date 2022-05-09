<template>
  <div class="body1">
    <div class="top">
      <h2 class="title">学生组织报名管理</h2>
      <el-button type="danger" round class="out" @click='goout'>退出</el-button>
      <div class="time">现在是{{newDate | timefilter()}}
        </div>
    </div>
    <div class="add">
      <div class="nav">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#1a324d"
          text-color="#fff"
          active-text-color="#ffd04b">
             <el-menu-item index="1" @click="welcome">
              <i class="el-icon-document"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="2" @click="detail">
              <i class="el-icon-menu"></i>
              <span slot="title">学生信息</span>
            </el-menu-item>
        </el-menu>
    </div>
    <div class="show">
      <router-view></router-view>
    </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'home',
    data() {
      return {
        newDate:new Date(),
      }
    },
    methods: {
      // 路由实现，点击不同按钮页面显示不同界面
      welcome(){
        this.$router.push('/home/')
      },
      detail(){
        this.$router.push('/home/detail')
      },
      // 点击退出按钮，消除token，退出当前界面返回至login界面
      goout(){
        sessionStorage.removeItem('token');
        this.$message({
                message: '您已成功退出',
                type: 'success',
                center: true
              });
        this.$router.replace('/login');
      }
    },
    // 动态获取当前时间
    mounted () {
    this.timer = setInterval( ()=>{
      this.newDate = new Date()
    },1000)},
    beforeDestroy() {
      clearInterval(this.timer)
    },
    // 时间格式化过滤器
    filters:{
        timefilter:function(value){
            var y = value.getFullYear();
            var m = value.getMonth()+1;
            m=m<10?'0'+m:m;
            var d = value.getDate()
            d=d<10?'0'+d:d;
            var h = value.getHours()
            h=h<10?'0'+h:h;
            var mm = value.getMinutes()
            mm=mm<10?'0'+mm:mm;
            var s = value.getSeconds();
            s=s<10?'0'+s:s;
            return `${y}-${m}-${d} ${h}:${mm}:${s}`
            }
        }
    }
</script>

<style>
  .body1{
    min-width: 1520px;
  }
  .nav{
    float: left;
    width: 230px;
    height: 700px;
    background-color: #1a324d;
  }
  .top{
    height: 53px;
    background-color: rgb(46, 46, 46);
  }
  .title{
    line-height: 53px;
    margin-left: 40px;
    color: white;
    display: inline-block;
  }
  .el-button{
    float: right;
    margin-top: 8px;
    margin-right: 40px;
  }
  .show{
    float:left;
    width: 1288px;
    height: 700px;
    background-color: rgba(255, 255, 255, -0.141)
  }
  .add{
    height: 700px;
    background-color: rgba(255, 255, 255,0.856)
  }
  .time{
    float: right;
    height: 53px;
    width: 250px;
    line-height: 53px;
    color: white
  }
</style>