<template>
  <div class="home">
    <p>hello analysys</p>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'home',
  data () {
    return {
      show: false
    }
  },
  methods: { },
  mounted () {
    console.log($('.home').size())
  }
}
</script>

<style lang="scss">
.home {
  color: #f00;
}
</style>
