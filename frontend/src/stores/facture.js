import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useFactureStore = defineStore('facture', () => {
  const factures = ref([])
  const facture = ref(null)

  // calcul total HT d'une facture passée en argument
  const getTotalHT = (facture) => {
    if (!facture?.detail) return 0
    return facture.detail.reduce((acc, item) => acc + item.quantite * item.prixUnitaire, 0)
  }

  // calcul total TTC en tenant compte de la TVA
  const getTotalTTC = (facture) => {
    const tva = facture?.tva ?? 0
    return getTotalHT(facture) * (1 + tva)
  }

  // liste des factures
  const getFactures = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/factures`)
      factures.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  // récupérer une facture spécifique
  const getFacture = async (id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/factures/${id}`)
      facture.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  // editer une facture
  const patchFacture = async (id, data) => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/factures/${id}`, data)
      facture.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  // créer une facture
  const createFacture = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/factures`, data)
      facture.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  // supprimer une facture
  const deleteFacture = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/factures/${id}`)
      facture.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  return {
    factures,
    facture,
	getTotalHT,
	getTotalTTC,
    getFactures,
    getFacture,
    patchFacture,
    createFacture,
    deleteFacture,
  }
})