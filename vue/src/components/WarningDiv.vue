<template>
    <div ref="div" v-html="value" class="d"></div>
</template>
<script>
export default {
    name:"WarningDiv",
    props:{
        value:{
            type:String,
            required:true,
            default:"默认值"
        }
    },
    mounted(){
        const x = window.innerWidth / 2;
        const y = window.innerHeight / 6;
        this.$refs.div.style.position = "absolute";
        this.$refs.div.style.zIndex = 999;
        this.$refs.div.style.background = "white";
        this.$refs.div.style.top = y-30+"px";
        this.$refs.div.style.left = x-150+"px";
    }
}
</script>
<style scoped>
div{
    min-height: 20px;
    padding: 20px 20px;
    color: rgba(52,175,109);
    box-shadow:  8px 8px 25px -4px gray; 
}
</style>