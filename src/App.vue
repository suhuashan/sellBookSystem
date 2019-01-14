<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <foot-nav></foot-nav>
  </div>
</template>

<script>
import footNav from './components/footNav';
export default {
  name: 'App',
  data() {
    return { 

    }
  },
  components: {
    footNav
  }
}
</script>

<style>
  html,body,#app{
    width: 100%;
    height: 100%;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

</style>
