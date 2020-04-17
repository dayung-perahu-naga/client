<template>
  <div>
    <audio id="audio" controls loop hidden>
      <source src="../assets/genderang.wav" type="audio/wav">
    </audio>
    <div class="container" style="margin:0;padding:0">
      <div class="row">
        <a @click="logout()"><i class="fas fa-power-off fa-2x logout"></i></a>
        <div>
          <div class="bg">
          <img @click="move()" class="stick" src="../assets/gamepad.png" alt="playgame">
            <img class="board1" src="../assets/nagamerah.png" :style="`left:${leftBoard1}%`" />
            <img class="board2" src="../assets/nagaijo.png" :style="`left:${leftBoard2}%`" />
          </div>
        </div>
        <div>
          <div class="w3-container">
            <h2>Players</h2>
            <ul class="w3-ul w3-card-4">
              <li class="w3-bar w3-bar-1">
                <img src="../assets/user1.png" class="w3-bar-item w3-circle w3-hide-small" style="width:85px">
                <div class="w3-bar-item mt-2">
                  <span>{{playerName}}</span>
                </div>
              </li>
              <li class="w3-bar w3-bar-2">
                <img src="../assets/user2.png" class="w3-bar-item w3-circle w3-hide-small" style="width:85px">
                <div class="w3-bar-item mt-2">
                  <span v-if="otherPlayer===''">Waiting player. .</span>
                  <span>{{otherPlayer}}</span>
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
    // this.socket = io('https://perahudayung.herokuapp.com')
    this.socket = io('http://localhost:4100')
    this.socket.on('player-number', (msg) => {
      swal('WELCOME', msg)
    })
    this.socket.on('player-connect', (msg) => {
      swal('ANNOUNCEMENT', msg)
    })
  },
  mounted () {
    const audio = document.getElementById('audio')
    this.socket.emit('players', this.playerName)
    this.socket.on('playerName', players => {
      if (this.playerName === players[1]) {
        this.otherPlayer = players[0]
      } else {
        this.otherPlayer = players[1]
      }
    })
    // audio.loop = true;
    audio.play()
    this.socket.on('positions', data => {
      console.log('THIS IS RECEIVED POSITIONS')
      console.log(data)

      if (data[0]) {
        this.leftBoard1 = data[0].left
      }

      if (data[1]) {
        this.leftBoard2 = data[1].left
      }
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
    },
    logout: function () {
      this.$vToastify.prompt({
        body: 'Are you sure you want to sign out?',
        answers: { Yes: true, No: false }
      })
        .then(value => {
          if (value) {
            localStorage.clear()
            this.$router.push('/')
          }
        }).catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    ...mapState(['playerName'])
  }
}
</script>

<style scoped>
.logout {
  color: #ff2600;
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 30px;
}
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
.stick {
  position: absolute;
  top: 250px;
  right: 180px;
  width: 80px;
  cursor: pointer;
}
.board1 {
  left: 10%;
  bottom: 20px;
  height: 150px;
  width: 100px;
  z-index: 0;
  position: absolute;
}
.board2 {
  left: 10%;
  bottom: 180px;
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
  border-radius: 10px;
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
