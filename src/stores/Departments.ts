import { ref } from 'vue'
import { defineStore } from 'pinia'
import type Apartamento from '@/interfaces/Apartamento'
import DepartamentoService from '@/services/DepartamentoService';

export const useDepartamentoStorage = defineStore('Apartamentos',() =>{
  const apartamentos = ref<Apartamento[]>([]);
  const isLoading = ref<boolean>(true);
  const fetchApartamentos = async () =>{
    isLoading.value = true;
    const apartamentosFetch:Apartamento[] = await DepartamentoService.getAll()
    apartamentos.value = apartamentosFetch;
    isLoading.value = false;
  }
  return{apartamentos,isLoading,fetchApartamentos};
})
