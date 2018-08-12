<template>
    <div class="body-container">
      <div class="tool-bar-container-border">
        <div>
          <span>修改管理员密码</span>
          <span class="middle-line"></span>
          <span class="index-router">系统维护设置</span>
          <span class="active-router">&gt; 修改管理员密码</span>
        </div>
      </div>
      <div class="body-content">
        <div class="body-content-title">修改管理员密码</div>
        <div class="change-pass-word-container-init">系统初始密码：123456，请及时修改！</div>
        <div class="change-pass-word-form-container">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="1rem" class="change-pass-word-form">
          <el-form-item label="原密码" prop="name">
            <el-input v-model="ruleForm.name" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="name">
            <el-input v-model="ruleForm.name" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="name">
            <el-input v-model="ruleForm.name" size="mini"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" @click="resetForm('ruleForm')">重置</el-button>
            <el-button type="primary" size="mini" @click="submitForm('ruleForm')">立即创建</el-button>
          </el-form-item>
        </el-form>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "changePassWord",
      data(){
        return {
          ruleForm: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
          },
          rules: {
            name: [
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            region: [
              { required: true, message: '请选择活动区域', trigger: 'change' }
            ],
            date1: [
              { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ],
            date2: [
              { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
            ],
            type: [
              { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
            ],
            resource: [
              { required: true, message: '请选择活动资源', trigger: 'change' }
            ],
            desc: [
              { required: true, message: '请填写活动形式', trigger: 'blur' }
            ]
          }
        }
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }
    }
</script>

<style scoped>
  .tool-bar-container-border{
    justify-content: flex-start;
  }
  .change-pass-word-container-init{
    font-size:.12rem;
    font-family:MicrosoftYaHei;
    color:rgba(85,85,85,1);
  }
  .change-pass-word-form {
    width: 3.5rem;
  }
</style>
