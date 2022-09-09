<template>
  <header class="header">
    <img src="../assets/logo-mais-a-educacao.svg" alt="Logo mais a" />
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0e8c9;
  padding: 1rem 10rem;
  width: 100%;
}

.title {
  font-size: 2.5rem;
  color: #000;
}

img {
  height: 70px;
}

@media only screen and (max-width: 800px) {
  .header {
    padding: 1em 1em;
  }

  img {
    height: 50px;
  }
}
</style>