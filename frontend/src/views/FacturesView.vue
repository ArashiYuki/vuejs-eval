<template>
  <section class="container py-5">
	<div class="d-flex justify-content-between">
		<h1 class="mb-4"><i class="bi bi-chevron-down me-2"></i>Liste des factures</h1>
		<BButton
          iconLeft="plus-circle"
          variant="outline-primary"
          class="w-100 mt-3"
          @click="$router.push('/factures/create')"
        >
          Ajouter une facture
        </BButton>
	</div>

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
import BButton from '@/components/BButton.vue'

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
