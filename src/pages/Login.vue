<template>
  <q-layout>
    <q-page-container>
      <q-page class="fullscreen flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="~assets/profile.svg">
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                登录
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="username"
                label="用户名"
                lazy-rules
              />

              <q-input
                type="password"
                filled
                v-model="password"
                label="密码"
                lazy-rules

              />

              <div class="text-center">
                <q-btn label="登录" class="q-mx-lg" @click="login()" type="button" color="primary"/>

                <q-btn label="去注册" class="q-mx-lg" @click="$router.push('/reg')" type="button" color="purple"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
    export default {
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
          login() {
            this.$axios.post('http://camotion.zrp.cool:8000/login', {
                'username': this.username,
                'password': this.password
            }).then( (response) => {
                console.log(response)
                let res = response.data
                if(res.status === 'Success') {
                  sessionStorage.setItem('user_id', res.user_id)
                  this.$router.push('/home')
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
          }
        }
    }
</script>

<style scoped>
  .bg-image {
      background-image: linear-gradient(30deg, #7028e4 0%, #e5b2ca 60%);
  }
</style>
