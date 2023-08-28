<template>
  <div class="message-container">
    <p>Esta e a mensagem do sistema</p>
    <!-- continuar formatação da props {{ msg }}-->
  </div>
</template>

<script>
export default {
  name: "MessageComponent",
  props: {
    msg: String,
  },
};
</script>

<style scoped>
.message-container {
  color: #004085;
  background-color: #cce5ff;
  border: 2px solid #b8daff;
  border-radius: 5px;
  padding: 3px 10px;
  max-width: 400px;
  margin: 30px auto;
}
</style>
