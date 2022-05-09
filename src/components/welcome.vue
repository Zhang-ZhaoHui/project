<template>
<div class="all">
  <div class="hello">
    <h1>  Welcome!!!</h1>
    <br/>
    <h1>欢迎进入学生组织报名管理系统</h1>
    <br/>
  </div>
</div>

</template>

<script>
export default {
    name:'welcome',
    mounted() {
      document.title='欢迎进入报名系统';
    },
}
</script>

<style scoped>
  .hello{
    height: 100px;
    width: 600px;
    margin: 200px  auto;
  }
  h1{
    color: rgb(0, 92, 128);
    text-align: center;
  }
</style>