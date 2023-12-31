import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lang: 'zh'
  },
  mutations: {
    changeLang (state, lang) {
      state.lang = lang
    }
  },
  actions: {
  },
  modules: {
  }
})
