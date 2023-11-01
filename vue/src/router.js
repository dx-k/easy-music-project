import {createRouter,createWebHashHistory} from 'vue-router';
import musicPlay from './components/musicPlay.vue';
import registered from './components/registered.vue';

export default createRouter({
    history:createWebHashHistory(),
    routes:[
        {path:'/',component:musicPlay},
        {path:'/registered',component:registered}
    ]
})