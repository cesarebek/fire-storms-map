<template>
  <div class="home">
    <div class="heading">
      <h1>Welcome to the Fire Storm Map!</h1>
      <h2>
        This App renders a simple map with 600 fire storms points in the world
        <br />
        registered from 21/08/2020 to 28/08/2020 with NASA satellites
      </h2>
      <h2>Click here to open the map right now! <button>Learn more</button></h2>
    </div>
    <img :src="image" alt="world" />
  </div>
</template>

<script>
import world from '../assets/world.svg';
export default {
  data() {
    return {
      image: world,
    };
  },
};
</script>

<style scoped>
.home {
  position: relative;
  height: 93vh;
  text-align: center;
  overflow: hidden;
}
.heading {
  margin-top: 6rem;
  color: #fff;
  text-align: center;
}
h1 {
  font-size: 3rem;
}
h2 {
  font-size: 1.5rem;
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
}
img {
  position: absolute;
  bottom: -5rem;
  left: 26%;
  height: 70vh;
}
</style>
