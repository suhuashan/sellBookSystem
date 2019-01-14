<template>
    <div class="minePage">
        <div class="header">我的主页</div>
        <div class="info">
            <div class="loginReg" v-if="loginStatus">
                <span @click="regLogin">注册</span>/
                <span @click="regLogin">登录</span>
            </div>
            <div class="loginReg" v-else>
                <span class="reg">{{username}}</span>/
                <span class="login"  @click="loginOut">退出登录</span>
            </div>
        </div>
        <div class="myPublish" @click="check('myPublish')">发布记录</div>
        <div class="myDeal"  @click="check('myDeal')">交易记录</div>
        <div class="myInfo"  @click="check('myInfo')">我的信息</div>
        <div class="blurFrame" v-show="blurStatus" @click="showBlur"></div>
        <div class="model" v-show="modelStatus">
            <div class="loginRegFrame" >
                <div class="inputFrame">
                    <div class="username">
                        用户名:<input type="text" placeholder="用户名" v-model="username">
                        <div class="msg" v-show="userMsg">&emsp;&emsp;&emsp;{{userContent}}</div>
                    </div>
                    <div class="password">
                        密&emsp;码:<input type="password" placeholder="密码" v-model="password">
                        <div class="msg" v-show="passwordMsg">&emsp;&emsp;&emsp;{{passwordContent}}</div>
                    </div>
                </div>
            </div>
            <div class="Btn">
                <div class="loginBtn fl" @click="login">登录</div>
                <div class="regBtn fr" @click="reg">注册</div>
            </div>
        </div>
    </div>
</template>

<script>
const  patt = /^[0-9A-z]{6,10}$/;
export default {
  name: 'mine',
  data () {
    return {
        blurStatus: localStorage.getItem("jwtToken") == null ? true : false,
        modelStatus: localStorage.getItem("jwtToken") == null ? true : false,
        username: localStorage.getItem("username"),
        password: "",
        loginStatus: localStorage.getItem("jwtToken") == null ? true : false,
        userMsg: false,
        userContent: "",
        passwordMsg: false,
        passwordContent: ""
    }
  },
  activated() {
      if(localStorage.getItem("jwtToken") == null){
          this.blurStatus = true;
          this.modelStatus = true;
      }
  },
  methods: {
      regLogin() {
          this.blurStatus = true;
          this.modelStatus = true;
      },
      loginOut() {
          this.loginStatus = true;
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("username");
          localStorage.removeItem("weixin");
          localStorage.removeItem("phone");
          this.$Toast("成功退出");
      },
      check(route){

          if(localStorage.getItem("username")){
              this.$router.push(route);
          }else{
              this.$Toast("请先登录");
              this.blurStatus = true;
              this.modelStatus = true;
          }
      },
      showBlur() {
          this.blurStatus = false;
          this.modelStatus = false;
      },
      reg() {
          if(this.username == null){
              this.userMsg = true;
              this.userContent = "用户名不能为空!";
          }else if(!patt.test(this.password)){
              this.passwordMsg = true;
              this.passwordContent = "至少为6位英文字母或者数字";
          }else{
              this.$http({
              method: "POST",
              url: "/user/doReg",
              data: {
                "username":this.username,
                "password":this.password
              }
            }).then((res) => {
                if(res.data.status == 0){
                    this.blurStatus = false;
                    this.modelStatus = false;
                    this.loginStatus = false;
                    this.username = res.data.result;
                    localStorage.setItem('jwtToken',res.data.token);
                    localStorage.setItem("username",res.data.result);
                    this.$Toast('注册成功');
                }else{
                    this.userMsg = true;
                    this.userContent = "该用户名已被注册!";
                }
            }).catch((err) => {
                console.log(err);
            })
          }
      },
      login() {
          if(this.username == null){
               this.userMsg = true;
          }else if(!patt.test(this.password)){
              this.passwordMsg = true;
          }else{
              this.$http({
              method: "POST",
              url: "/user/doLogin",
              data: {
                "username":this.username,
                "password":this.password
              }
              }).then((res) => {
                    if(res.data.status == 0){
                        this.blurStatus = false;
                        this.modelStatus = false;
                        this.loginStatus = false;
                        this.username = res.data.result.username;
                        localStorage.setItem("weixin",res.data.result.weixin);
                        localStorage.setItem("phone",res.data.result.phone);
                        localStorage.setItem('jwtToken',res.data.token);
                        localStorage.setItem("username",res.data.result.username);
                        this.$Toast('登陆成功');
                    }else if(res.data.status == -1){
                        this.passwordMsg = true;
                        this.passwordContent = "密码错误!";
                    }else{
                        this.userMsg = true;
                        this.userContent = "用户名未注册!";
                    }
                }).catch((err) => {
                    console.log(err);
                })
          }
      }
  },
  components: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .minePage{
        font-size: 2rem;
        .header{
            position: relative;
            width: 100%;
            height: 4rem;
            background: #df1d3d;
            text-align: center;
            line-height: 4rem;
            font-size: 2rem;
            color:#fff;
            font-weight: 400;
        }
        .info{
            display: flex;
            align-items: center;
            margin-top: 2rem;
            height: 6rem;
            line-height: 6rem;
            width: 100%;
            border-bottom: 1px solid black;
            border-top: 1px solid black;
            .loginReg{
                flex: 1;
                margin-left: 1rem;
            }
        }
        .myPublish,
        .myDeal,
        .myInfo{
            margin-top: 2rem;
            padding-left: 1rem;
            font-size: 2rem;
            width: 100%;
            height: 4rem;
            line-height: 4rem;
            border-bottom: 1px solid black;
        }
        .blurFrame{
            position: fixed;
            left: 0;
            top: 0;
            z-index: 4;
            width: 100%;
            height: 100%;
            background: rgba(116, 114, 114, 0.5);
        }
        .model{
            position: relative;
            z-index: 5;
            width: 25rem;
            height: 25rem;
            margin: -20rem auto;
            background: #fff;
            box-shadow: 0 0 20px #ddd;
            border-radius: 0.8rem;
            .loginRegFrame{
                width: 100%;
                padding: 2rem;
                font-size: 1.5rem;
                input{
                    font-size: 1.5rem;
                    outline: 0;
                    border: 0.1rem solid #df1d3d;
                    width: 16rem;
                    height: 3rem;
                    line-height: 3rem;
                    margin: 1rem 0;
                }            
                .msg{
                    width: 90%;
                    color: #df1d3d;
                    font-size: 1.5rem;
                }
            }
            .Btn{
                width: 18rem;
                margin: 2rem auto;
                .loginBtn,
                .regBtn{
                    flex: 1;
                    width: 6rem;
                    height: 3rem;
                    background: #df1d3d;
                    padding: 0.2rem;
                    color: #fff;
                    line-height: 3rem;
                    text-align: center;
                    border: 0.2rem solid #df1d3d;
                    border-radius: 0.3rem;
                }
            }
        }
    }
    



    


</style>
