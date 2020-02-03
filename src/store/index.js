import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    taskListGlobal: []
  },
  mutations: {
    addTask(state, task) {
      if(task) {
        state.taskListGlobal.push({
          date: Date.now(),
          dateParsed: '',
          completed: false,
          task
        });
      }
    },
    deleteTask(state, index) {
      state.taskListGlobal.splice(index, 1);
    },
    setCompletedTask(state, index) {
      state.taskListGlobal[index].completed = !state.taskListGlobal[index].completed;
    }
  },
  actions: { },
  modules: { }
})