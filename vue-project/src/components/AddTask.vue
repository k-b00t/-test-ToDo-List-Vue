<template>
  <b-row class='addTaskRow'>
    <b-col cols='12'>
      <hr />
      <b-form inline method='post'
        @submit.prevent='addTask(inputValue)'
        class='d-flex justify-content-between'>
        <b-input :value='inputValueComputed' @input='updateInputTask'
          type='text'  placeholder='Insert task here...' class='formInput' autocomplete='off'/>
        <b-button type='submit' class='btn btn-danger btn-submit'>Add</b-button>
      </b-form>
      <hr/>
    </b-col>
  </b-row>
</template>


<script>
  import { mapMutations } from 'vuex';

  export default {
    name: 'AddTask',
    data() {
      return {
        inputValue: '',
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
    padding-bottom: 20px;
    background: white;
  }
  .formInput {
    width: 85%;
  }
  .btn-submit {
    width: 13%;
  }
</style>