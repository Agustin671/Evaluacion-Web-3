<template>
  <div style="max-width: 600px; margin: 50px auto; font-family: Arial, sans-serif;">
    <h2 style="text-align: center;">Panel de Mesas</h2>
    <div style="text-align: right; margin-bottom: 15px;">
      <button @click="cerrarSesion" style="padding: 8px 12px; background-color: #dc3545; color: white; border: none; cursor: pointer; border-radius: 4px;">
        Cerrar Sesión
      </button>
    </div>

    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
      <h3>Agregar Nueva Mesa</h3>
      <form @submit.prevent="crearMesa" style="display: flex; gap: 10px;">
        <input v-model="nuevaMesa.numero" type="number" placeholder="Número" required style="width: 25%; padding: 8px;" />
        <input v-model="nuevaMesa.capacidad" type="number" placeholder="Capacidad" required style="width: 25%; padding: 8px;" />
        <input v-model="nuevaMesa.ubicacion" type="text" placeholder="Ubicación" required style="width: 50%; padding: 8px;" />
        <button type="submit" style="padding: 8px 15px; background-color: #28a745; color: white; border: none; cursor: pointer;">
          Guardar
        </button>
      </form>
      <p v-if="mensajeError" style="color: red; margin-top: 10px;">{{ mensajeError }}</p>
    </div>

    <h3>Listado Actual</h3>
    <ul style="list-style: none; padding: 0;">
      <li v-for="mesa in listaMesas" :key="mesa.id" style="padding: 15px; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between;">
        <strong>Mesa {{ mesa.numero }}</strong> 
        <span>👤 Capacidad: {{ mesa.capacidad }} | 📍 {{ mesa.ubicacion }}</span>
      </li>
    </ul>
    <p v-if="listaMesas.length === 0" style="text-align: center; color: #666;">No hay mesas registradas aún.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const listaMesas = ref([])
const nuevaMesa = ref({ numero: '', capacidad: '', ubicacion: '' })
const mensajeError = ref('')

// Función para pedir las mesas a la API
const cargarMesas = async () => {
  try {
    const token = localStorage.getItem('token_restaurante')
    const respuesta = await $fetch('http://localhost:3000/mesas', {
      headers: {
        'Authorization': `Bearer ${token}` // Aquí pasamos nuestra credencial (GEN-06)
      }
    })
    listaMesas.value = respuesta.data || []
  } catch (error) {
    console.error("Error al cargar mesas:", error)
    if (error.status === 401) {
       alert("Tu sesión expiró o no estás logueado.")
    }
  }
}

// Función para enviar una mesa nueva a la API
const crearMesa = async () => {
  mensajeError.value = ''
  try {
    const token = localStorage.getItem('token_restaurante')
    await $fetch('http://localhost:3000/mesas', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: nuevaMesa.value
    })
    
    // Si se crea bien, limpiamos el formulario y recargamos la lista
    nuevaMesa.value = { numero: '', capacidad: '', ubicacion: '' }
    cargarMesas()
  } catch (error) {
    mensajeError.value = error.data?.message || 'Error al crear la mesa'
  }
}

const cerrarSesion = () => {
  localStorage.removeItem('token_restaurante')
  window.location.href = '/' // Te devuelve al inicio
}

// Apenas la página carga, ejecutamos la función para traer las mesas
onMounted(() => {
  cargarMesas()
})
</script>