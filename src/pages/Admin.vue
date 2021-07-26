<template>
  <q-page class="q-pa-sm">
    <card-social icon_position="right" :items="items" />
    <q-card class="q-mt-sm">


      <q-card-section class="row">
        <div class="col-lg-4 col-sm-12 col-xs-12 col-md-5">
          <div>
            <q-item>
              <q-item-section avatar class="">
                <q-icon color="green" name="person_add" class="q-pl-md" size="24px" />
              </q-item-section>
              <q-item-section>
                <div class="text-h6">Recent register</div>
              </q-item-section>
            </q-item>
            <IEcharts style="height: 250px" :option="registerStatistic" :resizable="true" />
          </div>
        </div>

        <div class="col-lg-4 col-sm-12 col-xs-12 col-md-5">
          <q-item>
            <q-item-section avatar class="">
              <q-icon color="blue" name="insights" size="44px" />
            </q-item-section>
            <q-item-section>
              <div class="text-h6">Recent added cameras</div>
            </q-item-section>
          </q-item>
          <div>
            <IEcharts style="height: 250px" :option="recent_camera" :resizable="true" />
           <!-- <IEcharts style="height: 250px" :option="alertStatistic" :resizable="true" />-->
          </div>
        </div>


        <div class="col-lg-4 col-sm-12 col-xs-12 col-md-5">
          <q-item>
            <q-item-section avatar class="">
              <q-icon color="red" name="warning" class="q-pl-md" size="24px" />
            </q-item-section>
            <q-item-section>
              <div class="text-h6">Recent alerts</div>
            </q-item-section>
          </q-item>
          <div>
            <IEcharts style="height: 250px" :option="alertStatistic" :resizable="true" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <div class="row q-col-gutter-sm  q-py-sm">
      <div class="col">
        <q-card>
          <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify">
            <!--<q-tab name="contact" :class="tab == 'contact' ? 'text-blue' : ''" icon="contacts" label="Contact" />-->
            <q-tab name="message" :class="tab === 'message' ? 'text-blue' : ''" icon="comment" label="Message">
              <q-badge color="red" floating>{{ messages.length }}</q-badge>
            </q-tab>
          <!--  <q-tab name="notification" :class="tab == 'notification' ? 'text-blue' : ''" icon="notifications" label="Notification">
              <q-badge color="red" floating>4</q-badge>
            </q-tab>-->
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="message" class="q-pa-sm">
              <q-item v-for="msg in messages" :key="msg.uid" clickable v-ripple @click="alert(msg.info)">
                <q-item-section avatar>
                  <q-img src="~assets/profile.svg"> </q-img>
                </q-item-section>

                <q-item-section>
                  <!--<q-item-label v-if="msg.status === 0"> unhandled </q-item-label>
                  <q-item-label v-if="msg.status === 1"> handled </q-item-label> -->
                  <q-item-label class="text-subtitle1"> {{ msg.uid }}</q-item-label>
                  <q-item-label caption lines="1">{{ msg.info }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-btn  icon="email" style="color:cornflowerblue" @click="change_msg_status(msg.id,true)"> </q-btn>
                  {{ msg.time }}
                </q-item-section>
              </q-item>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import IEcharts from "vue-echarts-v3/src/full.js";

export default {
  name: "Dashboard2",
  components: {
    IEcharts,
    CardSocial: () => import("components/cards/CardSocial")
  },
  data() {
    return {
      slide: 1,
      recent_camera:{
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // Coordinate axis indicator, coordinate axis trigger is valid
            type: "shadow" // The default is a straight line, optional:'line' |'shadow'
          }
        },
        grid: {
          left: "2%",
          right: "2%",
          top: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [this.getDay(-6),this.getDay(-5),this.getDay(-4),
              this.getDay(-3),this.getDay(-2),this.getDay(-1),this.getDay(0)]
          }
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false
            }
          }
        ],
        series: [

          {
            name: "Camera add",
            type: "bar",
            data: [],
            color: "#336c1a"
          }
        ]
      },
      registerStatistic: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // Coordinate axis indicator, coordinate axis trigger is valid
            type: "shadow" // The default is a straight line, optional:'line' |'shadow'
          }
        },
        grid: {
          left: "2%",
          right: "2%",
          top: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [this.getDay(-6),this.getDay(-5),this.getDay(-4),
              this.getDay(-3),this.getDay(-2),this.getDay(-1),this.getDay(0)]
          }
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "Register",
            type: "line",
            data: [],
            color: "#546bfa"
          },

        ]
      },
      alertStatistic: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // Coordinate axis indicator, coordinate axis trigger is valid
            type: "shadow" // The default is a straight line, optional:'line' |'shadow'
          }
        },
        grid: {
          left: "2%",
          right: "2%",
          top: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [this.getDay(-6),this.getDay(-5),this.getDay(-4),
              this.getDay(-3),this.getDay(-2),this.getDay(-1),this.getDay(0)]
          }
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "Alert raised",
            type: "bar",
            data: [],
            color: "#f11146"
          }
        ]
      },
      items: [
        {
          title: "Numbers of camera",
          icon: "camera",
          value: "10",
          color1: "#546bfa",
          color2: "#3e51b5"
        },
        {
          title: "Numbers of VIP",
          icon: "account_circle",
          value: "5",
          color1: "#3a9688",
          color2: "#3e51b5"
        },
        {
          title: "New Customers",
          icon: "person_add",
          value: "2",
          color1: "#7cb342",
          color2: "#3e51b5"
        },
        {
          title: "Active Users",
          icon: "person",
          value: "8",
          color1: "#f88c2b",
          color2: "#3e51b5"
        }
      ],
      tab: "message",
      messages: [
        {
          id:'',
          info: "",
          uid: ''
        }
      ]
    };
  },
  created() {
    this.$axios.get('http://camotion.zrp.cool:8000/get_undo_repo').then((response) => {
      console.log(response)
      let res = response.data
      this.messages = res;
    }).catch((error) => {
      console.log(error)
      this.$q.notify({
        type: 'negative',
        message: 'Internal error.'
      })
    })
    this.get_cam_num()
  },


  methods: {

    getDay(day){
      var today = new Date();
      var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
      today.setTime(targetday_milliseconds); //注意，这行是关键代码

      var tDate = today.getDate();
      return tDate;
    },

    get_cam_num() {
      this.$axios.get('http://camotion.zrp.cool:8000/get_dashboard_info' ).then((response) => {
        console.log(response)
        let res = response.data
        this.recent_camera.series[0].data=res.recent_cam_add.reverse()
        this.registerStatistic.series[0].data=res.recent_register.reverse()
        this.alertStatistic.series[0].data=res.recent_alert.reverse()
      }).catch((error) => {
        console.log(error)
        this.$q.notify({
          type: 'negative',
          message: 'Internal error.'
        })
      })
    },
    alert (aa) {

  this.$q.dialog({
    title:// this.sessionStorage.getItem('user_id'),
         'Message',
    message: aa
  })
},
    change_msg_status(id, status) {
      this.$axios.post('http://camotion.zrp.cool:8000/change_report_status/?repo_id='+id+'&status='+status, {
        'repo_id': id,
        'status': status
      }).then( (response) => {
        console.log(response)
        let res = response.data
        if(res.status === 'Success') {
          this.$q.notify({
            message: 'handled',
            color: 'primary'
          })
          this.$router.go(0)
        } else {
          //console.log(res.message)
          this.$q.notify({
            type: 'warning',
            message: res.message
          })
        }
      }).catch( (error) => {
        console.log(error)
        this.$q.notify({
          type: 'negative',
          message: 'Internal error.'
        })
      })
    },
    getColor(val) {
      if (val > 70 && val <= 100) {
        return "green";
      } else if (val > 50 && val <= 70) {
        return "blue";
      }
      return "red";
    }
  }
};
</script>

<style scoped></style>
