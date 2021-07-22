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

          <template v-for="(menuItem, index) in menuList">
            <q-item :key="index" clickable :active="menuItem.label === 'Outbox'" v-ripple :to="menuItem.to" exact>
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index"  v-if="menuItem.separator" />
          </template>

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
          to: '/home'
        },
        {
          icon: 'camera',
          label: 'Cameras',
          to: '/cam'
        },
        {
          icon: 'list',
          label: 'Alert logs',
          to: '/alert_log'
        },
        {
          icon: 'dashboard',
          label: 'Administration',
          to: '/admin'
        }
      ]
    }
  },
  methods: {
    logout() {
      sessionStorage.removeItem('user_id')
      this.$router.push('/')
    }
  }
}
</script>
