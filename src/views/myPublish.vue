<template>
    <div class="publishPage">
        <page-header :headerTitle="headerTitle" :headerStatus="headerStatus"></page-header>
        <div class="postList"  
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10"
            :infinite-scroll-immediate-check="true">
            <div class="publishPostList" v-for="(publishItem,index) in publishList" :key="index">
                <post :postItem="publishItem" postStatus="4"></post>
            </div>
        </div>
        <div class="bottomMsg" v-show="bottomMsgStatus">没有更多数据了呀</div>
    </div>
</template>

<script>
import pageHeader from '@/components/pageHeader.vue'
import post from '@/components/post.vue'
import {Indicator} from 'mint-ui'
export default {
  name: 'myPublish',
  data () {
    return {
      headerTitle: "发布记录",
      headerStatus: "3",
      publishList: [],
      bottomMsgStatus: false,
      loading: false,
      limitNum: 5,
      skipNum: 0
    }
  },
  mounted() {
      this.getPublishRecord();
  },    
  activated() {

  },
  methods: {
      loadMore() {
          this.loading = true;
          Indicator.open({
            text: 'Loading...',
            spinnerType: 'fading-circle'
          });
          setTimeout(() => {
              this.getPublishRecord();
          },1000);
      },
      getPublishRecord() {
          this.$http({
              method: "GET",
              url: "/user/getPublishRecord",
              params: {
                  "username": localStorage.getItem("username"),       
                  "limitNum": this.limitNum,
                  "skipNum": this.skipNum
              }
          }).then((res) => {
              console.log(res.data.result);
              if(res.data.status == '0'){
                  if(res.data.result.length != 5){
                      Indicator.close();
                      this.bottomMsgStatus = true;
                      this.$Toast("已经到底了");
                  }else{
                      Indicator.close();
                      this.loading = false;
                  }
                  this.skipNum += 5;
                  this.publishList = this.publishList.concat(res.data.result);
              }
          }).catch((err) => {
              console.log(err);
          });
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
    .publishPage{
        position: relative;
        min-height: 100%;
        padding-top: 4rem;
        padding-bottom: 6rem;
        box-sizing: border-box;
        .bottomMsg{
            width: 100%;
            height: 3rem;
            line-height: 3rem;
            font-size: 1.5rem;
            text-align: center;
        }
    }
</style>
