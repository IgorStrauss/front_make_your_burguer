<template>
  <div class="main-container container-sm">
    <h1>Gerenciar Pedidos:</h1>
    <DashboardComponent />
  </div>
</template>

<script>
import DashboardComponent from "@/components/Dashboard.vue";
export default {
  name: "PedidosComponent",
  components: {
    DashboardComponent,
  },
};
</script>
