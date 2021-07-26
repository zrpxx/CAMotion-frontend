<template>
  <div>
    <q-dialog v-model="card">
      <q-card class="my-card">
        <q-img src="~assets/screenshot.jpg" style="width: 600px"/>

        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="place"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              Screenshot
            </div>
            <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
              <q-icon name="place" />
              250 ft
            </div>
          </div>

          <q-rating :max="5" size="32px" />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">
            $・Italian, Cafe
          </div>
          <div class="text-caption text-grey">
            Small plates, salads & sandwiches in an intimate setting.
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn v-close-popup flat color="primary" label="Reserve" />
          <q-btn v-close-popup flat color="primary" round icon="event" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-card>

      <q-card-section class="text-center">
        <q-avatar size="100px" class="shadow-10">
          <img :src="avatar">
        </q-avatar>
      </q-card-section>

      <q-card-section class="q-pt-none text-center ">
        <div class="text-id  text-grey-8">
          camera id: {{ id }}
        </div>
        <div class="text-h6 text-grey-8" style="color: #1e88e5">
          {{ name }}
        </div>
        <div class="text-url text-grey-8">
          url: {{ url }}
        </div>
        <div class="text-url text-grey-8">
          status: {{ working }}
        </div>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn flat round icon="search" class="bg-indigo-7 text-white" @click= "$router.push(
          {
            name: 'cam_detail',
            params: {
              url: 'http://zrp.cool:7001/live/dev_test.flv'
            }
          }
        )"/>
        <q-btn flat round icon="notifications" class="bg-info text-white" @click="card=true"/>
        <q-btn flat round icon="delete" class="bg-indigo-8 text-white" @click="deleteCam()"/>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "CardProfile",
  props: ['avatar', 'name', 'url', 'cam_id', 'working'],
  methods: {
    deleteCam(){
      this.$axios.post('http://camotion.zrp.cool:8000/delete_camera', {
        "id": sessionStorage.getItem("user_id"),
        "cid":this.cam_id
      }).then((response) => {
        console.log(response)
        let res = response.data
        if (res.status === 'Success') {
          this.$q.notify({
            type: 'positive',
            message: 'Delete Successfully!'
          })
        } else {
          //console.log(res.message)
          this.$q.notify({
            type: 'warning',
            message: res.message
          })
        }
      }).catch((error) => {
        console.log(error)
        this.$q.notify({
          type: 'negative',
          message: 'Internal error.'
        })
      })
    },


    click() {
      console.log('click')
      this.card = true
    }
  },

  data(){
    return {
      card: false,

      slide: 1,
      lorem: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!',

      stars: 3,
    }
  }
}
</script>

<style scoped>

</style>
