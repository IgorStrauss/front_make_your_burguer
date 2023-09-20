/* target: 3.3, extensions: [".vue"], lib: "vue", jsxSlots: false, strictTemplates: false, skipTemplateCodegen: false, nativeTags: ["html","body","base","head","link","meta","style","title","address","article","aside","footer","header","hgroup","h1","h2","h3","h4","h5","h6","nav","section","div","dd","dl","dt","figcaption","figure","picture","hr","img","li","main","ol","p","pre","ul","a","b","abbr","bdi","bdo","br","cite","code","data","dfn","em","i","kbd","mark","q","rp","rt","ruby","s","samp","small","span","strong","sub","sup","time","u","var","wbr","area","audio","map","track","video","embed","object","param","source","canvas","script","noscript","del","ins","caption","col","colgroup","table","thead","tbody","td","th","tr","button","datalist","fieldset","form","input","label","legend","meter","optgroup","option","output","progress","select","textarea","details","dialog","menu","summary","template","blockquote","iframe","tfoot","svg","animate","animateMotion","animateTransform","circle","clipPath","color-profile","defs","desc","discard","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistanceLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","foreignObject","g","hatch","hatchpath","image","line","linearGradient","marker","mask","mesh","meshgradient","meshpatch","meshrow","metadata","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","solidcolor","stop","switch","symbol","text","textPath","tspan","unknown","use","view","slot","component"], dataAttributes: [], htmlAttributes: ["aria-*"], optionsWrapper: ["(await import('vue')).defineComponent(",")"], macros: {"defineProps":["defineProps"],"defineSlots":["defineSlots"],"defineEmits":["defineEmits"],"defineExpose":["defineExpose"],"defineModel":["defineModel"],"defineOptions":["defineOptions"],"withDefaults":["withDefaults"]}, plugins: [], hooks: [], experimentalDefinePropProposal: false, experimentalAdditionalLanguageModules: [], experimentalResolveStyleCssClasses: "scoped", experimentalModelPropName: {"":{"input":true},"value":{"input":{"type":"text"},"textarea":true,"select":true}}, experimentalUseElementAccessInTemplate: false */
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
