<template>
  <div>
  <q-card>
    <q-card-section class="q-pa-none">
      <q-table :data="data"
               :columns="columns"
               :pagination.sync="pagination">
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="image" size="md" @click="image = props.row.image,card = true" flat dense/>
            <q-btn icon="check" size="md" color="red" class="q-ml-sm" v-if="props.row.Result === 'unhandled'" @click = "props.row.Result = 'handled'" flat dense/>
            <q-btn icon="cancel" size="md" class="q-ml-sm" v-if="props.row.Result === 'handled'" @click = "props.row.Result = 'unhandled'" flat dense/>

          </q-td>
        </template>
      </q-table>

    </q-card-section>

  </q-card>

    <q-dialog v-model="card">
      <q-card class="my-card">
        <q-img :src="image" style="width: 600px"/>  <!--变量无法访问    -->

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

        </q-card-section>
<!--
        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">
            $・Italian, Cafe
          </div>
          <div class="text-caption text-grey">
            Small plates, salads & sandwiches in an intimate setting.
          </div>
        </q-card-section>
-->

        <q-separator />

        <q-card-actions align="right">
          <!--
          <q-btn v-close-popup flat color="primary" label="Reserve" />
          <q-btn v-close-popup flat color="primary" round icon="event" />
          -->
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>

</template>

<script>

export default {
  name: "TableActions",
  data() {
    return {
      pagination: {
        sortBy: 'Time',
        descending: true,
        rowsPerPage: 40
        // rowsNumber: xx if getting data from a server
      },
      card: false,

      slide: 1,
      lorem: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!',

      stars: 3,

      foptions: [
        {
          label: 'unhandled',
          value: false,
          color: 'positive',
          keepColor: true
        },
        {
          label: 'handled',
          value: false,
          color: 'negative',
          keepColor: true
        }
      ],

      data: [],
      image: '',

      columns: [
       // {name: 'Id', label: 'Id', field: 'id', sortable: true, align: 'center'},
        {name: 'Time', label: 'Time', field: 'Time', sortable: true, align: 'center'},
        {name: 'Camera_number', label: 'Camera_number', field: 'Camera_number', sortable: true, align: 'center'},
        {name: 'Content', label: 'Content', field: 'Content', sortable: false, align: 'center'},
        //{name: 'Result', label: 'Result', field: 'Result', sortable: false, align: 'center',   style :"color:red"},
        {name: 'Action', label: 'Action', field: 'Action', sortable: false, align: 'center'}
      ],
    }
  },

  created(){
    this.$axios.get('http://camotion.zrp.cool:8000/get_user_log/' + sessionStorage.getItem("user_id"))
      .then( (response) => {
        //console.log(response)
        let res = response.data
        console.log(res)
        let realData = []
        for (let i=0; i < res.length; i++) {
          console.log("i:"+i);
          const elem = res[i];
          let a = {};
          a.id = elem.id;
          a.Time = elem.time;
          console.log("time:"+elem.time);
          a.Camera_number = elem.id;
          a.Content = elem.info;
          a.image = elem.images;
          //a.Result = elem.info;
          // ···
          realData.push(a);
          this.data = realData;
          console.log("this.data"+this.data)
        }
        console.log('data', this.data)
      }).catch( (error) => {
      console.log(error)
      this.$q.notify({
        type: 'negative',
        message: 'Internal error.'
      })
    })
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
