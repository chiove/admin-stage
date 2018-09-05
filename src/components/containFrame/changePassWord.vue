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
          <el-form-item label="原密码" prop="oldpsd">
            <el-input v-model="ruleForm.oldpsd" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpsd">
            <el-input v-model="ruleForm.newpsd" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="conpsd">
            <el-input v-model="ruleForm.conpsd" size="mini"></el-input>
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
      mounted:function () {
        this.token = sessionStorage.getItem('token')
      },
      data(){
        return {
          token:'',
          ruleForm: {
            oldpsd: '',
            newpsd: '',
            conpsd: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
          },
          rules: {
            oldpsd: [
              { required: true, message: '请输入原密码', trigger: 'blur' },
            ],
            newpsd: [
              { required: true, message: '请输入新密码', trigger: 'blur' },
            ],
            conpsd: [
              { required: true, message: '请输入确认密码', trigger: 'blur' },
            ],
          }
        }
      },
      methods: {
        submitForm(formName) {
          const _this = this
          this.$refs[formName].validate((valid) => {
            if(_this.ruleForm.newpsd!==_this.ruleForm.conpsd){
              _this.$notify.error({
                title:'提示',
                message:'确认密码与新密码不一致',
                position:'bottom-right'
              })
              return
            }
            if (valid) {
              this.$axios.put(process.env.API_HOST+'/password',{
                  newPassword:_this.ruleForm.newpsd,
                  oldPassword:_this.ruleForm.oldpsd,
                  token:_this.token
              }).then(function (res) {
                if(res){
                  if(res.data.code==='000000'){
                    _this.$notify({
                      title:'提示',
                      message:'修改成功',
                      type:'success',
                      position:'bottom-right'
                    })
                    _this.$refs[formName].resetFields();
                  }else{
                    _this.$notify.error({
                      title:'提示',
                      message:'修改失败',
                      position:'bottom-right'
                    })
                    _this.$refs[formName].resetFields();
                  }
                }
              })
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
