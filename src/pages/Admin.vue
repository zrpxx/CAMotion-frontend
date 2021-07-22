<template>
  <q-page class="q-pa-sm">
    <card-social icon_position="right" :items="items" />
    <q-card class="q-mt-sm">


      <q-card-section class="row">
        <div class="col-lg-7 col-sm-12 col-xs-12 col-md-7">
          <div>
            <q-item>
              <q-item-section avatar class="">
                <q-icon color="green" name="person_add" class="q-pl-md" size="24px" />
              </q-item-section>
              <q-item-section>
                <div class="text-h6">Recent register & camera </div>
              </q-item-section>
            </q-item>
            <IEcharts style="height: 250px" :option="recent_camera" :resizable="true" />
          </div>
        </div>

        <div class="col-lg-5 col-sm-12 col-xs-12 col-md-5">
          <q-item>
            <q-item-section avatar class="">
              <q-icon color="blue" name="insights" size="44px" />
            </q-item-section>
            <q-item-section>
              <div class="text-h6">Stactics</div>
            </q-item-section>
          </q-item>
          <div>
            <IEcharts style="height: 250px" :option="registerStatistic" :resizable="true" />
           <!-- <IEcharts style="height: 250px" :option="alertStatistic" :resizable="true" />-->
          </div>
        </div>


        <div class="col-lg-5 col-sm-12 col-xs-12 col-md-5">
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
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
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
              <q-item v-for="msg in messages" :key="msg.id" clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="msg.avatar" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ msg.name }}</q-item-label>
                  <q-item-label caption lines="1">{{ msg.msg }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  {{ msg.time }}
                </q-item-section>
              </q-item>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>

      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-carousel animated v-model="slide" infinite height="360px" arrows transition-prev="slide-right" transition-next="slide-left">
          <q-carousel-slide :name="1" class="q-pa-none">
            <q-scroll-area class="fit">
              <q-card class="my-card">
                <img :src="require('src/assets/coding.jpeg')" />

                <q-card-section>
                  <div class="text-h6">Work with something that you like, like…</div>
                  <div class="text-subtitle2">by John Doe</div>
                </q-card-section>

                <q-card-actions align="left">
                  <q-btn label="Share" dense color="primary" text-color="blue" outline />
                  <q-btn label="Learn More" dense color="primary" text-color="blue" outline />
                </q-card-actions>
              </q-card>
            </q-scroll-area>
          </q-carousel-slide>
          <q-carousel-slide :name="2" class="q-pa-none">
            <q-scroll-area class="fit">
              <q-card class="my-card">
                <img :src="require('src/assets/lookgood.jpeg')" />

                <q-card-section>
                  <div class="text-h6">Keep your schedule in the right time</div>
                  <div class="text-subtitle2">
                    Aenean facilisis vitae purus facilisis semper.
                  </div>
                </q-card-section>

                <q-card-actions align="left">
                  <q-btn label="Share" dense color="primary" text-color="blue" outline />
                  <q-btn label="Learn More" dense color="primary" text-color="blue" outline />
                </q-card-actions>
              </q-card>
            </q-scroll-area>
          </q-carousel-slide>
          <q-carousel-slide :name="3" class="q-pa-none">
            <q-scroll-area class="fit">
              <q-card class="my-card">
                <img :src="require('src/assets/trawel.jpeg')" />

                <q-card-section>
                  <div class="text-h6">Travel everytime that you have a chance</div>
                  <div class="text-subtitle2">Curabitur egestas consequat lorem, vel fermentum augue porta id.</div>
                </q-card-section>

                <q-card-actions align="left">
                  <q-btn label="Share" dense color="primary" text-color="blue" outline />
                  <q-btn label="Learn More" dense color="primary" text-color="blue" outline />
                </q-card-actions>
              </q-card>
            </q-scroll-area>
          </q-carousel-slide>
        </q-carousel>
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
            data: ["7.19", "7.20", "7.21", "7.22", "7.23", "7.24" ,"7.25"]
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
            data: [4, 2, 8, 9, 1, 4, 6],
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
            data: ["7.19", "7.20", "7.21", "7.22", "7.23", "7.24" ,"7.25"]
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
            data: [40, 45, 27, 50, 32, 50, 70],
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
            data: ["7.19", "7.20", "7.21", "7.22", "7.23", "7.24" ,"7.25"]
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
            data: [2, 3, 2, 0, 1, 5, 3],
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
          id: 5,
          name: "Pratik Patel",
          msg: " -- I'll be in your neighborhood doing errands this\n" + "            weekend. Do you want to grab brunch?",
          avatar: "https://avatars2.githubusercontent.com/u/34883558?s=400&v=4",
          time: "10:42 PM"
        },
        {
          id: 6,
          name: "Winfield Stapforth",
          msg: " -- I'll be in your neighborhood doing errands this\n" + "            weekend. Do you want to grab brunch?",
          avatar: "https://cdn.quasar.dev/img/avatar6.jpg",
          time: "11:17 AM"
        },
        {
          id: 1,
          name: "Boy",
          msg: " -- I'll be in your neighborhood doing errands this\n" + "            weekend. Do you want to grab brunch?",
          avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
          time: "5:17 AM"
        },
        {
          id: 2,
          name: "Jeff Galbraith",
          msg: " -- I'll be in your neighborhood doing errands this\n" + "            weekend. Do you want to grab brunch?",
          avatar: "https://cdn.quasar.dev/team/jeff_galbraith.jpg",
          time: "5:17 AM"
        },
        {
          id: 3,
          name: "Razvan Stoenescu",
          msg: " -- I'll be in your neighborhood doing errands this\n" + "            weekend. Do you want to grab brunch?",
          avatar: "https://cdn.quasar.dev/team/razvan_stoenescu.jpeg",
          time: "5:17 AM"
        }
      ],
      contacts: [
        {
          name: "Pratik Patel",
          position: "Developer",
          avatar: "https://avatars2.githubusercontent.com/u/34883558?s=400&v=4"
        },
        {
          name: "Razvan Stoenescu",
          position: "Developer",
          avatar: "https://cdn.quasar.dev/team/razvan_stoenescu.jpeg"
        },
        {
          name: "Jeff Galbraith",
          position: "Developer",
          avatar: "https://cdn.quasar.dev/team/jeff_galbraith.jpg"
        },
        {
          name: "Brunhilde Panswick",
          position: "Administrator",
          avatar: "https://cdn.quasar.dev/img/avatar2.jpg"
        },
        {
          name: "Winfield Stapforth",
          position: "Administrator",
          avatar: "https://cdn.quasar.dev/img/avatar6.jpg"
        }
      ],
      sales_data: [
        {
          name: "Pratik Patel",
          Progress: 70,
          status: "Canceled",
          stock: "14 / 30",
          date: "23 Oct 2018",
          avatar: "https://avatars3.githubusercontent.com/u/34883558?s=400&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4",
          product_name: "Woman Bag",
          total: "$300,00",
          code: "QWE123",
          prod_img: require("src/assets/bag.jpg")
        },
        {
          name: "Mayank Patel",
          Progress: 60,
          status: "Sent",
          date: "11 Nov 2018",
          stock: "25 / 70",
          avatar: "https://avatars2.githubusercontent.com/u/27857088?s=400&u=a898efbc753d93cf4c2070a7cf3b05544b50deea&v=4",
          product_name: "Laptop",
          total: "$230,00",
          code: "ABC890",
          prod_img: require("src/assets/laptop.jpg")
        },
        {
          name: "Mayur Patel",
          Progress: 30,
          status: "Pending",
          stock: "35 / 50",
          avatar: "https://avatars0.githubusercontent.com/u/55240045?s=400&u=cf9bffc2bd2d8e42ca6e5abf40ddd6c1a03ce2860&v=4",
          product_name: "Pinapple Jam",
          total: "$34,00",
          date: "19 Sept 2020",
          code: "GHI556",
          prod_img: require("src/assets/jam.jpg")
        },
        {
          name: "Jeff Galbraith",
          Progress: 100,
          status: "Paid",
          stock: "18 / 33",
          avatar: "https://avatars1.githubusercontent.com/u/10262924?s=400&u=9f601b344d597ed76581e3a6a10f3c149cb5f6dc&v=4",
          product_name: "Action Figure",
          total: "$208,00",
          date: "19 Sept 2020",
          code: "JKL345",
          prod_img: require("src/assets/action.jpg")
        }
      ],
      sales_column: [
        {
          name: "Products",
          label: "Products",
          field: "Products",
          sortable: true,
          align: "left"
        },
        { name: "Name", label: "Buyer", field: "name", sortable: true, align: "left" },
        {
          name: "Total",
          label: "Total",
          field: "total",
          sortable: true,
          align: "right",
          classes: "text-bold"
        },
        {
          name: "Status",
          label: "Status",
          field: "status",
          sortable: true,
          align: "left",
          classes: "text-bold"
        },
        { name: "Stock", label: "Stock", field: "task", sortable: true, align: "left" }
      ]
    };
  },
  methods: {
    getColor(val) {
      if (val > 70 && val <= 100) {
        return "green";
      } else if (val > 50 && val <= 70) {
        return "blue";
      }
      return "red";
    },
    getChipColor(status) {
      if (status == "Canceled") {
        return "negative";
      } else if (status == "Sent") {
        return "positive";
      } else if (status == "Pending") {
        return "warning";
      } else if (status == "Paid") {
        return "info";
      } else {
        return "dark";
      }
    }
  }
};
</script>

<style scoped></style>
