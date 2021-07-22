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
            <q-btn icon="image" size="sm" flat dense/>
            <q-btn icon="check" size="sm" class="q-ml-sm" v-if="props.row.Result === 'unhandled'" @click = "props.row.Result = 'handled'" flat dense/>
            <q-btn icon="cancel" size="sm" class="q-ml-sm" v-if="props.row.Result === 'handled'" @click = "props.row.Result = 'unhandled'" flat dense/>
          </q-td>
        </template>
      </q-table>

    </q-card-section>

  </q-card>

  </div>

</template>

<script>
export default {
  name: "TableActions",
  data() {
    return {
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
      changeResult() {
        this.data.Result = "handled";
      },
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
