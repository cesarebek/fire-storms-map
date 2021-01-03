<template>
  <div class="infoPage">
    <!-- Loading Spinner -->
    <div class="lds-roller spinner" v-if="isLoading">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>

    <div class="info">
      <form @submit.prevent="sendMess">
        <div class="field">
          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your email..."
            v-model.trim="email"
          />
        </div>
        <div class="field">
          <label for="message">Message</label>
          <textarea
            name="message"
            id="message"
            cols="50"
            rows="5"
            placeholder="Your message..."
            v-model.trim="message"
          />
        </div>
        <button :disabled="formValidation">Submit</button>
      </form>
    </div>
    <img :src="image" alt="contact" />
  </div>
</template>

<script>
import { nanoid } from 'nanoid';
import contact from '../assets/contact.svg';
import axios from 'axios';

export default {
  data() {
    return {
      messages: [],
      email: '',
      message: '',
      image: contact,
      isLoading: false,
    };
  },
  //Simple form validation
  computed: {
    formValidation() {
      return !this.email.includes('@') || this.message === '';
    },
  },
  //Store new message inside an array of messagges and redirect to home
  methods: {
    async sendMess() {
      this.isLoading = true;
      const formMessage = {
        userEmail: this.email,
        userMessage: this.message,
        id: nanoid(),
      };
      try {
        await axios.post(
          'https://messages-8c3eb-default-rtdb.firebaseio.com/messages.json',
          formMessage
        );
      } catch (e) {
        console.log(e);
      }
      this.messages.push(formMessage);
      this.isLoading = false;
      console.log(this.messages);
      this.$router.push('/home');
    },
  },
};
</script>

<style scoped>
.infoPage {
  overflow: hidden;
  height: 93vh;
  max-width: 100vw;
  cursor: default;
}
.info {
  align-items: left;
  margin-left: 20rem;
  margin-top: 4rem;
}
.heading {
  text-align: center;
  color: #fff;
  margin-top: 5rem;
  font-size: 1.5rem;
}
form {
  width: 25%;
  text-align: center;
}
label {
  color: #fff;
  font-size: 1.5rem;
  text-align: left;
  padding-bottom: 0.3rem;
}
.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2rem;
}
input {
  font-family: sans-serif;
  font-size: 1rem;
  padding: 0.5rem;
}
textarea {
  resize: none;
  font-family: sans-serif;
  font-size: 1rem;
  padding: 0.5rem;
}
button {
  transition: 0.5s all ease;
  border: 1px solid #fff;
  border-radius: 2rem;
  background-color: transparent;
  color: #fff;
  padding: 0.5rem 1rem;
  font-size: 1.3rem;
  cursor: pointer;
}
button:hover {
  border: 1px solid transparent;
  background-color: #fff;
  color: rgb(63, 63, 63);
  font-weight: 500;
}
button:disabled {
  border: 1px solid rgb(63, 63, 63);
  color: rgb(63, 63, 63);
  background-color: transparent;
  font-weight: 500;
}
img {
  position: absolute;
  bottom: 3rem;
  right: 3rem;
  width: 40%;
}
.lds-roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.lds-roller div:after {
  content: ' ';
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #fff;
  margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.spinner {
  position: absolute;
  left: 50%;
  top: 50%;
}
</style>
