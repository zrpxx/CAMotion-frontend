<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          CAMotion
        </q-toolbar-title>

        <div>Made with ❤️ by 张丹丹 张濡芃 杨璐歌 刘慧杰 熊师意 罗宝泉</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="300"
      :breakpoint="600"
      bordered
      content-class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-list>

          <q-item clickable v-ripple to="/home" exact>
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section>
            Home
            </q-item-section>
          </q-item>

          <q-item v-if="!is_admin" clickable v-ripple to="/cam" exact>
            <q-item-section avatar>
              <q-icon name="camera" />
            </q-item-section>
            <q-item-section>
             Cameras
            </q-item-section>
          </q-item>

          <q-item v-if="!is_admin" clickable v-ripple to="/alert_log" exact>
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>
            <q-item-section>
              Alert logs
            </q-item-section>
          </q-item>


          <q-item v-if="is_admin" clickable v-ripple to="/admin" exact>
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>
            <q-item-section>
              Administration
            </q-item-section>
          </q-item>

            <q-item clickable v-ripple @click="logout()">
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>
              <q-item-section>
                Logout
              </q-item-section>
            </q-item>

        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',

  data () {
    return {
      websocket: null,
      ws_connected: false,
      ws_timer: null,
      leftDrawerOpen: false,
      menuList: [
        {
          icon: 'home',
          label: 'Home',
          to: '/home',
        },
        {
          icon: 'camera',
          label: 'Cameras',
          to: '/cam',
        },
        {
          icon: 'list',
          label: 'Alert logs',
          to: '/alert_log',
        }
      ],
      is_admin: false
    }
  },
  created() {
    setInterval(this.judge_admin, 1000);
    this.ws_timer = setInterval(this.conn_ws, 1000)
  },
  methods: {
    logout() {
      sessionStorage.removeItem('user_id')
      sessionStorage.removeItem('is_admin')
      sessionStorage.removeItem('VIP')
      if(this.ws_connected) {
        this.websocket.close()
        this.ws_connected = false
        this.ws_timer = setInterval(this.conn_ws, 1000)
      }
      this.$router.push('/')
    },
    judge_admin() {
      if(sessionStorage.getItem('is_admin') === 'true') {
        this.is_admin = true
      } else
        this.is_admin = false
    },



    conn_ws() {
      if(sessionStorage.getItem('user_id') !== undefined && sessionStorage.getItem('user_id') !== null) {
        if(!this.ws_connected) {
          this.websocket = new WebSocket('ws://zrp.cool:8000/ws_user/' + sessionStorage.getItem('user_id'))
          this.websocket.onopen = this.open_ws
          this.websocket.onclose = this.close_ws
          this.websocket.onmessage = this.message_ws
        }
      }
    },
    open_ws() {
      console.log("ws opened")
      this.ws_connected = true
      clearInterval(this.ws_timer)
    },
    close_ws() {
      console.log("ws disconnected")
      //this.ws_connected = false
      //this.ws_timer = setInterval(this.conn_ws, 1000)
    },
    message_ws(e) {
      console.log((e.data))
      let msg = e.data
      let notify = {}
      switch (msg) {
        /*case 'welcome':
          notify = {
            type: 'positive',
            message: 'Connection established.'
          }
          break;*/
        case 'working':
          notify = {
            type: 'positive',
            message: 'New camera online!',
            actions: [
              { label: 'Check it out', color: 'white', handler: () => {
                  if(this.$route.path !== '/cam')
                    this.$router.push('/cam')
                  else
                    this.$router.go(0)
                }
              }
            ]
          }
          break;
        case 'not_working':
          notify = {
            type: 'negative',
            message: 'Camera offline!',
            actions: [
              { label: 'Check it out', color: 'white', handler: () => {
                  if(this.$route.path !== '/cam')
                    this.$router.push('/cam')
                  else
                    this.$router.go(0)
                }
              }
            ]
          }
          break;
        case 'New alert':
          notify = {
            type: 'negative',
            message: 'Alert triggered!',
            actions: [
              { label: 'Check it out', color: 'white', handler: () => {
                  if(this.$route.path !== '/alert_log')
                    this.$router.push('/alert_log')
                  else
                    this.$router.go(0)
                }
              }
            ]
          }
          break;
        default:
          notify = {}
      }
      if(notify.message) {
        this.$q.notify(notify)
      }
    }
  }
}
</script>
