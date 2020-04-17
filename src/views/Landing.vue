<template>
<div class="cover">
  <div id="pg-welcome">
    <carousel
    class="slide"
    :per-page="1"
    :mouse-drag="true"
    :centerMode="false"
    >
      <slide>
        <h1>Dragon Boat Racer</h1>
        <img src="../assets/carousel/slide1.png" >
      </slide>
      <slide>
        <h1>Multiplayer 2D</h1>
        <img src="../assets/carousel/slide2.png" >
      </slide>
      <slide>
        <h1>By: Wal,Max,Inggar</h1>
        <img src="../assets/carousel/slide3.png" >
      </slide>
    </carousel>
    <form id="signin-form">
      Player Name<br>
      <input type="text" v-model="playerName" required>
    </form><br>
    <b-button form="signin-form" variant="info" @click.prevent="enterGame()">LET'S PLAY</b-button>
  </div>
</div>
</template>

<script>
export default {
  name: 'LandingPage',
  data () {
    return {
      playerName: ''
    }
  },
  components: {},
  methods: {
    enterGame () {
      const payload = {
        playerName: this.playerName,
        isPlaying: true
      }
      this.$store.dispatch('playGame', payload)
    }
  }
}
</script>

<style>
  .slide {
    border-radius: 14px;
    margin-top: 20px;
    width: 461px;
  }
  .slide img {
    border-radius: 14px;
    box-shadow: #222 2px;
  }
  .cover {
    margin: 0;
    padding: 0;
    background: url("../assets/dragon_boat.svg");
    background-size: cover;
    background-position: center;
    height: 100vh;
    width: 100%;
    font-weight: bolder;
  }
  #pg-welcome {
    height: 100%;
    backdrop-filter: blur(5px);
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
  }
  #pg-welcome input {
    width: 300px;
    height: 35px;
    font-size: 25px;
    backdrop-filter: blur(5px);
    background: #222;
    background: linear-gradient(#918c8c, #222);
    border: 1px solid #444;
    border-radius: 5px;
    box-shadow: 0 2px 0 #000;
    color: #ffffff;
    display: block;
    font-family: "Cabin", helvetica, arial, sans-serif;
    color: #ffffff;
    animation: box-glow 1s ease-out infinite alternate;
    box-shadow: 0 0 5px rgba(4, 255, 255, 0.2), inset 0 0 5px rgba(0, 255, 253, 0.1), 0 2px 0 #000;
  }

</style>
