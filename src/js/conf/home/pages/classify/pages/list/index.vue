<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">后台首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'classify-list' }">分类管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="conditions">
      <router-link :to="{ name: `classify-create`}">
        <el-button type="primary">添加分类</el-button>
      </router-link>
      <div class="search">
        <el-input
                placeholder="请输入搜索关键词"
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
  import mList from './_source/list'

  export default {
    name: 'classify-list-index',
    data () {
      return {

      }
    },
    methods: { },
    mounted () {

    },
    components: { mList }
  }
</script>

<style lang="scss">
</style>
