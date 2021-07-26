<template>

  <div>
    <video id="videoElement" controls autoplay muted width="100%" height="100%">
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
        });
        this.flvPlayer.attachMediaElement(videoElement);
        this.flvPlayer.load();
        this.flvPlayer.play();
      }
    },
    methods:{
      play () {
        this.flvPlayer.play();
      }
    }
  }
</script>
