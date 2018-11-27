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

        <div class="conditions">

        </div>
        <div class="form-content">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="姓名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio v-model="form.gender" label="1">男</el-radio>
              <el-radio v-model="form.gender" label="2">女</el-radio>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.email" ></el-input>
            </el-form-item>
            <el-form-item label="QQ">
              <el-input v-model="form.qq"></el-input>
            </el-form-item>
            <el-form-item label="微信">
              <el-input v-model="form.wechat"></el-input>
            </el-form-item>
            <el-form-item label="微博">
              <el-input v-model="form.weibo"></el-input>
            </el-form-item>
            <el-form-item label="poco摄影">
              <el-input v-model="form.poco"></el-input>
            </el-form-item>
            <el-form-item label="网易摄影">
              <el-input v-model="form.wangyi"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input type="textarea" v-model="form.address"></el-input>
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
    name: 'setting-index',
    data () {
      return {
        form: {
          name: '',
          gender: '1',
          email: '',
          qq: '',
          wechat: '',
          weibo: '',
          address: '',
          poco: '',
          wangyi: ''
        }
      }
    },
    methods: {
      onSubmit () {
        io.post('setting/update', this.form, res => {
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
      io.get('setting/findById', res => {
        let data = res.data[0]
        this.form.name = data.name
        this.form.gender = data.gender
        this.form.email = data.email
        this.form.qq = data.qq
        this.form.wechat = data.wechat
        this.form.weibo = data.weibo
        this.form.address = data.address
        this.form.poco = data.poco
        this.form.wangyi = data.wangyi
      })
    },
    components: { mSidebar }
  }
</script>

<style lang="scss">
</style>
