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
            <el-input type="textarea" v-model="form.input" placeholder="请输入文本：长度30个中文字符"></el-input>
          </el-form-item>
          <el-form-item>
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
        const _this = this
        this.$axios.get(process.env.API_HOST+'screen-config').then(function (res) {
          if(res){
            _this.form.input = res.data.data
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
          if(this.form.input.length===0){
            _this.$notify.error({
              message: '不能为空',
              position: 'bottom-right'
            });
            return
          }else if(this.form.input.length>30){
            _this.$notify.error({
              message: '超过限制字数',
              position: 'bottom-right'
            });
            return
          }
            this.$axios.put(process.env.API_HOST+'screen-config',{
            "carouselText": `${this.form.input}`
          }).then(function (res) {
            if(res){
              if(res.data.code ==='000000'){
                _this.$notify({
                  message: '设置成功',
                  position: 'bottom-right',
                  type: 'success'
                })
              }
            }
          }).catch(function (error) {
            _this.$notify.error({
              message: error,
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
