<template>

  <template>
  <header class="Main-Header">
    <h1 class="Main-Title">Bienvenidos a <span class="airbnb">Airbnb</span></h1>
    <p class="Main-Subtitle">Encuentra tu lugar ideal para hospedarte</p>
  </header>
</template>

  <div class="Department-Card">
    <h2 class="Card-Title -name">{{ apartamento.lugar }}</h2>
    <img :src="apartamento.URL_imagen" alt="imagen del apartamento" />
    <div class="Card-Information">
      <span>{{ apartamento.descripcion }}</span>
      <!-- Mostramos el precio en pesos colombianos, usando formato de miles -->
      <h3 class="Card-info">Precio por noche: {{ formatPrecio(apartamento.precio_noche) }}</h3>
    </div>
    <div class="Card-Reservation">
      <div class="Card-Reservation-Header">
        <h1 class="Card-Title -Reservar">
          <span class="Card-Title-Icon">📅</span> Reservar
        </h1>
        <p class="Card-SubTitle">Selecciona las fechas de tu estancia</p>
      </div>
      <div class="Card-Date">
        <div class="Card-Date-Input">
          <h4 class="Card-Title -Hora">Hora Inicio</h4>
          <input class="Card-input" type="date" v-model="fechaInicio" />
        </div>
        <div class="Card-Date-Input">
          <h4 class="Card-Title -Hora">Hora Fin</h4>
          <input class="Card-input" type="date" v-model="fechaFin" />
        </div>
      </div>
      <button class="Card-button -reservar" @click="reservar()">Reserva</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue'
import type Apartamento from '../interfaces/Apartamento'
import type User from '@/interfaces/User'
import ReservaService from '@/services/ReservaService'
import Reserva from '@/interfaces/Reserva'

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
  setup(props) {
    const fechaInicio = ref<Date>(new Date())
    const fechaFin = ref<Date>(new Date())

    const reservar = async () => {
      let reserva
      try {
        reserva = new Reserva(
          new Date(fechaInicio.value),
          new Date(fechaFin.value),
          props.apartamento.id
        )
      } catch (error) {
        alert('Horas mal definidas, por favor poner horas coherentes')
        return
      }

      console.log(props.usuario)
      const respuesta = ReservaService.addReserva(props.usuario, props.apartamento, reserva)
      if (respuesta) {
        alert('Reserva Agregada con éxito')
      } else {
        alert('La reserva no se pudo agregar')
      }
    }

    // Función para formatear el precio en COP con separadores de miles
    const formatPrecio = (precio: number) => {
      return '$' + precio.toLocaleString('es-CO');
    }

    return { fechaInicio, fechaFin, reservar, formatPrecio }
  }
})
</script>

<style scoped>
/* Contenedor principal de la tarjeta */
.Department-Card {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  max-width: 450px; /* Ampliamos el ancho de la tarjeta */
  margin: 30px auto;
  font-family: 'Arial', sans-serif;
  transition: box-shadow 0.3s ease-in-out;
}

.Department-Card:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

/* Imagen del apartamento */
.Department-Card img {
  width: 100%;
  height: 250px; /* Ajustamos el tamaño de la imagen */
  object-fit: cover; /* Mantiene la relación de aspecto sin distorsionar */
  border-bottom: 2px solid #e0e0e0;
  transition: transform 0.3s ease-in-out;
}

.Department-Card img:hover {
  transform: scale(1.05);
}

/* Título del apartamento */
.Card-Title.-name {
  margin: 20px;
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
  line-height: 1.3;
  text-align: center;
  transition: color 0.3s ease;
}

.Card-Title.-name:hover {
  color: #ff5a5f;
}

/* Información del apartamento */
.Card-Information {
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
}

.Card-Information span {
  font-size: 1rem;
  color: #777;
  line-height: 1.5;
}

.Card-info {
  font-size: 1.2rem;
  font-weight: 500;
  color: #e74c3c; /* Color para el precio */
  margin-top: 10px;
  text-transform: uppercase;
}

/* Sección de Reserva */
.Card-Reservation {
  padding: 20px;
  background-color: #f9f9f9;
  border-top: 2px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Encabezado de la sección de Reserva */
.Card-Reservation-Header {
  text-align: center;
  margin-bottom: 20px;
}

.Card-Title.-Reservar {
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
  letter-spacing: 1px;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Card-Title-Icon {
  margin-right: 10px;
  font-size: 1.6rem;
}

.Card-SubTitle {
  font-size: 1rem;
  color: #555;
  font-weight: 400;
  margin-top: 4px;
}

/* Estilo para el contenedor de las fechas */
.Card-Date {
  display: flex;
  justify-content: space-between;
  gap: 20px; /* Espacio entre los inputs */
  flex-wrap: wrap; /* Para que se ajusten cuando haya poco espacio */
}

/* Estilos para cada input de fecha */
.Card-Date-Input {
  flex: 1;
  min-width: 140px; /* Establecemos un ancho mínimo para que no se hagan demasiado pequeños */
}

/* Títulos para las horas de inicio y fin */
.Card-Title.-Hora {
  font-size: 1.1rem;
  font-weight: 500;
  color: #555;
  margin-bottom: 5px;
}

/* Estilos para los inputs de fecha */
.Card-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  color: #333;
  background-color: #fff;
  margin-top: 5px;
  transition: border 0.3s, box-shadow 0.3s;
}

.Card-input:focus {
  border-color: #ff5a5f;
  outline: none;
  box-shadow: 0 0 8px rgba(52, 152, 219, 0.2);
}

/* Botón de reserva */
.Card-button.-reservar {
  padding: 14px 20px;
  background-color:#ff5a5f;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  width: 100%;
}

.Card-button.-reservar:hover {
  background-color: #2980b9;
  transform: scale(1.05);
}

.Card-button.-reservar:active {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

</style>
