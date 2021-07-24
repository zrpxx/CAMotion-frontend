<template>

  <div>
    <video id="videoElement" controls autoplay muted width="100%" height="100%">
    </video>
    <button @click="play">播放</button>
  </div>
</template>

<script>
  import flvjs from 'flv.js'
  export default {
    data () {
      return {
        flvPlayer:null
      }
    },
    mounted() {
      if (flvjs.isSupported()) {
        var videoElement = document.getElementById('videoElement');
        this.flvPlayer = flvjs.createPlayer({
          type: 'flv',
          isLive: true,
          hasAudio: false,
          cors: true,
          url: 'http://zrp.cool:7001/live/dev_test.flv'
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

<style scoped>
  .bg-image {
      background-image: linear-gradient(30deg, #7028e4 0%, #e5b2ca 60%);
  }
</style>
