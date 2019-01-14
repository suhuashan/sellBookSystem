<template>
    <div class="myInfo">
        <page-header :headerTitle="headerTitle" :headerStatus="headerStatus"></page-header>
        <div>
            <contact :status="myInfoStatus"></contact>
        </div>
    </div>
</template>

<script>
import pageHeader from '@/components/pageHeader.vue'
import contact from '@/components/contact.vue'
export default {
  name: 'myInfo',
  data () {
    return {
      headerTitle: "个人信息",
      headerStatus: "3",
      myInfoStatus: '0',
      username: '',
      weixin: '',
      phone: ''
    }
  },
  created() {
      console.log('myInfo组件created');
  },
  activated() {
      console.log('myInfo组件activated');
      this.username = localStorage.getItem("username");
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
<style scoped lang="scss">
    .myInfo{
        position: relative;
        min-height: 100%;
        box-sizing: border-box;
        padding-top: 2rem;

    }    
</style>
