<template>
  <div class="body-container">
    <div class="tool-bar-container-border">
      <div>
        <span>角色管理</span>
        <span class="middle-line"></span>
        <span class="index-router">用户角色管理</span>
        <span class="active-router">&gt; 角色管理</span>
      </div>
    </div>
    <div class="body-content">
      <div class="body-content-title">角色管理</div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="普通学生" name="first">
          <div class="role-manage-title">
            <span class="role-manage-title-list">用户列表</span>
            <span class="role-manage-title-number">当前角色关联用户：2000人</span>
          </div>
         <div class="role-manage-form-container">
           <div class="role-manage-form">
             <el-form ref="form" :model="form" >
               <el-form-item>
                 <div class="role-manage-form-search">
                   <el-input size="mini" v-model="form.name" class="role-manage-form-search-input"></el-input>
                   <el-button type="primary" @click="onSubmit" size="mini" icon="el-icon-search">搜索</el-button>
                 </div>
               </el-form-item>
             </el-form>
           </div>
           <div>
             <el-button type="primary" size="mini">删除用户</el-button>
             <el-button type="primary" size="mini">添加用户</el-button>
           </div>
         </div>
          <el-table
            :data="tableData"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
          >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
            <el-table-column
              prop="date"
              label="日期"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
            >
            </el-table-column>
          </el-table>
          <div class="daily-data-pagination-container">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="100"
              layout="prev, pager, next, jumper"
              :total="1000">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="辅导员" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="二级学院管理员" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="宿舍管理员" name="fourth">定时任务补偿</el-tab-pane>
        <el-tab-pane label="学生处管理员" name="fifth">定时任务补偿</el-tab-pane>
        <el-tab-pane label="超级管理员" name="sixth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
    export default {
      name: "roleManagement",
      data() {
        return {
          activeName: 'first',
          form: {
            name: '',
          },
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        };
      },
      methods: {
        handleClick(tab, event) {
          console.log(tab, event);
        },
        onSubmit() {
          console.log('submit!');
        },
        formatter(row, column) {
          return row.address;
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        }
      }
    }
</script>

<style scoped>
  .role-manage-title{
    margin: .16rem 0 .25rem 0;
  }
  .role-manage-title-list{
    font-size:.14rem;
    font-family:MicrosoftYaHei;
    color:rgba(85,85,85,1);
    margin-right: .12rem;
  }
  .role-manage-title-number{
    font-size:.14rem;
    font-family:MicrosoftYaHei;
    color:rgba(153,153,153,1);
  }
  .role-manage-form-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .role-manage-form{
    width: 3rem;
  }
  .role-manage-form-search{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .role-manage-form-search-input{
    margin-right: .1rem;
  }
</style>
