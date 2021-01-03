<template>
  <header>
    <h2>Fires Map</h2>
    <nav>
      <ul>
        <router-link to="/map" active-class="active" exact>
          <li>Map</li>
        </router-link>
        <router-link to="/info" active-class="active" exact>
          <li>Info</li>
        </router-link>
        <router-link to="/home" active-class="active" exact>
          <li>Home</li>
        </router-link>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  background-color: rgb(65, 63, 63);
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 0 10rem;
  overflow: hidden;
  color: #fff;
  max-width: 100vw;
}
nav {
  width: 15vw;
}
ul {
  display: flex;
  align-content: center;
  justify-content: space-between;
}
li {
  display: flex;
  list-style: none;
  transition: all 0.5s ease-out;
  padding: 0.5rem;
  color: #fff;
  cursor: pointer;
}
a {
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
}
li:hover {
  padding: 0.5rem;
  background-color: lightgray;
  border-radius: 0.3rem;
  border-radius: 0.3rem;
  color: rgb(65, 63, 63);
}
.active {
  background-color: rgb(143, 143, 143);
  border-radius: 0.3rem;
  color: rgb(65, 63, 63);
}
h2 {
  cursor: default;
}
</style>
