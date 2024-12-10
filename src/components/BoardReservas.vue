<template>
  <div class="Reservas-board">
    <h1 v-if="reservas == undefined" class="board-title -noReservas">Ups... esto está demasiado vacío, ¡anímate a hacer una reserva! :D</h1>
    <div v-else class="Reservas-content">
      <h1 class="Reservas-title -tus-reservas">TUS RESERVAS</h1>
      <ApartamentoCardReserva v-for="(reserva, index) in reservas" :key="index" :reserva="reserva"></ApartamentoCardReserva>
    </div>
  </div>
</template>

<script lang="ts">
import type User from '@/interfaces/User';
import { defineComponent, onMounted, ref, type PropType } from 'vue';
import ApartamentoCardReserva from './ApartamentoCardReserva.vue';

export default defineComponent({
  props: {
    usuario: {
      type: Object as PropType<User>,
      required: true
    }
  },
  setup(props) {
    const reservas = ref(props.usuario.listaReservas);
    onMounted(() => {
      console.log(props.usuario.contra);
    });
    return { reservas };
  },
  components: {
    ApartamentoCardReserva,
  }
});
</script>

<style>

/* Contenedor principal */
.Reservas-board {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9; /* Fondo suave para toda la sección */
}

/* Título cuando no hay reservas */
.board-title.-noReservas {
  font-size: 1.5rem;
  color: #ff6347; /* Color llamativo */
  text-align: center;
  margin-top: 50px;
}

/* Contenedor de reservas cuando hay reservas */
.Reservas-content {
  display: flex;
  flex-wrap: wrap; /* Permite que las tarjetas se ajusten en nuevas filas cuando no hay suficiente espacio */
  justify-content: center; /* Centra las tarjetas en la fila */
  gap: 20px; /* Espacio entre las tarjetas */
  margin-top: 20px;
  width: 100%;
  padding: 0 10px; /* Para asegurar que las tarjetas no se peguen al borde */
}

/* Título de las reservas (cuando hay reservas) */
.Reservas-title.-tus-reservas {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  width: 100%; /* Asegura que el título ocupe todo el ancho */
}

/* Estilos para las tarjetas de reserva */
.ApartamentoCardReserva {
  width: 100%;
  max-width: 300px; /* Tamaño máximo para cada tarjeta, puedes ajustarlo */
  min-height: 250px; /* Altura mínima para las tarjetas */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra sutil */
  padding: 15px;
  transition: transform 0.3s ease; /* Efecto de hover */
  box-sizing: border-box; /* Para que el padding no aumente el tamaño total */
}

/* Estilos para las tarjetas de reserva */
.ApartamentoCardReserva {
  width: 100%;
  max-width: 300px; /* Tamaño máximo para cada tarjeta */
  min-height: 250px; /* Altura mínima para las tarjetas */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra sutil */
  padding: 15px;
  transition: transform 0.3s ease; /* Efecto de hover */
  box-sizing: border-box; /* Para que el padding no aumente el tamaño total */
}

/* Hover en las tarjetas de reserva */
.ApartamentoCardReserva:hover {
  transform: translateY(-5px); /* Efecto de elevar la tarjeta al pasar el ratón */
}


</style>
