<template>
  <div class="classify-create-model">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">后台首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'classify-list' }">分类管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加分类</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="conditions">

    </div>
    <div class="form-content">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.classifysCnName"></el-input>
        </el-form-item>
        <el-form-item label="英文名称">
          <el-input v-model="form.classifysEnName"></el-input>
        </el-form-item>
        <el-form-item label="排序等级">
          <div style="width: 100px">
            <el-input v-model="form.classifysRank" ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="form.classifysDesc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">{{$route.params.id ? '更新分类' :'创建分类'}}</el-button>

          <router-link :to="{ name: `classify-list`}">
            <el-button >取消</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import io from '@/module/io'
  export default {
    name: 'classify-create-model',
    data () {
      return {
        form: {
          classifysCnName: '',
          classifysEnName: '',
          classifysDesc: '',
          classifysRank: 1
        }
      }
    },
    props: {},
    methods: {
      onSubmit () {
        let id = parseInt(this.$route.params.id) || null
        if (id) {
          let o = Object.assign(this.form, {}, {
            classifysId: id
          })
          io.post('classifys/update', o).then((res) => {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.$router.push({ name: 'classify-list' })
          }).catch(e => {
            this.$message.error(e.msg)
          })
        } else {
          io.post('classifys/create', this.form).then((res) => {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.$router.push({ name: 'classify-list' })
          }).catch(e => {
            this.$message.error(e.msg)
          })
        }
      },
      getDetails () {
        io.post('classifys/findById', {
          classifysId: this.$route.params.id
        }).then((res) => {
          let data = res.data[0]
          this.form.classifysCnName = data.classifys_cn_name
          this.form.classifysEnName = data.classifys_en_name
          this.form.classifysDesc = data.classifys_desc
          this.form.classifysRank = data.classifys_rank
        })
      }
    },
    watch: {},
    beforeCreate () {
    },
    created () {

    },
    beforeMount () {
    },
    mounted () {
      if (this.$route.name === 'classify-details') {
        this.getDetails()
      }
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
  .classify-create-model {

  }
</style>
