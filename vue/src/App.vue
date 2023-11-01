<template>
  <router-link to="/registered" @click="isShowView = !isShowView">注册</router-link>
  <router-view v-show="isShowView"></router-view>
  <musicPlay v-show="!isShowView" ref="musicPlay" :musicUrl="sendMusicName"></musicPlay>
  <input type="text" v-model="receivedMusicName" @keydown.enter="passDataToMusicPlay()" ref="musicName">
</template>
<script>
import musicPlay from './components/musicPlay.vue';
import registered from './components/registered.vue';
export default {
  name:"app",
  data(){
    return{
      isShowView:false,
      receivedMusicName:"",
      sendMusicName:""
    }
  },
  components:{
    musicPlay,
    registered
  },
  methods:{
    passDataToMusicPlay(){
      let name = "http://127.0.0.1:8865/"+this.receivedMusicName+'.m4a'
      this.sendMusicName = name;
    }
  }
}
</script>