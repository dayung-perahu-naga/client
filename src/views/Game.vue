<template>
  <div>
    <audio id="audio" controls loop hidden>
      <source src="../assets/genderang.wav" type="audio/wav">
    </audio>
    <div class="container" style="margin:0;padding:0">
      <div class="row">
        <div>
          <div class="bg">
          <button class="btn btn-danger console"  @click="move()">MOVE</button>
            <img class="board1" src="../assets/nagamerah.png" :style="`left:${leftBoard1}%`" />
            <img class="board2" src="../assets/nagaijo.png" :style="`left:${leftBoard2}%`" />
          </div>
        </div>
        <div>
          <div class="w3-container">
            <h2>Players</h2>
            <ul class="w3-ul w3-card-4">
              <li class="w3-bar w3-bar-1">
                <img src="https://www.w3schools.com/w3css/img_avatar2.png" class="w3-bar-item w3-circle w3-hide-small" style="width:85px">
                <div class="w3-bar-item mt-2">
                  <span>{{playerName}}</span>
                </div>
              </li>
              <li class="w3-bar w3-bar-2">
                <img src="https://www.w3schools.com/w3css/img_avatar5.png" class="w3-bar-item w3-circle w3-hide-small" style="width:85px">
                <div class="w3-bar-item mt-2">
                  <span>Other Player</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapState } from 'vuex'
import swal from 'sweetalert'
export default {
  name: 'Game',
  data () {
    return {
      id: '',
      winner: false,
      winnerName: '',
      leftBoard1: 100,
      leftBoard2: 100,
      otherPlayer: ''
    }
  },
  created () {
    // this.socket = io('https://jsracerdynamicfox.herokuapp.com')
    this.socket = io('http://localhost:4100')
  },
  mounted () {
    const audio = document.getElementById('audio')
    // audio.loop = true;
    audio.play()
    this.socket.on('positions', data => {
      this.leftBoard1 = data[0].left
      this.leftBoard2 = data[1].left
    })
    this.socket.on('winner', data => {
      if (data) {
        this.winner = true
        this.winnerName = data
        if (this.winnerName === this.playerName) {
          swal('CONGRATULATION', '' + this.winnerName + ' You Win the Game !')
        } else {
          swal(
            'SORRY',
            ' You Lost the Game ! the Winner is ' + this.winnerName
          )
        }
        localStorage.clear()
        this.$router.push('/')
      }
    })
  },
  methods: {
    move () {
      if (!this.winner) {
        const payload = {
          id: this.socket.id,
          name: this.playerName
        }
        this.socket.emit('move', payload)
        this.dice = 0
      }
    }
  },
  computed: {
    ...mapState(['playerName'])
  }
}
</script>

<style scoped>
.bg {
  background: url('.././assets/high_seas.svg');
  background-position: 100%;
  background-size: cover;
  display: flex;
  height: 100vh;
  width: 100vw;
}
.swal-text {
  font-weight: bold
}
.w3-bar-1 {
  position: relative;
  animation: myfirst 1s 1;
  animation-direction: normal;
}
.w3-bar-2 {
  position: relative;
  animation: myfirst2 1s 1;
  animation-direction: normal;
}
.console {
  border-radius: 100%;
  position: absolute;
  top: 250px;
  right: 180px;
  height: 72px;
}
.board1 {
  left: 10%;
  bottom: 10px;
  height: 150px;
  width: 100px;
  z-index: 0;
  position: absolute;
}
.board2 {
  left: 10%;
  bottom: 120px;
  height: 150px;
  width: 100px;
  z-index: 0;
  position: absolute;
}
.w3 {
  width: 400px;
}
.w3-container {
  position: absolute;
  top: 10px;
  right: 40px;
}
.w3-card-4, .w3-hover-shadow:hover{
  box-shadow: 0 4px 10px 0 rgba(0,0,0,0.2),0 4px 20px 0 rgba(0,0,0,0.19);
  width: 25vw;
}
.w3-ul {
  list-style-type: none;
  padding:0;
  margin: 0;
}
.w3-ul li {
  padding:8px 16px;
  border-bottom:1px solid #ddd;
}
.w3-bar {
  width: 100%;
  overflow: hidden;
}
.w3-bar .w3-button {
  padding: 8px 16px;
  width: auto;
  border: auto;
  display: block;
  outline:0;
}
.w3-white, .w3-hover-white:hover {
  color: #000 !important;
  background-color: #fff !important;
}
.w3-circle {
  height: 60px;
}
.w3-bar .w3-bar-item {
  padding: 8px 16px;
  float: left;
  border: none;
  display: block;
  outline: 0;
}
</style>
