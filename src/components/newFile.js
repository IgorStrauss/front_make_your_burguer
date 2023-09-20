import axiosInstance from "@/utils/axios";

export default (await import('vue')).defineComponent({
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
console.log("Pedidos recebidos linha 81:", this.burgers);
// Resgatando os status dos pedidos
await this.getStatusBurger();
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
mounted() {
this.getRequestBurgers();
this.fetchPaes();
},
});
