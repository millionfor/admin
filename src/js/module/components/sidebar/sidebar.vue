<template>
  <div class="sidebar-model">
    <div class="logo-model">
      <img src="./tx.jpeg" alt="" class="avr">
      <p class="text">{{userInfo.user_name}}</p>
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
    <div class="logout">
      <a href="javascript:" @click="logout">
        <i class="el-icon-back"></i>
        <span>退出登录</span>
      </a>
    </div>
  </div>
</template>
<script>
  import io from '@/module/io'
  import { mapState } from 'vuex'
  export default {
    name: 'sidebar',
    data () {
      return {}
    },
    props: {},
    methods: {
      logout () {
        io.get('users/logout').then(res => {
          window.location.href = '/view/login'
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

    },
    beforeUpdate () {
    },
    updated () {
    },
    beforeDestroy () {
    },
    destroyed () {
    },
    computed: {
      ...mapState('users', ['userInfo'])
    },
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
        color: #FFD04A;
      }
    }
    .logout {
      position: absolute;
      bottom: 0;
      left: 0;
      a {
        height: 44px;
        line-height: 44px;
        background: #454b54;
        text-align: center;
        display: block;
        font-size: 14px;
        text-decoration: none;
        color: #FFD04A;
        width: 200px;
        &:hover {
          background: #363B44;
        }
        i {
          font-weight: bold;
          vertical-align: middle;
          font-size: 16px;
        }
        span {
          vertical-align: middle;
        }
      }
    }
  }
</style>
