<template>
  <div class="User-View">
    <h1>Bienvenido {{ store.currentUser.Correo }}</h1>
    <button @click="cerrarSecion()">Cerrar Secion</button>
    <BoarApartamentos :usuario="store.currentUser"/>
    <BoardReservas :usuario="store.currentUser"/>
  </div>
</template>

<script lang="ts">
import BoarApartamentos from '@/components/BoardApartamentos.vue';
import BoardReservas from '@/components/BoardReservas.vue';
import type User from '@/interfaces/User';
import { useUserStore } from '@/stores/UserStore';
import { defineComponent, type PropType } from 'vue';


export default defineComponent({
  setup(){
    const store = useUserStore()
    const cerrarSecion = ()=>{store.setUser({UserName:"Null"} as User)}
    return {store,cerrarSecion}
  },
  components:{
    
    BoarApartamentos,
    BoardReservas
  }
})
</script>

<style>
</style>
