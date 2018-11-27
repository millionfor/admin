<template>
  <div>
    <el-breadcrumb  separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">后台首页</el-breadcrumb-item>
      <el-breadcrumb-item>照片管理</el-breadcrumb-item>
      <el-breadcrumb-item>照片列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="conditions">
      <router-link :to="{ name: `photo-create`}" >
        <el-button type="primary">添加照片</el-button>
      </router-link>
      <div class="search">
        <el-input
                placeholder="请选择日期"
                suffix-icon="el-icon-search"
                v-model="input2">
        </el-input>
      </div>
    </div>
    <div class="content">
      <m-list></m-list>
    </div>
  </div>
</template>

<script>
  // import $ from 'jquery'
  import mSidebar from '@/module/components/sidebar/sidebar'
  import mList from './_source/list'

  export default {
    name: 'photo-list-index',
    data () {
      return {
      }
    },
    methods: { },
    mounted () {

    },
    components: { mSidebar, mList }
  }
</script>

<style lang="scss">
</style>
