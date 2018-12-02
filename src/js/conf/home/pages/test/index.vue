<template>
  <div class="index-model">
    <div id="dom1"></div>
    <div id="dom2"></div>
    <el-radio v-model="radio" label="1">备选项1</el-radio>
    <el-radio v-model="radio" label="2">备选项2</el-radio>
    <el-radio v-model="radio" label="3">备选项3</el-radio>
    <el-radio v-model="radio" label="4">备选项4</el-radio>
    <el-radio v-model="radio" label="5">备选项5</el-radio>
    <el-radio v-model="radio" label="6">备选项6</el-radio>
  </div>
</template>
<script>
  import Vue from 'vue'
import { Radio } from 'element-ui'
export default {
    name: 'index',
    data () {
      return {
        value: 1,
        radio: '5'
      }
    },
    props: {},
    methods: {},
    watch: {},
    beforeCreate () {
    },
    created () {
    },
    beforeMount () {
    },
    mounted () {
      this.value = 2
      new Vue({
        render: h => h(Radio, {
          on: {

          },
          props: {
            label: 1,
            value: this.value
          }
        })
      }).$mount('#dom1')
      new Vue({
        render: h => h(Radio, {
          on: {

          },
          props: {
            label: 2,
            value: this.value
          }
        })
      }).$mount('#dom2')
    },
    beforeUpdate () {
    },
    updated () {
    },
    beforeDestroy () {
    },
    destroyed () {
    },
    computed: {},
    components: {}
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .index-model {

  }
</style>
