<template>
<!-- 报名界面 -->
<div class="body">
        <h2>天津理工大学计算机科学与工程学院<br/>学生组织报名系统</h2>
        <p>个人信息</p>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
            <el-form-item prop="number">
                <el-input v-model="ruleForm.number" placeholder="请输入8位学号" suffix-icon='el-icon-star-on'></el-input>
            </el-form-item>
            <el-form-item prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入姓名" suffix-icon='el-icon-user-solid'></el-input>
            </el-form-item>
            <el-form-item prop="qq">
                <el-input v-model="ruleForm.qq" placeholder="请输入QQ号（5位以上）" suffix-icon='el-icon-s-promotion'></el-input>
            </el-form-item>
            <el-form-item prop="phone">
                <el-input v-model="ruleForm.phone" placeholder="请输入11位手机号" suffix-icon='el-icon-phone'></el-input>
            </el-form-item>

        <p>专业与班级</p>
        <el-form-item prop="major">
                <el-cascader
                v-model="ruleForm.major"
                :options="majorData"
                :props="{ expandTrigger: 'hover' }"
                clearable
                ></el-cascader>
        </el-form-item>
        

        <p>第一志愿</p>
        <el-form-item prop="origation1">
                <el-cascader
                v-model="ruleForm.origation1"
                :options="orginazationData"
                :props="{ expandTrigger: 'hover' }"
                clearable
                ></el-cascader>
        </el-form-item>
        <el-form-item prop="reason1">
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入加入此组织的理由"
                    v-model="ruleForm.reason1">
                </el-input>
        </el-form-item>

        <p>第二志愿</p>

        <el-form-item prop="origation2">
                <el-cascader
                v-model="ruleForm.origation2"
                :options="orginazationData"
                :props="{ expandTrigger: 'hover' }"
                clearable
                ></el-cascader>
        </el-form-item>
        <el-form-item prop="reason2">
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入加入此组织的理由"
                    v-model="ruleForm.reason2">
                </el-input>
        </el-form-item>

        </el-form>

        <p>是否同意调剂</p>
        <el-switch
            v-model="isAgree"
            active-color="#13ce66"
            inactive-color="#ff4949">
        </el-switch>

        <div class="btn">
            <el-button type="success" @click="submitForm('ruleForm')">报名</el-button><br/>
            <el-button type="info" @click='login'>后台登录</el-button>
        </div>        
</div>
</template>

<script>
export default {
    name:'register',
    data() {
        return {
            ruleForm:{
                number:'',
                name:'',
                qq:'',
                phone:'',
                major:[],
                origation1:[],
                reason1:'',
                origation2:[],
                reason2:'',
                },
            isAgree:true,
            rules: {
                    number:[
                        { required: true, message: '请输入学号', trigger: 'blur' },
                        { pattern:/^[0-9]{8}$/, message: '请输入8个数字', trigger: 'blur' }
                    ],
                    name:[
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],
                    qq:[
                        { required: true, message: '请输入QQ号', trigger: 'blur' },
                        { pattern:/^[0-9]{5,}$/, message: '请输入五位以上数字', trigger: 'blur' }
                    ],
                    phone:[
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { pattern:/^[0-9]{11}$/, message: '请输入11位数字', trigger: 'blur' }
                    ],
                    major:[
                        { required: true, message: '请选择班级', trigger: 'change' },
                    ],
                    origation1:[
                        { required: true, message: '请选择组织', trigger: 'change' },
                    ],
                    reason1:[
                        { required: true, message: '请输入理由', trigger: 'blur' },
                    ],
                    origation2:[
                        { required: true, message: '请选择组织', trigger: 'change' },
                    ],
                    reason2:[
                        { required: true, message: '请输入理由', trigger: 'blur' },
                    ],
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
        login(){
            this.$router.push("/login")
        },
        submitForm(ruleForm) {
            this.$refs[ruleForm].validate((valid) => {
            if (valid) {
                let sendData=JSON.stringify({
                stdId:this.ruleForm.number, //学号 
                stdName: this.ruleForm.name, //姓名 必填
                major: this.ruleForm.major[0], //专业 必填
                classNum: this.ruleForm.major[1], //班级 必填
                stdQQ: this.ruleForm.qq, //学⽣qq 必填
                stdPhone: this.ruleForm.phone, //学⽣⼿机号 必填
                firstWill: { //第⼀志愿 必填
                    organization: this.ruleForm.origation1[0], //组织名 必填
                    branch: this.ruleForm.origation1[1], //下属部⻔ 必填
                    reason: this.ruleForm.reason1, //加⼊该组织的原因
                },
                secondWill: { //第⼆志愿
                    organization: this.ruleForm.origation2[0], //组织名 必填
                    branch: this.ruleForm.origation2[1], //下属部⻔ 必填
                    reason: this.ruleForm.reason2, //加⼊该组织的原因
                },
                isDispensing: this.ruleForm.isAgree,
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
                message: '报名成功',
                type: 'success',
                center: true
              });
            })
            .catch(()=>{
                this.$message({
                showClose: true,
                message: '提交失败',
                type: 'error',
                center: true
            });
            })
            } else {
                return false;
            }
            });
      },
    }
}
</script>

<style scoped>
    .body{
        width: 450px;
        color: white;
        text-align: center;
        margin-left: 500px;
    }
    h2{
        margin: 20px 0 10px 0;
    }
    p{
      margin-top: 12px;  
    }
    .el-input,.el-cascader,.el-textarea,.el-switch,.el-button{
        margin-top: 12px;
    }
    .el-textarea{
        resize: none;
    }
    .el-cascader{
        width: 450px;
    }
    .el-button{
        width: 300px;
        margin-right: 70px;
    }
</style>