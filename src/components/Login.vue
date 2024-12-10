<template>
    <div class="login-container" v-if="userStore.currentUser.UserName == 'Null'">
      <h2>Iniciar sesión</h2>
      <form @submit.prevent="login">
        <div>
          <label for="username">Usuario</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div>
          <label for="password">Contraseña</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Ingresar</button>
      </form>
  
      <div v-if="error" style="color: red; margin-top: 10px;">
        {{ error }}
      </div>
    </div>

    <VentanaCliente v-else/>
  </template>
  
  <script lang="ts">
  import router from "@/router";
  import { defineComponent, onMounted, ref } from "vue";
  import UsuarioService from "@/services/UsuariosService"; 
import { useUserStore } from "@/stores/UserStore";
import VentanaCliente from "@/views/VentanaCliente.vue";
import type User from "@/interfaces/User";
  
  export default defineComponent({
    setup() {
      const username = ref("");
      const password = ref("");
      const error = ref<string | null>(null);
      const userStore = useUserStore()
  
      const login = async () => {
        error.value = null;
  
        
        try {
          const user = await UsuarioService.GETuser(username.value);
  
          if (user === null) {
            error.value = "Usuario no encontrado";
            return;
          }
  
          if (user.contra === password.value) {
            alert("¡Login exitoso!");
            userStore.setUser(user);
            
          } else {
            error.value = "Contraseña incorrecta";
          }
        } catch (err) {
          error.value = "Hubo un error en el proceso de login";
        }

      };
  
      return { username, password, error, login ,userStore};
    },
    components:{
      VentanaCliente
    }
  });
  </script>
  
  <style scoped>
  /* Reset básico para asegurarse de que no haya márgenes ni padding extraños */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Estilo del contenedor de login */
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f4f7fc;
  padding: 20px;
  font-family: Arial, sans-serif;
}

/* Título de la página */
h2 {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

/* Formulario de login */
form {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

/* Elementos del formulario */
div {
  margin-bottom: 15px;
}

/* Estilos para las etiquetas de los campos */
label {
  display: block;
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 5px;
}

/* Campos de entrada */
input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #4e9af1;
  outline: none;
}

/* Botón de inicio de sesión */
button {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  font-weight: bold;
  background-color: #4e9af1;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #3578e5;
}

/* Mensajes de error */
.error {
  color: red;
  font-size: 0.9rem;
  margin-top: 10px;
  text-align: center;
}

/* Estilo cuando el usuario está logueado */
.ventana-cliente {
  /* Aquí podrías añadir más estilos si lo necesitas */
  display: none;
}

  </style>
  