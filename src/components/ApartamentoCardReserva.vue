<template>
  <div v-if="isLoadingReserva" class="Pantalla-Carga">
    esperando la reespuesta del server de esta reserva...
  </div>
  <div v-else class="Reserva-Card">
    <h2 class="Card-Title -name">{{ apartamento.lugar }}</h2>
    <img :src="apartamento.URL_imagen" alt="imagen del apartamento">
    <div class="Card-Information">
      <span>{{ apartamento.descripcion }}</span>
      <h3 class="Card-info">Precio por noche:{{ apartamento.precio_noche }}</h3>
      <div class="Card-Reservation">
        <h1 class="Card-Title -info">Info general de la reserva</h1>
        <h3 class="Card-info -hora">Hora Inicio:{{ reserva.horaInicio }}</h3>
        <h3 class="Card-info -Hora">Hora Fin:{{ reserva.horaFinal }}</h3>
        <h3 class="Card-info -tiempo">Tiempo en dias {{ dias }}</h3>
        <h3 class="Card-info -valorTotal">Valor total de la reserva {{ valorTotal }}</h3>
        <h3></h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type Apartamento from '@/interfaces/Apartamento';
import Reserva from '@/interfaces/Reserva';
import DepartamentoService from '@/services/DepartamentoService';
import { computed, defineComponent, onMounted, ref, type PropType } from 'vue';


export default defineComponent({
  props: {
    reserva: {
      type: Object as PropType<Reserva>,
      required: true
    }
  },
  setup(props) {
    const isLoadingReserva = ref<boolean>(true);
    const apartamento = ref<Apartamento>({} as Apartamento);
    const dias = computed<number>(() => Math.ceil((props.reserva.horaFinal.getTime() - props.reserva.horaInicio.getTime()) / 86400000))
    const valorTotal = computed(() => dias.value * apartamento.value.precio_noche)
    const fetchApartamento = async () => {
      isLoadingReserva.value = true;
      apartamento.value = await DepartamentoService.GETApartamento(props.reserva.id_apartamento)
      isLoadingReserva.value = false;
    }

    onMounted(() => {
      fetchApartamento()
    })

    return { isLoadingReserva, apartamento, dias, valorTotal }
  }
})
</script>

<style></style>
