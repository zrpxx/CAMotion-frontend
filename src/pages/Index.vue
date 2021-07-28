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
            <q-btn class="text-capitalize" color = "primary" v-if="user_role === 'User'" @click="buy_vip()"> 购买会员 </q-btn>
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
            <q-btn class="text-capitalize" @click = "change_password()" > Change Password </q-btn>
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
            <q-btn class="text-capitalize" @click="jude_email()">Save settings</q-btn>

            <q-dialog v-model="prompt" persistent>
              <q-card style="min-width: 350px">
                <q-card-section>
                  <div class="text-h6">Your e-mail address</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <q-input dense v-model="address" autofocus @keyup.enter="prompt = false" />
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                  <q-btn flat label="Cancel" v-close-popup />
                  <q-btn flat label="Add address" @click="post_settings()" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>

          </q-card-actions>
        </q-card>


        <div  class="q-mx-auto q-my-xl" style="width: 100%">
        <q-card  v-if="user_role !== 'Admin'"  >
          <q-card-section >
            <div class="text-h6">用户反馈</div>
          </q-card-section>
            <div class="q-pa-md" style="max-width: 1000px;max-height: 500px">
              <q-input
                v-model="reportText"
                filled
                type="textarea"
              />
            </div>


          <q-card-actions align="center">
            <q-btn class="text-capitalize" @click = "user_suggestion()" > 提交 </q-btn>
          </q-card-actions>

        </q-card>
        </div>

      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "UserProfile",
  data() {
    return {


        alert: false,
        confirm: false,
        prompt: false,

        address: '',



      username: 'A1',
      user_role: 'Vip',
      reportText: '',
      warning_option: [
        'web',
        'e-mail'
      ],
      warning_options: [
        {
          label: '网页通知',
          value: '',
          disable: true
        },
        {
          label: '电子邮件',
          value: ''
        },
      ],
      user_details: {},
      password_dict: {
        new_password: '',
        cur_password: '',
        con_new_password: ''
      }
    }
  },
  created() {
    if(sessionStorage.getItem('user_id') === undefined || sessionStorage.getItem('user_id') === null)
    {
      this.$router.push('/')
    }
    let user_id = sessionStorage.getItem('user_id')
    this.$axios.get('http://camotion.zrp.cool:8000/user/' + user_id).then(
      (response) => {
        console.log(response)
        let res = response.data
        if(res.status === 'Success') {
          this.username = res.name
          var notify = res.notify
          if(notify >= 1)
            this.warning_options[1].value = 'e-mail'
          if(notify%2 === 1)
          {
            this.warning_options[0].value = 'web'
          }

          switch (res.role) {
            case 0:
              this.user_role = 'User'
              break;
            case 1:
              this.user_role = 'VIP'
              break;
            case 100:
              sessionStorage.setItem('is_admin', "true")
              this.user_role = 'Admin'
              break;
            default:
              this.user_role = ''
              break;
            }
          } else {
          this.$q.notify({
            type: 'negative',
            message: 'Internal error.'
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
  ,
  methods: {
   // if(this.sessionStorage.getItem('user_id')===)

    jude_email(){
      //console.log('judge_email')
      var notify = 0;
      console.log(this.warning_option)
      var a=this.warning_option.indexOf('e-mail');
      if(a !== -1) {
        this.prompt = true
        notify = 2;
      }
      a=this.warning_option.indexOf('web');
      console.log('a'+a)
      if(a !== -1) {
        notify += 1;
      }
      console.log(notify)
      if(this.warning_option.length===0){
        this.$q.notify({
          type: 'warning',
          message: '选项不能为空'
        })
        this.warning_option=['web']
      }
      if(notify === 1)
      {
        this.$axios.post('http://camotion.zrp.cool:8000/set_user_setting', {
          "user_id": sessionStorage.getItem("user_id"),
          "notify":notify,
          "email": '',

        }).then((response) => {
          //console.log('address'+this.address)
          console.log(response)
          let res = response.data
          if (res.status === 'Success') {

            this.$q.notify({
              type: 'positive',
              message: 'Send Successfully!'
            })
            this.reportText = ""

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
      }

    },

    post_settings() {
      console.log('post_settings')
      var notify = 0;
      var a=this.warning_option.indexOf('e-mail');
      if(a !== -1){
        this.prompt=true
        notify = 2;

        var pattern= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        var strEmail=pattern.test(this.address);
        if (!strEmail)
        {
          this.$q.notify({
            type: 'warning',
            message: '请输入正确的邮箱地址！'
          })
          return
        }
      }
      a=this.warning_option.indexOf('web');
      if(a !== -1) {
        notify += 1;
      }

      console.log('notify')


      this.$axios.post('http://camotion.zrp.cool:8000/set_user_setting', {
        "user_id": sessionStorage.getItem("user_id"),
        "notify":notify,
        "email": this.address,

      }).then((response) => {
        //console.log('address'+this.address)
        console.log(response)
        let res = response.data
        if (res.status === 'Success') {

          this.$q.notify({
            type: 'positive',
            message: 'Send Successfully!'
          })
          this.reportText = ""

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

    user_suggestion(){
      if(this.reportText!=="") {
        console.log(this.reportText)
        this.$axios.post('http://camotion.zrp.cool:8000/create_report', {
          "user_id": sessionStorage.getItem("user_id"),
          "info": this.reportText
        }).then((response) => {
          console.log(response)
          let res = response.data
          if (res.status === 'Success') {

            this.$q.notify({
              type: 'positive',
              message: 'Send Successfully!'
            })
            this.reportText = ""

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
          message: "发送内容不能为空白"
        })
      }
    },

    change_password() {
      if(this.password_dict.new_password===this.password_dict.con_new_password) {
        this.$axios.post('http://camotion.zrp.cool:8000/modify_password', {
          'username': this.username,
          'password': this.password_dict.cur_password,
          'new_password': this.password_dict.new_password
        }).then((response) => {
          console.log(response)
          let res = response.data
          if (res.status === 'Success') {
            this.$q.notify({
              type: 'positive',
              message: '修改成功'
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
      }else{
        this.$q.notify({
          type: 'warning',
          message: '前后输入的密码不一致.'
        })
      }
    },
    change_alert() {

    },
    buy_vip(){
    this.$axios.post('http://camotion.zrp.cool:8000/buy_vip/?user_id='+sessionStorage.getItem("user_id"), {
      'user_id': sessionStorage.getItem("user_id")
    }).then( (response) => {
      console.log(response)
      let res = response.data
      if(res.status === 'Success') {
        this.user_role = (res.role==='1')? 'Vip':'User'
      } else {
        //console.log(res.message)
        this.$q.notify({
          type: 'warning',
          message: res.status
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

<style>

</style>
