<template>
  <b-container>
    <Header title='ToDo List'/>
    <List />
    <AddTask />
  </b-container>
</template>


<script>
  import Header from '../components/Header.vue'
  import List from '../components/List.vue'
  import AddTask from '../components/AddTask.vue'

  export default {
    name: 'home',
    components: {
      Header,
      List,
      AddTask
    }
  }
</script>