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
                ref="clockStartTimeDom"
                v-model="ruleForm.clockStartTime"
                size="mini"
                value-format="HH:mm:ss"
                placeholder="打卡开始时间">
              </el-time-picker>
            </el-form-item>
            <el-form-item prop="clockEndTime">
              <el-time-picker
                ref="clockEndTimeDom"
                v-model="ruleForm.clockEndTime"
                size="mini"
                value-format="HH:mm:ss"
                @change="endTimeChange"
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
                value-format="HH:mm:ss"
                placeholder="选择时间">
              </el-time-picker>
            </el-form-item>
            <el-form-item label="次日截止时间" prop="checkDormkEndTime">
              <el-time-picker
                ref="checkDormkEndTimeDom"
                v-model="ruleForm.checkDormkEndTime"
                size="mini"
                value-format="HH:mm:ss"
                placeholder="选择时间">
              </el-time-picker>
            </el-form-item>
          </div>
          <el-form-item label="范围选择">
            <el-date-picker
              ref="clockRepeatTimeDom"
              type="dates"
              size="mini"
              value-format="yyyyMMdd"
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
              <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
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
      },
      data(){
        const self = this;
        return {
          zoom: 18,
          center: [106.518544,29.562249],
          address: '',
          lng: 0,
          lat: 0,
          loaded: false,
          searchOption:{},
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
              radius:1000,
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
            scope:1000,/*设置打卡范围*/
          },
          scopeOption:[
            {value:1000, label:'1千米'},
            {value:1500, label:'1.5千米'},
            {value:2000, label:'2千米'},
            {value:3000, label:'3千米'},
            {value:4000, label:'4千米'},
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
          },
          dayList:[],/*多选日期*/
        }
      },
      methods: {
        onSearchResult(pois) {
          const self = this
          let latSum = 0;
          let lngSum = 0;
          if (pois.length > 0) {
            pois.forEach(poi => {
              let {lng, lat} = poi;
              lngSum += lng;
              latSum += lat;
              self.markers.push({position:[poi.lng, poi.lat]});
            });
            let center = {
              lng: lngSum / pois.length,
              lat: latSum / pois.length
            };
            this.center = [center.lng, center.lat];
          }
        },
        /*提交表单*/
        submitForm(formName) {
          const _this = this
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$axios.put(process.env.API_HOST+'system-config',{
                  headers:{
                    'Content-Type':'x-www-form-urlencoded'
                  },
                  "addressReqDTOList": _this.addressReqDTOList,
                  "checkDevice": _this.ruleForm.checkDevice,
                  "checkDormStartTime": _this.ruleForm.checkDormStartTime,
                  "checkDormEndTime": _this.ruleForm.checkDormkEndTime,
                  "clockEndTime": _this.ruleForm.clockEndTime,
                  "clockStartTime": _this.ruleForm.clockStartTime,
                  "dayList": _this.ruleForm.clockRepeatTime,
              }).then(function (res) {
                if(res){
                  if(res.data.code ==='000000'){
                    _this.$notify({
                      message: '设置成功',
                      position: 'bottom-right',
                      type: 'success'
                    })
                  }else{
                    _this.$notify({
                      message: res.data.message,
                      position: 'bottom-right',
                      type: 'warning'
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
          this.$axios.get(process.env.API_HOST+'system-config').then(function (res) {
            if(res){
              let listFormat = {}
              res.data.data.clockAddressSettingList.forEach(function (item,index) {
                listFormat.name = item.address
                listFormat.posLatitude = item.lat
                listFormat.posLongitude = item.lon
                listFormat.scope = item.radius
                _this.addressReqDTOList.push(listFormat)
              })
               _this.ruleForm.checkDevice = res.data.data.checkDevice.toString()
               _this.ruleForm.checkDormStartTime =res.data.data.checkClockStartTime
               _this.ruleForm.checkDormkEndTime =  res.data.data.checkClockEndTime
               _this.ruleForm.clockEndTime =  res.data.data.clockEndTime
               _this.ruleForm.clockStartTime = res.data.data.clockStartTime
            }
          }).catch(function (error) {
            console.log(error)
          })
          this.$axios.get(process.env.API_HOST+'clock-day-list-from-curr').then(function (res) {
            if(res){
              res.data.data.forEach(function (item,index) {
                _this.ruleForm.clockRepeatTime.push(item.toString())
              })
            }
          }).catch(function (error) {
            console.log(error)
          })
        },
        /*新增打卡地址*/
        addNewClock:function(){
          if(this.address!==''){
            this.circles[0].radius = Number(this.ruleForm.scope)
            let clockAddress = {
              name: this.address,
              posLatitude: this.lat,
              posLongitude: this.lng,
              scope: Number(this.ruleForm.scope),
              id:new Date().getTime()+Math.floor(Math.random()*100)+new Date().getTime()
            }
            this.addressReqDTOList.push(clockAddress)
          }else{
            this.$notify({
              title:'提示',
              message:'请选择地址',
              position:'bottom-right',
              type:'warning'
            })
          }
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
        endTimeChange(){
          this.ruleForm.checkDormStartTime = this.ruleForm.clockEndTime
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
