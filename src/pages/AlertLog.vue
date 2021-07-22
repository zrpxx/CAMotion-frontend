<template>
  <div>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-grey-8">
        Alert Log
        <!--
        <q-btn label="Export" class="float-right text-capitalize text-indigo-8 shadow-3" icon="person"/>
        -->
        <br>
        <q-toggle
          v-for="(option, index) in foptions"
          :key="index"
          v-model="option.value"
          :label="option.label"
          :color="option.color"
          :keep-color="option.keepColor"
          @input="toggleFilter(index)"
        ></q-toggle>

      </div>

      <div>
        <q-btn label="reset filter" color="primary" @click="resetFilter"></q-btn>
      </div>
    </q-card-section>

    <q-card-section class="q-pa-none">
      <q-table :data="data"
               :columns="columns" hide-bottom
               :filter="filter"
               :filter-method="myfilterMethod">

        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <q-item style="max-width: 420px">
              <q-item-section avatar>
                <q-avatar>
                  <img :src="props.row.avatar">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ props.row.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="image" size="md" @click="card = true" flat dense/>
            <q-btn icon="check" size="md" color="red" class="q-ml-sm" v-if="props.row.Result === 'unhandled'" @click = "props.row.Result = 'handled'" flat dense/>
            <q-btn icon="cancel" size="md" class="q-ml-sm" v-if="props.row.Result === 'handled'" @click = "props.row.Result = 'unhandled'" flat dense/>

          </q-td>
        </template>
      </q-table>

    </q-card-section>

  </q-card>

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

          <q-rating v-model="stars" :max="5" size="32px" />
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
  </div>

</template>

<script>

export default {
  setup () {
    return {
      carousel: ref(false),
      card: ref(false),
      sliders: ref(false),

      slide: ref(1),
      lorem: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!',

      stars: ref(3),

      slideVol: ref(39),
      slideAlarm: ref(56),
      slideVibration: ref(63)
    }
  },
  name: "TableActions",
  data() {
    return {
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

      data: [
        {
          Time: '15/3/2021',
          Camera_number: '#1',
          Content: "zdd大傻子",
          Result: "handled"
        },
        {
          Time: '15/4/2020',
          Camera_number: '#1',
          Content: "xxx",
          Result: "unhandled"
        },
        {
          Time: '15/3/2020',
          Camera_number: '#1',
          Content: "zdd大傻子",
          Result: "handled"
        },
        {
          Time: '15/3/2020',
          Camera_number: '#1',
          Content: "zdd大傻子",
          Result: "unhandled"
        },
        {
          Time: '15/3/2020',
          Camera_number: '#1',
          Content: "zdd大傻子",
          Result: "unhandled"
        },
      ],
      columns: [
        {name: 'Time', label: 'Time', field: 'Time', sortable: true, align: 'center'},
        {name: 'Camera_number', label: 'Camera_number', field: 'Camera_number', sortable: true, align: 'center'},
        {name: 'Content', label: 'Content', field: 'Content', sortable: false, align: 'center'},
        {name: 'Result', label: 'Result', field: 'Result', sortable: false, align: 'center'},
        {name: 'Action', label: '操作', field: 'Action', sortable: false, align: 'center'}
      ],
      filter: {value: 'none'},
    }
  },

    methods:
    {


      toggleFilter(index)
      {
        if (index === 0 && this.foptions[0].value) {
          this.foptions[1].value = false
          this.filter.value = 'unhandled'
          return
        } else {
          this.filter.value = 'none'
        }

        if (index === 1 && this.foptions[1].value) {
          this.foptions[0].value = false
          this.filter.value = 'handled'
          return
        } else {
          this.filter.value = 'none'
        }
      },
      resetFilter()
      {
        this.foptions.forEach(option => option.value = false)
        this.filter.value = 'none'
      },
      myfilterMethod()
      {
        if (this.data.length > 2) {
          if (this.filter.value === 'unhandled') {
            return this.data.filter(row => (row.Result === 'unhandled'))
          }
          if (this.filter.value === 'handled') {
            return this.data.filter(row => (row.Result === 'handled'))
          }
          return this.data
        }
      }
    }
}
</script>

<style scoped>

</style>
