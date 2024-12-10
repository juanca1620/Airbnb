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

<style>
/* Estilo general del fondo de carga */
.Pantalla-Carga {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
  font-size: 0.9rem; /* Reducir aún más el tamaño de la fuente */
  color: #333;
  font-family: 'Arial', sans-serif;
  transition: opacity 0.3s ease-out;
}

/* Estilos de la tarjeta de reserva */
.Reserva-Card {
  background-color: #fff;
  border-radius: 8px; /* Bordes más pequeños y redondeados */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* Sombra sutil */
  padding: 16px; /* Aumentar padding para que los elementos no estén tan juntos */
  max-width: 400px; /* Hacer la tarjeta más estrecha */
  margin: 16px auto; /* Añadir margen para separar las tarjetas */
  font-family: 'Arial', sans-serif;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.Reserva-Card:hover {
  transform: translateY(-3px); /* Efecto de elevación más sutil */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* Sombra ligera en hover */
}

/* Título del lugar */
.Card-Title.-name {
  font-size: 1.6rem; /* Ajustar tamaño del título */
  font-weight: 600;
  color: #ff5a5f;
  margin-bottom: 8px; /* Mayor margen entre título y la siguiente sección */
  text-transform: capitalize;
  letter-spacing: 0.3px;
  text-align: left; /* Alineación a la izquierda */
}

/* Imagen del apartamento */
.Reserva-Card img {
  width: 100%;
  height: auto;
  border-radius: 4px; /* Bordes pequeños para las imágenes */
  margin-bottom: 12px; /* Mayor espacio debajo de la imagen */
  transition: transform 0.3s ease-in-out; /* Efecto de zoom */
}

.Reserva-Card img:hover {
  transform: scale(1.05); /* Zoom suave */
}

/* Información del apartamento */
.Card-Information {
  margin-bottom: 16px; /* Mayor margen debajo de la información del apartamento */
}

.Card-Information span {
  font-size: 1rem; /* Aumentar el tamaño del texto */
  color: #555;
  display: block;
  margin-bottom: 6px; /* Mayor espacio entre los elementos */
}

.Card-info {
  font-size: 1rem; /* Tamaño de texto adecuado */
  color: #333;
  margin-bottom: 6px; /* Espacio entre las líneas */
}

/* Información adicional de la reserva */
.Card-Reservation {
  background-color: #f9f9f9;
  padding: 16px; /* Aumentar padding */
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.Card-Title.-info {
  font-size: 1.2rem; /* Aumentar tamaño de los subtítulos */
  font-weight: 600;
  color: #333;
  margin-bottom: 12px; /* Mayor espacio debajo del título */
}

/* Estilo específico para cada tipo de información */
.Card-info.-hora,
.Card-info.-Hora {
  font-size: 0.95rem; /* Tamaño adecuado para los detalles */
  color: #555;
}

.Card-info.-tiempo {
  font-size: 1rem; /* Establecer un tamaño de fuente estándar */
  color: #28a745; /* Verde para el tiempo */
}

.Card-info.-valorTotal {
  font-size: 1.1rem; /* Aumentar tamaño de la fuente para destacar el valor total */
  font-weight: bold;
  color: #e74c3c; /* Rojo para el valor total */
}

/* Margen entre los elementos */
.Card-info h3 {
  margin-bottom: 8px; /* Ajuste de margen */
}



</style>
