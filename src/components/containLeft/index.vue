<template>
  <div class="left">
    <div class="left_list">
    <div>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#224B95"
        text-color="#fff"
        active-text-color="#224B95">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-caret-bottom"></i>
            <span>系统维护设置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1"><router-link to="/index/changePassWord">修改管理员密码</router-link></el-menu-item>
            <el-menu-item index="1-2"><router-link to="/index/clockInSettings">学生打卡设置</router-link></el-menu-item>
            <el-menu-item index="1-3"><router-link to="/index/bigViewportSettings">大屏设置</router-link></el-menu-item>
            <el-menu-item index="1-4"><router-link to="/index/learnDateSettings">学期设置</router-link></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
           <template slot="title">
             <i class="el-icon-caret-bottom"></i>
             <span slot="title">用户角色管理</span>
           </template>
          <el-menu-item-group>
            <el-menu-item index="2-1"><router-link to="/index/roleManagement">角色管理</router-link></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-caret-bottom"></i>
            <span slot="title">统计复核</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1"><router-link to="/index/realTimeStatistics">实时统计</router-link></el-menu-item>
            <el-menu-item index="3-2"><router-link to="/index/checkData">考勤数据复核</router-link></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
     <!-- <ul>
        <li><router-link to="/index/dailyData">每日数据</router-link></li>
        <li><router-link to="/index/weekData">每周数据</router-link></li>
        <li><router-link to="/index/studentsCare">学生关怀</router-link></li>
        <li><router-link to="/index/studentsSearch">学生考勤查询</router-link></li>
        <li><router-link to="/index/teacherCheck">辅导员查寝签到</router-link></li>
      </ul>-->
    </div>
    <div class="right_list">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>
 <script>
 export default {
  name: 'left',
  data:function(){
    return {
    }
  },
   methods:{
     handleOpen(key, keyPath) {
       console.log(key, keyPath);
     },
     handleClose(key, keyPath) {
       console.log(key, keyPath);
     }
   }
}
</script>
<style>
.left{
  font-size: .16rem;
  display: flex;
  width: 100%;
}
.left_list{
  width: 2.2rem;
  min-width: 1.2rem;
  height: 100%;
  background:#224B95;
  padding-top: .1rem;
  box-shadow: -1px 3px 20px rgb(25, 47, 113) inset;
  z-index: 1;
  box-sizing: border-box;
}
.right_list{
  flex: auto;
  padding: .18rem .24rem;
  overflow: auto;
}
.left_list ul{
  padding:0;
}
.left_list ul li{
  line-height: .4rem;
  text-align: left;
  padding: 0!important;
}
.left_list ul li a{
  display: block;
  color: #fff;
  text-decoration: none;
  padding-left: .45rem;
  width: 100%;
  height: 100%;
}
.left_list .router-link-active{
  color: #0F3A88 !important;
}
  .left_list i{
    color: #fff;
  }
  .is-active{
    background-color: #fff!important;
    color: #0F3A88 !important;
  }
</style>
