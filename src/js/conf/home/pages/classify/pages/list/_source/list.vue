<template>
  <div class="list-model">
    <el-table
            :data="list"
            border
            style="width: 100%">
      <el-table-column
              width="60"
              align="center"
              prop="classifys_id"
              label="序号">
      </el-table-column>
      <el-table-column
              prop="classifys_cn_name"
              label="姓名">
      </el-table-column>
      <el-table-column
              prop="classifys_en_name"
              label="英文名">
      </el-table-column>
      <el-table-column
              width="100"
              align="center"
              prop="classifys_rank"
              label="排序">
      </el-table-column>
      <el-table-column
              prop="classifys_desc"
              label="描述">
      </el-table-column>
      <el-table-column
              prop="createTime"
              label="创建时间">
      </el-table-column>
      <el-table-column
              prop="updateTime"
              label="更新时间">
      </el-table-column>
      <el-table-column
              width="100"
              label="操作">
        <template slot-scope="scope">
          <router-link :to="{ path: `/classify/details/${scope.row.classifys_id}`}">
            <el-button type="primary" icon="el-icon-edit" size="small" circle></el-button>
          </router-link>

          <el-popover
                  placement="top"
                  width="160"
                  v-model="visible[scope.$index]">
            <p>确认删除这个分类吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="onClose(scope.$index)">取消</el-button>
              <el-button type="primary" size="mini" @click="onDelete(scope.row,scope.$index)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" icon="el-icon-delete" size="small" circle ></el-button>
          </el-popover>

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import _ from 'lodash'
  import io from '@/module/io'
  import { rtDate } from '@/module/util'

  export default {
    name: 'list',
    data () {
      return {
        list: [],
        visible: {}
      }
    },
    props: {},
    methods: {
      getList () {
        io.get('classifys/list').then(res => {
          this.list = res.data
          _.filter(this.list, v => {
            v.createTime = v.createTime && rtDate(v.createTime) || '-'
            v.updateTime = rtDate(v.updateTime)
          })
        })
      },
      onDelete (item, i) {
        this.visible[i] = false
        io.post('classifys/delete', { classifysId: item.classifys_id }).then(res => {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.getList()
        }).catch(e => {
          this.$message.error(e.msg)
        })
      },
      onClose (i) {
        this.visible[i] = false
      }
    },
    watch: {},
    beforeCreate () {
    },
    created () {
      this.getList()
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
    components: {}
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .list-model {

  }
</style>
