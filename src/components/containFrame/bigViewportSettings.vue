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
            <el-button  size="mini">返回</el-button>
            <el-button type="primary"  size="mini" @click="onSubmit">确认</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "bigViewportSettings",
      data(){
        return {
          form: {
            input:''
          }
        }
      },
      methods: {
        onSubmit() {
          console.log('submit!');
        }
      }
    }
</script>

<style scoped>
.big-viewport-input{
  width: 7rem;
}
</style>
