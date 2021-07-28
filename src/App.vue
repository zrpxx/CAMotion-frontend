<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
import VueClipboard  from 'vue-clipboard2'

Vue.use(VueClipboard)

export default {
  name: 'App'
}
</script>
