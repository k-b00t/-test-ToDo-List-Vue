<template>
    <b-row class='addTaskRow'>
      <b-col cols='12'>
        <hr />
        <b-form inline method='post'
          @submit.prevent='addTask(inputValue)'
          class='d-flex justify-content-between'>
          <b-input :value='inputValueComputed' @input='updateInputTask'
            type='text'  placeholder='Insert task here...' class='formInput' autocomplete='off'/>
          <b-button type='submit' class='btn btn-danger'>Add</b-button>
        </b-form>
      </b-col>
    </b-row>
</template>


<script>
  import { mapMutations } from 'vuex';

  export default {
    name: 'AddTask',
    data() {
      return {
        inputValue: ''
      }
    },
    computed: {
      inputValueComputed() {
        return this.inputValue;
      }
    },
    methods: {
      updateInputTask(e) {
        this.inputValue = e;
      },
      ...mapMutations(['addTask'])
    }
  }
</script>


<style scoped>
  .addTaskRow {
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 1140px;
    padding-bottom: 20px;
    background: white;
  }
  .formInput {
    width: 90%;
  }
</style>