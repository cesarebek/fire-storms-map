<template>
  <div class="infoPage">
    <div class="heading">
      <h2>Developed by Cezary Bek</h2>
      <h3>Contact me:</h3>
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

export default {
  data() {
    return {
      messages: [],
      email: '',
      message: '',
      image: contact,
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
    sendMess() {
      const formMessage = {
        userEmail: this.email,
        userMessage: this.messages,
        id: nanoid(),
      };
      this.messages.push(formMessage);
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
  width: 100vw;
}
.info {
  align-items: left;
  margin-left: 20rem;
  margin-top: 10rem;
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
}
button:hover {
  border: 1px solid transparent;
  background-color: #fff;
  color: rgb(63, 63, 63);
  font-weight: 500;
}
button:disabled {
  border: 1px solid transparent;
  background-color: rgb(111, 111, 111);
  color: rgb(63, 63, 63);
  font-weight: 500;
}
img {
  position: absolute;
  bottom: 3rem;
  right: 3rem;
  width: 40%;
}
</style>
