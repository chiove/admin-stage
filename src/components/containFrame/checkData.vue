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
        <el-select v-model="collegeListDataValue" @change="collegeSelectFun" ref="collegeValue" placeholder="全部学院" size="mini" class="tool-bar-search-select">
          <el-option
            v-for="item in collegeListData"
            :key="item.collegeId"
            :label="item.collegeName"
            :value="item.collegeId">
          </el-option>
        </el-select>
        <!--<el-select v-model="majorListDataValue" @change="majorSelectFun" ref="majorValue" placeholder="全部专业" size="mini" class="tool-bar-search-select">
          <el-option
            v-for="item in majorListData"
            :key="item.majorId"
            :label="item.majorName"
            :value="item.majorId">
          </el-option>
        </el-select>-->
        <el-select v-model="buildListDataValue" ref="buildDom" placeholder="全部宿舍"  size="mini" class="tool-bar-search-select">
          <el-option
            v-for="item in buildListData"
            :key="item.buildingId"
            :label="item.buildingName"
            :value="item.buildingId">
          </el-option>
        </el-select>
        <el-select v-model="instructorListDataValue" ref="instructorValue" placeholder="全部辅导员" size="mini" class="tool-bar-search-select">
          <el-option
            v-for="item in instructorListData"
            :key="item.userId"
            :label="item.name"
            :value="item.userId">
          </el-option>
        </el-select>
        <el-input placeholder="请输入学号/姓名搜索" ref="studentNameDom" v-model="studentNameValue" class="input-with-select" size="mini">
        </el-input>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="searchSubmitFun">搜索</el-button>
        <el-button  size="mini" @click="resetFormValue">重置</el-button>
      </div>
      <el-table :data="tableData" v-loading="loadingStatus" style="width: 100%">
        <el-table-column prop="studentName" label="姓名"></el-table-column>
        <el-table-column prop="studentCode" label="学号" width="180"></el-table-column>
        <el-table-column prop="className" label="班级"></el-table-column>
        <el-table-column prop="collegeName" label="学院名称"></el-table-column>
        <el-table-column prop="majorName" label="专业名称"></el-table-column>
        <el-table-column prop="instructorName" label="辅导员"></el-table-column>
        <el-table-column prop="buildingName" label="宿舍楼栋"></el-table-column>
        <el-table-column prop="dormitoryName" label="寝室号"></el-table-column>
        <el-table-column prop="bedCode" label="床号"></el-table-column>
        <el-table-column prop="totalCared" label="被关怀次数"></el-table-column>
        <el-table-column prop="totalStayOut" label="累计未归天数" width="180"></el-table-column>
        <el-table-column prop="totalStayOutLate" label="累计晚归天数" width="180"></el-table-column>
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
          :total="pageTotal">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "checkData",
      mounted:function(){
        this.userId = localStorage.getItem('userId')
        /*查询学院下拉列表*/
        this.getCollegeListData()
        /*查询宿舍下拉列表*/
        this.getBuildListData()
        /*查询表格数据*/
        this.getTableData()
        this.getInstuctorList()
      },
      activated:function () {
        this.userId = localStorage.getItem('userId')
      },
      data(){
        return {
          userId:'',/*用户ID*/
          orgId:'',/*学院ID*/
          collegeListDataValue:'',/*学院下拉列表默认值*/
          collegeListData:[],/*学院下拉列表*/
          majorListDataValue:'',/*专业下拉列表默认值*/
          majorListData:[],/*专业下拉列表*/
          instructorListDataValue:'',/*辅导员下拉列表默认值*/
          instructorListData:[],/*辅导员下拉列表*/
          buildListDataValue:'',/*宿舍下拉列表默认值*/
          buildListData:[],/*宿舍下拉列表*/
          studentNameValue:'',/*学号，姓名默认值*/
          pageNo:1,/*当前页*/
          pageTotal:1,/*总页数*/
          tableData: [],/*表格数据*/
          loadingStatus:false/*加载显示*/
        }
      },
      methods:{
        /*查询学院下拉列表*/
        getCollegeListData:function(){
          const _this = this
          this.$axios.get(process.env.API_HOST+'/select-data/secondary-college/all').then(function (res) {
            _this.collegeListData = res.data.data
          }).catch(function (error) {
            console.log(error)
          })
        },
        /*学院下拉选择后触发事件*/
        collegeSelectFun:function(data){
          const _this = this
          this.collegeListData.forEach(function (item,index) {
            if(item.collegeId===data){
              _this.collegeNames = item.collegeName
            }
          })
          this.orgId = data
          /*查询专业下拉列表*/
          this.getInstuctorList()
          this.$axios.get(process.env.API_HOST+'select-data/major-info/all',{params:{orgId:data}
          }).then(function (res) {
            _this.majorListData = res.data.data
          }).catch(function (error) {
            console.log(error)
          })
        },
        /*专业下拉选择后触发事件*/
        majorSelectFun:function(data){
          const _this = this
          const params = {
            majorId:this.$refs.collegeValue.value,
            orgId:data
          }
          this.$axios.get(process.env.API_HOST+'select-data/instructor-info/all',{params:params
          }).then(function (res) {
            _this.instructorListData = res.data.data
          }).catch(function (error) {
            console.log(error)
          })
        },
        /*查询宿舍下拉列表*/
        getBuildListData:function(){
          const _this = this
          this.$axios.get(process.env.API_HOST+'/select-data/dormitory-building/all').then(function (res) {
            _this.buildListData = res.data.data
          }).catch(function (error) {
            console.log(error)
          })
        },
        /*搜索按钮搜索*/
        searchSubmitFun:function(){
          /*表格查询*/
          const params = {
            buildingId:this.$refs.buildDom.value,
            orgId:this.$refs.collegeValue.value,
            /*majorId:this.$refs.majorValue.value,*/
            instructor:this.$refs.instructorValue.value,
            nameOrCode:this.$refs.studentNameDom.value,
          }
          this.getTableData(params)
        },
        /*清空值*/
        resetFormValue(){
          this.collegeListDataValue = ''
          this.buildListDataValue = ''
          this.instructorListDataValue = ''
          this.studentNameValue = ''
          this.getInstuctorList()
        },
        /*表格查询*/
        getTableData:function(params){
          this.loadingStatus = true
          const _this = this
          this.$axios.get(process.env.API_HOST+'data-recheck/student-clock-care-stat',{params:params
          }).then(function (res) {
            _this.tableData = res.data.data.result
            _this.pageTotal = res.data.data.totalCount
            _this.pageNo = res.data.data.pageNo
          }).catch(function (error) {
            console.log(error)
          })
          setTimeout(() => {
            this.loadingStatus = false
          }, 2000)
        },
        /*排序查询*/
        sortChange1:function(data){
          let descOrAsc=''
          if(data.order==="ascending"){
            descOrAsc='asc'
          }else if(data.order==="descending"){
            descOrAsc='desc'
          }
          const params = {
            buildingId:this.$refs.buildDom.value,
            orgId:this.$refs.collegeValue.value,
            /*majorId:this.$refs.majorValue.value,*/
            instructor:this.$refs.instructorValue.value,
            nameOrCode:this.$refs.studentNameDom.value,
            descOrAsc:descOrAsc,
            orderBy:data.prop
          }
          this.getTableData(params)
        },
        /*查看详情页*/
        handleClick(row) {
          this.$router.push({
            name:'studentsDetails',
            path:'/index/studentsDetails',
            params:row
          })
        },
        /*分页查询*/
        handleCurrentChange(val) {
          /*表格查询*/
          const params = {
            buildingId:this.$refs.buildDom.value,
            orgId:this.$refs.collegeValue.value,
            /*majorId:this.$refs.majorValue.value,*/
            instructor:this.$refs.instructorValue.value,
            nameOrCode:this.$refs.studentNameDom.value,
            pageNo:val,
            pageSize:10
          }
          this.getTableData(params)
        },
        /*获取辅导员列表*/
        getInstuctorList(){
          const _this = this
          this.$axios.get(process.env.API_HOST+'/select-data/instructor-info/all',{
            params:{
              userId:_this.userId,
              orgId:_this.orgId
            }
          }).then(function (res) {
            if(res){
              _this.instructorListData = res.data.data
            }
          }).catch(function (error) {
            console.log(error)
          })
        }
      }
    }
</script>

<style scoped>
.check-data-search-container{
  margin-bottom: .18rem;
}
</style>
