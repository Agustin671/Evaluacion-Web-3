<template>
  <div style="max-width: 400px; margin: 50px auto; font-family: Arial, sans-serif;">
    <h2 style="text-align: center;">Crear Cuenta</h2>
    
    <form @submit.prevent="registrarUsuario" style="display: flex; flex-direction: column; gap: 15px;">
      <input 
        v-model="nombre" 
        type="text" 
        placeholder="Nombre completo" 
        required 
        style="padding: 10px; font-size: 16px;" 
      />
      <input 
        v-model="email" 
        type="email" 
        placeholder="Correo electrónico" 
        required 
        style="padding: 10px; font-size: 16px;" 
      />
      <input 
        v-model="password" 
        type="password" 
        placeholder="Contraseña" 
        required 
        style="padding: 10px; font-size: 16px;" 
      />
      
      <button type="submit" style="padding: 12px; background-color: #28a745; color: white; border: none; font-size: 16px; cursor: pointer;">
        Registrarse
      </button>
    </form>

    <p v-if="mensajeError" style="color: red; text-align: center; margin-top: 15px;">{{ mensajeError }}</p>
    <p v-if="mensajeExito" style="color: green; text-align: center; margin-top: 15px;">{{ mensajeExito }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const nombre = ref('')
const email = ref('')
const password = ref('')
const mensajeError = ref('')
const mensajeExito = ref('')

const registrarUsuario = async () => {
  mensajeError.value = ''
  mensajeExito.value = ''

  try {
    const respuesta = await $fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      body: {
        nombre: nombre.value,
        email: email.value,
        password: password.value
      }
    })
    mensajeExito.value = '¡Cuenta creada con éxito! Ya puedes iniciar sesión.'
    // Limpiamos el formulario
    nombre.value = ''
    email.value = ''
    password.value = ''
  } catch (error) {
    mensajeError.value = error.data?.message || 'Hubo un error al conectar con el servidor.'
  }
}
</script>