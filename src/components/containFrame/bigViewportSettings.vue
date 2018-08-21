<template>
  <div class="body-container">
    <div class="tool-bar-container-border">
      <div>
        <span>大屏设置</span>
        <span class="middle-line"></span>
        <span class="index-router">系统维护设置</span>
        <span class="active-router">&gt; 大屏设置</span>
      </div>
    </div>
    <div class="body-content">
      <div class="body-content-title">大屏设置</div>
      <div class="big-viewport-input">
        <el-form ref="form" :model="form" >
          <el-form-item>
            <el-input v-model="form.input" size="mini" placeholder="请输入文本：长度30个中文字符"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button  size="mini" @click="backRouterFun">返回</el-button>
            <el-button type="primary"  size="mini" @click="onSubmit">确认</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import qs from 'qs'
    export default {
      name: "bigViewportSettings",
      mounted:function () {
        this.$axios.get('/api/system-config',{
          params:{}
        }).then(function (res) {
          if(res){
              console.log(res)
          }
        }).catch(function (error) {
          console.log(error)
        })

      },
      data(){
        return {
          form: {
            input:''
          }
        }
      },
      methods: {
        onSubmit() {
          const _this = this
          this.$axios.put('/api/screen-config',{
            reqDTO:this.form.input,
            header:{
              contentType:"application/json"
            },
          }).then(function (res) {
            if(res){

            }
          }).catch(function (error) {
            _this.$notify.error({
              message: 'error',
              position: 'bottom-right'
            });
          })
        },
        backRouterFun(){
          this.$router.go(-1)
        }
      }
    }
</script>

<style scoped>
.big-viewport-input{
  width: 7rem;
}
</style>
