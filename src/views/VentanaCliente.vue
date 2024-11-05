<template>
  <div class="User-View">
    <h1>Bienvenido {{ usuario.Correo }}</h1>
    <BoarApartamentos :usuario="usuario"/>
    <BoardReservas :usuario="usuario"/>
  </div>
</template>

<script lang="ts">
import BoarApartamentos from '@/components/BoardApartamentos.vue';
import BoardReservas from '@/components/BoardReservas.vue';
import type User from '@/interfaces/User';
import { defineComponent, type PropType } from 'vue';


export default defineComponent({
  props:{
    usuario:{
      type:Object as PropType<User>,
      required:true
    }
  },
  components:{
    BoarApartamentos,
    BoardReservas
  }
})
</script>

<style>
</style>
