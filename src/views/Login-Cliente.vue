<template>
  <Login/>
</template>

<script lang="ts">
import Login from '@/components/Login.vue'; // Asegúrate de que esta ruta es correcta
import { useUserStore } from '@/stores/UserStore';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const store = useUserStore();
  },
  components: {
    Login // Asegúrate de que el componente se llama exactamente como aquí
  }
});
</script>
