<template>
  <div class = "Reservas-board">
    <h1 v-if="reservas == undefined" class="board-title -noReservas">Ups... esto esta demaciado vacio, animate hacer una recerva :D</h1>
    <div v-else class="Reservas-content">
      <h1 class="Reservas-title -tus-reservas">TUS RESERVAS</h1>
      <ApartamentoCardReserva v-for="(reserva,index) in reservas" :key = "index" :reserva="reserva"></ApartamentoCardReserva>
  </div>
  </div>
</template>
<script lang="ts">
import type User from '@/interfaces/User';
import { defineComponent, onMounted, ref, type PropType } from 'vue';
import ApartamentoCardReserva from './ApartamentoCardReserva.vue';

export default defineComponent({
  props:{
    usuario:{
      type:Object as PropType<User>,
        required:true
    }
  },
  setup(props){
    const reservas = ref(props.usuario.listaReservas);
    onMounted(()=> {console.log(props.usuario.contra)})
    return{reservas}
  },
  components:{
    ApartamentoCardReserva,
  }
},)
</script>

<style>
</style>
