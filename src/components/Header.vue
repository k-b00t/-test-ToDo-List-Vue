<template>
    <b-row>
      <b-col cols='12'>
        <img class='logo' src="../assets/logo.png" alt="logo" />
        <h1 class='text-center font-weight-bold'>{{ title }}</h1>
        <hr />
      </b-col>
    </b-row>
</template>


<script>
  export default {
    name: 'Header',
    props: ['title']
  }
</script>


<style scoped>
  .logo {
    display: block;
    margin: auto;
  }
</style>