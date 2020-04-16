<template>
  <div>
    <!-- <audio controls autoplay loop hidden>
      <source src=".././assets/ck.mp3" type="audio/wav">
    </audio>-->
    <audio id="audio" hidden>
      <source src=".././assets/genderang.wav" type="audio/wav" />
    </audio>
    <div class="container" style="margin:0;padding:0">
      <div class="row">
        <div class="col-sm-8">
          <div class="bg">
            <img class="prau1" src=".././assets/nagamerah.png" :style="`right:${rightPrau1}%`" />
            <img class="prau2" src=".././assets/nagaijo.png" :style="`right:${rightPrau2}%`" />
            <button class="btn btn-danger console" @click="move()">MOVE</button>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="w3-container ml-5">
            <h2>Players</h2>
            <ul class="w3-ul w3-card-4">
              <li class="w3-bar w3-bar-1">
                <img
                  src="https://www.w3schools.com/w3css/img_avatar2.png"
                  class="w3-bar-item w3-circle w3-hide-small"
                  style="width:85px"
                />
                <div class="w3-bar-item mt-2">
                  <span>{{playerName}}</span>
                </div>
              </li>
              <li class="w3-bar w3-bar-2">
                <img
                  src="https://www.w3schools.com/w3css/img_avatar5.png"
                  class="w3-bar-item w3-circle w3-hide-small"
                  style="width:85px"
                />
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
import io from "socket.io-client";
import { mapState } from "vuex";
import swal from "sweetalert";
export default {
  name: "Game",
  data() {
    return {
      id: "",
      winner: false,
      winnerName: "",
      rightPrau1: 80,
      rightPrau2: 80,
      otherPlayer: ""
    };
  },
  created() {
    // this.socket = io('https://jsracerdynamicfox.herokuapp.com')
    this.socket = io("https://localhost:4100");
    const audio = document.getElementById("audio");
    audio.loop = true;
    audio.play();
  },
  mounted() {
    this.socket.on("positions", data => {
      this.rightPrau1 = data[0].right;
      this.rightPrau2 = data[1].right;
    });
    this.socket.on("winner", data => {
      if (data) {
        this.winner = true;
        this.winnerName = data;
        if (this.winnerName === this.playerName) {
          swal("CONGRATULATION", "" + this.winnerName + " You Win the Game !");
        } else {
          swal(
            "SORRY",
            " You Lost the Game ! the Winner is " + this.winnerName
          );
        }
        localStorage.clear();
        this.$router.push("/");
      }
    });
  },
  methods: {
    move() {
      if (!this.winner) {
        const payload = {
          id: this.socket.id,
          name: this.playerName
        };
        this.socket.emit("move", payload);
        this.dice = 0;
      }
    }
  },
  computed: {
    ...mapState(["playerName"])
  }
};
</script>

<style>
.swal-text {
  font-weight: bold;
}
.w3-bar-1 {
  position: relative;
  animation: myfirst 1s 1;
  animation-direction: normal;
  /* top: 77px; */
}
/* .w3-bar-1{
  -webkit-transition: 3s;
  -moz-transition: 3s;
  -ms-transition: 3s;
  -o-transition: 3s;
  transition: 3s;
  top: 77px;
} */
/* @keyframes myfirst {
  0%   {background: red; left: 0px; top: 0px;}
  100%  {background: green; left: 0px; top: 77px;}
} */
.w3-bar-2 {
  position: relative;
  animation: myfirst2 1s 1;
  animation-direction: normal;
  /* top:-77px */
}
/* @keyframes myfirst2 {
  0%   {background: red; left: 0px; top: 0px;}
  100%  {background: green; left: 0px; top: -77px;}
} */
/* .w3-bar-2{
  -webkit-transition: 3s;
  -moz-transition: 3s;
  -ms-transition: 3s;
  -o-transition: 3s;
  transition: 3s;
  top: -77px;
} */
.console {
  border-radius: 50%;
  position: absolute;
  top: 82%;
  left: 45%;
  height: 75px;
}
.bg {
  background: url("../src/il_mare.png");
  background-position: 50%;
  height: 80vh;
  width: 100vw;
}
.prau1 {
  top: 33%;
  left: 20%;
  height: 120px;
  width: 80px;
  z-index: 0;
  position: absolute;
}
.prau2 {
  top: 66%;
  left: 20%;
  height: 120px;
  width: 80px;
  z-index: 0;
  position: absolute;
}
.w3 {
  width: 400px;
}
.w3-container,
.w3-panel {
  padding: 0.01em 16px;
}
.w3-card-4,
.w3-hover-shadow:hover {
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 4px 20px 0 rgba(0, 0, 0, 0.19);
  width: 40vw;
}
.w3-ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.w3-ul li {
  padding: 8px 16px;
  border-bottom: 1px solid #ddd;
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
  outline: 0;
}
.w3-white,
.w3-hover-white:hover {
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