<template>
    <b-row>
      <b-col cols='12'>
        <img class='logo' src="../assets/logo.png" alt="logo" />
        <h1 class='text-center font-weight-bold title'>{{ title }}</h1>
        <div :style='styleAlert' class='alert alert-warning text-center' role='alert'>{{ messageNewTaskComputed }}</div>
      </b-col>
    </b-row>
</template>


<script>
  export default {
    name: 'Header',
    props: ['title'],
    computed: {
      messageNewTaskComputed() {
        return this.$store.state.messageNewTask
      },
      styleAlert() {
          return (this.$store.state.messageNewTask) ? {opacity:1} : {opacity:0}
      }
    }
  }
</script>


<style scoped>
  .logo {
    display: block;
    margin: auto;
  }
  .alert {
    transition: 300ms;
  }
</style>