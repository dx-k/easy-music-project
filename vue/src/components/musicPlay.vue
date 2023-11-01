<template>
    <div class="container">
        <h1>Music Player</h1>
        <button @click="play()" class="btn" v-if="showPlay">▶️</button>
        <button @click="pause()" class="btn" v-else>⏸️</button>
        <audio controls class="play" :src="musicUrl"></audio>
    </div>
</template>
<script>
export default {
    name: "musicPlay",
    data() {
        return {
            // music:"https://dl.stream.qqmusic.qq.com/C400002AqbS73P79QU.m4a?guid=9352208300&vkey=BFBB09B3D3330B8A958D3A369F7772B221A7D275F5780EF1AE31A6423A988F1851F5726496E8FA255D25547DAA0BAF8E426839347EC65400&uin=1965117093&fromtag=120032"
            showPlay:true,
        }
    },
    props:["musicUrl"],
    methods: {
        play() {
            // 创建一个音频标签并设置src为返回的Blob URL
            // const audio = document.createElement('audio');
            // audio.src = URL.createObjectURL(blob);
            // 获取audio元素
            const audio = document.getElementsByClassName("play")[0];
            audio.src = this.musicUrl;
            // 播放音乐
                audio.play();
            if(this.showPlay){
                this.showPlay = false;
                return;
            }
        },
        pause(){
            const audio = document.getElementsByClassName("play")[0];
            // 暂停音乐
            audio.pause();
            this.showPlay = true;
        }
    },
}
</script>
<style>
.btn{
    width: 30px;
    height: 30px;
    background-color: white;
    border: none;
    border-radius: 50%;
    position: relative;
    top: 35px;
    left: 10px;
    z-index: 999;
}
body {
    font-family: Arial, sans-serif;
    background-color: #f2f2f2;
}

.container {
    width: 300px;
    margin: 100px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
}

audio {
    width: 100%;
    height: 40px;
    margin-bottom: 20px;
}
</style>
