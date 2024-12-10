<template>
  <div class="Apartments-board">
    <!-- Encabezado de bienvenida -->
    <header class="welcome-header">
      <h1>Bienvenido a nuestro sitio de apartamentos</h1>
      <p>Encuentra el lugar perfecto para tu próxima estancia</p>
    </header>
    
    <div v-if="!store.isLoading" class="apartments-container">
      <!-- Itera sobre los apartamentos -->
      <ApartamentosCard 
        v-for="(apartamento) in store.apartamentos" 
        :key="apartamento.id" 
        :apartamento="apartamento" 
        :usuario="usuario" 
        class="apartment-card"
      />
    </div>
    
    <div v-else class="loading-message">
      <p>Cargando apartamentos...</p>
    </div>
  </div>
</template>

<script lang="ts">
import type User from '@/interfaces/User';
import { useDepartamentoStorage } from '@/stores/Departments';
import { defineComponent, onMounted, type PropType } from 'vue';
import ApartamentosCard from './ApartamentosCard.vue';

export default defineComponent({
  props: {
    usuario: {
      type: Object as PropType<User>,
      required: true
    }
  },
  setup() {
    const store = useDepartamentoStorage();
    onMounted(() => {
      store.fetchApartamentos()
    })
    return { store }
  },
  components: {
    ApartamentosCard,
  }
});
</script>

<style scoped>
/* Diseño del contenedor principal */
/* Diseño del contenedor principal */
.Apartments-board {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f4f4f9; /* Fondo suave */
}

/* Encabezado de bienvenida (cambiamos su tamaño y lo extendemos de punta a punta) */
.welcome-header {
  width: 100%; /* Extiende el header a todo el ancho de la pantalla */
  height: 130px; /* Altura más grande para representar un banner */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centra los textos verticalmente */
  align-items: center; /* Centra los textos horizontalmente */
  padding: 0 20px; /* Padding lateral */
  background-color: #ff5a5f; /* Color típico de Airbnb */
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center; /* Asegura que los textos estén centrados */
}

/* Aumentamos el tamaño del título */
.welcome-header h1 {
  font-size: 2.0rem; /* Mucho más grande */
  margin: 0;
  font-weight: bold;
}

/* Aumentamos el tamaño del subtítulo */
.welcome-header p {
  font-size: 1.5rem; /* Más grande para que resalte */
  margin-top: 10px;
  font-weight: 300; /* Peso de fuente más liviano */
}

/* Contenedor de los apartamentos */
.apartments-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); /* Muestra las tarjetas en columnas adaptativas */
  gap: 20px;
  width: 100%;
  max-width: 1200px;
}

/* Estilos para cada tarjeta de apartamento */
.apartment-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.apartment-card:hover {
  transform: translateY(-5px);
}

/* Mensaje de carga */
.loading-message {
  font-size: 1.2rem;
  color: #555;
  text-align: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Estilo para los mensajes de carga */
.loading-message p {
  margin: 0;
  font-size: 1.1rem;
  color: #888;
}


</style>
