<template>
  <el-container>
    <el-aside width="200px">
      <m-sidebar></m-sidebar>
    </el-aside>
    <el-container>
      <el-main>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">后台首页</el-breadcrumb-item>
          <el-breadcrumb-item>分类管理</el-breadcrumb-item>
          <el-breadcrumb-item>分类列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="padding-top: 20px;">
          <el-table
                  :data="tableData6"
                  border
                  show-summary
                  style="width: 100%">
            <el-table-column
                    prop="id"
                    label="ID"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="amount1"
                    sortable
                    label="数值 1">
            </el-table-column>
            <el-table-column
                    prop="amount2"
                    sortable
                    label="数值 2">
            </el-table-column>
            <el-table-column
                    prop="amount3"
                    sortable
                    label="数值 3">
            </el-table-column>
          </el-table>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import $ from 'jquery'
  import mSidebar from '@/module/components/sidebar/sidebar'

  export default {
    name: 'classify-list-index',
    data () {
      return {
        tableData6: [{
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }]
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
