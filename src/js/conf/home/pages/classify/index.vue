<template>
  <el-container>
    <el-aside width="200px">
      <m-sidebar></m-sidebar>
    </el-aside>
    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  import mSidebar from '@/module/components/sidebar/sidebar'
  export default {
    name: 'classify-index',
    data () {
      return {}
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
    components: { mSidebar }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .index-model {

  }
</style>
