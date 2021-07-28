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

            </div>

            <q-rating :max="5" size="32px" />
          </q-card-section>


          <q-separator />

        </q-card>
      </q-dialog>


      <q-dialog v-model="confirm_delete_all">
        <q-card class="text-center" style="width:30%">
          <q-card-section>
            <div class="text-h6">Alert</div>
          </q-card-section>

          <q-card-section class="q-pt-none"  >
            Are you sure you want to delete all?
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Yes" color="red" @click="delete_All()" v-close-popup />
            <q-btn flat label="No" color="primary" v-close-popup />
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
          <q-btn side label="Add camera" @click="prompt()" icon="add_to_photos" color="primary"></q-btn>

          <q-btn side label="Delete all" @click="confirm_delete_all=true" icon="clear_all" color="primary" style="margin-left:10px;"></q-btn>
        </template>
        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <card-profile :avatar="props.row.avatar" :name="props.row.name" :url="props.row.flv_url" :cam_id="props.row.id" :working="(props.row.working===1)? 'online':'offline'">
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
      new_camera_name: '',
      columns: [
        {name: 'Id', label: 'Name', field: 'id', sortable: true, align: 'left'},
        {name: 'Name', label: 'Crated Date', field: 'name', sortable: true, align: 'left'},
        {name: 'Url', label: 'Project', field: 'flv_url', sortable: true, align: 'left'},
        {name: 'working', label: '', field: 'working', sortable: false, align: 'center'}
      ],
      data: [],
      card: false,
      confirm_delete_all: false,
      slide: 1,
      lorem: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!',

      stars: 3,
    }
  },
  methods: {

    prompt () {
      this.$q.dialog({
        title: 'Add Camera',
        message: 'Input the camera name:',
        prompt: {
          model: '',
          type: 'text' // optional
        },
        cancel: true,
        persistent: true
      }).onOk(data => {
        this.create_cam(data)
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },

   create_cam(data){
      if(data!=="") {
        console.log({
          uid: sessionStorage.getItem('user_id'),
          name: data
        })
        this.$axios.post('http://camotion.zrp.cool:8000/create_camera', {
          uid: sessionStorage.getItem('user_id'),
          name: data
        }).then((response) => {
          console.log(response)
          let res = response.data
          if (res.status === 'Success') {
            this.$q.notify({
              type: 'positive',
              message: 'create Successfully!'
            })
            this.$router.go(0)
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
      }else{
        this.$q.notify({
          type: 'warning',
          message: 'The id is null'
        })
      }
   },
    delete_All(){
      this.$axios.post('http://camotion.zrp.cool:8000/delete_all_cam?delete_uid='+sessionStorage.getItem('user_id')).then((response) => {
        console.log(response)
        let res = response.data
        if (res.status === 'Success') {
          this.$q.notify({
            type: 'positive',
            message: 'Delete Successfully!'
          })
          this.$router.go(0)
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
  },
  created(){
      this.$axios.get('http://camotion.zrp.cool:8000/cameras/' + sessionStorage.getItem("user_id"))
        .then( (response) => {
        console.log(response)
        let res = response.data
        this.data = res
          console.log("data", this.data)
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
