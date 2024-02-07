<template>
    <div class="container">
        <h1 style="text-align: center; margin-top: 20px;">Регистрация</h1>
        <br />
        <br />
        <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
                <v-form ref="registrationForm" @submit.prevent>
                    <div class="form-group">
                      <v-text-field
                        v-model="email"
                        name="email"
                        label="Почта"
                        :rules="emailRule"
                        hide-details="auto"
                      ></v-text-field>
                    </div>
                    <br />
                    <div class="form-group">
                      <v-text-field
                        v-model="login"
                        name="login"
                        label="Логин пользователя"
                        :rules="loginRule"
                        hide-details="auto">
                      </v-text-field>
                    </div>
                    <br />
                    <div class="form-group">
                      <v-text-field
                        v-model="firstName"
                        name="firstName"
                        label="Имя"
                        :rules="nameRule"
                        hide-details="auto">
                      </v-text-field>
                    </div>
                    <br />
                    <div class="form-group">
                      <v-text-field
                        v-model="lastName"
                        name="secondName"
                        label="Фамилия"
                        :rules="lastNameRule"
                        hide-details="auto">
                      </v-text-field>
                    </div>
                    <br />
                    <div class="form-group">
                      <v-text-field
                        v-model="iinNumber"
                        name="iinNumber"
                        label="ИИН номер"
                        :rules="iinRule"
                        hide-details="auto">
                      </v-text-field>
                    </div>
                    <br />
                    <div class="form-group">
                      <v-text-field
                        v-model="phoneNumber"
                        name="phoneNumber"
                        label="Номер телефона"
                        :rules="phoneRule"
                        hide-details="auto">
                      </v-text-field>
                    </div>
                    <br />
                    <div class="form-group">
                      <v-text-field
                        v-model="password"
                        type="password"
                        name="password"
                        label="Придумайте пароль"
                        :rules="passwordRule"
                        hide-details="auto">
                      </v-text-field>
                    </div>
                    <br />
                    <div class="form-group">
                      <v-text-field
                        v-model="repPassword"
                        type="password"
                        label="Повторите пароль"
                        :rules="repPasswordRules"
                        name="repeated password"
                      ></v-text-field>
                    </div>
                    <br />
                  <v-btn type="submit" @click="send" block class="btn-primary">Зарегистрироваться</v-btn>
                </v-form>
            </div>
            <div class="col-md-3"></div>
        </div>
    </div>
</template>

<script>

import authMixin from '@/scripts/authMixin';
import axios from 'axios'
export default {

  data: () => ({
    email: '',
    emailRule: [
      value => !!value || 'Объязательное поле.',
      value => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'введите свою почту в формате: example@email.com'
      }
    ],
    login: '',
    loginRule: [
      value => !!value || 'Придумайте логин.',
      value => {
        const pattern =
          /^[A-z0-9_-]{3,15}$/
        return pattern.test(value) || 'Логин не соответстует требованиям'
      }
    ],
    firstName: '',
    nameRule: [
      value => !!value || 'Введите своё имя.',
      value => value.length > 1 || 'Длина имени должна быть больше одной буквы',
      value => {
        const pattern =
          /^[A-zА-я,ӘәІіӨөҺһҒғҚқҢңҰұҮү]{2,20}$/
        return pattern.test(value) || 'Введите своё настоящее имя'
      }
    ],
    lastName: '',
    lastNameRule: [
      value => !!value || 'Введите свою фамилию.',
      value => value.length > 1 || 'Длина фамилии должна быть больше одной буквы',
      value => {
        const pattern =
          /^[A-zА-я,ӘәІіӨөҺһҒғҚқҢңҰұҮү]{2,20}$/
        return pattern.test(value) || 'Введите свою настоящую фамилию'
      }
    ],
    iinNumber: '',
    iinRule: [
      value => !!value || 'введите свой ИИН',
      value => value.length === 12 || 'ИИН должен содержать 12 цифр',
      value => {
        const pattern =
          /^[0-9]{12,12}$/
        return pattern.test(value) || 'ИИН должен содержать только цифры!'
      }
    ],
    phoneNumber: '',
    phoneRule: [
      value => {
        const pattern =
          /^[+7]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
        return pattern.test(value) || 'Введите номер телефона начиная с +7'
      }
    ],
    password: '',
    passwordRule: [
      value => !!value || 'Придумайте пароль',
        value => {
          const pattern =
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?).{8,}$/
          return pattern.test(value) || 'Пароль должна содержать минимум 1 большую букву и 1 цифру'
        }
    ],
    repPassword: '',
    repPasswordRules: [
      value => !!value || 'Повторите пароль'
    ]
  }),
  methods: {
    async send() {
      if (this.repPassword !== this.password) {
        alert('Пароли не совпадают!')
        return 0;
      }
      const ans = await this.$refs.registrationForm.validate();
      if (ans.valid === false) {
        alert('Форма заполнена неправильно!')
        return 0;
      }
      let vm = {
        FirstName: this.firstName,
        LastName: this.lastName,
        UserName: this.login,
        IIN: this.iinNumber,
        Mail: this.email,
        Phone: this.phoneNumber.slice(-10),
        Password: this.password,
        ConfirmPassword: this.repPassword
      }
      console.log(vm)

      axios.post('http://localhost:5174/bff/user/createUser', vm)
        .then(response => console.log(response))
    }
  },
  mixins: [authMixin],
  fetchData() {
      if (this.userManager && this.userManager.getUser()) {
        // Perform authorized actions here
      } else {
        this.login();
      }
    },

}
</script>

<style scoped></style>
