<template>
  <div class="footer">
    <div>{{ $t('footer') }}</div>
  </div>
</template>

<script>
export default {
  components: {
    // Test: () => import('@/App.vue')
  },

  data () {
    return {}
  },

  computed: {},

  mounted () {},

  methods: {}
}
</script>

<style lang="scss" scoped>
.footer {
  position: relative;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  overflow: hidden;
  font-size: 13px;
  color: #666;
  border-top: 1px solid #f1f1f1;
}
</style>
