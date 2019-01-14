<template>
 <div class="footNav">
     <ul class="bottomTab">
        <router-link to="/buy" tag="li" replace>
            <i class="iconfont icon-mairu"></i><br>
            <span>买书</span>
        </router-link>
        <router-link to="/sell" tag="li" replace>
            <i class="iconfont icon-maichu"></i><br>
            <span>卖书</span>
        </router-link>
        <router-link to="/mine" tag="li" replace>
            <i class="iconfont icon-wo1"></i><br>
            <span>我的</span>
        </router-link>
     </ul>
 </div>
</template>

<script>
export default {
  name: 'footNav',
  data () {
    return {
     
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .footNav{
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 1;
        width: 100%;
        height: 6rem;
        background-color: #f4f4f4;
        border-top: 1px solid #ddd;
        .bottomTab{
            display: flex;
            li{
                flex: 1;
                color: #aaaaaa;
                padding: 1rem;
                text-align: center;
                font-size: 1.5rem;
            }                
            .router-link-active{
                color: #df1d3d;
            }
        }
    }

</style>
