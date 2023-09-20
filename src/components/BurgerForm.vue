<template>
  <div>
    <MessageComponent :msg="msg" v-show="msg" />
    <form id="form-burger" @submit="createBurger">
      <div class="input-container">
        <label for="cliente">Nome do cliente</label>
        <input
          type="text"
          id="cliente"
          name="cliente"
          v-model="cliente"
          placeholder="Digite seu nome"
        />
      </div>
      <div class="input-container">
        <label for="pao">Escolha o pão</label>
        <select name="pao" id="pao" v-model="pao">
          <option v-for="pao in paes" :key="pao.id" :value="pao.id">
            {{ pao.tipo }}
          </option>
        </select>
      </div>
      <div class="input-container">
        <label for="carne">Escolha a carne</label>
        <select name="carne" id="carne" v-model="carne">
          <option v-for="carne in carnes" :key="carne.id" :value="carne.id">
            {{ carne.tipo }}
          </option>
        </select>
      </div>
      <div id="opcionais-container" class="input-container">
        <label id="opcionais-title" for="opcionais">Escolha os opcionais</label>
        <div
          class="checkbox-container"
          v-for="opcional in opcionais_data"
          :key="opcional.id"
        >
          <input
            type="checkbox"
            :id="opcional.id"
            :name="opcional.tipo"
            v-model="opcionais"
            :value="opcional.id"
          />
          <label :for="opcional.id">{{ opcional.tipo }}</label>
        </div>
      </div>
      <div class="input-container">
        <input type="submit" class="submit-btn" value="Criar meu burger" />
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import axiosInstance from "@/utils/axios";
import MessageComponent from "@/components/Message.vue";
export default defineComponent({
  components: { MessageComponent },
  data() {
    return {
      paes: "",
      carnes: "",
      opcionais_data: [],
      cliente: "",
      pao: "",
      carne: "",
      opcionais: [],
      listar_burguers: [],
      msg: "",
    };
  },
  methods: {
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
    async fetchSBurgers() {
      try {
        const response = await axiosInstance.get("burguers/");
        this.listar_burguers = response.data;
        console.log("Pedido feitos:", this.listar_burguers);
      } catch (error) {
        console.error("Erro ao definir listar pedidos:", error);
      }
    },

    async createBurger(e) {
      e.preventDefault();
      //Recebendo os dados via formulário
      const data = {
        cliente: this.cliente,
        paes: this.pao,
        carne: this.carne,
        opcionais: Array.from(this.opcionais),
      };
      console.log("Dados que serão enviados:", data);
      try {
        const response = await axiosInstance.post("burguers/", data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Burger criado com sucesso:", response.data);
        //Emitindo mensagem após realizar o pedido
        this.msg = `Olá ${response.data.cliente}, seu pedido No ${response.data.id} foi realizado com sucesso!`;
        //Limpar mensagem da tela
        setTimeout(() => (this.msg = ""), 5000);
        //Limpando os dados do formulário
        this.cliente = "";
        this.pao = "";
        this.carne = "";
        this.opcionais = [];
        //Re-chamar os dados para atualizar no formulário vazio
        this.fetchPaes();
        this.fetchCarnes();
        this.fetchOpcionais();
        this.fetchSBurgers();
      } catch (error) {
        console.error("Erro ao criar o burger:", error);
      }
    },
  },
  mounted() {
    this.fetchPaes();
    this.fetchCarnes();
    this.fetchOpcionais();
    this.fetchSBurgers();
  },
});
</script>
<style scoped>
#form-burger {
  max-width: 400px;
  margin: 0 auto;
}
.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
label {
  font-weight: bold;
  margin-bottom: 15px;
  color: #222;
  padding: 5px 10px;
  border-left: 4px solid #fcba03;
}
input {
  padding: 5px 10px;
  width: 300px;
}
select {
  padding: 5px 10px;
  width: 300px;
}
#opcionais-container {
  flex-direction: row;
  flex-wrap: wrap;
}
#opcionais-container label {
  padding: 0 20px;
}
#opcionais-title {
  width: 100%;
  border-left: 4px solid #fcba03;
}
.checkbox-container {
  display: flex;
  align-items: flex-start;
  width: 50%;
  margin-bottom: 5px;
  margin-top: 30px;
}
.checkbox-container input[type="checkbox"] {
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.checkbox-container label {
  display: flex;
  align-items: center;
}
.checkbox-container span {
  width: auto;
  margin-left: 6px;
  font-weight: bold;
}
.checkbox-container input {
  width: auto;
}
.submit-btn {
  background-color: #222;
  color: #fcba03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
  width: 100%;
}
.submit-btn:hover {
  background-color: transparent;
  color: #222;
  border: 2px solid #fcba03;
}
</style>
