<template>
  <div class="body-container">
    <div class="tool-bar-container-border">
      <div>
        <span>考勤数据复核</span>
        <span class="middle-line"></span>
        <span class="index-router">统计复核</span>
        <span class="active-router">&gt; 考勤数据复核</span>
      </div>
    </div>
    <div class="body-content">
      <div class="body-content-title">数据复核</div>
      <div class="check-data-search-container">
        <el-select v-model="value" placeholder="全部学院" size="mini" class="tool-bar-search-select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value" placeholder="全部专业" size="mini" class="tool-bar-search-select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value" placeholder="全部辅导员" size="mini" class="tool-bar-search-select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value" placeholder="全部宿舍楼" size="mini" class="tool-bar-search-select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input placeholder="请输入学号/姓名搜索" v-model="value" class="input-with-select" size="mini">
        </el-input>
        <el-button type="primary" icon="el-icon-search" size="mini">搜索</el-button>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}"
      >
        <el-table-column
          prop="date"
          label="学院名称"
          sortable
          >
        </el-table-column>
        <el-table-column
          prop="name"
          label="专业名称"
          sortable
          >
        </el-table-column>
        <el-table-column
          prop="address"
          sortable
          label="班级"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          sortable
        >
        </el-table-column>
          <el-table-column
            prop="name"
            label="学号"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="辅导员"
            sortable
          >
          </el-table-column>
          <el-table-column
          prop="name"
          label="宿舍楼栋"
          sortable
         >
          </el-table-column>
          <el-table-column
           prop="name"
           label="寝室号"
           sortable
          >
          </el-table-column>
          <el-table-column
          prop="name"
          label="床号"
         >
         </el-table-column>
          <el-table-column
            prop="name"
            label="实时状态"
           sortable
         >
          </el-table-column>
        <el-table-column
          prop="name"
          label="个人详情"
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
    </div>
  </div>
</template>

<script>
    export default {
        name: "checkData"
    }
</script>

<style scoped>
.check-data-search-container{
  margin-bottom: .18rem;
}
</style>
