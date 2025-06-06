<template>
  <section class="container py-5">
    <h1 class="mb-4">Liste des factures</h1>

    <ul class="list-unstyled">
      <FactureItem
        v-for="facture in factures"
        :key="facture.id"
        :facture="facture"
        @delete="handleDeleteFacture"
      />
    </ul>

    <p v-if="!factures.length" class="text-center text-muted">
      Aucune facture disponible.
    </p>
  </section>
</template>

<script setup>
import { onBeforeMount } from 'vue'
import { useFactureStore } from '@/stores/facture'
import { storeToRefs } from 'pinia'
import FactureItem from '@/components/FactureItem.vue'

const factureStore = useFactureStore()
const { factures } = storeToRefs(factureStore)
const { getFactures, deleteFacture } = factureStore

onBeforeMount(async () => {
  await getFactures()
})

const handleDeleteFacture = async (id) => {
  if (!confirm('Voulez-vous vraiment supprimer cette facture ?')) return

  try {
    await deleteFacture(id)
    const index = factures.value.findIndex(f => f.id === id)
    if (index !== -1) {
      factures.value.splice(index, 1)
    }
  } catch (error) {
    alert('Erreur lors de la suppression.')
    console.error(error)
  }
}
</script>
