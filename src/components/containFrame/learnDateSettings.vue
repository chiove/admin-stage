<template>
  <div class="body-container">
    <div class="tool-bar-container-border">
      <div>
        <span>学期设置</span>
        <span class="middle-line"></span>
        <span class="index-router">系统维护设置</span>
        <span class="active-router">&gt; 学期设置</span>
      </div>
      <div>
        <el-button type="primary" size="mini">添加学期</el-button>
      </div>
    </div>
    <div class="body-content">
      <div class="body-content-title">学期设置</div>
      <div class="learn-date-container">
        <div class="learn-date-title">
          <i class="el-icon-time"></i>
          <span>2018-2019学年</span>
        </div>
        <div class="learn-date-title-little">
          <i class="el-icon-bell"></i>
          <span>第一学期</span>
        </div>
        <div class="learn-date-title-lv3">
          <div class="learn-date-title-lv3-text">
            <div class="learn-date-title-lv3-icon"></div>
            <div>开始日期 2018-05-01</div>
          </div>
          <div class="learn-date-title-lv3-text">
            <div class="learn-date-title-lv3-icon1"></div>
            <div>结束日期 2018-05-01</div>
          </div>
        </div>
      </div>
      <div class="learn-date-container">
        <div class="learn-date-title">
          <i class="el-icon-time"></i>
          <span>2018-2019学年</span>
        </div>
        <div class="learn-date-title-little">
          <i class="el-icon-bell"></i>
          <span>第一学期</span>
        </div>
        <div class="learn-date-title-lv3">
          <div class="learn-date-title-lv3-text">
            <div class="learn-date-title-lv3-icon"></div>
            <div>开始日期 2018-05-01</div>
          </div>
          <div class="learn-date-title-lv3-text">
            <div class="learn-date-title-lv3-icon1"></div>
            <div>结束日期 2018-05-01</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "learnDateSettings"
    }
</script>

<style scoped>
  .learn-date-container{
    margin-bottom: .32rem;
  }
  .learn-date-title{
    font-size:.18rem;
    font-family:MicrosoftYaHei-Bold;
    color:rgba(33,132,197,1);
    margin-bottom: .22rem;
  }
  .learn-date-title-little{
    font-size:14px;
    font-family:MicrosoftYaHei-Bold;
    color:rgba(51,51,51,1);
    margin-bottom: .2rem;
  }
  .learn-date-title-lv3{
    padding-left: .19rem;
    margin-bottom: .2rem;
  }
  .learn-date-title-lv3-text{
    font-size:14px;
    font-family:MicrosoftYaHei;
    color:rgba(51,51,51,1);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: .2rem;
  }
  .learn-date-title-lv3-icon{
    width:.14rem;
    height:.14rem;
    border-radius: .14rem;
    background:rgba(97,230,16,1);
    margin-right: .08rem;
  }
  .learn-date-title-lv3-icon1{
    width:.14rem;
    height:.14rem;
    border-radius: .14rem;
    margin-right: .08rem;
    background:rgba(243,126,18,1);
  }
  .el-icon-bell{
    color:rgba(33,132,197,1);
  }
</style>
