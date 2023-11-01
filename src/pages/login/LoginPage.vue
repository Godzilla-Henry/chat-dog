<template lang="pug">
#login.bg-primary.window-width
  // Background
  .area
    ul.circles
      li
      li
      li
      li
      li
      li
      li
      li
      li
      li
  
  // Content
  .content.window-width
    // Logo
    .logo
      q-icon.text-white(name="pets" size="35px")
      .text-weight-bolder.text-white.q-mx-xs Doggy
      .talk-bubble.tri-right.border.round.btm-left-in
        .talktext
          .text-weight-bolder.text-primary Chat

    // Card
    q-card.formCard.flip-container(:class="{'hover': isHover}")
      .flipper
        // Login
        .front
          q-card-section
            q-card-section
              .text-h6.text-weight-bolder.text-grey-7 Login
            q-separator(inset)
            q-card-section
              q-form.q-gutter-xs(@submit='onSubmit')
                q-input(
                  rounded standout="bg-light-blue-11 text-white"
                  v-model='loginForm.name' 
                  label='Your name *' 
                  :rules="[ val => val && val.length > 0 || 'Please fill in your name!']"
                )
                  template(v-slot:prepend)
                    q-icon(name="person")
                q-input(
                  rounded standout="bg-light-blue-11 text-white"
                  v-model='loginForm.password' 
                  label='Your Password *' 
                  :rules="[ val => val && val.length > 0 || 'Please fill in your password!']"
                )
                  template(v-slot:prepend)
                    q-icon(name="key")
                q-card-actions(align="right")
                  q-btn.q-ml-sm(label='Register' type='reset' color='primary' flat @click="isHover = !isHover")
                  q-btn(label='Login' type='submit' color='primary')
        // Register
        .back
          q-card-section
            q-card-section
              .text-h6.text-weight-bolder.text-grey-7 Register
            q-separator(inset)
            q-card-section
              q-form.q-gutter-xs(@submit='onRegister')
                q-input(
                  rounded standout="bg-blue-6 text-white" 
                  v-model='registerForm.name' 
                  label='Your name *' 
                  :rules="[ val => val && val.length > 0 || 'Please fill in your name!']"
                )
                  template(v-slot:prepend)
                    q-icon(name="person")
                q-input(
                  rounded standout="bg-blue-6 text-white" 
                  v-model='registerForm.password' 
                  label='Your Password *' 
                  :rules="[ val => val && val.length > 0 || 'Please fill in your password!']"
                )
                  template(v-slot:prepend)
                    q-icon(name="key")
                q-input(
                  rounded standout="bg-blue-6 text-white" 
                  v-model='registerForm.phone' 
                  label='Your Phone *' 
                  :rules="[ val => val && val.length > 0 || 'Please fill in your phone!']"
                )
                  template(v-slot:prepend)
                    q-icon(name="phone_iphone")
                q-input(
                  rounded standout="bg-blue-6 text-white"
                  v-model='registerForm.email' 
                  label='Your Email *' 
                  :rules="[ val => val && val.length > 0 || 'Please fill in your email!']"
                )
                  template(v-slot:prepend)
                    q-icon(name="mail")
                q-card-actions(align="right")
                  q-btn.q-ml-sm(label='Return Login' type='reset' color='primary' flat @click="isHover = !isHover")
                  q-btn(label='Submit' type='submit' color='primary')
        
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { ILogin } from './type';
import { login, register } from './useLogin';
import { useRouter } from 'vue-router';
import { useGlobal, useUser } from 'src/stores';

