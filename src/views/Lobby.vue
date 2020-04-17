<template>
  <div class="lobby py-4">
    <b-form action>
      <h1 style="color: #df0054; font-weight:bold">Hi, {{myName}}</h1>
      <b-row class="my-1 justify-content-center">
        <input
          style="width: 300px;"
          id="input-small"
          size="lg"
          placeholder="Room Name (minimal 4 character)"
          v-model="roomName"
          type="text"
          maxlength="12"
          minlength="4"
          autocomplete="off"
        />
        <b-button
          type="submit"
          @click.prevent="createRoom"
          :disabled="roomName.length <= 2 || roomName.length > 2"
        >CREATE ROOM</b-button>
      </b-row>
    </b-form>
    <div class="container mt-4 w-100" style="display: flex; flex-wrap: wrap;">
      <Room v-for="(room) in roomList" :key="room.id" :room="room" />
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
// import { mapState, mapMutations } from 'vuex'
// import Room from '../components/Room.vue'
export default {
  beforeRouteEnter (to, from, next) {
    if (localStorage.getItem('playerName')) {
      next()
    } else {
      next(false)
    }
  },
  name: 'lobby',
  components: {
    // Room
  },
  data () {
    return {
      roomName: '',
      roomList: [],
      audio: null
    }
  },
  computed: {
    // ...mapState(['socket', 'playerName'])
  },
  watch: {},
  created () {
    if (this.socket === null) {
      const socket = io('http://localhost:4100')
      this.SET_SOCKET(socket)
    }

    this.$store.commit('RESET_STATE')
    this.listenOnSocketEvent()
    this.listRoom()
  },
  mounted () {},
  methods: {
    listRoom () {
      this.socket.emit('get-rooms')
    },
    createRoom () {
      const payload = {
        name: this.roomName,
        creator: this.playerName,
        isPlaying: true
      }
      this.socket.emit('create-room', payload)
    },
    listenOnSocketEvent () {
      this.socket.on('get-rooms', (rooms) => {
        this.roomList = rooms
      })
      this.socket.on('room-created', (room) => {
        this.roomList.push(room)
      })
      //   this.socket.on('show-error', (message) => {
      //      this.$myswal.showError(message)
      //   })
      this.socket.on('get-in-to-room', (room) => {
        room.isCreator && this.$store.commit('SET_ISCREATOR', true)
        this.$store.commit('SET_PLAYERKEY', room.playerKey)
        this.$store.commit('SET_ROOM', room.name)
        this.$store.commit('SET_OTR_PLAYERS', room.players)
        this.$store.commit('SET_PLAYERSCORE', 0)
        this.$router.push('/play')
      })
      this.socket.on('update-client-room', () => {
        this.socket.emit('get-rooms')
      })
    }
  },
  destoyed () {
    this.socket.off('get-rooms')
    this.socket.off('room-created')
    this.socket.off('get-in-to-room')
    this.audio.pause()
  }
}
</script>

<style>
.lobby {
  background: url("https://images.unsplash.com/photo-1474926136673-20f4d627b833?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  font-family: "Pacifico", cursive;
  font-family: "Special Elite", cursive;
}
.lets-play {
  width: 300px;
  font-size: 40px;
}
h3 {
  font-size: 40px;
  color: #df0054;
}
</style>
