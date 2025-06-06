<!-- ClientItem.vue -->
<template>
  <li class="d-flex justify-content-between align-items-center text-secondary py-2 list-group-item">
    <div class="d-flex gap-3" style="flex: 1; min-width: 0;">
		<span style="min-width: 110px; white-space: nowrap;">
			{{ client.nom }} {{ client.prenom }}
		</span>
		<span style="min-width: 110px; white-space: nowrap;">
			{{ client.entreprise }}
		</span>
    </div>
	<span style="min-width: 110px; white-space: nowrap;">
		{{ client.dateAjout }}
	</span>

    <div class="d-flex gap-3 align-items-center" style="min-width: 360px; justify-content: flex-end;">

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
import { useRouter } from 'vue-router'
import { useClientStore } from '@/stores/client'
import { storeToRefs } from 'pinia'

// Récupérer les props
const props = defineProps({
  client: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete'])

const router = useRouter()

const clientStore = useClientStore()
const { getClientById } = clientStore;

const onDelete = () => {
  emit('delete', props.client.id)
}

const onEdit = () => {
  router.push(`/clients/edit/${props.client.id}`)
}
</script>


<style scoped>
li {
  font-weight: normal;
}
</style>
