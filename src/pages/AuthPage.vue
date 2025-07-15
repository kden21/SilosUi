<script setup lang="ts">
import { ref } from 'vue';
import type { Ref,} from 'vue';
import { apiService } from 'src/services/SilosApiService';
import type { LoginDto } from 'src/models/LoginDto';
import { notifyService } from 'assets/scripts/notify';
import { routerService } from 'src/services/router.service';
import { UserRole } from 'src/models/UserDto';

const loginDto : Ref<LoginDto> = ref<LoginDto>({
  userName: '',
  password: ''
});
async function logIn() {
  try {
    const userDto = await apiService.logIn(loginDto.value)

    localStorage.setItem('token', userDto.token);
    localStorage.setItem('role', UserRole[userDto.role]);

    routerService.navigateAfterLogin()
  }
  catch (error) {
    if (error instanceof Error) {
      notifyService.error('Произошла ошибка при авторизации', error.message);
    } else {
      notifyService.error('Произошла неизвестная ошибка при авторизации');
    }
  }
}

</script>

<template>
  <div class="fullscreen text-center flex bg-login">

  </div>
  <div class="login-card">
    <div class="login-card-user">
      <q-avatar size="100px" color="primary" text-color="white" icon="account_circle" />
      <div class="q-gutter-md" style="width: 250px; padding: 10px">
        <q-input v-model="loginDto.userName" label="Логин" />
        <q-input v-model="loginDto.password" label="Пароль" type="password" />
        <div class="row justify-center full-width">
          <q-btn color="primary" no-caps label="Войти" @click="logIn()" padding="10px 30px" size="20px" style="margin-top: 15px" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.bg-login
  position: absolute
  background-size: cover
  background-image: url('public/back1.jpg')
  background-position: center
  background-repeat: no-repeat
  background-color: rgba(0, 0, 0, 1)
  align-items: center
  justify-content: center
  z-index: -1
  filter: blur(5px)/* Размытие фона */
  transform: scale(1.05)
.login-card
  transform: translate(-50%, -50%)
  z-index: 20
  max-width: 500px
  position: absolute
  top: 50%
  left: 50%
  padding: 50px
  width: 400px
  height: 400px
  background-color: rgba(255, 255, 255, 0.8)
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px
  display: flex
  align-items: center
  justify-content: center
  gap: 30px
  border-radius: 15px

.login-card-user
  display: flex
  flex-direction: column
  gap: 15px
  align-items: center
</style>
