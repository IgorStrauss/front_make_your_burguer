<template>
  <div class="container-sm" id="burger-table">
    <div class="container-sm">
      <div id="burger-table-heading">
        <div class="order-id">ID:</div>
        <div>Cliente:</div>
        <div>Pão:</div>
        <div>Carne:</div>
        <div>Opcionais:</div>
        <div>Ações:</div>
      </div>
    </div>
    <div class="container-sm" id="burger-table-rows">
      <div id="burger-table-row" v-for="burger in burgers" :key="burger.id">
        <div class="order-number">{{ burger.id }}</div>
        <div>{{ burger.cliente }}</div>
        <div>{{ burger.paes }}</div>
        <div>{{ burger.carne }}</div>
        <div>
          <ul>
            <li v-for="(opcional, index) in burger.opcionais" :key="index">
              {{ opcional }}
            </li>
          </ul>
        </div>
        <div>
          <select name="status" class="status custom-select">
            <option
              v-for="status in status_burguer"
              :key="status.id"
              value="status.tipo"
              :selected="burger.status == status.tipo"
            >
              {{ status.tipo }}
            </option>
          </select>
          <button class="delete-btn" @click="deleteBurger(burger.id)">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from "@/utils/axios";

export default {
  name: "DashboardComponent",
  data() {
    return {
      burgers: [],
      burger_id: "",
      status_burguer: [],
    };
  },
  methods: {
    async getRequestBurgers() {
      try {
        // Obtendo a lista de pedidos
        const response = await axiosInstance.get("burguers/");
        const data = await response.data;
        this.burgers = data;
        console.log("Pedidos recebidos:", this.burgers);
        // Resgatando os status dos pedidos
        await this.getStatusBurger();
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      }
    },
    async getStatusBurger() {
      try {
        const req = await axiosInstance.get("status-burguer/");
        const data = await req.data;
        this.status_burguer = data;
        console.log("Status do pedido:", this.status_burguer);
      } catch (error) {
        console.error("Erro ao buscar status do pedido:", error);
      }
    },
    async deleteBurger(id) {
      try {
        await axiosInstance.delete(`burguers/${id}`);
        //Implementar msg de exclusão
        this.getRequestBurgers();
      } catch (error) {
        console.error("Erro ao deletar pedido:", error);
      }
    },
  },
  mounted() {
    this.getRequestBurgers();
  },
};
</script>
<style scoped>
#burger-table {
  max-width: 1200px;
  min-width: 540px;
  margin: 0 auto;
}
#burger-table-heading,
#burger-table-rows,
#burger-table-row {
  display: flex;
  flex-wrap: wrap;
}
#burger-table-heading {
  font-weight: bold;
  padding: 12px;
  border-bottom: 3px solid #333;
}
#burger-table-heading div,
#burger-table-row div {
  width: 19%;
}
#burger-table-row {
  width: 100%;
  padding: 12px;
  border-bottom: 1px solid #ccc;
}
#burger-table-heading .order-id,
#burger-table-row .order-number {
  width: 5%;
}
select {
  padding: 7px 6px;
  margin-right: 12px;
}
.delete-btn {
  background-color: #222;
  color: #fcba03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 7px;
  font-size: 14px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}
.delete-btn:hover {
  background-color: transparent;
  color: #222;
  border: 2px solid #ff0000;
}
.custom-select {
  margin-right: 12px;
  padding: 7px;
  font-size: 14px;
  border-radius: 5px;
  background-color: #fcba03;
  margin-bottom: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.5s;
}
.custom-select:hover {
  background-color: transparent;
  color: #ff0000;
}
li {
  list-style: none;
  margin-bottom: 15px;
  margin-left: 0;
}
</style>
