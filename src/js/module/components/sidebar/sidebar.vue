<template>
  <div class="sidebar-model">
    <div class="logo-model">
      <img src="./tx.jpeg" alt="" class="avr">
      <p class="text">millionfor@gmail.com</p>
    </div>
    <el-menu
            router="true"
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">后台首页</span>
      </el-menu-item>

      <el-menu-item index="/classify/list">
        <i class="el-icon-star-off"></i>
        <span slot="title">分类管理</span>
      </el-menu-item>

      <el-menu-item index="/photo/list" >
        <i class="el-icon-picture-outline"></i>
        <span slot="title">照片管理</span>
      </el-menu-item>

      <el-menu-item index="/setting">
        <i class="el-icon-setting"></i>
        <span slot="title">参数配置</span>
      </el-menu-item>

      <el-menu-item index="/qn-config">
        <i class="el-icon-upload"></i>
        <span slot="title">七牛云配置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
  export default {
    name: 'sidebar',
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
    components: {}
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .sidebar-model {
    width: 200px;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #545c64;
    .logo-model {
      width: 200px;
      background: #454B54;
      text-align: center;
      padding: 30px 0;
      .avr {
        width: 60px;
        height: 60px;
        border-radius: 100%;
        margin: 0 auto;
      }
      .text {
        color: #fff;
      }
    }
  }
</style>
