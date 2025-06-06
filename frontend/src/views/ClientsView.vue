<template>
  <section class="container py-5">
	<div class="d-flex justify-content-between">
		<h1 class="mb-4"><i class="bi bi-chevron-down me-2"></i>Liste des clients</h1>
		<BButton
          iconLeft="plus-circle"
          variant="outline-primary"
          class="w-100 mt-3"
          @click="$router.push('/clients/create')"
        >
          Ajouter une client
        </BButton>
	</div>

    <ul class="list-unstyled">
      <ClientItem
        v-for="client in clients"
        :key="client.id"
        :client="client"
        @delete="handleDeleteClient"
      />
    </ul>

    <p v-if="!clients.length" class="text-center text-muted">
      Aucune client disponible.
    </p>
  </section>
</template>

<script setup>
import { onBeforeMount } from 'vue'
import { useClientStore } from '@/stores/client'
import { storeToRefs } from 'pinia'
import ClientItem from '@/components/ClientItem.vue'
import BButton from '@/components/BButton.vue'

const clientStore = useClientStore()
const { clients } = storeToRefs(clientStore)
const { getClients, deleteClient } = clientStore

onBeforeMount(async () => {
  await getClients()
})

const handleDeleteClient = async (id) => {
  if (!confirm('Voulez-vous vraiment supprimer cette client ?')) return

  try {
    await deleteClient(id)
    const index = clients.value.findIndex(f => f.id === id)
    if (index !== -1) {
      clients.value.splice(index, 1)
    }
  } catch (error) {
    alert('Erreur lors de la suppression.')
    console.error(error)
  }
}
</script>
