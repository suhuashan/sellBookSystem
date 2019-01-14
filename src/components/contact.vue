<template>
    <div class="contact">
        <div class="inner">
            <ul>
                <li class="contactUser">
                    <i class="iconfont icon-wo"></i>
                    <span class="username">{{username}}</span>
                </li>
                <li class="contactPhone">
                    <i class="iconfont icon-09"></i>
                    <input type="text" placeholder="无" v-model="weixin" >
                </li>
                <li class="contactWeixin">
                    <i class="iconfont icon-weixin"></i>
                    <input type="text" placeholder="无" v-model="phone"> 
                </li>
            </ul>
        </div>
        <div class="rewriteBtn" @click="rewrite" v-if="status=='0'">修改</div>
        <div id="btn" class="contactBtn" @click="contact" v-else>确认交易</div>
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui';

export default {
  name: 'myInfo',
  props: {
      detailPostItem: {
          type: Object
      },
      status: {
          type: String,
          default: ''
      }
  },
  data () {
    return {
        username: "",
        weixin: "",
        phone: ""
    }
  },
  created() {
      console.log("contact组件create");
  },
  activated() {
      console.log("contact组件active");
      if(!this.detailPostItem){
            this.username = localStorage.getItem("username");
            this.getInfo(localStorage.getItem("username"),(weixin,phone) => {
                localStorage.setItem("weixin",weixin);
                localStorage.setItem("phone",phone);
            });
      }else{
            this.username = this.detailPostItem.username;
            this.getInfo(this.detailPostItem.username,()=>{});
            let elements = document.querySelectorAll('input');
            for(let element of elements){
                element.setAttribute('readonly',true);
            }
      }
  },
  methods: {
      getInfo(username,callback) {
          this.$http({
              method: "POST",
              url: "/user/getInfo",
              data: {
                  "username": username
              }
          }).then((res) => {
              if(res.data.status == "0"){
                this.weixin = res.data.result.weixin;
                this.phone = res.data.result.phone;
                callback( this.weixin,this.phone);
              }
          }).catch((err) => {
              console.log(err);
          })
      },
      rewrite() {
          this.$http({
            method: "POST",
            url: "/user/rewriteInfo",
            data: {
                "username": this.username,
                "weixin": this.weixin,
                "phone": this.phone
            }
          }).then((res) => {
              if(res.data.status == '0'){
                this.$Toast("修改成功");
                localStorage.setItem("weixin",this.weixin);
                localStorage.setItem("phone",this.phone);
              }

          }).catch((err) => {
              this.$Toast("修改失败");
              console.log(err);
          })
      },
      contact() {
          MessageBox.confirm('确定执行此操作?').then(action => {
            document.getElementById('btn').style.backgroundColor="#bbb";
            this.$http({
                method: "POST",
                url: "/buy/doDeal",
                data: {
                    "buyer": localStorage.getItem("username"),
                    "post": this.$route.query.detailPostItem
                }
            }).then((res) => {
                if(res.data.status == '0'){
                    console.log(res);
                }
            }).catch((err) => {
                console.log(err);
            });
        });
          
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .contact{
        margin: 3rem auto;
        padding-top: 4rem;
        width: 90%;
        height: 23rem;
        box-shadow: 0 0 20px #bbb;
        background: #fff;
        border-radius: 0.5rem;
        color: #df1d3d;
        font-size: 2.2rem;
        font-weight: 600;
        .inner{
            padding-left: 1.5rem;
            margin-left: 3rem;
            border-left: 1px solid #df1d3d;
            width: 90%;
            height: 15rem;
            line-height: 5rem;
            .username{
                vertical-align: top;
            }
            input[type=text]{
                outline: 0;
                width: 60%;
                color: #df1d3d;
                background: #fff;
                ::-webkit-input-placeholder { /* WebKit browsers */
                    color: #df1d3d;
                }
                :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                    color: #df1d3d;
                }
                ::-moz-placeholder { /* Mozilla Firefox 19+ */
                    color: #df1d3d;
                }
                :-ms-input-placeholder { /* Internet Explorer 10+ */
                    color: #df1d3d;
                }
            }
        }
        .rewriteBtn{
            margin: 2rem auto;
            width: 6rem;
            height: 3rem;
            text-align: center;
            line-height: 3rem;
            color: white;
            background:#df1d3d;
            border-radius: 0.5rem;
        }
        .contactBtn{
            margin: 2rem auto;
            width: 10rem;
            height: 3rem;
            text-align: center;
            line-height: 3rem;
            color: white;
            background:#df1d3d;
            border-radius: 0.5rem;
        }
    }







</style>
