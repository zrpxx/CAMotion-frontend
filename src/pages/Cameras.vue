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
            <card-profile :avatar="props.row.avatar" :name="props.row.name" :des="props.row.des" :cam_id="props.row.id">
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
        {name: 'Name', label: 'Name', field: 'name', sortable: true, align: 'left'},
        {name: 'Crated Date', label: 'Crated Date', field: 'Crated_Date', sortable: true, align: 'left'},
        {name: 'Project', label: 'Project', field: 'Project', sortable: true, align: 'left'},
        {name: 'Action', label: '', field: 'Action', sortable: false, align: 'center'}
      ],
      data: [
        {
          id: 12,
          name: 'Pratik Patel',
          Crated_Date: '15/3/2020',
          Project: 'Quasar Admin',
          avatar: 'https://avatars3.githubusercontent.com/u/34883558?s=400&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4',
          progress: 80,
          des: 'Solutions Developer'
        },
        {
          name: 'Mayank Patel',
          Crated_Date: '10/2/2018',
          Project: 'Quasar QDraggableTree',
          avatar: 'https://avatars2.githubusercontent.com/u/27857088?s=400&u=a898efbc753d93cf4c2070a7cf3b05544b50deea&v=4',
          progress: 50,
          des: 'Solutions Developer'
        },
        {
          name: 'Mayur Patel',
          Crated_Date: '10/2/2018',
          Project: 'Quasar Shopping',
          avatar: 'https://avatars0.githubusercontent.com/u/55240045?s=400&u=cf9bffc2bd2d8e42ca6e5abf40ddd6c1a03ce2860&v=4',
          progress: 100,
          des: 'Solutions Developer'
        },
        {
          name: 'Jeff Galbraith',
          Crated_Date: '10/2/2019',
          Project: 'Quasar QMarkdown',
          avatar: 'https://avatars1.githubusercontent.com/u/10262924?s=400&u=9f601b344d597ed76581e3a6a10f3c149cb5f6dc&v=4',
          progress: 60,
          des: 'Solutions Developer'
        },
        {
          name: 'Pratik Patel',
          Crated_Date: '10/1/2020',
          Project: 'Quasar QGrid',
          avatar: 'https://avatars3.githubusercontent.com/u/34883558?s=400&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4',
          progress: 30,
          des: 'Solutions Developer'
        },
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
  }
}
</script>

<style scoped>

</style>
