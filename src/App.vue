<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script type="application/ecmascript">
  export default {
    name: 'App'
  }
</script>

<style scoped lang="less">
  body, html {
    padding: 0;
    margin: 0;
    overflow: hidden;
  }
</style>
<style>
  #nprogress .bar {
    background: #1ecd3b !important;
  }
</style>
