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
        <el-button type="primary" size="mini" @click="addNewDateFun">添加学期</el-button>
      </div>
    </div>
    <div class="body-content">
      <div class="body-content-title">学期设置</div>
      <div class="learn-date-container" v-for="(item,index) in listData" v-bind:key="index">
        <div class="learn-date-title">
          <i class="el-icon-time"></i>
          <span>{{item.startYear}}-{{item.endYear}}学年</span>
        </div>
        <div class="learn-date-title-little">
          <i class="el-icon-bell"></i>
          <span>第一学期</span>
        </div>
        <div class="learn-date-title-lv3">
          <div class="learn-date-title-lv3-text">
            <div class="learn-date-title-lv3-icon"></div>
            <div>开始日期 {{item.termNumberOne.startDate}}</div>
          </div>
          <div class="learn-date-title-lv3-text">
            <div class="learn-date-title-lv3-icon1"></div>
            <div>结束日期 {{item.termNumberOne.endDate}}</div>
          </div>
        </div>
        <div class="learn-date-title-little">
          <i class="el-icon-bell"></i>
          <span>第二学期</span>
        </div>
        <div class="learn-date-title-lv3">
          <div class="learn-date-title-lv3-text">
            <div class="learn-date-title-lv3-icon"></div>
            <div>开始日期 {{item.termNumberTwo.startDate}}</div>
          </div>
          <div class="learn-date-title-lv3-text">
            <div class="learn-date-title-lv3-icon1"></div>
            <div>结束日期 {{item.termNumberTwo.endDate}}</div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="学期设置"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <div>
        <div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="学年选择" prop="year">
                <div class="form-list-container">
                  <el-date-picker
                    v-model="ruleForm.startYear"
                    type="year"
                    size="mini"
                    placeholder="选择开始日期">
                  </el-date-picker>
                  <el-date-picker
                    v-model="ruleForm.endYear"
                    type="year"
                    size="mini"
                    placeholder="选择结束日期">
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item label="学期选择" prop="termNumber">
                <el-select v-model="ruleForm.termNumber" size="mini" placeholder="请选择活动区域">
                  <el-option label="第一学期" value="1"></el-option>
                  <el-option label="第二学期" value="2"></el-option>
                </el-select>
              </el-form-item>
            <el-form-item label="开始日期" prop="startDate">
              <el-date-picker
                v-model="ruleForm.startDate"
                type="date"
                size="mini"
                placeholder="选择开始日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束日期" prop="endDate">
              <el-date-picker
                v-model="ruleForm.endDate"
                type="date"
                size="mini"
                placeholder="选择结束日期">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="addNewDateConfirmFun" size="mini">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
      name: "learnDateSettings",
      data(){
          return {
            ruleForm:{
              termNumber: '',/*学期*/
              startDate: '',/*开始时间*/
              endDate: '',/*结束时间*/
              startYear:'',/*开始学年*/
              endYear:''/*结束学年*/
            },
            listData:[
              {
                startYear:'2017',
                endYear:'2018',
                termNumberOne:{
                  startDate: '2017-02-01',
                  endDate: '2017-06-01',
                },
                termNumberTwo:{
                  startDate: '2017-09-01',
                  endDate: '2018-02-01',
                }
              },
            ],
            rules: {
              startYear: [
                { required: true, message: '请选择日期', trigger: 'blur' },
              ],
              endYear: [
                { required: true, message: '请选择日期', trigger: 'blur' },
              ],
              termNumber: [
                { required: true, message: '请选择学期', trigger: 'blur' },
              ],
              startDate: [
                { required: true, message: '请选择日期', trigger: 'blur' },
              ],
              endDate: [
                { required: true, message: '请选择日期', trigger: 'blur' },
              ],
            },
            dialogVisible:false,/*添加学期弹窗*/
          }
      },
      methods:{
        /*添加学期*/
        addNewDateFun(){
          this.dialogVisible = true
        },
        /*添加学期确定*/
        addNewDateConfirmFun(){
          this.dialogVisible = false
          this.addStudyDate()
        },
        /*获取学期日期*/
        getStudyDate(){
          this.$axios.get('/api/term').then(function (res) {
            if(res){
                let listData = {}
                const _this = this
                res.data.data.forEach(function (item,index) {
                  listData.startYear = item.startYear
                  listData.endYear = item.endYear
                  listData.termNumberOne.startDate = item.termOneStartDate
                  listData.termNumberOne.endDate = item.termOneEndDate
                  listData.termNumberTwo.startDate = item.termTwoStartDate
                  listData.termNumberTwo.endDate = item.termTwoEndDat
                  _this.listData.push(listData)
                })
            }
          }).catch(function (error) {
            console.log(error)
          })
        },
        /*添加新学期*/
        addStudyDate(){
          const _this = this
          this.$axios.put('/api/term',{
            "endDate": _this.ruleForm.endDate,
            "startDate":  _this.ruleForm.startDate,
            "termNumber":  _this.ruleForm.termNumber,
            "startYear": _this.ruleForm.startYear,
            "endYear": _this.ruleForm.endYear
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
            console.log(error)
          })
        }
      }
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
  .form-list-container{
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .dialog-footer{
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
</style>
