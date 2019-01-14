<template>
    <div class="myDeal">
        <page-header :headerTitle="headerTitle" :headerStatus="headerStatus"></page-header>
        <div class="topTab">
            <div id="buy" class="buy" @click="myBuyList">
                <i class="iconfont icon-mairu"></i>我购买的
            </div>
            <div id="sell" class="sell" @click="mySellList">
                <i class="iconfont icon-maichu"></i>我出售的
            </div>
        </div>
        <div class="dealPostList" v-for="(deal,index) in dealRecordList" :key="index">
            <post :postItem="deal"></post>
        </div>
    </div>
</template>

<script>
import pageHeader from '@/components/pageHeader.vue'
import post from '@/components/post.vue'
import {Indicator} from 'mint-ui'

export default {
  name: 'myDeal',
  data () {
    return {
      headerTitle: "交易记录",
      headerStatus: "3",
      dealRecordList: [],
      bottomMsgStatus: false,
      loading: false,
      limitNum1: 5,
      skipNum1: 0,
      limitNum2: 5,
      skipNum2: 0
    }
  },
  mounted() {
      console.log("myDeal组件mounted");
  },
  activated() {
      console.log("myDeal组件activated");
      this.myBuyList();
  },
  methods: {
      myBuyList() {
          document.getElementById("buy").style["border-bottom"]="0.3rem solid #fff";
          document.getElementById("sell").style["border-bottom"]="0.3rem solid #df1d3d";
          this.$http({
              method: "GET",
              url: "/user/getBuyDealRecord",
              params: {
                  buyer: localStorage.getItem("username")
              }
          }).then((res) => {
              if(res.data.status == '0'){
                  console.log(res.data.result);
                  this.dealRecordList = res.data.result;
              }
          }).catch((err) => {
              console.log(err);
          })
      },
      mySellList() {
           document.getElementById("sell").style["border-bottom"]="0.3rem solid #fff";
           document.getElementById("buy").style["border-bottom"]="0.3rem solid #df1d3d";
           this.$http({
              method: "GET",
              url: "/user/getSellDealRecord",
              params: {
                  username: localStorage.getItem("username")
              }
          }).then((res) => {
              if(res.data.status == '0'){
                  this.dealRecordList = res.data.result;
              }
          }).catch((err) => {      
              console.log(err);
          })
      }
  },
  components: {
      pageHeader,
      post
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .myDeal{
        position: relative;
        min-height: 100%;
        box-sizing: border-box;
        padding-top: 3.9rem;
        background: #ddd;
        .topTab{
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            font-size: 1.5rem;
            background: #df1d3d;
            color: #fff;
            .iconfont{
                font-size: 1.5rem;
            }
            .buy,
            .sell{
                height: 3rem;
                flex: 1;
                line-height: 3rem;
                border-bottom: 0.3rem solid #fff;
            }
            .sell{
                border-bottom: 0.3rem solid #df1d3d;
            }
        }
    }
</style>
