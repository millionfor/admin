<template>
  <el-container>
    <el-aside width="200px">
      <m-sidebar></m-sidebar>
    </el-aside>
    <el-container>
      <el-main>
        <el-breadcrumb  separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">后台首页</el-breadcrumb-item>
          <el-breadcrumb-item>七牛云图片存储配置</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="conditions">

        </div>
        <div class="form-content">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="accessKey">
              <el-input v-model="form.accessKey"></el-input>
            </el-form-item>
            <el-form-item label="secretKey">
              <el-input v-model="form.secretKey"></el-input>
            </el-form-item>
            <el-form-item label="空间名字">
              <el-input v-model="form.bucket"></el-input>
            </el-form-item>
            <el-form-item label="测试域名">
              <el-input v-model="form.origin"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit()">更改信息</el-button>
              <router-link :to="{ name: `home`}">
                <el-button >取消</el-button>
              </router-link>
            </el-form-item>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  // import $ from 'jquery'
  import io from '@/module/io'
  import mSidebar from '@/module/components/sidebar/sidebar'

  export default {
    name: 'qn-index',
    data () {
      return {
        form: {
          accessKey: '',
          secretKey: '1',
          bucket: '',
          origin: ''
        }
      }
    },
    methods: {
      onSubmit () {
        io.post('qn/update', this.form, res => {
          this.$message({
            message: res.msg,
            type: 'success'
          })
        }).catch(e => {
          this.$message.error(e.msg)
        })
      }
    },
    mounted () {
      io.get('qn/getConfig', ({ data }) => {
        this.form.accessKey = data.access_key
        this.form.secretKey = data.secret_key
        this.form.bucket = data.bucket
        this.form.origin = data.origin
      })
    },
    components: { mSidebar }
  }
</script>

<style lang="scss">
</style>
