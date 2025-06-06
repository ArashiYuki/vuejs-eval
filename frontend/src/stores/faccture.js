import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFactureStore = defineStore('facture', () => {
  const factures = ref([])

  return { factures }
})
