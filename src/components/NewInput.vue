
<template>
  <el-input :value="value" v-bind="$attrs" @blur="$emit('blur', $event)" @focus="$emit('focus', $event)" @clear="$emit('clear', $event)" @change="$emit('change', $event)" @input="inputChange">
    <slot name="prefix" slot="prefix"></slot>
    <slot name="suffix" slot="suffix"></slot>
    <slot name="prepend" slot="prepend"></slot>
    <slot name="append" slot="append"></slot>
  </el-input>
</template>

<script>
export default {
  name: 'NewInput',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    formatter: {
      type: Function,
      default: (v) => v
    }
  },
  methods: {
    inputChange (val) {
      const input = this.formatter(val)
      this.$emit('input', input)
    }
  }
}
</script>
