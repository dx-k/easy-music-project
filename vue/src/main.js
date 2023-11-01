import { createApp } from 'vue';
import App from './App.vue';
import './index.css'
import router from './router';

let app = createApp(App);
app.use(router);
app.mount('#app');

!function(){
    const body = document.getElementsByTagName("body")[0];
    const X = window.innerWidth;
    const Y = window.innerHeight;
    body.style.height = Y+"px";
}()