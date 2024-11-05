<template>
  <div class="Apartments-board">
    <div v-if="!store.isLoading">
      <ApartamentosCard v-for="(apartamento) in store.apartamentos" :key="apartamento.id" :apartamento="apartamento" :usuario="usuario"/>
    </div>
    <div v-else>
      Cargando apartamentos
    </div>


  </div>
</template>
<script lang="ts">
import type User from '@/interfaces/User';
import { useDepartamentoStorage } from '@/stores/Departments';
import { defineComponent,onMounted,type PropType } from 'vue'
import ApartamentosCard from './ApartamentosCard.vue';

export default defineComponent({
  props:{
    usuario:{
      type:Object as PropType<User>,
      required:true
    }
  },
  setup(){
    const store = useDepartamentoStorage();
    onMounted(()=>{
      store.fetchApartamentos()
    })
    return{store}
  },
  components:{
    ApartamentosCard,
  }
},
)
</script>
<style>
</style>
