<!-- FactureItem.vue -->
<template>
  <li class="d-flex justify-content-between align-items-center text-secondary py-2 list-group-item">
    <div class="d-flex gap-3" style="flex: 1; min-width: 0;">
      <span style="min-width: 110px; white-space: nowrap;">
        {{ facture.dateEmission }} -
      </span>
      <span class="text-truncate" style="min-width: 250px;">
        {{ facture.description }} / Facture N°{{ facture.numero }}
      </span>
      <span class="text-truncate" style="min-width: 150px;">
        {{ clientFullName }}
      </span>
    </div>

    <div class="d-flex gap-3 align-items-center" style="min-width: 360px; justify-content: flex-end;">
      <span style="min-width: 100px; white-space: nowrap;">
        {{ totalHT.toFixed(2) }} € HT
      </span>
      <span class="fw-bold" style="min-width: 100px; white-space: nowrap;">
        {{ totalTTC.toFixed(2) }} € TTC
      </span>

      <button @click="onDelete" class="btn btn-sm btn-danger">
        Supprimer
      </button>
      <button @click="onEdit" class="btn btn-sm btn-primary">
        Éditer
      </button>
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useClientStore } from '@/stores/client'
import { useFactureStore } from '@/stores/facture'
import { storeToRefs } from 'pinia'

// Récupérer les props
const props = defineProps({
  facture: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete'])

const router = useRouter()

const clientStore = useClientStore()
const factureStore = useFactureStore()
const { getClientById } = clientStore;
const { getNomPrenom } = storeToRefs(clientStore);
const { getTotalHT, getTotalTTC } = factureStore;

// Accéder à facture via props.facture
const clientFullName = computed(() => {
  const client = getClientById(props.facture.client)
  return client ? getNomPrenom : 'Client inconnu'
})

const totalHT = computed(() => getTotalHT(props.facture))
const totalTTC = computed(() => getTotalTTC(props.facture))

const onDelete = () => {
  emit('delete', props.facture.id)
}

const onEdit = () => {
  router.push(`/factures/edit/${props.facture.id}`)
}
</script>


<style scoped>
li {
  font-weight: normal;
}
</style>
