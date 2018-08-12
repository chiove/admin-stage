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
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}"
      >
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
    </div>
  </div>
</template>

<script>
  require('echarts/theme/macarons');
  export default {
      name: "realTimeStatistics",
    mounted:function(){
      this.drawBar()
    },
    data(){
        return {
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
        }
    },
    methods:{
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        },
        drawBar:function () {
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
              data: ['1号楼','2号楼','3号楼','4号楼','5号楼','6号楼','7号楼','8号楼']
            },
            series: [
              {
                name: '已归',
                type: 'bar',
                stack: '总量',
                label: {
                  normal: {
                    show: true,
                    position: 'insideRight'
                  }
                },
                data: [320, 302, 301, 334, 390, 330, 320,250]
              },
              {
                name: '晚归',
                type: 'bar',
                stack: '总量',
                label: {
                  normal: {
                    show: true,
                    position: 'insideRight'
                  }
                },
                data: [120, 132, 101, 134, 90, 230, 210,120]
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
                data: [220, 182, 191, 234, 290, 330, 310, 76]
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
