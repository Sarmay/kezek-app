<template>
  <yu-input
    ref="yuInput"
    :value="currentValue"
    :formatter="formatterChineseName"
    v-bind="$attrs"
    @blur="blurHandel($event)"
    @focus="$emit('focus', $event)"
    @clear="$emit('clear', $event)"
    @change="$emit('change', $event)"
    @input="inputChange"
  >
    <yu-svg-icon
      slot="suffix"
      type="dot"
      class="ft20 cp mr4 mt10"
      @click="addDot"
    ></yu-svg-icon>
  </yu-input>
</template>

<script>
import { formatterChineseName } from '@/utils/utils'
export default {
  name: 'DotNameInput',
  model: {
    prop: 'currentValue',
    event: 'input'
  },
  props: {
    currentValue: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      selectionStart: 0,
      selectionEnd: 0,
      inputEle: {}
    }
  },
  methods: {
    // 格式化中文名字
    formatterChineseName,

    inputChange (val) {
      this.$emit('input', val)
    },

    blurHandel (event) {
      this.selectionStart = event.target.selectionStart || 0
      this.selectionEnd = event.target.selectionEnd || 0
      this.inputEle = event.target
    },

    addDot () {
      const value = this.currentValue
      const index = value.indexOf('·')
      if (index > 0 || !value || this.selectionStart < 1) return
      const strStart = value.substring(0, this.selectionStart)
      const strEnd = value.substring(this.selectionEnd, value.length)
      this.$emit('input', `${strStart}·${strEnd}`)
      this.inputEle.focus()
      this.inputEle.setSelectionRange(value.length, value.length)
    }
  }
}
</script>
