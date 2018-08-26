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
      <el-tabs v-model="activeName" @tab-click="tabChangeFun">
        <el-tab-pane label="普通学生" name="first">
          <div class="role-manage-title">
            <span class="role-manage-title-list">用户列表</span>
            <span class="role-manage-title-number">当前角色关联用户：{{totalCount}}人</span>
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
             <el-button type="primary" size="mini" @click="cleanPhone">清空常用手机</el-button>
           </div>
         </div>
          <el-table :data="studentsListData" v-loading="loadingStatus" @selection-change="handleSelectionChange" style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="studentName" label="姓名"></el-table-column>
            <el-table-column prop="studentCode" label="学号"></el-table-column>
            <el-table-column prop="className" label="班级"></el-table-column>
            <el-table-column prop="collegeName" label="学院名称"></el-table-column>
            <el-table-column prop="majorName" label="专业名称"></el-table-column>
            <el-table-column prop="instructorId" label="辅导员工号"></el-table-column>
            <el-table-column prop="instructorName" label="辅导员姓名"></el-table-column>
            <el-table-column prop="buildingName" label="宿舍楼栋"></el-table-column>
            <el-table-column prop="dormitoryName" label="寝室号"></el-table-column>
            <el-table-column prop="bedCode" label="床号"></el-table-column>
            <el-table-column prop="roleName" label="角色名称"></el-table-column>
          </el-table>
          <div class="daily-data-pagination-container">
            <el-pagination
              background
              @current-change="handleCurrentChange"
              :current-page.sync="studentsPageNo"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :total="studentsPageTotal">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="辅导员" name="second">
          <div class="role-manage-title">
            <span class="role-manage-title-list">用户列表</span>
            <span class="role-manage-title-number">当前角色关联用户：{{totalCount}}人</span>
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
          </div>
          <el-table :data="instructorListData" v-loading="loadingStatus" @selection-change="handleSelectionChange" style="width: 100%">
            <el-table-column prop="code" label="工号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="collegeName" label="所属学院"></el-table-column>
            <el-table-column prop="roleName" label="角色"></el-table-column>
          </el-table>
          <div class="daily-data-pagination-container">
            <el-pagination
              background
              @current-change="handleCurrentChange"
              :current-page.sync="instructorPageNo"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :total="instructorPageTotal">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="二级学院管理员" name="third">
          <div class="role-manage-title">
            <span class="role-manage-title-list">用户列表</span>
            <span class="role-manage-title-number">当前角色关联用户：{{totalCount}}人</span>
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
              <el-button type="primary" size="mini" @click="deleteUser">删除用户</el-button>
              <el-button type="primary" size="mini" @click="addUserFun">添加用户</el-button>
            </div>
          </div>
          <el-table :data="collegerListData" v-loading="loadingStatus" @selection-change="handleSelectionChange" style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="code" label="工号"></el-table-column>
            <el-table-column prop="roleName" label="角色"></el-table-column>
          </el-table>
          <div class="daily-data-pagination-container">
            <el-pagination
              background
              @current-change="handleCurrentChange"
              :current-page.sync="collegerPageNo"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :total="collegerPageTotal">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="宿舍管理员" name="fourth">
          <div class="role-manage-title">
            <span class="role-manage-title-list">用户列表</span>
            <span class="role-manage-title-number">当前角色关联用户：{{totalCount}}人</span>
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
              <el-button type="primary" size="mini" @click="deleteUser">删除用户</el-button>
              <el-button type="primary" size="mini" @click="addUserFun">添加用户</el-button>
            </div>
          </div>
          <el-table :data="roomerListData" v-loading="loadingStatus" @selection-change="handleSelectionChange" style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="code" label="工号"></el-table-column>
            <el-table-column prop="roleName" label="角色"></el-table-column>
          </el-table>
          <div class="daily-data-pagination-container">
            <el-pagination
              background
              @current-change="handleCurrentChange"
              :current-page.sync="roomerPageNo"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :total="roomerPageTotal">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="学生处管理员" name="fifth">
          <div class="role-manage-title">
            <span class="role-manage-title-list">用户列表</span>
            <span class="role-manage-title-number">当前角色关联用户：{{totalCount}}人</span>
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
              <el-button type="primary" size="mini" @click="deleteUser">删除用户</el-button>
              <el-button type="primary" size="mini" @click="addUserFun">添加用户</el-button>
            </div>
          </div>
          <el-table :data="studentleaderListData" v-loading="loadingStatus" @selection-change="handleSelectionChange" style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="code" label="工号"></el-table-column>
            <el-table-column prop="roleName" label="角色"></el-table-column>
          </el-table>
          <div class="daily-data-pagination-container">
            <el-pagination
              background
              @current-change="handleCurrentChange"
              :current-page.sync="studentleaderPageNo"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :total="studentleaderPageTotal">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      title="添加用户"
      :visible.sync="addUserStatus"
      width="50%">
      <div class="add-user-container">
        <div class="add-user-tree-container">
          <el-tree :data="treeListData" :props="defaultProps" @node-click="treeHandleNodeClick"></el-tree>
        </div>
         <div class="add-user-teansfer-container">
           <el-transfer
             filterable
             :titles="['未选择用户', '一选择用户']"
             :button-texts="['到左边', '到右边']"
             filter-placeholder="搜索工号"
             v-model="orgIdStaffListDataValue"
             @change="getRightList"
             :data="orgIdStaffListData">
           </el-transfer>
         </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUserStatus = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="studentsLeadersaveDataFun"  size="mini" v-if="saveDataType">保 存</el-button>
        <el-button type="primary" @click="nextFun"  size="mini" v-if="nextDataType">下一步</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="数据范围设置"
      :visible.sync="nextAddUserStatus"
      width="40%">
      <div class="add-user-container">
        <div class="add-user-tree-container">
            <div>已选用户</div>
            <el-tree :data="rightListData" @node-click="treeClickCollegeFun"></el-tree>
        </div>
        <div class="add-user-teansfer-container">
          <div>可选范围</div>
          <el-checkbox-group v-model="checkList" @change="checkTrueValueFun">
            <el-checkbox v-for="(item,index) in collegeOrBuildListData" :value="item.key" v-bind:key="index" :label="item.label"></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="stepFun" size="mini">返 回</el-button>
        <el-button type="primary"  size="mini" @click="nextAddUserStatus = false">关闭</el-button>
        <el-button type="primary"  size="mini" @click="saveDataFun">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
      name: "roleManagement",
      mounted:function(){
        this.getStudentsListData(this.form.name);
      },
      data() {
        return {
          activeName:'first', /*tab当前打开页*/
          totalCount:0,/*总人数*/
          multipleSelection:[],/*表格选择的值*/
          /*获取全部学生*/
          studentsListData:[],
          studentsPageNo:1,
          studentsPageTotal:1,
          /*获取辅导员*/
          instructorListData:[],
          instructorPageNo:1,
          instructorPageTotal:1,
          /*获取二级学院管理员*/
          collegerListData:[],
          collegerPageNo:1,
          collegerPageTotal:1,
          /*获取宿舍管理员*/
          roomerListData:[],
          roomerPageNo:1,
          roomerPageTotal:1,
          /*获取学生处管理员*/
          studentleaderListData:[],
          studentleaderPageNo:1,
          studentleaderPageTotal:1,
          /*搜索值*/
          form: {
            name: '',
          },
          loadingStatus:false,/*控制是否加载*/
          addUserStatus:false,/*控制添加用户弹窗*/
          nextAddUserStatus:false,/*下一步添加用户弹窗*/
          saveDataType:true,/*保存按钮是否显示*/
          nextDataType:false,/*下一步按钮是否显示*/
          treeListData:[{orgName:'组织机构树',orgId:'',children:[]}],/*树形机构数据*/
          defaultProps: {children: 'children', label: 'orgName', id:'orgId'},/*树形机构格式*/
          orgIdStaffListData:[],/*根据机构id查询的教职工列表*/
          orgIdStaffListDataValue:[],/*穿梭框默认值*/
          rightListData:[],/*右侧数据列表*/
          checkList:[],/*选矿model*/
          collegeOrBuildListData:[],/*根据用户ID获取到学院列表or楼栋列表*/
          collegeOrBuildCheckList:[],/*学院or楼栋选中列表*/
          userId:'',/*下一步树点击获取用户ID*/
          collegeRefList:[],/*学院提交格式*/
           buildRefList:[],/*楼栋提交格式*/
        }
      },
      methods: {
        /*获取学生列表*/
        getStudentsListData:function(nameOrCode,pageNo){
          const _this = this
          this.loadingStatus = true
          this.$axios.get('/api/user-role-manage/student',{
            params:{
              nameOrCode:nameOrCode,
              pageNo:pageNo,
              pageSize:10
            }
          }).then(function (res) {
            if(res){
              _this.studentsListData = res.data.data.result
              res.data.data.result.forEach(function (item,index) {
                item.roleName = '学生'
              })
              _this.studentsPageNo = res.data.data.pageNo
              _this.studentsPageTotal = res.data.data.totalPages
              _this.totalCount = res.data.data.totalCount
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
        /*获取辅导员列表*/
        getInstructorListData:function(nameOrCode,pageNo){
          const _this = this
          this.loadingStatus = true
          this.$axios.get('/api/user-role-manage/instructor',{
            params:{
              nameOrCode:nameOrCode,
              pageNo:pageNo,
              pageSize:10
            }
          }).then(function (res) {
            if(res){
              _this.instructorListData = res.data.data.result
              res.data.data.result.forEach(function (item,index) {
                item.roleName = '辅导员'
              })
              _this.instructorPageNo = res.data.data.pageNo
              _this.instructorPageTotal = res.data.data.totalPages
              _this.totalCount = res.data.data.totalCount
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
        /*获取二级学院管理员列表*/
        getCollegerListData:function(nameOrCode,pageNo){
          const _this = this
          this.loadingStatus = true
          this.$axios.get('/api/user-role-manage/secondary-college-admin',{
            params:{
              nameOrCode:nameOrCode,
              pageNo:pageNo,
              pageSize:10
            }
          }).then(function (res) {
            if(res){
              _this.collegerListData = res.data.data.result
              res.data.data.result.forEach(function (item,index) {
                item.roleName = '二级学院管理员'
              })
              _this.collegerPageNo = res.data.data.pageNo
              _this.collegerPageTotal = res.data.data.totalPages
              _this.totalCount = res.data.data.totalCount
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
        /*获取宿舍管理员列表*/
        getRoomerListData:function(nameOrCode,pageNo){
          const _this = this
          this.loadingStatus = true
          this.$axios.get('/api/user-role-manage/dormitory-admin',{
            params:{
              nameOrCode:nameOrCode,
              pageNo:pageNo,
              pageSize:10
            }
          }).then(function (res) {
            if(res){
              _this.roomerListData = res.data.data.result
              res.data.data.result.forEach(function (item,index) {
                item.roleName = '宿舍管理员'
              })
              _this.roomerPageNo = res.data.data.pageNo
              _this.roomerPageTotal = res.data.data.totalPages
              _this.totalCount = res.data.data.totalCount
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
        /*获取学生处管理员列表*/
        getStudentleaderListData:function(nameOrCode,pageNo){
          const _this = this
          this.loadingStatus = true
          this.$axios.get('/api/user-role-manage/student-office-admin',{
            params:{
              nameOrCode:nameOrCode,
              pageNo:pageNo,
              pageSize:10
            }
          }).then(function (res) {
            if(res){
              _this.studentleaderListData = res.data.data.result
              res.data.data.result.forEach(function (item,index) {
                item.roleName = '学生处管理员'
              })
              _this.studentleaderPageNo = res.data.data.pageNo
              _this.studentleaderPageTotal = res.data.data.totalPages
              _this.totalCount = res.data.data.totalCount
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
        /*查询机构树*/
        getTreeListData:function(){
          const _this = this
          this.$axios.get('/api/user-role-manage/org-tree').then(function (res) {
            if(res){
              _this.treeListData[0].children = res.data.data
              _this.treeListData[0].children.orgId = res.data.data[0].parentOrgId
            }
          }).catch(function (error) {
            _this.$notify.error({
              message: error,
              position: 'bottom-right'
            });
          })
        },
        /*根据机构查所属教职工*/
        getOrgStaff:function(orgId){
          const _this = this
          this.$axios.get('/api/user-role-manage/org/'+orgId+'/staff',{
            params:{
              pageSize:1000
            }
          }).then(function (res) {
            if(res){
              let lisData = []
              res.data.data.result.forEach(function (item) {
                let format = {}
                format.key = item.userId
                format.label = item.name
                format.code = item.code
                lisData.push(format)
              })
              _this.orgIdStaffListData = lisData
            }
          }).catch(function (error) {
            _this.$notify.error({
              message: error,
              position: 'bottom-right'
            });
          })
        },
        /*tab切换触发事件*/
        tabChangeFun:function(tab){
          const param = this.form.name
          if(tab.name==='first'){
            this.activeName = 'first'
            this.getStudentsListData(param)
          }else if(tab.name==='second'){
            this.activeName ='second'
            this.getInstructorListData(param)
          }else if(tab.name==='third'){
            this.activeName ='third'
            this.getCollegerListData(param)
          }else if(tab.name==='fourth'){
            this.activeName ='fourth'
            this.getRoomerListData(param)
          }else if(tab.name==='fifth'){
            this.activeName ='fifth'
            this.getStudentleaderListData(param)
          }
        },
        /*搜索*/
        onSubmit() {
          const param = this.form.name
          if(this.activeName ==='first'){
            this.getStudentsListData(param)
          }else if(this.activeName ==='second'){
            this.getInstructorListData(param)
          }else if(this.activeName ==='third'){
            this.getCollegerListData(param)
          }else if(this.activeName ==='fourth'){
            this.getRoomerListData(param)
          }else if(this.activeName ==='fifth'){
            this.getStudentleaderListData(param)
          }
        },
        /*分页查询*/
        handleCurrentChange(val) {
          const param = this.form.name
          if(this.activeName ==='first'){
            this.getStudentsListData(param,val)
          }else if(this.activeName ==='second'){
            this.getInstructorListData(param,val)
          }else if(this.activeName ==='third'){
            this.getCollegerListData(param,val)
          }else if(this.activeName ==='fourth'){
            this.getRoomerListData(param,val)
          }else if(this.activeName ==='fifth'){
            this.getStudentleaderListData(param,val)
          }
        },
        /*表格选择*/
        handleSelectionChange:function(val){
          this.multipleSelection = val
        },
        /*清除常用手机*/
        cleanPhone:function () {
          const _this = this
          if(this.multipleSelection.length>0){
            const studentsIds = []
            this.multipleSelection.forEach(function (item,index) {
              studentsIds.push(item.studentId)
            })
            this.$axios.delete('/api/user-role-manage/student-phone', {
            data:{
               "studentIds":studentsIds
             }
            }).then(function (res) {
              if(res){
                if(res.data.code ==='000000'){
                  _this.$notify({
                    message: '清除成功',
                    position: 'bottom-right',
                    type: 'success'
                  });
                }
                _this.getStudentsListData()
              }
            }).catch(function (error) {
              _this.$notify.error({
                message: error,
                position: 'bottom-right'
              });
            })
          }else{
            this.$notify.error({
              message: '至少选择一条',
              position: 'bottom-right'
            });
          }
        },
        /*打开用户弹窗*/
        addUserFun:function () {
          this.addUserStatus = true
          if(this.activeName ==='third'){
            this.getTreeListData()/*查询树*/
            this.nextDataType = true
            this.saveDataType = false
          }else if(this.activeName ==='fourth'){
            this.getTreeListData()/*查询树*/
            this.nextDataType = true
            this.saveDataType = false
          }else if(this.activeName ==='fifth'){
            this.getTreeListData()/*查询树*/
            this.nextDataType = false
            this.saveDataType = true
          }
        },
        /*树形节点点击查询*/
        treeHandleNodeClick:function (data) {
          if(data.orgId!==''){
            this.getOrgStaff(data.orgId)
          }
        },
        /*学生处管理员*/
        studentsLeadersaveDataFun:function(){
          const _this = this
          let staffIdList = []
          this.rightListData.forEach(function (item,index) {
            staffIdList.push(item.key)
          })
          this.$axios.post('/api/student-office-admin',{
            'staffIdList':staffIdList
          }).then(function (res) {
            if(res){
              if(res.data.code ==='000000') {
                this.addUserStatus=false
                _this.$notify({
                  message: '设置成功',
                  position: 'bottom-right',
                  type: 'success'
                })
                const param = _this.form.name
                this.getStudentleaderListData(param)
              }
            }
          }).catch(function (error) {
            _this.$notify.error({
              message: error,
              position: 'bottom-right'
            });
          })
        },
        /*二级学院管理员和宿舍管理员保存列表*/
        saveDataFun:function () {
          const _this = this
          if(this.activeName ==='third'){
            const format = {}
            const params = []
            this.collegeOrBuildCheckList.forEach(function (item,index) {
              format["collegeName"] = item.label
              format["collegeId"] = item.key
              params.push(format)
            })
            this.collegeRefList.push({
              "orgIdList": params,
              "userId": this.userId
            })
            this.$axios.post('/api/secondary-college-admin',{
              "refList": _this.collegeRefList
            }).then(function (res) {
              if(res){
                if(res.data.code ==='000000') {
                  this.nextAddUserStatus = false
                  _this.$notify({
                    message: '保存成功',
                    position: 'bottom-right',
                    type: 'success'
                  })
                }
              }
            }).catch(function (error) {
              _this.$notify.error({
                message: error,
                position: 'bottom-right'
              })
            })
          }else if(this.activeName ==='fourth'){
            const format = {}
            const params = []
            this.collegeOrBuildCheckList.forEach(function (item,index) {
              format["buildingName"] = item.label
              format["buildingId"] = item.key
              params.push(format)
            })
            this.buildRefList.push({
              "buildingId": params,
              "userId": this.userId
            })
            this.$axios.post('/api/dormitory-admin',{
              "refList": _this.buildRefList
            }).then(function (res) {
              if(res){
                if(res.data.code ==='000000') {
                  _this.$notify({
                    message: '保存成功',
                    position: 'bottom-right',
                    type: 'success'
                  })
                }
              }
            }).catch(function (error) {
              _this.$notify.error({
                message: error,
                position: 'bottom-right'
              })
            })
          }
        },
        /*获取右边选择数据*/
        getRightList:function(data){
          let params = []
          this.orgIdStaffListData.forEach(function (leftItem,index) {
            if(data.indexOf(leftItem.key)>0){
              params.push(leftItem)
            }
          })
          this.rightListData = params
        },
        /*上一步控制*/
        stepFun:function(){
          this.addUserStatus=true
          this.nextAddUserStatus=false
        },
        /*下一步控制*/
        nextFun:function () {
          this.addUserStatus=false
          this.nextAddUserStatus=true
        },
        /*下一步树点击事件*/
        treeClickCollegeFun:function(data){
          const _this = this
          this.userId = data.key
          if(this.activeName ==='third'){
            /*查询学院*/
            this.$axios.get('/api/select-data/secondary-college/query-by-user',{
              params:{
                userId:data.key
              }
            }).then(function (res) {
              if(res){
                const format = {}
                _this.collegeOrBuildListData = []
                res.data.data.forEach(function (item,index) {
                  format.label = item.collegeName
                  format.key = item.collegeId
                  _this.collegeOrBuildListData.push(format)
                })
              }
            }).catch(function (error) {
              console.log(error)
            })
          }else if(this.activeName ==='fourth'){
           /*查询楼栋*/
            this.$axios.get('/select-data/dormitory-building/all').then(function (res) {
              if(res){
                const format = {}
                _this.collegeOrBuildListData = []
                res.data.data.forEach(function (item,index) {
                   format.label = item.buildingName
                    format.key = item.buildingId
                  _this.collegeOrBuildListData.push(format)
                })
              }
            }).catch(function (error) {
              console.log(error)
            })
          }
        },
        /*删除用户*/
        deleteUser:function () {
          let roletype = 0
          if (this.activeName ==='third'){
            roletype = 1
          }else if(this.activeName ==='fourth'){
            roletype = 2
          }else if(this.activeName ==='fifth'){
            roletype = 3
          }
          if(this.multipleSelection.length>0){
            const _this = this
            const userIds = []
            this.multipleSelection.forEach(function (item,index) {
              userIds.push(item.userId)
            })
              this.$axios.put('/api/user-role-manage/delete-account',{
                "roleType": roletype,
                "userIds": userIds
              }).then(function (res) {
                if(res){
                  if(res.data.code ==='000000'){
                    _this.$notify({
                      message: '删除成功',
                      position: 'bottom-right',
                      type: 'success'
                    })
                    const param = _this.form.name
                    if(_this.activeName ==='third'){
                      this.getCollegerListData(param)
                    }else if(_this.activeName ==='fourth'){
                      this.getRoomerListData(param)
                    }else if(_this.activeName ==='fifth'){
                      this.getStudentleaderListData(param)
                    }
                  }
                }
              }).catch(function (error) {
                _this.$notify.error({
                  message: error,
                  position: 'bottom-right',
                });
              })
          }else{
            this.$notify.error({
              message: '至少选择一条',
              position: 'bottom-right'
            });
          }
        },
        /*获取选中的值*/
        checkTrueValueFun:function (data) {
          const params = []
          this.collegeOrBuildListData.forEach(function (item,index) {
            if(data.indexOf(item.label>0)){
              params.push(item.key)
            }
          })
          this.collegeOrBuildCheckList = params
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
  .add-user-container{
    display: flex;
    justify-content: flex-start;
  }
  .add-user-tree-container{
    width: 30%;
  }
  .add-user-teansfer-container{
    width: 70%;
  }
</style>
