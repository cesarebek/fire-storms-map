<template>
  <div class="infoPage">
    <!-- Loading Spinner -->
    <my-spinner v-if="isLoading"></my-spinner>

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
      this.isLoading = false;
      this.$router.push('/home');
    },
    //All messages available from users
    async getMessages() {
      const response = await axios.get(
        'https://messages-8c3eb-default-rtdb.firebaseio.com/messages.json'
      );
      const data = await response.data;
      this.messages = data;
      console.log(this.messages);
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
</style>
