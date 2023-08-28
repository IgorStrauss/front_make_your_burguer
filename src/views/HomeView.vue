<template>
  <BannerComponent />
  <div class="main-container container-sm">
    <h1>Monte Seu Burger</h1>
    <BurgerFormComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import BannerComponent from "@/components/Banner.vue";
import BurgerFormComponent from "@/components/BurgerForm.vue";

export default {
  name: "HomeComponent",
  components: {
    BannerComponent,
    BurgerFormComponent,
  },
};
</script>
