<template>
  <div id="nav" class="container-sm">
    <router-link to="/" id="logo-url">
      <img :src="logo" :alt="alt" id="logo" />
    </router-link>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/Pedidos">Pedidos</router-link>
    </nav>
  </div>
</template>
<script>
export default {
  name: "NavbarComponent",
  props: ["logo", "alt"],
};
</script>
<style scoped>
* {
  font-family: Helvetica;
  box-sizing: border-box;
}

#nav {
  background-color: #222;
  border-bottom: 1px solid #111;
  padding: 1rem 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
#nav #logo-url {
  margin: auto;
  margin-left: 0;
}
#logo {
  width: 4rem;
  height: 4rem;
}
#nav a {
  color: #fcba03;
  text-decoration: none;
  margin: 1.2rem;
  transition: 0.5s;
}
#nav a:hover {
  color: #fff;
}
</style>
