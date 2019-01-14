<template>
 <div class="detailPost">
    <page-header :headerTitle="headerTitle" :headerStatus="headerStatus"></page-header>
    <div class="postContent">
        <h1 class="bookName">{{detailPostItem.bookName}}</h1>
        <div class="postInfo">
            <div class="leftImg">
                <img src='../image/sellBookSystem.jpg' v-if="!detailPostItem.avatar">
                <img :src="detailPostItem.avatar"  v-else>
            </div>
            <div class="rightDesc">
                {{detailPostItem.bookDesc}}
            </div>
        </div>
        <ul class="dealInfo">
            <li>交易地点:<span>{{detailPostItem.position}}</span></li>
            <li>时间:<span>{{detailPostItem.time}}</span></li>
            <li>发布:<span>{{detailPostItem.username}}</span></li>
        </ul>
        <div class="contactSelller" @click="contactSelller">联系卖家</div>
    </div>
 </div>
</template>

<script>
import pageHeader from '@/components/pageHeader.vue'
export default {
  name: 'detailPost',
  data () {
    return {
        headerTitle: "具体信息",
        headerStatus: "",
        detailPostItem: {}
    }
  },
  activated() {
      if(this.$route.query.postStatus){
        this.headerStatus = this.$route.query.postStatus;
      }
      this.detailPostItem = this.$route.query.post || this.$route.query.detailPostItem;
  },
  components: {
      pageHeader
  },
  methods: {
      contactSelller() {
          this.$router.push({
              path: '/contactWay',
              query: {
                  detailPostItem: this.detailPostItem
              }
          });
      }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .detailPost{
        position: relative;
        min-height: 100%;
        box-sizing: border-box;
        padding-top: 4rem;
        .postContent{
            margin: 3rem auto;
            padding: 1rem;
            width: 80%;
            height: 33rem;
            background: #fff;
            box-shadow: 0 0 20px #ddd;
            border-radius: 0.8rem;
            .bookName{
                font-size: 2rem;
                font-weight: 600;
                text-align: center;
            }
            .postInfo{
                display: flex;
                flex-direction: row;
                margin-top: 2rem;
                width: 100%;
                .leftImg{
                    width: 10rem;
                    height: 10rem;
                    border-radius: 0.5rem;
                    img{
                        width: 10rem;
                        height: 10rem;
                    }
                }
                .rightDesc{
                    flex: 1;
                    width: 100%;
                    height: 10rem;
                    line-height: 2rem;
                    margin-left: 1rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 5;
                    -webkit-box-orient: vertical;
                    word-break: break-all;
                }
            }
            .dealInfo{
                font-size: 1.5rem;
                color: #df1d3d;
                margin-top: 2rem;
                height: 9rem;
                line-height: 3rem;
                span{
                    margin-left: 1rem;
                }
            }
            .contactSelller{
                margin: 2rem auto;
                padding: 0.5rem;
                width: 8rem;
                height: 3rem;
                font-size: 2rem;
                line-height: 3rem;
                text-align: center;
                color: #fff;
                border-radius: 0.5rem;
                background: #df1d3d;
            }
        }
    }



</style>
