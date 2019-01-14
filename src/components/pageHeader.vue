<template>
    <div class="pageHeader">
        <span class="headerIcon" @click="backToMine(headerStatus)">
            <i class="iconfont icon-jiantouzuo"></i>
        </span>
        <span class="message">{{headerTitle}}</span>
    </div>
</template>

<script>
export default {
  name: 'pageHeader',
  props: {
      headerTitle: {
            type: String,
            default: ""
      },
      headerStatus: {
          type: String,
          default: ""
      },
      detailPostItem:{
          type: Object
      }
  },
  data () {
    return {
      
    }
  },
  methods: {
      backToMine(status) {
          console.log(status);
          console.log(status === "1");
          switch(status) {
              case "1":
                this.$router.push("/buy");
                break;
              case "2":
                this.$router.push({
                    path: "/detailPost",
                    query: {
                        detailPostItem: this.detailPostItem
                    }
                });
                break;
              case "3":
                this.$router.push("/mine");
                break;
              case "4":
                this.$router.push("/myPublish");
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .pageHeader{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 4rem;
        background: #df1d3d;
        line-height: 4rem;
        font-size: 2rem;
        color:#fff;
        text-align: center;
        .headerIcon{
            float: left;
            width: 3rem;
            height: 3rem;
            vertical-align: middle;
        }
        .message{
            margin-left: -3rem;
        }
    }

</style>
