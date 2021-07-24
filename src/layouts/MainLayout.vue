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
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
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
    this.timer = setInterval(this.judge_admin, 1000);
  },
  methods: {
    logout() {
      sessionStorage.removeItem('user_id')
      sessionStorage.removeItem('is_admin')
      this.$router.push('/')
    },
    judge_admin() {
      if(sessionStorage.getItem('is_admin') === 'true') {
        this.is_admin = true
      } else
        this.is_admin = false
    }
  }
}
</script>
