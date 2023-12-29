<template>
    <div class="container">
        <h1 style="text-align: center; margin-top: 20px;">Регистрация</h1>
        <br />
        <br />
        <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
                <form>
                    <div class="form-group">
                        <label for="registration-email">Почта</label>
                        <input type="email" class="form-control" id="registration-email" aria-describedby="registration-emailHelp"
                            placeholder="example@email.com">
                        <small id="emailHelp" class="form-text text-muted">введите свою почту в формате: example@email.com</small>
                    </div>
                    <br />
                    <div class="form-group">
                        <label for="registration-login">Логин пользователя</label>
                        <input type="text" class="form-control" id="registration-login" aria-describedby="registration-login"
                            placeholder="UserName">
                        <small id="registration-login" class="form-text text-muted">Придумайте своё имя пользователя</small>
                    </div>
                    <br />
                    <div class="form-group">
                        <label for="registration-firstName">Имя</label>
                        <input type="text" class="form-control" id="registration-firstName" aria-describedby="registration-firstNameHelp"
                            placeholder="Имя">
                        <small id="registration-firstNameHelp" class="form-text text-muted">введите своё имя</small>
                    </div>
                    <br />
                    <div class="form-group">
                        <label for="registration-lastName">Фамилия</label>
                        <input type="text" class="form-control" id="registration-lastName" aria-describedby="registration-lastNameHelp"
                            placeholder="Фамилия">
                        <small id="registration-lastNameHelp" class="form-text text-muted">введите свою фамилию</small>
                    </div>
                    <br />
                    <div class="form-group">
                        <label for="registration-IIN">ИИН</label>
                        <input type="text" class="form-control" id="registration-firstName" aria-describedby="registration-IIN"
                            placeholder="ИИН номер">
                        <small id="registration-IIN" class="form-text text-muted">введите свой ИИн</small>
                    </div>
                    <br />
                    <div class="form-group">
                        <label for="registration-firstName">Номер телефона</label>
                        <input type="text" class="form-control" id="registration-firstName" aria-describedby="firstNameHelp"
                            placeholder="Имя">
                        <small id="emailHelp" class="form-text text-muted">введите свой номер телефона</small>
                    </div>
                    <br />
                    <div class="form-group">
                        <label for="exampleInputPassword1">Придумайте пароль</label>
                        <input type="password" class="form-control" id="registration-password" placeholder="введите пароль">
                    </div>
                    <br />
                    <div class="form-group">
                        <label for="exampleInputPassword1">Придумайте пароль</label>
                        <input type="password" class="form-control" id="registration-repeat" placeholder="повторите свой пароль">
                    </div>
                    <br />
                    <button type="submit" id="registration-sender" class="btn btn-primary">Отправить</button>
                </form>
            </div>
            <div class="col-md-3"></div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped></style>