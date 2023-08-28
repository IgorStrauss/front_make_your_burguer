<template>
  <div>
    <MessageComponent />
    <form id="form-burger">
      <div class="input-container">
        <label for="name">Nome do cliente</label>
        <input
          type="text"
          id="name"
          name="name"
          v-model="name"
          placeholder="Digite seu nome"
        />
      </div>
      <div class="input-container">
        <label for="pao">Escolha o pão</label>
        <select name="pao" id="pao" v-model="pao">
          <option value="">Selecione o pão</option>
          <option value="integral">Integral</option>
        </select>
      </div>
      <div class="input-container">
        <label for="carne">Escolha a carne</label>
        <select name="carne" id="carne" v-model="carne">
          <option value="">Selecione a carne</option>
          <option value="maminha">maminha</option>
        </select>
      </div>
      <div id="opcionais-container" class="input-container">
        <label id="opcionais-title" for="opcionais">Escolha os opcionais</label>
        <div class="checkbox-container">
          <input
            type="checkbox"
            name="opcionais"
            v-model="opcionais"
            value="Bacon"
          />
          <span>Bacon</span>
        </div>
      </div>
      <div class="input-container">
        <input type="submit" class="submit-btn" value="Criar meu burger" />
      </div>
    </form>
  </div>
</template>

<script>
import MessageComponent from "@/components/Message.vue";
export default {
  name: "BurgerForm",
  components: {
    MessageComponent,
  },
};
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
#opcionais-title {
  width: 100%;
}
.checkbox-container {
  display: flex;
  align-items: flex-start;
  width: 50%;
  margin-bottom: 20px;
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
