import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useClientStore = defineStore('client', () => {
  const clients = ref([])
  const client = ref(null)

  const getNomPrenom = computed(() => {
    return `${client.value?.prenom || ''} ${client.value?.nom || ''}`
  })

  // liste des clients
  const getClients = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/clients`)
      clients.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  // récupérer une client spécifique
  const getClientById = async (id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/clients/${id}`)
      client.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  // editer une client
  const patchClient = async (id, data) => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/clients/${id}`, data)
      client.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  // créer une client
  const createClient = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/clients`, data)
      client.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  // supprimer une client
  const deleteClient = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/clients/${id}`)
      client.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  return {
    clients,
    client,
	getNomPrenom,
    getClients,
    getClientById,
    patchClient,
    createClient,
    deleteClient,
  }
})