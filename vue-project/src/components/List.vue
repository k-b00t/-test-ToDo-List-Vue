<template>
  <b-row class='rowList'>
    <b-col cols='12'>
      <div v-for='(task, i) of taskListComputed' :key='i'
        @click='setCompletedTask(i)'
        :class='getCompletedTask(task["completed"])'
        role="alert">
        <p>{{ task.task }}</p>
        <div class='d-flex flex-column'>
          <button @click.stop='deleteTask(i)' class='deleteTask'>x</button>
          <small>{{ task.dateParsed }}</small>
        </div>
      </div>
    </b-col>
  </b-row>
</template>


<script>
  import moment from 'moment';
  import { mapMutations } from 'vuex';

  export default {
    name: 'List',
    data() {
      return {
        dateCache: []
      }
    },
    computed: {
      taskListComputed() {
        return this.$store.state.taskListGlobal;
      },
    },
    methods: {
      ...mapMutations(['deleteTask', 'setCompletedTask']),
      getCompletedTask(task) {
        return (task)
          ? 'alert alert-success d-flex justify-content-between'
          : 'alert alert-danger d-flex justify-content-between';
      },
      actualizeDateArray(taskList, dateCache) {
        dateCache.forEach((d, i)=>{
          clearInterval(dateCache[i]);
        });
        taskList.forEach((d, i)=>{
          const actualizeDate = ()=>{
            d.dateParsed = moment(d.date).fromNow()
          };
          actualizeDate();
          dateCache[i] = setInterval(actualizeDate, 1000);
        })
      },
    },
    created() {
      this.actualizeDateArray(this.$store.state.taskListGlobal, this.dateCache);
    },
    beforeUpdate() {
      this.actualizeDateArray(this.$store.state.taskListGlobal, this.dateCache);
    }
  };
</script>


<style scoped>
  .rowList {
    overflow: hidden;
    margin-bottom: 100px;
    transition: 300ms;
  }
  .deleteTask {
    position: relative;
    top: -10px;
    right: -40px;
    background: transparent;
    border: none;
  }
  .deleteTask:focus,
  .deleteTask:active {
    outline: none;
  }
  .deleteTask::selection {
    background: none;
  }
  .alert {
    transition: 150ms !important;
  }
</style>