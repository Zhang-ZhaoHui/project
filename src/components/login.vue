<template>
  <div class="main">
    <img src="../assets/logo.png" alt="">
    
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
      <el-form-item prop="user">
        <el-input v-model="ruleForm.user" placeholder="请输入8位用户名" prefix-icon="el-icon-user" clearable></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" placeholder="请输入密码" prefix-icon="el-icon-lock" clearable show-password></el-input>
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="login('ruleForm')">登录</el-button>
    <el-button type="info" @click='reset'>重置</el-button>
    
  </div>
</template>

<script>
export default {
  name:'login',
  data() {
    return {
      ruleForm:{
        user:'',
        password:'',
      },
      rules:{
        user: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {pattern:/^[0-9]{8}$/,message:'请输入八位数字',trigger: 'blur'}
        ],
        password:[
          {required: true, message:'请输入密码',trigger: 'blur'},
          ]
      }
    }
  },
  methods: {
    login(ruleForm){
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          let sendData=JSON.stringify({
              username:this.ruleForm.user,
              password:this.ruleForm.password,
          })
          this.$axios({
              method:'post',
              baseURL:'http://47.94.90.140:8000',
              url:'/login',
              data:sendData,
              headers:{
                  'Content-type':'application/json',
              },
          })
          .then((res)=>{
              sessionStorage.setItem('token',res.data.data.token);
              this.$message({
                message: '登录成功',
                type: 'success',
                center: true
              });
              this.$router.push('/home');
          })
          .catch(()=>{
            this.$message({
            showClose: true,
            message: '账号密码错误',
            type: 'error',
            center: true
            });
          })
        }else {
          return false;
        }
      })
    },
    reset(){
      this.ruleForm.user='';
      this.ruleForm.password=''
    }
  },
  mounted() {
    document.title='后台登录';
  },
}
</script>

<style scoped>
    .main{
      margin: 170px 550px;
      height: 400px;
      width: 400px;
      background-color: #fff;
      border-radius: 20px;
      box-shadow: 0 0 3px 1px white;
    }
    img{
      width: 130px;
      height:130px;
      float: left;
      margin: 30px 130px;
    }
    .el-form-item{
      width: 250px;
      margin-left: 70px;
    }
    .el-button{
      width: 80px;
      margin-right: 85px;
    }
</style>