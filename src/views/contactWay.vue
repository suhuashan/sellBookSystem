<template>
 <div class="contactWay">
     <page-header :headerTitle="headerTitle" :headerStatus="headerStatus" :detailPostItem="detailPostItem"></page-header>
     <keep-alive>
         <contact :detailPostItem="detailPostItem" :status="contactWayStatus">
         </contact>
     </keep-alive>
 </div>
</template>

<script>
import pageHeader from '@/components/pageHeader.vue'
import contact from '@/components/contact.vue'
export default {
  name: 'contactWay',
  data () {
    return {
        headerTitle: "联系方式",
        headerStatus: "2",
        contactWayStatus: '1',
        detailPostItem: this.$route.query.detailPostItem
    }
  },
  activated() {
      console.log("contactWay组件activated");
  },
  methods: {
      
  },
  components: {
      pageHeader,
      contact
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .contactWay{
        position: relative;
        min-height: 100%;
        padding-top: 4rem;
        box-sizing: border-box;
    }
</style>
