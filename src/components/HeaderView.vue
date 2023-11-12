<template>
  <div class="header">
    <div>
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></el-avatar>
    </div>
    <div>{{ $t("appTitle") }}</div>
    <el-select v-model="lang" size="mini" placeholder="" @change="langChange">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data () {
    return {
      lang: 'zh',
      options: [
        {
          value: 'zh',
          label: '中文'
        },
        {
          value: 'kaz',
          label: 'قازاقشا'
        }
      ]
    }
  },

  async created () {
    const locale = await this.$localStore.getStore('lang')
    this.lang = locale || 'zh'
  },

  methods: {
    async langChange (lang) {
      this.$i18n.locale = lang
      await this.$localStore.setStore('lang', lang)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  z-index: 99;
  overflow: hidden;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid #f1f1f1;
}
</style>