export default defineComponent({
  setup() {
    const router = useRouter();
    const userStore = useUser();
    const globalStore = useGlobal();

    const loginForm = ref<ILogin>({
      name: null,
      password: null,
    });
    // Login
    const onSubmit = async () => {
      console.log('Submit');
      globalStore.act_setLoading(true);
      await login(loginForm.value)
        .then((res: any) => {
          console.log(res);
          userStore.act_setUserInfo({
            id: res.result.id,
            name: res.result.name,
            phone: res.result.phone,
            email: res.result.email,
            address: res.result.address,
            describe: res.result.describe,
            online: true,
          });
          router.push({ path: '/DoggyChat/Home' });
        })
        .catch((error) => {
          console.log(error);
          onReset();
        })
        .finally(() => {
          setTimeout(() => {
            globalStore.act_setLoading(false);
          }, 700);
        });
    };
    const onReset = () => {
      loginForm.value = {
        name: null,
        password: null,
      };
      registerForm.value = {
        name: null,
        password: null,
        phone: null,
        email: null,
      };
    };

    const isHover = ref(false);

    const registerForm = ref({
      name: null,
      password: null,
      phone: null,
      email: null,
    });

    // Register
    const onRegister = () => {
      console.log('Register');
      register(registerForm.value)
        .then((res: any) => {
          console.log(res);
          isHover.value = false;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => onReset());
    };

    return {
      loginForm,
      registerForm,
      isHover,
      onSubmit,
      onRegister,
    };
  },
});
</script>

<style lang="scss" scoped>
#login {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  .content {
    position: absolute;
    top: 0;
    min-height: 100vh;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .formCard {
    width: 60%;
    min-width: 300px;
    max-width: 500px;
    border-radius: 20px;
    // Flip
    &.flip-container {
      perspective: 1000px;
      height: 330px;
      &.hover .flipper {
        transform: rotateY(180deg);
      }
      &.hover {
        height: 500px;
        transition: 0.2s height;
      }

      .flipper {
        transition: 0.6s;
        transform-style: preserve-3d;
        position: relative;
        cursor: pointer;
      }
    }
    .front,
    .back {
      backface-visibility: hidden;
      position: absolute;
      top: 0;
      left: 0;
    }
    .front {
      z-index: 2;
      transform: rotateY(0deg);
    }
    .back {
      transform: rotateY(180deg);
    }
  }

  .flipper,
  .front,
  .back {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }

  // Logo
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    & > .text-weight-bolder {
      font-size: 35px;
    }
  }
  .talk-bubble {
    margin: 10px;
    display: inline-block;
    position: relative;
    width: 100px;
    height: 100px;
    background-color: rgb(255, 255, 255);
    transform: rotate(25deg);
    .talktext {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30px;
    }
  }
  .border {
    border: 8px solid #5197de;
  }
  .round {
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
  }
  .tri-right.border.btm-left-in:before {
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
    left: 25px;
    right: auto;
    top: auto;
    bottom: -25px;
    border: 12px solid;
    border-color: #5197de transparent transparent #5197de;
  }
  .tri-right.btm-left-in:after {
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
    left: 30px;
    right: auto;
    top: auto;
    bottom: -10px;
    border: 12px solid;
    border-color: white transparent transparent white;
  }

  // Background
  .area {
    width: 100%;
    min-height: 100vh;
  }

  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .circles li {
    position: absolute;
    display: block;
    list-style: none;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.2);
    animation: animate 25s linear infinite;
    bottom: -150px;
  }

  .circles li:nth-child(1) {
    left: 25%;
    width: 80px;
    height: 80px;
    animation-delay: 0s;
  }

  .circles li:nth-child(2) {
    left: 10%;
    width: 20px;
    height: 20px;
    animation-delay: 2s;
    animation-duration: 12s;
  }

  .circles li:nth-child(3) {
    left: 70%;
    width: 20px;
    height: 20px;
    animation-delay: 4s;
  }

  .circles li:nth-child(4) {
    left: 40%;
    width: 60px;
    height: 60px;
    animation-delay: 0s;
    animation-duration: 18s;
  }

  .circles li:nth-child(5) {
    left: 65%;
    width: 20px;
    height: 20px;
    animation-delay: 0s;
  }

  .circles li:nth-child(6) {
    left: 75%;
    width: 110px;
    height: 110px;
    animation-delay: 3s;
  }

  .circles li:nth-child(7) {
    left: 35%;
    width: 150px;
    height: 150px;
    animation-delay: 7s;
  }

  .circles li:nth-child(8) {
    left: 50%;
    width: 25px;
    height: 25px;
    animation-delay: 15s;
    animation-duration: 45s;
  }

  .circles li:nth-child(9) {
    left: 20%;
    width: 15px;
    height: 15px;
    animation-delay: 2s;
    animation-duration: 35s;
  }

  .circles li:nth-child(10) {
    left: 85%;
    width: 150px;
    height: 150px;
    animation-delay: 0s;
    animation-duration: 11s;
  }

  @keyframes animate {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
      border-radius: 20%;
    }

    100% {
      transform: translateY(-1000px) rotate(720deg);
      opacity: 0.2;
      border-radius: 50%;
    }
  }
}
</style>
