<template>
<div class="cover">
  <div id="pg-welcome">
    <b-jumbotron class="jumbotron" header="Dragon Boat Racer" lead="MULTIPLAYER 2D EDITION">
    </b-jumbotron>
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
  .jumbotron {
    background-image: url(.././assets/logo.svg);
    background-size: cover;
    background-position: center;
    width: 70%;
    height: auto;
    margin-top: 20px;
    color: #000000;
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
