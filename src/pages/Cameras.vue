<template>
  <q-card>
    <q-card-section>

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

      <div class="text-h6 text-grey-8">
        Cameras
      </div>
    </q-card-section>
    <q-separator/>
    <q-card-section class="q-pa-none">
      <q-table grid :data="data" :columns="columns" hide-bottom>
        <template v-slot:top-right>
          <q-btn side label="Add camera" @click="card=true" icon="add_to_photos" color="primary"></q-btn>

          <q-btn side label="Delete all"  icon="clear_all" color="primary" style="margin-left:10px;"></q-btn>
        </template>
        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <card-profile :avatar="props.row.avatar" :name="props.row.name" :url="props.row.url" :cam_id="props.row.id" :working="props.working">
            </card-profile>
          </div>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
import CardProfile from "components/cards/CardCamera.vue";
export default {
  name: "TableCustomGrid",
  components: {CardProfile},
  data() {
    return {
      columns: [
        {name: 'Id', label: 'Name', field: 'Id', sortable: true, align: 'left'},
        {name: 'Name', label: 'Crated Date', field: 'Name', sortable: true, align: 'left'},
        {name: 'Url', label: 'Project', field: 'Url', sortable: true, align: 'left'},
        {name: 'working', label: '', field: 'Working', sortable: false, align: 'center'}
      ],
      data: [
        {
          Id: 'Pratik Patel',
          Name: '15/3/2020',
          Url: 'Quasar Admin',
          working: 80,
          avatar: 'https://avatars3.githubusercontent.com/u/34883558?s=400&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4',
        }
      ],
      card: false,

      slide: 1,
      lorem: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!',

      stars: 3,
    }
  },
  methods: {
    deleteCam(id){
      return ;
    }
  },
  created(){
      this.$axios.get('http://camotion.zrp.cool:8000/cameras/' + sessionStorage.getItem("user_id"))
        .then( (response) => {
        console.log(response)
        let res = response.data
        this.data = res
      }).catch( (error) => {
        console.log(error)
        this.$q.notify({
          type: 'negative',
          message: 'Internal error.'
        })
      })
    }
}
</script>

<style scoped>

</style>
