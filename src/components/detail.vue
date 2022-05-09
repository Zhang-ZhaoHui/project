<template>
  <div class="studata">
    <!-- 面包屑导航部分 -->
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home/detail' }">学生信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 数据部分 -->
    <div class="stu">
      <!-- 搜索用户 -->
      <div class="search">
        <el-input placeholder="请输入搜索关键字" v-model="input" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </div>
      <!-- 展示数据的表格 -->
      <div class="detail">
        <el-table
          :data="tableData"
          height="400"
          border
          style="width: 100%">
          <el-table-column
            fixed
            prop="stdName"
            label="姓名"
            width="100"
            align="center">
          </el-table-column>
          <el-table-column
            prop="stdId"
            label="学号"
            width="100"
            align="center">
          </el-table-column>
          <el-table-column
            prop="major"
            label="专业"
            width="100"
            align="center">
          </el-table-column>
          <el-table-column
            prop="classNum"
            label="班级"
            width="100"
            align="center">
          </el-table-column>
          <el-table-column
            prop="stdQQ"
            label="qq号"
            width="110"
            align="center">
          </el-table-column>
          <el-table-column
            prop="stdPhone"
            label="手机号"
            width="110"
            align="center">
          </el-table-column>
          <el-table-column
            prop="firstWill.organization"
            label="第一志愿"
            width="100"
            align="center">
          </el-table-column>
          <el-table-column
            prop="firstWill.branch"
            label="部门"
            width="100"
            align="center">
          </el-table-column>
          <el-table-column
            prop="firstWill.reason"
            label="原因"
            width="150"
            align="center">
          </el-table-column>
          <el-table-column
            prop="secondWill.organization"
            label="第二志愿"
            width="100"
            align="center">
          </el-table-column>
          <el-table-column
            prop="secondWill.branch"
            label="部门"
            width="100"
            align="center">
          </el-table-column>
          <el-table-column
            prop="secondWill.reason"
            label="原因"
            width="150"
            align="center">
          </el-table-column>
          <el-table-column
            prop=isDispensing
            label="是否调剂"
            width="100"
            align="center">
            <template slot-scope="scope">{{ !!(scope.row.isDispensing)?'调剂':'不调剂' }}</template>
          </el-table-column>
          <!-- 更改操作 -->
          <el-table-column
            label="更改"
            width="130"
            align="center">
            <template slot-scope="scope">
              <!-- 点击修改按钮弹出显示目前数据的弹框 -->
              <el-button type="primary" plain @click="dialogFormVisible = true ,handleClick(scope.row)">修改</el-button>
              <!-- 弹窗 -->
              <el-dialog title="修改志愿" :visible.sync="dialogFormVisible" :append-to-body='true'>
                <div class="el-dialog-div">
                  <!-- 弹窗展示的表格内容 -->
                  <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="姓名">
                      <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="学号">
                      <el-input v-model="form.number" placeholder="请输入学号"></el-input>
                    </el-form-item>
                    <el-form-item label="电话">
                      <el-input v-model="form.phone"  placeholder="请输入电话"></el-input>
                    </el-form-item>
                    <el-form-item label="QQ">
                      <el-input v-model="form.qq"  placeholder="请输入QQ"></el-input>
                    </el-form-item>
                    <el-form-item label="专业">
                      <el-cascader
                      v-model="form.major"
                      :options="majorData"
                      :props="{ expandTrigger: 'hover' }"
                      clearable
                      ></el-cascader>
                    </el-form-item>

                    <el-form-item label="第一志愿">
                      <el-cascader
                      v-model="form.origation1"
                      :options="orginazationData"
                      :props="{ expandTrigger: 'hover' }"
                      clearable
                      ></el-cascader>
                    </el-form-item>

                    <el-form-item label="理由">
                      <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入加入此组织的理由"
                        v-model="form.reason1">
                      </el-input>
                    </el-form-item>

                    <el-form-item label="第二志愿">
                      <el-cascader
                      v-model="form.origation2"
                      :options="orginazationData"
                      :props="{ expandTrigger: 'hover' }"
                      clearable
                      ></el-cascader>
                    </el-form-item>

                    <el-form-item label="理由">
                      <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入加入此组织的理由"
                        v-model="form.reason2">
                      </el-input>
                    </el-form-item>

                    <el-form-item label="是否调剂">
                      <el-switch
                        v-model="form.isAgree"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                      </el-switch> 
                    </el-form-item>

                    <!-- 按钮确认修改 -->
                    <el-form-item label=" ">
                      <el-button @click="dialogFormVisible = false">退出</el-button>
                      <el-button type="primary" @click="alter">确认修改</el-button>
                    </el-form-item>

                  </el-form>
                </div>
              </el-dialog>
            </template>
          </el-table-column>

        </el-table>
        <!-- 下面的页签 -->
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[5,10,15,20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total='totalPage'
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'detail',
  data() {
    return {
      input:'',
      currentPage:1,
      pageSize:5,
      totalPage:0,
      tableData:[],
      student:'',
      dialogFormVisible: false,
      form:{
        number:'',
        name:'',
        qq:'',
        phone:'',
        major:[],
        origation1:[],
        reason1:'',
        origation2:[],
        reason2:'',
        isAgree:true,
      },
      "majorData": [{
          "value": "计算机科学与技术",
          "label": "计算机科学与技术",
          "children": [{
              "value": "一班",
              "label": "一班"
          },
          {
              "value": "二班",
              "label": "二班"
          },
          {
              "value": "三班",
              "label": "三班"
          },
          {
              "value": "四班",
              "label": "四班"
          }
          ]
      },
      {
          "value": "信息安全",
          "label": "信息安全",
          "children": [{
              "value": "一班",
              "label": "一班"
          },
          {
              "value": "二班",
              "label": "二班"
          },
          {
              "value": "三班",
              "label": "三班"
          },
          {
              "value": "四班",
              "label": "四班"
          }
          ]
      },
      {
          "value": "物联网",
          "label": "物联网",
          "children": [{
              "value": "一班",
              "label": "一班"
          },
          {
              "value": "二班",
              "label": "二班"
          }
          ]
      },
      {
          "value": "数据科学与大数据技术",
          "label": "数据科学与大数据技术",
          "children": [{
              "value": "一班",
              "label": "一班"
          },
          {
              "value": "二班",
              "label": "二班"
          }
          ]
      },
      {
          "value": "计算机科学与技术(中外合作)",
          "label": "计算机科学与技术(中外合作)",
          "children": [{
              "value": "一班",
              "label": "一班"
          },
          {
              "value": "二班",
              "label": "二班"
          },
          {
              "value": "三班",
              "label": "三班"
          },
          {
              "value": "四班",
              "label": "四班"
          },
          {
              "value": "五班",
              "label": "五班"
          },
          {
              "value": "六班",
              "label": "六班"
          }
          ]
      }
      ],
      "orginazationData": [{
          "value": "科技协会",
          "label": "科技协会",
          "children": [{
          "value": "科技协会",
          "label": "科技协会"
          }]
      },
      {
          "value": "团委",
          "label": "团委",
          "children": [{
              "value": "组织部",
              "label": "组织部"
          },
          {
              "value": "宣传部",
              "label": "宣传部"
          },
          {
              "value": "心协",
              "label": "心协"
          },
          {
              "value": "青协",
              "label": "青协"
          }
          ]
      },
      {
          "value": "学生会",
          "label": "学生会",
          "children": [{
              "value": "办公室",
              "label": "办公室"
          },
          {
              "value": "学习部",
              "label": "学习部"
          },
          {
              "value": "宣传部",
              "label": "宣传部"
          },
          {
              "value": "文艺部",
              "label": "文艺部"
          },
          {
              "value": "体育部",
              "label": "体育部"
          },
          {
              "value": "外联部",
              "label": "外联部"
          },
          {
              "value": "自管会",
              "label": "自管会"
          }
          ]
      },
      {
          "value": "勤工助学中心",
          "label": "勤工助学中心",
          "children": [{
              "value": "管理部",
              "label": "管理部"
          },
          {
              "value": "活动部",
              "label": "活动部"
          },
          {
              "value": "助贷部",
              "label": "助贷部"
          },
          {
              "value": "外联部",
              "label": "外联部"
          }
          ]
      },
      {
          "value": "新闻中心",
          "label": "新闻中心",
          "children": [{
              "value": "摄影协会",
              "label": "摄影协会"
          },
          {
              "value": "新媒体部",
              "label": "新媒体部"
          },
          {
              "value": "记者团",
              "label": "记者团"
          }
          ]
      }
      ]
    }
  },
  methods: {
    handleSizeChange(val) {
        this.pageSize=val;
        this.fn()
      },
    handleCurrentChange(val) {
        this.currentPage=val;
        this.fn()
      },

      fn(){
      let sendData=JSON.stringify({
        token:sessionStorage.getItem('token'),
        page:this.currentPage,
        pageSize:this.pageSize
      })
      this.$axios({
        method:'post',
        baseURL:'http://47.94.90.140:8000',
        url:`/getAllStuInfo?page=${this.currentPage}&pageSize=${this.pageSize}`,
        data:sendData,
        headers:{
          'Content-type':'application/json'
        },
      })
      .then((res)=>{
        // console.log(res);
        this.totalPage=res.data.data.total;
        this.tableData=res.data.data.students;
      })
    },
    handleClick(row) {
          this.student=row;
          this.form.number=row.stdId;
          this.form.name=row.stdName;
          this.form.qq=row.stdQQ;
          this.form.phone=row.stdPhone;
          this.form.major[0]=row.major;
          this.form.major[1]=row.classNum;
          this.form.origation1[0]=row.firstWill.organization;
          this.form.origation1[1]=row.firstWill.branch;
          this.form.reason1=row.firstWill.reason;
          this.form.origation2[0]=row.secondWill.organization;
          this.form.origation2[1]=row.secondWill.branch;
          this.form.reason2=row.secondWill.reason;
          this.form.isAgree=row.isDispensing;
        },
    alter(){
      let sendData=JSON.stringify({
                stdId:this.form.number,
                stdName: this.form.name,
                major: this.form.major[0],
                classNum: this.form.major[1],
                stdQQ: this.form.qq,
                stdPhone: this.form.phone,
                firstWill: {
                    organization: this.form.origation1[0],
                    branch: this.form.origation1[1],
                    reason: this.form.reason1,
                },
                secondWill: {
                    organization: this.form.origation2[0],
                    branch: this.form.origation2[1],
                    reason: this.form.reason2,
                },
                isDispensing: this.form.isAgree,
            })
            this.$axios({
                method:'post',
                baseURL:'http://47.94.90.140:8000',
                url:'/post',
                data:sendData,
                headers:{
                    'Content-type':'application/json',
                },
            })
            .then(()=>{
                this.$message({
                message: '修改成功',
                type: 'success',
                center: true
              });
              this.fn();
            })
            .catch(()=>{
                this.$message({
                showClose: true,
                message: '修改失败',
                type: 'error',
                center: true
            });
            })
    },
    search(){
      let sendData=JSON.stringify({
        token: sessionStorage.getItem('token'),
        keyWord: this.input,
      })
      this.$axios({
        method:'post',
        baseURL:'http://47.94.90.140:8000',
        url:`/getStuInfo?page=${this.currentPage}&pageSize=${this.pageSize}`,
        data:sendData,
        headers:{
          'Content-type':'application/json'
        },
      })
      .then((res)=>{
      console.log(res);
        this.totalPage=res.data.data.total;
        this.tableData=res.data.data.students;
      })
    }
  },
  mounted() {
    document.title='学生信息';
    this.fn()
  },
}
</script>

<style scoped>
  .bread{
    height: 50px;
    margin-top: 15px;
    
  }
  .el-breadcrumb{
    margin-left: 50px;
    font-size: 15px;
    line-height: 50px;
  }
  .stu{
    height: 550px;
    width: 1170px;
    margin-left: 50px;
    padding: 30px;
    background-color: #fff;
    box-shadow: 0 0 4px 1px rgb(192, 192, 192);
  }
  .el-input{
    width: 350px;
  }
  .detail{
    margin-top: 40px;
  }
  .el-pagination{
    padding-top: 25px;
  }
  .el-dialog-div{
    height: 450px;
     overflow: auto;
    }
</style>