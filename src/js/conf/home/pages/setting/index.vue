<template>
  <el-container>
    <el-aside width="200px">
      <m-sidebar></m-sidebar>
    </el-aside>
    <el-container>
      <el-main>
        <el-breadcrumb  separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">后台首页</el-breadcrumb-item>
          <el-breadcrumb-item>基本设置</el-breadcrumb-item>
        </el-breadcrumb>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import $ from 'jquery'
  import mSidebar from '@/module/components/sidebar/sidebar'

  export default {
    name: 'setting-index',
    data () {
      return {
      }
    },
    methods: { },
    mounted () {

    },
    components: { mSidebar }
  }
</script>

<style lang="scss">
</style>
