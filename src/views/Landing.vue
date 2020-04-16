<template>
  <div id="pg-welcome">
    <b-jumbotron class="jumbotron" header="DRAGON BOAT FESTIVAL" lead="MULTIPLAYER 2D EDITION">
    </b-jumbotron>
    <h1>Enter Name to Play Game</h1>
    <form id="signin-form">
      Name<br>
      <input type="text" v-model="playerName" required>
    </form><br>
    <b-button form="signin-form" variant="success" @click.prevent="enterGame()">LET'S PLAY</b-button>
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
  #pg-welcome {
    text-align: center;
    justify-content: center;
    font-family: Arial, Helvetica, sans-serif;
  }
  .jumbotron {
    background: url("../assets/lomba_praunaga.jpg") no-repeat center center;
    width: 100%;
    height: 100%;
    color: seagreen;
    font-weight: bolder;
  }
</style>