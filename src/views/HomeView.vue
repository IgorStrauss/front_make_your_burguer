<template>
  <BannerComponent />
  <div class="main-container container-sm">
    <h1>Monte Seu Burger</h1>
    <p>Formulário</p>
  </div>
</template>

<script>
// @ is an alias to /src
import BannerComponent from "@/components/Banner.vue";

export default {
  name: "HomeComponent",
  components: {
    BannerComponent,
  },
};
</script>
