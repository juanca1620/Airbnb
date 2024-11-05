<template>
  <div class="Department-Card">
    <h2 class="Card-Title -name">{{ apartamento.lugar}}</h2>
    <img :src="apartamento.URL_imagen" alt="imagen del apartamento">
    <div class="Card-Information">
      <span>{{ apartamento.descripcion }}</span>
      <h3 class="Card-info">Precio por noche:{{ apartamento.precio_noche }}</h3>
    </div>
    <div class="Card-Reservation">
      <h1 class="Card-Title -Reservar">Reservar</h1>
      <h4 class="Card-Title -Hora">Hora Inicio</h4>
      <input class = "Card-input" type="date" v-model="fechaInicio">
      <h4 class="Card-Title -Hora">Hora Fin</h4>
      <input class = "Card-input" type="date" v-model="fechaFin">
      <button class="Card-button -reservar" @click="reservar()">Reserva</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue'
import type Apartamento from '../interfaces/Apartamento'
import type User from '@/interfaces/User'
import ReservaService from '@/services/ReservaService';
import  Reserva from '@/interfaces/Reserva';

export default defineComponent({
  props: {
    apartamento: {
      type: Object as PropType<Apartamento>,
      required: true
    },
    usuario: {
      type: Object as PropType<User>,
      required: true
    }
  },
  setup(props){
    const fechaInicio = ref<Date> (new Date())
    const fechaFin = ref<Date>(new Date())
    const reservar = async ()=>{
      let reserva;
      try {
        reserva = new Reserva(
        new Date(fechaInicio.value),
        new Date(fechaFin.value),
        props.apartamento.id
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        alert("Horas mal definidas, por favor poner horas coherentes")
        return;
      }
      console.log(props.usuario)
      const respuesta = ReservaService.addReserva(props.usuario,props.apartamento,reserva)
      if(respuesta){
        alert("Reserva Agregada con exito")
      }else{
        alert("La reserva no se pudo agregar")
      }
    }
    return {fechaInicio,fechaFin,reservar}
  }
})
</script>

<style>


</style>
