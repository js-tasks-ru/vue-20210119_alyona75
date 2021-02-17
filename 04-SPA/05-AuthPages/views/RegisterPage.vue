<template>
  <form class="form" @submit.prevent='submitRegisterForm'>
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input type="email" class="form-control" v-model='formData.email'/>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Имя</label>
      <div class="input-group">
        <input type="text" class="form-control" v-model='formData.fullName'/>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input type="password" class="form-control" v-model='formData.password'/>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Повтор пароля</label>
      <div class="input-group">
        <input type="password" class="form-control" v-model='formData.repeatPassword' />
      </div>
    </div>
    <div class="form-group">
      <label class="checkbox"><input type="checkbox" v-model='formData.checkAgreement'/> Я согласен с условиями <span></span></label>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary">Зарегистрироваться</button>
    </div>
    <div class="form__append">Уже есть аккаунт? <router-link :to="{name: 'loginPage'}" class="link">Войдите</router-link></div>
  </form>
</template>

<script>
import { register } from '../data';

export default {
  name: 'RegisterPage',

  data() {
    return {
      formData: {
        email: '',
        errorEmail: 'Требуется ввести Email',
        password: '',
        errorPassword: 'Требуется ввести пароль',
        fullName: '',
        errorFullName: 'Требуется ввести полное имя',
        repeatPassword: '',
        errorRepeatPassword: 'Пароли не совпадают',
        checkAgreement: false,
        errorCheckAgreement: 'Требуется согласиться с условиями'
      }
    }
  },

  methods: {
    async submitRegisterForm() {
      if(!this.formData.email) {
        alert(this.formData.errorEmail);
        return;
      }
      if(!this.formData.fullName) {
        alert(this.formData.errorFullName);
        return;
      }
      if(!this.formData.password) {
        alert(this.formData.errorPassword);
        return;
      }
      if(!this.formData.repeatPassword || (this.formData.password != this.formData.repeatPassword)) {
        alert(this.formData.errorRepeatPassword);
        return;
      }
      if(!this.formData.checkAgreement) {
        alert(this.formData.errorCheckAgreement);
        return;
      }

      let response = await register(this.formData.email, this.formData.fullName, this.formData.password);
      if(response.error) {
        alert(response.message);
        return;
      }
      else {
        alert(response.id);
      }
    }
  }
};
</script>

<style scoped></style>
