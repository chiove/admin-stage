<template>
  <div class="body-container">
    <div class="tool-bar-container-border">
      <div>
        <span>实时统计</span>
        <span class="middle-line"></span>
        <span class="index-router">统计复核</span>
        <span class="active-router">&gt; 实时统计</span>
      </div>
    </div>
    <div class="body-content">
      <div class="body-content-title">
        今日实时数据统计分析
      </div>
      <div class="real-time-statistics-chart-container" id="data-chart-bar"></div>
      <div class="real-time-statistics-table-title">到勤情况详情</div>
        <el-table :data="tableListData"  v-loading="loadingStatus" style="width: 100%">
          <el-table-column prop="studentName" label="姓名"></el-table-column>
          <el-table-column prop="studentCode" label="学号"></el-table-column>
          <el-table-column prop="className" label="班级"></el-table-column>
          <el-table-column prop="collegeName" label="学院名称"></el-table-column>
          <el-table-column prop="majorName" label="专业名称"></el-table-column>
          <el-table-column prop="instructorName" label="辅导员"></el-table-column>
          <el-table-column prop="buildingName" label="宿舍楼栋"></el-table-column>
          <el-table-column prop="dormitoryName" label="寝室号"></el-table-column>
          <el-table-column prop="bedCode" label="床号"></el-table-column>
          <el-table-column prop="colckStatus" label="实时状态"></el-table-column>
          <el-table-column label="个人详情">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      <div class="daily-data-pagination-container">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="pageNo"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="pagesTotal">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  require('echarts/theme/macarons');
  export default {
    name: "realTimeStatistics",
    mounted:function(){
      /*图表渲染*/
      this.getChartListData()
      /*默认表格显示*/
      this.getTableListData()
    },
    data(){
        return {
          chartBuildingList:[],/*图表楼栋数据*/
          chartAlClockList:[],/*图表已打卡数据*/
          chartNotClockList:[],/*图表未打卡数据*/
          tableListData:[],/*表格数据*/
          pageNo:1,/*分页条当前页*/
          pagesTotal:1,/*总页数*/
          loadingStatus:false/*加载显示*/
        }
    },
    methods:{
        /*获取图表数据*/
        getChartListData:function(){
          const _this = this
          this.$axios.get('/api/real-time-stat/clock-stat-by-bulding',{
            params:{}
          }).then(function (res) {
            if(res){
              res.data.data.forEach(function (item,index) {
                _this.chartBuildingList.push(item.buildingName)
                _this.chartAlClockList.push(item.clockCount)
                _this.chartNotClockList.push(item.notClockCount)
                _this.drawBar()
              })
            }
          }).catch(function (error) {
            _this.$notify.error({
              message: error,
              position: 'bottom-right'
            });
          })
        },
       /*获取表格数据*/
        getTableListData:function(pageNo){
          const _this = this
          this.loadingStatus = true
          this.$axios.get('/api/real-time-stat/clock-stat-by-student',{
            params:{
              pageNo:pageNo,
              pageSize:10
            }
          }).then(function (res) {
            if(res){
              _this.tableListData = res.data.data.result
              _this.pagesTotal =  res.data.data.totalPages
              _this.pageNo = res.data.data.pageNo
            }
          }).catch(function (error) {
            _this.$notify.error({
              message: error,
              position: 'bottom-right'
            });
          })
          setTimeout(() => {
            this.loadingStatus = false
          }, 2000)
        },
        /*分页查询*/
        handleCurrentChange(val) {
          this.getTableListData(val)
        },
        /*查看详情页*/
       handleClick(row) {
        this.$router.push({
          name:'studentsDetails',
          path:'/index/studentsDetails',
          params:row
         })
       },
        drawBar:function () {
          const _this = this
          let dataChartLine = this.$echarts.init(document.getElementById('data-chart-bar'),'macarons')
          dataChartLine.setOption({
            tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            yAxis:  {
              type: 'value'
            },
            xAxis: {
              type: 'category',
              data: _this.chartBuildingList
            },
            series: [
              {
                name: '已打卡',
                type: 'bar',
                stack: '总量',
                label: {
                  normal: {
                    show: true,
                    position: 'insideRight'
                  }
                },
                data: _this.chartAlClockList
              },
              {
                name: '未打卡',
                type: 'bar',
                stack: '总量',
                label: {
                  normal: {
                    show: true,
                    position: 'insideRight'
                  }
                },
                data: _this.chartNotClockList
              },
              {
                name: '未归',
                type: 'bar',
                stack: '总量',
                label: {
                  normal: {
                    show: true,
                    position: 'insideRight'
                  }
                },
                data: []
              }
            ]
          })
        }
    }
  }
</script>

<style scoped>
  .real-time-statistics-chart-container{
    height: 3rem;
    border-bottom: .01rem solid rgba(236,236,236,1);
  }
  .real-time-statistics-table-title{
    font-size:.14rem;
    font-family:MicrosoftYaHei;
    color:rgba(153,153,153,1);
    margin: .3rem 0 .22rem 0;
  }
</style>
