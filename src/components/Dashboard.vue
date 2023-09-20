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
        <div>{{ burger.paes }} pao</div>
        <!--<div>{{ getPaoTipo(burger.pao) }}</div>-->
        <div>{{ burger.carne }} carne</div>
        <div>
          <ul>
            <li v-for="(opcional, index) in burger.opcionais" :key="index">
              {{ opcional }}
            </li>
          </ul>
        </div>
        <div>
          <select
            name="status"
            class="status custom-select"
            v-model="burger.status_burguer"
            @change="updateStatus(burger.id, burger.status_burguer)"
          >
            <option value="{{ burger.status_burguer }}">
              {{ burger.status_burguer }}
            </option>
            <option
              v-for="choice in status_choices"
              :key="choice[0]"
              :value="choice[0]"
            >
              {{ choice[1] }}
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
      status_choices: [
        ["SOLICITADO", "SOLICITADO"],
        ["EM PRODUÇÃO", "EM PRODUÇÃO"],
        ["CONCLUIDO", "CONCLUIDO"],
        ["CANCELADO", "CANCELADO"],
      ],
      paes: [],
      carnes: [],
      opcionais_data: [],
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
        //await this.getStatusBurger();
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      }
    },
    async fetchPaes() {
      try {
        const response = await axiosInstance.get("paes/");
        this.paes = response.data;
        console.log("Itens de paes recebidos:", this.paes);
      } catch (error) {
        console.error("Erro ao buscar pães:", error);
      }
    },
    async fetchCarnes() {
      try {
        const response = await axiosInstance.get("carnes/");
        this.carnes = response.data;
        console.log("Itens de carnes recebidos:", this.carnes);
      } catch (error) {
        console.error("Erro ao buscar carnes:", error);
      }
    },
    async fetchOpcionais() {
      try {
        const response = await axiosInstance.get("opcionais/");
        this.opcionais_data = response.data;
        console.log("Itens de opcionais recebidos:", this.opcionais_data);
      } catch (error) {
        console.error("Erro ao buscar opcionais:", error);
      }
    },
    async updateStatus(burgerId, newStatus) {
      try {
        await axiosInstance.patch(`burguers/${burgerId}/`, {
          status_burguer: newStatus,
        }),
          console.log("Pedido atualizado com sucesso");
      } catch (error) {
        console.error("Erro ao atualizar pedido:", error);
      }
    },
    getPaoTipo(paoId) {
      const pao = this.paes.find((pao) => pao.id === paoId);
      return pao ? pao.tipo : "";
    },
    async deleteBurger(id) {
      try {
        await axiosInstance.delete(`burguers/${id}/`);
        //Implementar msg de exclusão
        this.getRequestBurgers();
      } catch (error) {
        console.error("Erro ao deletar pedido:", error);
      }
    },
  },

  mounted() {
    this.getRequestBurgers();
    this.fetchPaes();
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
