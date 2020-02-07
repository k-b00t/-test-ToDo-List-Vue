<template>
  <div>
    <div :style='styleAlert' class="alert alert-danger" role="alert">{{ message }}</div>
    <form @submit.prevent.stop='submitForm'
      class='border rounded py-5 px-4 form'>
      <input type='text' autocomplete='off' class='form-control my-1'
        :value='username' @input='setUsernameValue'
        :placeholder='placeholderUsername'>
      <input type='password' autocomplete='off' class='form-control my-1'
        :value='password' @input='setPasswordValue'
        :placeholder='placeholderPassword'>
      <button type='submit' class='btn btn-info btn-block my-1'>LogIn</button>
    </form>
  </div>
</template>


<script>
  export default {
    name: 'login',
    data() {
      return {
        form: {
          username: {
            value: '',
            placeholder: 'Username'
          },
          password: {
            value: '',
            placeholder: 'Password'
          }
        },
        styleAlert: {opacity: 0},
        message: ''
      }
    },
    computed: {
      username() {
        return this.form.username.value
      },
      placeholderUsername() {
        return this.form.username.placeholder
      },
      password() {
        return this.form.password.value
      },
      placeholderPassword() {
        return this.form.password.placeholder
      }
    },
    methods: {
      setUsernameValue(e) {
        this.form.username.value = e.target.value
      },
      setPasswordValue(e) {
        console.log(e)
        this.form.password.value = e.target.value
      },
      submitForm() {
        const form = {
          username: this.form.username.value,
          password: this.form.password.value
        }
        if(form.username && form.password) {
          fetch(`${this.$store.state.url}/login`, {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          }).then((data)=>{
            return data.json();
          }).then((data)=>{
            if(data.login) {
              this.$router.push('/');
            } else {
              this.message = data.message;
              this.styleAlert = {opacity: 1}
            }
          }).catch((err)=>{
            this.message = err;
            this.styleAlert = {opacity: 1}
          })
        }
      }
    },
  }
</script>


<style scoped>
  .alert {
    position: absolute !important;
    top: 20vh;
    left: 50%;
    transform: translate(-50%, 0);
    transition: 150ms;
  }
  .form {
    width:25rem;
    margin:30vh auto 0 auto;
  }
</style>