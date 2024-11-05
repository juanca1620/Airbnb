<script lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
import { defineComponent, onMounted, ref} from 'vue';
import VentanaCliente from './views/VentanaCliente.vue';
import UsuarioService from './services/UsuariosService';
import type User from './interfaces/User';

export default defineComponent({
  setup(){
    const cargandoUser = ref<boolean>(true)
    const usuario = ref<User>({} as User);
    const buscarUsuario = async (userName:string)=>{
      usuario.value = await UsuarioService.GETuser(userName)
      cargandoUser.value = false;
    }

    onMounted(()=> buscarUsuario("pepe"))

    return{usuario,cargandoUser}
  },
  components:{
    VentanaCliente,
  }
})
</script>

<template>
  <VentanaCliente v-if="!cargandoUser" :usuario="usuario"></VentanaCliente>
</template>

<style scoped>

</style>
