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
                v-model="ruleForm.clockStartTime"
                size="mini"
                ref="clockStartTimeDom"
                placeholder="打卡开始时间">
              </el-time-picker>
            </el-form-item>
            <el-form-item prop="clockEndTime">
              <el-time-picker
                ref="clockEndTimeDom"
                v-model="ruleForm.clockEndTime"
                size="mini"
                placeholder="打卡结束时间">
              </el-time-picker>
            </el-form-item>
          </div>
          <div class="check-room-time-container">
            <el-form-item label="查寝开始时间" prop="checkDormStartTime">
              <el-time-picker
                ref="checkDormStartTimeDom"
                v-model="ruleForm.checkDormStartTime"
                size="mini"
                placeholder="选择时间">
              </el-time-picker>
            </el-form-item>
            <el-form-item label="次日截止时间" prop="checkDormkEndTime">
              <el-time-picker
                ref="checkDormkEndTimeDom"
                v-model="ruleForm.checkDormkEndTime"
                size="mini"
                placeholder="选择时间">
              </el-time-picker>
            </el-form-item>
          </div>
          <el-form-item label="范围选择">
            <el-date-picker
              ref="clockRepeatTimeDom"
              type="dates"
              size="mini"
              v-model="ruleForm.clockRepeatTime"
              placeholder="选择一个或多个日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="打卡地点">
            <div class="clock-in-settings-address-container" v-for="(item,index) in addressReqDTOList" v-bind:key='index' @click="deleteClockPositionFun">
              <div class="clock-in-settings-address-delete-span">打卡地址：{{item.name}}</div>
               <div class="clock-in-settings-address-delete">
                 <span class="clock-in-settings-address-delete-span">详细地址：打卡地点默认为中心点{{item.scope}}m范围内</span>
                 <div size="mini"  class="delete-button" :data-index="JSON.stringify(item)">删除打卡地点</div>
               </div>
            </div>
            <div class="clock-in-settings-address-container">
              <div>
                <div>新增打卡地址：{{address}}</div>
                <span>设置打卡范围：打卡地点默认为中心点{{circles[0].radius}}m范围内</span>
                <div class="clock-in-settings-address-delete">
                  <span class="scope-label">范围设置：</span>
                  <el-select v-model="ruleForm.scope" size="mini" class="clock-in-settings-address-delete-span" placeholder="设置范围">
                    <el-option
                      v-for="item in scopeOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-button size="mini"  type="primary" @click="addNewClock">新增打卡地点</el-button>
                </div>
              </div>
            </div>
            <div class="clock-in-settings-map-container">
              <!--<el-amap-search-box class="search-box"></el-amap-search-box>-->
              <el-amap vid="amap" class="amap-demo" :zoom="zoom" :center="center" :events="events">
                <el-amap-circle v-for="(circle,index) in circles"  :center="circle.center" :radius="circle.radius" :fill-opacity="circle.fillOpacity" :events="circle.events"></el-amap-circle>
                <el-amap-marker v-for="(marker, index) in markers"  vid="component-marker" :position="marker.position"></el-amap-marker>
              </el-amap>
            </div>
          </el-form-item>
          <el-form-item label="安全设置">
            <el-switch
              v-model="ruleForm.checkDevice"
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
  import Amap from 'vue-amap'
  let listData = []/*push地址*/
  let listDelete = []
    export default {
      name: "ClockInSettings",
      mounted:function(){
        this.getSystemListData()
        this.ruleForm.clockStartTime = '12:00:25'
      },
      data(){
        const self = this;
        return {
          zoom: 18,
          center: [106.518544,29.562249],
          address: '初始化地址',
          lng: 0,
          lat: 0,
          loaded: false,
          events: {
            click(e) {
              let { lng, lat } = e.lnglat;
              self.lng = Number(lng);
              self.lat = Number(lat);
              self.circles[0].center = [Number(lng),Number(lat)]
              self.markers[0].position = [Number(lng),Number(lat)]
              // 这里通过高德 SDK 完成。
              const geocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
              });
              geocoder.getAddress([lng ,lat], function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                  if (result && result.regeocode) {
                    self.address = result.regeocode.formattedAddress;
                    self.$nextTick();
                  }
                }
              });
            }
          },
          circles: [
            {
              center: [106.518544,29.562249],
              radius:50,
              fillOpacity: 0.2,
              events: {
                click: () => {
                  self.$notify({
                    message: '在此范围',
                    position: 'bottom-right',
                    type: 'success'
                  })
                }
              }
            }
          ],
          markers: [
            {
              position:  [106.51848, 29.562275],
              events: {
                click: () => {
                  alert('click marker');
                },
                dragend: (e) => {
                  console.log('---event---: dragend')
                  this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
                }
              },
              visible: true,
              draggable: false,
              template: '<span>1</span>',
            }
          ],
          ruleForm: {
            clockStartTime:'', /*打卡开始时间*/
            clockEndTime:'',/*打卡结束时间*/
            checkDormStartTime:'',/*查寝开始时间*/
            checkDormkEndTime:'',/*查寝结束时间*/
            clockRepeatTime:[],/*重复打卡时间*/
            checkDevice:'1',/*是否检查设备*/
            scope:50,/*设置打卡范围*/
          },
          scopeOption:[
            {value:50, label:'50米'},
            {value:100, label:'200米'},
            {value:200, label:'100米'},
            {value:500, label:'500米'},
          ],
          addressReqDTOList:[],/*地图数据*/
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
            clockRepeatTime: [
              { required: true, message: '请选择时间', trigger: 'blur' }
            ],
          }
        }
      },
      methods: {
        /*提交表单*/
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              if(this.ruleForm.clockRepeatTime){
                const dayList = []
                this.ruleForm.clockRepeatTime.forEach(function (item,index) {
                  let month = '',day = ''
                  if(item.getMonth()+1<10){
                    month = `0${item.getMonth()+1}`
                  }else{
                    month = item.getMonth()+1
                  }
                  if(item.getDay()<10){
                    day = `0${item.getDay()}`
                  }else{
                    day = item.getDay()
                  }
                  dayList.push( `${item.getFullYear()}${month}${day}`)
                })
              }
              const _this = this
              this.$axios.put('/api/system-config',{
                  headers:{
                    'Content-Type':'x-www-form-urlencoded'
                  },
                  "addressReqDTOList": _this.addressReqDTOList,
                  "checkDevice": _this.ruleForm.checkDevice,
                  "checkDormStartTime": `${_this.ruleForm.checkDormStartTime.getHours()}:${_this.ruleForm.checkDormStartTime.getMinutes()}:${_this.ruleForm.checkDormStartTime.getSeconds()}`,
                  "checkDormEndTime": `${_this.ruleForm.checkDormkEndTime.getHours()}:${_this.ruleForm.checkDormkEndTime.getMinutes()}:${_this.ruleForm.checkDormkEndTime.getSeconds()}`,
                  "clockEndTime": `${_this.ruleForm.clockEndTime.getHours()}:${_this.ruleForm.clockEndTime.getMinutes()}:${_this.ruleForm.clockEndTime.getSeconds()}`,
                  "clockStartTime": `${_this.ruleForm.clockStartTime.getHours()}:${_this.ruleForm.clockStartTime.getMinutes()}:${_this.ruleForm.clockStartTime.getSeconds()}`,
                  "dayList":dayList,
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
                _this.$notify.error({
                  message: error,
                  position: 'bottom-right'
                });
              })
            } else {
              return false;
            }
          });
        },
        /*重置*/
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        /*获取设置数据*/
        getSystemListData:function () {
          const _this = this
          this.$axios.get('/api/system-config').then(function (res) {
            if(res){
              let listFormat = {}
              console.log(res.data.data)
              res.data.data.clockAddressSettingList.forEach(function (item,index) {
                listFormat.name = item.address
                listFormat.lat = item.lat
                listFormat.lng = item.lng
                listFormat.scope = item.radius
                _this.addressReqDTOList.push(listFormat)
              })
              // _this.addressReqDTOList = res.data.data.clockAddressSettingList
               _this.ruleForm.checkDevice = res.data.data.checkDevice
               _this.ruleForm.checkDormStartTime = res.data.data.checkClockStartTime
               _this.ruleForm.checkDormkEndTime = res.data.data.checkClockEndTime
               _this.ruleForm.clockEndTime = res.data.data.clockEndTime
               _this.ruleForm.clockStartTime = res.data.data.clockStartTime
            }
          }).catch(function (error) {
            console.log(error)
          })
          this.$axios.get('/api/clock-day-list-from-curr').then(function (res) {
            if(res){
              console.log(res)
              _this.ruleForm.clockRepeatTime = res.data.data.dayList
            }
          }).catch(function (error) {
            console.log(error)
          })
        },
        /*新增打卡地址*/
        addNewClock:function(){
          this.circles[0].radius = Number(this.ruleForm.scope)
          let clockAddress = {
            name: this.address,
            posLatitude: this.lat,
            posLongitude: this.lng,
            scope: Number(this.ruleForm.scope),
            id:new Date().getTime()+Math.floor(Math.random()*100)+new Date().getTime()
          }
          this.addressReqDTOList.push(clockAddress)
        },
        /*删除打卡地点*/
        deleteClockPositionFun:function (e) {
          const _this = this
          if(e.target.dataset.index){
            const deleteObject = JSON.parse(e.target.dataset.index)
            this.addressReqDTOList.forEach(function (item,index) {
              if(item.id!==deleteObject.id){
                listDelete.push(item)
              }
            })
          }
          this.addressReqDTOList = listDelete
          listData = listDelete
          listDelete = []
        },
      }
    }
</script>

<style scoped>
.check-room-time-container{
  display: flex;
  justify-content: flex-start;
}
  .clock-in-settings-map-container{
    margin-top: .2rem;
    height: 5rem;
    width: 6.32rem;
    position: relative;
  }
  .clock-in-settings-address-container{
     border-bottom: .01rem solid #ccc;
    padding-bottom: .1rem;
    width: 5rem;
  }
  .clock-in-settings-address-delete{
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .scope-label{
    width: 1.2rem;
  }
  .clock-in-settings-address-delete-span{
    margin-right: .2rem;
  }
  .search-box {
    position: absolute;
    top: .25rem;
    left: .2rem;
  }
  .delete-button{
    color: #fff;
    background-color: #409EFF;
    border-color: #409EFF;
    padding: 0 .15rem;
    font-size: .12rem;
    border-radius: .03rem;
    height: .28rem;
    line-height: .28rem;
    text-align: center;
    cursor: pointer;
  }
</style>
