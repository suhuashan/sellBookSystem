   <template>
    <div class="post" @click="turnToDetail">
        <div class="postAvatar">
            <img :src="postItem.avatar" v-if="postItem.avatar">
            <img src='../image/sellBookSystem.jpg' v-else>
        </div>
        <div class="postInfo">
            <p class="postTitle">{{postItem.bookName}}</p>
            <div class="postDescription">
                {{postItem.bookDesc}}
            </div>
            <div class="postOtherInfo">
                <span class="postPosition">
                    <i class="iconfont icon-icon-"></i>
                    {{postItem.position}}
                </span>
                <span class="postTime">
                    <i class="iconfont icon-shijian"></i>
                    {{postItem.time}}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'post',
  props: {
      postItem: {
          type: Object,
          default: {}
      },
      postStatus: {
          type: String,
          default: ""
      }
  },
  data () {
    return {
        
    }
  },
  activated() {
      this.post = this.postItem;
  },
  methods: {
      turnToDetail() {
          this.$router.push({
              name: "detailPost",
            //   params: {post: this.postItem}
            //   path: "/detailPost",
              query: {
                  postStatus: this.postStatus,
                  post: this.postItem
              }
            });
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .post{
        display: flex;
        align-items: center;
        width: 90%;
        height: 10rem;
        margin: 2rem auto;
        border-radius: 0.5rem;
        box-shadow: 0 0 20px #bbb;
        background: #fff;
        .postAvatar{
            width: 9rem;
            height: 9rem;
            border-radius: 0.5rem;
            margin-left: 1rem;
            img{
                width: 9rem;
                height: 9rem;
            }
        }
        .postInfo{
            flex: 1;
            margin-left: 2rem;
            .postTitle{
                padding-bottom: 1rem;
                font-weight: 800;
                font-size: 1.6rem;
            }
            .postDescription{
                padding-right: 2rem;
                font-size: 1.2rem;
                height: 4.5rem;
                width: 100%;
                line-height: 1.5rem;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
            }
            .postOtherInfo{
                padding-top: 1.5rem;
                font-size: 1.2rem;
                .iconfont{
                    font-size: 1rem;
                }
                .postPosition{
                    float: left;
                }
                .postTime{
                    float: right;
                    margin-right: 1rem;
                }
            }
        }
    }

</style>
