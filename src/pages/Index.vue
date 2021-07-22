<template>
  <q-page class="text-justify q-pa-sm" style="flex-direction: column">
    <div class="row q-col-gutter-sm">
      <div class="q-mx-auto q-my-xl" style="width: 80%">
        <q-card>
          <q-card-section class="text-center bg-transparent">
            <q-avatar size="100px" class="shadow-10">
              <img src="~assets/profile.svg">
            </q-avatar>
            <div class="text-subtitle1 q-mt-lg">Welcome!</div>
            <div class="text-h3 q-mt-md"> {{ username }}
              <q-badge align="top" >{{user_role}}</q-badge>
            </div>

          </q-card-section>
          <q-card-section class="text-center">
            <q-btn class="text-capitalize" color = "primary" v-if="user_role === 'User'" @click="user_role = 'vip'"> 购买会员 </q-btn>
            <q-btn class="text-capitalize" color = "primary" v-else @click="user_role = 'User'"> 取消会员 </q-btn>
          </q-card-section>
        </q-card>
      </div>
      <div class="q-mx-auto q-my-xl" style="width: 80%">
        <q-card>
          <q-card-section class="text-h6 q-pa-sm">
            <div class="text-h6">Change Password</div>
          </q-card-section>
          <q-card-section class="q-pa-sm row">
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section>
                Current Password
              </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input type="password"  dense outlined  round v-model="password_dict.cur_password"
                         label="Current Password"/>
              </q-item-section>
            </q-item>
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section>
                New Password
              </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input type="password"  dense outlined  round v-model="password_dict.new_password"
                         label="New Password"/>
              </q-item-section>
            </q-item>
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section>
                Confirm New Password
              </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input type="password"  dense outlined round  v-model="password_dict.con_new_password"
                         label="Confirm New Password"/>
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn class="text-capitalize" @click = "change_password()"> Change Password </q-btn>
          </q-card-actions>

        </q-card>
      </div>
      <div class="q-mx-auto q-my-xl" style="width: 80%">
        <q-card>
          <q-card-section class="text-h6 q-pa-sm">
            <div class="text-h6">Settings</div>
          </q-card-section>
          <q-card-section class="q-pa-sm row">
            报警通知设置
            <q-option-group
              v-model="warning_option"
              :options="warning_options"
              color="green"
              type="checkbox"
            />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn class="text-capitalize">Save settings</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "UserProfile",
  data() {
    return {
      username: 'A1',
      user_role: 'Vip',
      warning_option: [
        'web',
        'e-mail'
      ],
      warning_options: [
        {
          label: '网页通知',
          value: 'web'
        },
        {
          label: '电子邮件',
          value: 'e-mail'
        },
        {
          label: '短信',
          value: 'sms'
        }
      ],
      user_details: {},
      password_dict: {
        new_password: '',
        cur_password: '',
        con_new_password: ''
      }
    }
  },
  methods: {
    change_password() {
      //后端判断cur_password对不对
      if (this.password_dict.new_password !== "" &&
        this.password_dict.new_password === this.password_dict.con_new_password) {
        //<!-- 后端修改 -->
        this.$q.notify({
          type: 'positive',
          message: '修改成功'
        })
      }
    },
    change_alert() {

    },

    /*
    register_vip() {
      if(this.user_role === "User")
        return "register vip"
      else
        return "vip renewal"
    }
    */
  }
}
</script>

<style>

</style>
