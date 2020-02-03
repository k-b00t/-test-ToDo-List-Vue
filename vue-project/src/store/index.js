import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    taskListGlobal: []
  },
  mutations: {
    readtaskInit(state) {
      state.taskListGlobal = JSON.parse(localStorage.getItem('tasks'));
    },
    addTask(state, task) {
      if(task) {
        state.taskListGlobal.push({
          date: Date.now(),
          dateParsed: '',
          completed: false,
          task
        });
      }
      localStorage.setItem('tasks', JSON.stringify(state.taskListGlobal));
    },
    deleteTask(state, index) {
      state.taskListGlobal.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(state.taskListGlobal));
    },
    setCompletedTask(state, index) {
      state.taskListGlobal[index].completed = !state.taskListGlobal[index].completed;
      localStorage.setItem('tasks', JSON.stringify(state.taskListGlobal));
    },
  },
  actions: { },
  modules: { }
})