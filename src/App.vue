<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { defineComponent, onMounted, ref} from 'vue';
import LoginCliente from './views/Login-Cliente.vue';

export default defineComponent({
  components:{
    LoginCliente,
  }
})
</script>

<template>
  <LoginCliente/>
</template>

<style scoped>

</style>
