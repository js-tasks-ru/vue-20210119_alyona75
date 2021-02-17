<template>
  <form class="form" @submit.prevent='submitLoginForm'>
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input
          type="email"
          placeholder="demo@email"
          class="form-control"
          v-model="formData.email"
        />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input
          type="password"
          placeholder="password"
          class="form-control"
          v-model="formData.password"
        />
      </div>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary button_block" >
        Войти
      </button>
    </div>
    <div class="form__append">
      Нет аккаунта?
      <router-link :to="{name: 'registerPage'}" class="link">Зарегистрируйтесь</router-link>
    </div>
  </form>
</template>

<script>
import { login } from '../data';


export default {
  name: 'LoginPage',

  data() {
    return{
      formData: {
        email: '',
        errorEmail: 'Требуется ввести Email',
        password: '',
        errorPassword: 'Требуется ввести пароль',
      },    
    }
  },

  methods: {
    async submitLoginForm() {
      if(!this.formData.email) {
        alert(this.formData.errorEmail); 
        return ;
      }
      if(!this.formData.password) {
        alert(this.formData.errorPassword); 
        return;
      }

      let response = await login(this.formData.email, this.formData.password);
      if(response.error) {
        alert(response.message);
        return;
      }
      else alert(response.fullname);
    }
  }
};
</script>

<style scoped></style>
