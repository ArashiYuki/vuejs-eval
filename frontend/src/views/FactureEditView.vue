<template>
	<div class="container py-5">
		<h1><i class="bi bi-chevron-down me-2"></i>Editer une facture</h1>

		<form @submit.prevent="onSaveFacture" v-if="facture">
			<div class="mb-3">
				<label for="numero" class="form-label">Facture N° :</label>
				<input type="text" class="form-control" v-model="facture.numero" name="numero" id="numero" />
			</div>
			<div class="mb-3">
				<label for="description" class="form-label">Description :</label>
				<input type="text" class="form-control" v-model="facture.description" name="description" id="description" />
			</div>
			<div class="mb-3">
				<label for="dateEmission" class="form-label">Emise le :</label>
				<input
				type="date"
				class="form-control"
				v-model="dateEmission"
				name="dateEmission"
				id="dateEmission"
				/>
			</div>
			<div class="mb-3">
				<label for="client" class="form-label">Client :</label>
				<select v-model="facture.client" id="client" class="form-select">
				<option value="">-- Sélectionner un client --</option>
				<option v-for="client in clients" :key="client.id" :value="client.id">
					{{ client.nom }} {{ client.prenom }}
				</option>
				</select>
			</div>
			<h5>Détails</h5>
			<table class="table table-sm table-bordered">
				<thead>
				<tr>
					<th>Actions</th>
					<th>Prestation</th>
					<th>Quantité</th>
					<th>Montant unitaire (€)</th>
					<th>Montant total (€)</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="(detail, index) in facture.detail" :key="index">
					<td>
					<button type="button" class="btn btn-sm btn-danger" @click="removeDetail(index)">
						&times;
					</button>
					</td>
					<td>
					<input
						type="text"
						class="form-control form-control-sm"
						v-model="detail.prestation"
						placeholder="Prestation"
					/>
					</td>
					<td>
					<input
						type="number"
						min="0"
						class="form-control form-control-sm"
						v-model.number="detail.quantite"
					/>
					</td>
					<td>
					<input
						type="number"
						min="0"
						step="0.01"
						class="form-control form-control-sm"
						v-model.number="detail.prixUnitaire"
					/>
					</td>
					<td>
					{{ (detail.quantite * detail.prixUnitaire).toFixed(2) }}
					</td>
				</tr>
				</tbody>
			</table>
			<button type="button" class="btn btn-sm btn-primary mb-3" @click="addDetail">
				+ Ajouter une prestation
			</button>

			<!-- Remises et Payé -->
			<div class="row mb-3">
				<div class="col-md-4">
				<label for="remises" class="form-label">Remises (€) :</label>
				<input
					type="number"
					min="0"
					step="0.01"
					class="form-control"
					id="remises"
					v-model.number="facture.remises"
				/>
				</div>
				<div class="col-md-4">
				<label for="paye" class="form-label">Payé (€) :</label>
				<input
					type="number"
					min="0"
					step="0.01"
					class="form-control"
					id="paye"
					v-model.number="facture.paye"
				/>
				</div>
			</div>

			<!-- Totaux -->
			<div class="mb-3">
				<p><strong>Total HT :</strong> {{ totalHT.toFixed(2) }} €</p>
				<p><strong>TVA ({{ (facture.tva * 100).toFixed(0) }}%) :</strong> {{ totalTVA.toFixed(2) }} €</p>
				<p><strong>Total TTC :</strong> <span class="fw-bold">{{ totalTTC.toFixed(2) }} €</span></p>
			</div>
			
			<div class="mb-3 d-flex gap-2">
				<BButton @click="onCancel" type="button" variant="secondary">Annuler</BButton>
				<BButton @click="onDelete" iconLeft="trash" type="button" variant="danger"
				>Supprimer</BButton
				>
				<BButton class="ms-auto" iconLeft="save" type="submit" variant="primary"
				>Enregistrer</BButton
				>
			</div>
        </form>
	</div>
</template>

<script setup>
import { useFactureStore } from '@/stores/facture'
import { useClientStore } from '@/stores/client'
import { storeToRefs } from 'pinia'
import { computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
const $router = useRouter()
const factureStore = useFactureStore()
const { facture } = storeToRefs(factureStore)
const { getFacture, deleteFacture, patchFacture } = factureStore
const clientStore = useClientStore()
const { clients } = clientStore
const { getClients } = clientStore

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
})


const dateEmission = computed({
  get() {
    if (!facture.value.dateEmission) return ''
    // Si c’est une date (timestamp) ou un string mal formé, convertir en YYYY-MM-DD
    const d = new Date(facture.value.dateEmission)
    if (isNaN(d)) return ''
    return d.toISOString().slice(0, 10)
  },
  set(value) {
    // La valeur vient du input au format YYYY-MM-DD
    // On peut stocker la string telle quelle, ou la convertir en date si besoin
    facture.value.dateEmission = value
  }
})

const totalHT = computed(() => {
  if (!facture.value.detail) return 0
  let total = facture.value.detail.reduce((acc, item) => {
    const q = Number(item.quantite) || 0
    const pu = Number(item.prixUnitaire) || 0
    return acc + q * pu
  }, 0)
  total -= Number(facture.value.remises) || 0
  return total > 0 ? total : 0
})

const totalTVA = computed(() => {
  const tvaRate = Number(facture.value.tva) || 0
  return totalHT.value * tvaRate
})

const totalTTC = computed(() => {
  return totalHT.value + totalTVA.value
})

const onCancel = () => {
  console.log('Annuler')
  $router.push('/')
}

const onDelete = async () => {
  console.log('Supprimer la facture')
  await deleteFacture(props.id)
  $router.push('/')
}

const onSaveFacture = async () => {
  console.log('Enregistrer la facture')
  await patchFacture(props.id, facture.value)
  $router.push('/')
}

const addDetail = () => {
  facture.value.detail.push({
    prestation: '',
    quantite: 1,
    prixUnitaire: 0,
  })
}

const removeDetail = (index) => {
  facture.value.detail.splice(index, 1)
}

onBeforeMount(async () => {
  await getFacture(props.id)
  await getClients()
  if (facture.remises == null) facture.remises = 0
  if (facture.paye == null) facture.paye = 0
  if (facture.tva == null) facture.tva = 0.2
  if (!facture.detail) facture.detail = []
})
</script>