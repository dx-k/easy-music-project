<template>
    <WarningDiv v-show="CreateWarningDiv" :value="WarningDivInfo" class="WarningDiv"></WarningDiv>
    <div class="app">
      <h1>注册</h1>
      <form onsubmit="event.preventDefault()">
        <label for="username">用户名</label>
        <input class="username" type="text" id="username" name="username" required placeholder="请输入用户名(最长10位)" v-model="username" @input="userEvent()" maxlength="10">
        
        <label for="email">邮箱</label>
        <input v-model="email" class="e" type="email" id="email" name="email" required placeholder="请输入邮箱" maxlength="20" @change="emailIsOk()">
        
        <label for="password">密码</label>
        <input v-model="password" class="password" type="password" id="password" name="password" required placeholder="请输入密码" maxlength="20" @change="passIsOk()">
        
        <button type="button" @click="send()">注册</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import WarningDiv from './WarningDiv.vue';
  
  export default {
    name: 'App',
    data(){
      return{
        username:"",
        email:"",
        password:"",
        WarningDivInfo:"",
        CreateWarningDiv:false,
        // 用户名是否合法
        uIsAffirmed:false,
        // 用户是否存在
        uIsExist:true,
        // 邮箱账号是否可用
        eIsOk:false,
        // 密码是否可用
        pIsOk:false
      }
    },
    components: {
      WarningDiv
    },
    methods:{
      // 发送 post 请求，存储用户信息
      send(){
        // 发送之前判断用户名，邮箱，密码等信息
        if(this.uIsExist === false && this.eIsOk === true && this.pIsOk === true){
          console.log("可以发送创建请求");
          // 发送post请求，如果用户不存在则存储用户信息
          axios.post("http://127.0.0.1:8865",{
            username:this.username,
            password:this.password,
            email:this.email,
            isCreate:true})
          .then(e=>{
            this.showWarningDiv("用户创建成功");
          })
          // 不成功则判断是哪一个环节出错
        }else if(this.uIsExist === true){
          this.showWarningDiv("该用户已存在");
        }else if(this.eIsOk === false){
          this.showWarningDiv("该邮箱不能使用<br>必须以@qq.com结尾<br>而且只能由数字，字母组成");
        }else if(this.pIsOk === false){
          this.showWarningDiv("密码格式错误<br>由数字，字母组成<br>至少有一位大写字母<br>并且至少7位");
        }
      },
      // 用户输入框的所有事件处理
      userEvent(){
        // 判断用户名是否合法
        const r = /^[\u4e00-\u9fa5\w]+$/gi;
        if(this.username === "") {
          this.uIsAffirmed = false;
          return;
        }
        if(r.test(this.username) == false) {
          this.uIsAffirmed = false;
          this.showWarningDiv("用户名不正确，请重新输入<br>用户名由字母，数字，汉字组成<br>长度不能超过10位");
          return;
        }
        this.uIsAffirmed = true;
        // 判断用户是否存在
        this.isExist();
      },
      // 判断邮箱账号是否合法
      emailIsOk(){
        const r = /^[0-9]*@qq.com$/;
        if(r.test(this.email) === false){
          this.eIsOk = false;
          this.showWarningDiv("该邮箱不能使用<br>必须以@qq.com结尾<br>而且只能由数字，字母组成");
        }
        // 通过邮箱账号检测，则该邮箱可用
        this.eIsOk = true;
      },
      // 密码是否合法
      passIsOk(){
        const r = /^(?=.*[A-Z])[a-zA-Z0-9]{7,}$/;
        if(r.test(this.password) === false){
          this.pIsOk = false;
          this.showWarningDiv("密码格式错误<br>由数字，字母组成<br>至少有一位大写字母<br>并且至少7位");
        }
        this.pIsOk = true;
      },
      // 判断是否存在该用户
      isExist(){
        axios.post("http://127.0.0.1:8865",{
          username:this.username,
          isCreate:false
        })
        .then(e=>{
          console.log(e.data);
          // 如果用户不存在则表示该用户名可用，修改 uIsExist 为false
          if(e.data.userIsExist === false){
            this.uIsExist = false;
            return;
          }
          this.uIsExist = true;
        })
      },
      // 警告框的使用
      showWarningDiv(info){
        const div = document.getElementsByClassName("WarningDiv")[0];
        div.style.opacity = 1;
        // 设置警告按钮文本内容
        this.WarningDivInfo = info;
        // 不合法则显示警告按钮
        this.CreateWarningDiv = true;
        console.log(getComputedStyle(div).width);
        // 倒计时3s关闭显示
        let timer = setInterval(()=>{
          // 设置逐渐透明
          div.style.opacity -= 0.05;
          if(div.style.opacity <= 0){
            clearTimeout(timer);
          }
        },300)
      }
    },
    mounted(){
      // axios.get("http://127.0.0.1:8865/")
      // .then(e=>{
      //   console.log(e.data);
      // })
    }
  }
  </script>
  
  <style scoped>
  .app {
      max-width: 400px;
      width: 400px;
      height: 318px;
      margin: 0 auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  
  h1 {
    text-align: center;
  }
  
  form {
    margin-top: 20px;
  }
  
  label {
    display: block;
    margin-top: 10px;
  }
  
  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  button{
    width: 100%;
    padding: 10px;
    color: #fff;
    text-align: center;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 10px 0;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>