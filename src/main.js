import Vue from 'vue'
import ElementUI from 'element-ui'
import VueI18n from 'vue-i18n'
import '@/styles/element-variables.scss'

import App from './App.vue'
import router from './router'
import store from './store'
import apis from '@/utils/apis'
import localStore from '@/utils/store'

Vue.use(ElementUI)
Vue.use(VueI18n)

Vue.prototype.$apis = apis
Vue.prototype.$localStore = localStore

Vue.config.productionTip = false

async function initHandel () {
  const locale = await localStore.getStore('lang')
  const i18n = new VueI18n({
    locale: locale || 'zh', // 语言标识. 通过切换locale的值来实现语言切换
    messages: {
      zh: require('@/langs/zh'), // 中文语言包
      kaz: require('@/langs/kaz') // 哈萨克语言包
    }
  })

  new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
  }).$mount('#app')
}

initHandel()
