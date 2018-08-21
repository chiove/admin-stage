<template>
  <div class="body-container">
    <div class="tool-bar-container-border">
      <div>
        <span>学生打卡设置</span>
        <span class="middle-line"></span>
        <span class="index-router">系统维护设置</span>
        <span class="active-router">&gt; 学生打卡设置</span>
      </div>
    </div>
    <div class="body-content">
      <div class="body-content-title">学生打卡设置</div>
      <div class="clock-in-settings-container">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="1.2rem" class="change-pass-word-form">
          <div class="check-room-time-container">
            <el-form-item label="打卡时间" prop="clockStartTime">
              <el-time-picker
                v-model="clockStartTime"
                size="mini"
                placeholder="打卡开始时间">
              </el-time-picker>
            </el-form-item>
            <el-form-item prop="clockEndTime">
              <el-time-picker
                arrow-control
                v-model="clockEndTime"
                size="mini"
                placeholder="打卡结束时间">
              </el-time-picker>
            </el-form-item>
          </div>
          <div class="check-room-time-container">
            <el-form-item label="查寝开始时间" prop="checkDormStartTime">
              <el-time-select
                v-model="checkDormStartTime"
                size="mini"
                placeholder="选择时间">
              </el-time-select>
            </el-form-item>
            <el-form-item label="次日截止时间" prop="checkDormkEndTime">
              <el-time-select
                v-model="checkDormkEndTime"
                size="mini"
                placeholder="选择时间">
              </el-time-select>
            </el-form-item>
          </div>
          <el-form-item label="范围选择">
            <el-date-picker
              v-model="value6"
              size="mini"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            <el-date-picker
              size="mini"
              v-model="value3"
              type="week"
              format="yyyy 第 WW 周"
              placeholder="选择周">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="打卡地点">
            <div>打卡地址：云华校区</div>
            <div class="clock-in-settings-address-container">
              <span>详细地址：打卡地点默认为中心点100m范围内</span>
              <el-select v-model="value1" size="mini" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-button size="mini"  type="primary">删除打卡地点</el-button>
            </div>
            <div>打卡地址：云华校区</div>
            <div class="clock-in-settings-address-container">
              <span>详细地址：打卡地点默认为中心点100m范围内</span>
              <el-select v-model="value1" size="mini" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-button size="mini"  type="primary">新增打卡地点</el-button>
              <el-button size="mini"  type="primary">删除打卡地点</el-button>
            </div>
            <div class="clock-in-settings-map-container"></div>
          </el-form-item>
          <el-form-item label="安全设置">
            <el-switch
              v-model="checkDevice"
              active-value="1"
              inactive-value="2"
              active-text=""
              inactive-text="是否允许用户使用常用手机打卡开关">
            </el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="submitForm('ruleForm')">保存设置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "ClockInSettings",
      data(){
        return {
          clockTimes:'', /*打卡开始时间*/
          clockEndTime:'',/*打卡结束时间*/
          checkDormStartTime:'',/*查寝开始时间*/
          checkDormkEndTime:'',/*查寝结束时间*/
          checkDevice:'1',/*是否检查设备*/
          value4: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
          value1:'',
          value6:'',
          value3:'',
          value10:true,
          options:'',
          ruleForm: {
            value1:'',
            value3:'',
            value6:'',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
          },
          rules: {
            clockStartTime: [
              { required: true, message: '请选择时间', trigger: 'blur' },
            ],
            clockEndTime:[
              { required: true, message: '请选择时间', trigger: 'blur' },
              ],
            checkDormStartTime: [
              { required: true, message: '请选择时间', trigger: 'blur' }
            ],
            checkDormkEndTime: [
              { required: true, message: '请选择时间', trigger: 'blur' }
            ],
            date2: [
              { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
            ],
            type: [
              { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
            ],
            resource: [
              { required: true, message: '请选择活动资源', trigger: 'change' }
            ],
            desc: [
              { required: true, message: '请填写活动形式', trigger: 'blur' }
            ]
          }
        }
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }
    }
</script>

<style scoped>
.check-room-time-container{
  display: flex;
  justify-content: flex-start;
}
  .clock-in-settings-map-container{
    height: 5rem;
    width: 6.32rem;
  }
  .clock-in-settings-address-container{
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
</style>
