<template>
  <div id="app">
    <el-container>
      <el-header height="60px">
        <header-view />
      </el-header>
      <el-main class="main">
        <router-view />
      </el-main>
      <el-footer height="40px">
        <footer-view />
      </el-footer>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'App',
  components: {
    HeaderView: () => import('@/components/HeaderView.vue'),
    FooterView: () => import('@/components/FooterView.vue')
  },
  data () {
    return {}
  }
}
</script>
<style lang="scss">
#app {
  height: 100vh;
  width: 100vw;
  font-family: simhei, songti, '黑体', '宋体', UKIJKu;
  .main {
    height: calc(100vh - 100px);
  }
}
</style>
