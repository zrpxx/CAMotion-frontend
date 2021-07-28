<template>

  <div>
    <video id="videoElement" autoplay muted width="100%" height="100%">
    </video>
  </div>
</template>

<script>
  import flvjs from 'flv.js'
  export default {
    data () {
      return {
        flvPlayer:null,
        flv_url: ''
      }
    },
    mounted() {
      if(this.$route.params.url !== undefined)
      {
        this.flv_url = this.$route.params.url
        console.log(this.flv_url)
      }
      if (flvjs.isSupported()) {
        var videoElement = document.getElementById('videoElement');
        this.flvPlayer = flvjs.createPlayer({
          type: 'flv',
          isLive: true,
          hasAudio: false,
          cors: true,
          url: this.flv_url
        },
          {
            enableStashBuffer: false
          }
        );
        this.flvPlayer.attachMediaElement(videoElement);
        this.flvPlayer.load();
        this.flvPlayer.play();
      }
    },

    created() {
      setInterval(() => {
        if (!this.flvPlayer.buffered.length) {
          return;
        }
        let end = this.flvPlayer.buffered.end(0);
        let diff = end - this.flvPlayer.currentTime;
        if (diff >= 1.5) {
          this.flvPlayer.currentTime = end;
        }
      }, 3000);
    },

    methods:{
    }
  }
</script>
