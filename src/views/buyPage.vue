<template>
    <div class="buyPage" ref="buyList">
        <div class="header">
            <div class="search">
                <input type="text" v-model="searchContent" @keyup.enter="enterPress" placeholder="   搜索图书书名">
                <div class="sousuo" @click="search">
                    <i class="iconfont icon-sousuo"></i>
                </div>
            </div>
        </div>
        <div v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10"
            :infinite-scroll-immediate-check="true">
            <div  v-for="(bookItem,index) in bookList" :key="index">
                <post :postItem="bookItem" postStatus="1"></post>
            </div>
        </div>
        <div class="bottomMsg" v-show="bottomMsgStatus">没有更多数据了呀</div>
    </div>
</template>

<script>
import post from '@/components/post.vue'
import {Indicator} from 'mint-ui'
export default {
  name: 'buyPage',
  data () {
    return {
      bookList: [],
      searchContent: "",
      bottomMsgStatus: false,
      loading: true,
      limitNum: 5,
      skipNum: 0
    }
  },
  mounted() {
    //   this.$nextTick(() => {
    //       let h =  window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    //       this.$refs.buyList.style.height = `${h}px`;
    //   })
      this.getBookList();
  },
  activated() {
      if(!this.bottomMsgStatus){
          this.loading = false;
      }else{
          if(!this.$route.query.bookItem){
            return;
          }
          this.bookList.push(this.$route.query.bookItem);
      }
  },
  deactivated() {
      console.log("离开");
  },
  methods: {
      getBookList() {
          this.$http({
              method: "GET",
              url: "/buy/showBookList",
              params:{
                  "limitNum": this.limitNum,
                  "skipNum": this.skipNum
              }
          }).then((res) => {
              if(res.data.status == '0'){
                  if(res.data.result.length != 5){
                      this.$Toast("已经到底了");
                      this.bottomMsgStatus = true;
                      Indicator.close();
                  }else{
                      Indicator.close();
                      this.loading = false;
                  }
                  console.log(res.data.result);
                  this.skipNum += 5;
                  this.bookList = this.bookList.concat(res.data.result);
              }
          }).catch((err) => {
              Indicator.close();
              console.log(err);
          })
      },
      loadMore() {
          this.loading = true;
          Indicator.open({
            text: 'Loading...',
            spinnerType: 'fading-circle'
          });
          setTimeout(() => {
              this.getBookList();
          },1000);
      },
      search() {
          this.$http({
              method: "POST",
              url: "/buy/doSearch",
              data: {
                  "bookName": this.searchContent
              }
          }).then((res) => {
              console.log(res);
              if(res.data.status == '0'){
                  this.bookList = res.data.result;
                  if(this.bookList.length == 0){
                    Toast('没有找到哦');
                  }else{
                    Toast('找到了呀');
                  }
              }
          }).catch((err) => {
              console.log(err);
          })
      },
      enterPress() {
          if(event.keyCode == 13){
              this.search();
          }
      }
  },
  components: {
      post
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .buyPage{
        position: relative;
        min-height: 100%;
        padding-top: 4rem;
        padding-bottom: 6rem;
        box-sizing: border-box;
        .header{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 4rem;
            background: #df1d3d;
            .search{
                width: 90%;
                padding-top: 0.5rem;
                padding-left: 1rem;
                margin: 0 auto;
                input{
                    outline: none;
                    width: 95%;
                    height: 3rem;
                    background-color: #fff;
                    border-radius: 1.2rem;
                    font-size: 1.8rem;
                }
                .sousuo{
                    position: absolute;
                    right: 10%;
                    top: 0.9rem;
                    z-index: 10;
                    .iconfont{
                        font-size: 2.5rem;
                    }   
                }
            }
        }
        .bottomMsg{
            width: 100%;
            height: 3rem;
            line-height: 3rem;
            font-size: 1.5rem;
            text-align: center;
        }
    }


</style>
