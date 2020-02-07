import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    url: 'http://localhost:3001',
    username: '',
    messageNewTask: '',
    taskListGlobal: []
  },
  mutations: {
    readtaskInit(state) {
      fetch(`${state.url}/tasks`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }).then((data)=> {
        return data.json();
      }).then((data)=>{
        if(data.getTask) {
          state.taskListGlobal = data.data;
        } else {
          this.commit('warningCatch', data.message);
        }
      }).catch((err)=>{
        this.commit('warningCatch', err);
      })
    },
    addTask(state, task) {
      if(task) {
        const taskObj = {
          date: Date.now(),
          dateParsed: 'initial',
          completed: false,
          task
        }
        fetch(`${state.url}/task`,{
          method: 'POST',
          body: JSON.stringify(taskObj),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        }).then((data)=>{
          return data.json()
        }).then((data)=>{
          if(data.postTask) {
            taskObj.id = data.id;
            state.taskListGlobal.push(taskObj);
          } else {
            this.commit('warningCatch', data.message);
          }
        }).catch((err)=>{
          this.commit('warningCatch', err.message);
        })
      }
    },
    deleteTask(state, index) {
      fetch(`${state.url}/task/${state.taskListGlobal[index].id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }).then((data)=>{
        return data.json()
      }).then((data)=>{
        if(data.deleteTask) {
          state.taskListGlobal.splice(index, 1);
        } else {
          this.commit('warningCatch', data.message);
        }
      }).catch((err)=>{
        this.commit('warningCatch', err);
      })
    },
    setCompletedTask(state, index) {
      const dataObj = {...state.taskListGlobal[index]};
      dataObj.completed = !dataObj.completed;
      fetch(`${state.url}/task`, {
        method: 'PUT',
        body: JSON.stringify(dataObj),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }).then((data)=>{
        return data.json();
      }).then((data)=>{
        if(data.putTask){
          state.taskListGlobal[index].completed = !state.taskListGlobal[index].completed;
        } else {
          this.commit('warningCatch', data.message);
        }
      }).catch((err)=>{
        this.commit('warningCatch', err);
      })
    },
    warningCatch(state, message) {
      state.messageNewTask = message;
      setTimeout(()=> state.messageNewTask = '' , 2500);
    }
  },
  actions: { },
  modules: { }
})