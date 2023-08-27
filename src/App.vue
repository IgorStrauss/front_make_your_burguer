<template>
  <div class="container-sm">
    <NavbarComponent :logo="logo_src" :alt="app_name" />
    <router-view />
    <FooterComponent />
  </div>
</template>
<script>
import NavbarComponent from "./components/Navbar.vue";
import FooterComponent from "./components/Footer.vue";

export default {
  components: {
    NavbarComponent,
    FooterComponent,
  },
  data() {
    return {
      logo_src: "img/logo-circular-mix.png",
      app_name: "Make Your Burger",
    };
  },
};
</script>
<style>
.main-container {
  margin: 5rem;
  min-height: 25rem;
}
h1 {
  text-align: center;
  font-size: 42px;
  margin-bottom: 3rem;
  color: #222;
}
</style>
