<template>
  <div id="app">
    <keep-alive exclude="search,movieDetail">
      <router-view/>
    </keep-alive>
    <tab></tab>
  </div>
</template>

<script>
  import Tab from 'base/tab/tab'
export default {
  name: 'App',
  components: {
    Tab
  }
}
</script>

<style>
</style>
