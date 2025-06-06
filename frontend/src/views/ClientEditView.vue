<template>
  <div class="container py-5">
    <h1 class="mb-4">
      <i class="bi bi-person-plus-fill me-2"></i>Editer un client
    </h1>

    <form @submit.prevent="onSaveClient" v-if="client">
      <!-- Informations de la facture -->
		<div class="card mb-4">
			<div class="card-header fw-bold">Informations de la facture</div>
			<div class="card-body">
				<div class="row g-3">
				<div class="col-md-4">
					<label for="factureNumero" class="form-label">Facture N°</label>
					<input type="text" class="form-control" v-model="facture.numero" id="factureNumero" />
				</div>
				<div class="col-md-8">
					<label for="factureDescription" class="form-label">Description</label>
					<input type="text" class="form-control" v-model="facture.description" id="factureDescription" />
				</div>
				<div class="col-md-4">
					<label for="factureDateEmission" class="form-label">Date d'émission</label>
					<input type="date" class="form-control" v-model="dateEmission" id="factureDateEmission" />
				</div>
				<div class="col-md-8">
					<label for="factureClient" class="form-label">Client</label>
					<select v-model="facture.client" id="factureClient" class="form-select">
					<option value="">-- Sélectionner un client --</option>
					<option v-for="client in clients" :key="client.id" :value="client.id">
						{{ client.nom }} {{ client.prenom }}
					</option>
					</select>
				</div>
				</div>
			</div>
		</div>

		<!-- Section Détails -->
		<div class="card mb-4">
			<div class="card-header fw-bold d-flex justify-content-between align-items-center">
				<span>Détails de la facture</span>
				<button type="button" class="btn btn-sm btn-outline-primary" @click="addDetail">
				+ Ajouter une prestation
				</button>
			</div>
			<div class="card-body p-0">
				<table class="table table-sm table-bordered m-0">
				<thead class="table-light">
					<tr>
					<th style="width: 50px">X</th>
					<th>Prestation</th>
					<th style="width: 120px">Quantité</th>
					<th style="width: 150px">PU (€)</th>
					<th style="width: 150px">Total (€)</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(detail, index) in facture.detail" :key="index">
					<td class="text-center">
						<BButton variant="danger" size="sm" icon-left="trash-fill" @click="removeDetail(index)"></BButton>
					</td>
					<td>
						<label :for="'prestation-' + index" class="visually-hidden">Prestation</label>
						<input type="text" class="form-control form-control-sm" v-model="detail.prestation" :id="'prestation-' + index" placeholder="Prestation" />
					</td>
					<td>
						<label :for="'quantite-' + index" class="visually-hidden">Quantité</label>
						<input type="number" min="0" class="form-control form-control-sm" v-model.number="detail.quantite" :id="'quantite-' + index" />
					</td>
					<td>
						<label :for="'prixUnitaire-' + index" class="visually-hidden">Prix unitaire</label>
						<input type="number" min="0" step="0.01" class="form-control form-control-sm" v-model.number="detail.prixUnitaire" :id="'prixUnitaire-' + index" />
					</td>
					<td class="text-end align-middle">
						{{ (detail.quantite * detail.prixUnitaire).toFixed(2) }}
					</td>
					</tr>
				</tbody>
				</table>
			</div>
		</div>

		<!-- Section Remises / Paiement -->
		<div class="card mb-4">
			<div class="card-header fw-bold">Paiement et remises</div>
			<div class="card-body">
				<div class="row g-3">
				<div class="col-md-6">
					<label for="factureRemises" class="form-label">Remises (€)</label>
					<input type="number" min="0" step="0.01" class="form-control" id="factureRemises" v-model.number="facture.remises" />
				</div>
				<div class="col-md-6">
					<label for="facturePaye" class="form-label">Payé (€)</label>
					<input type="number" min="0" step="0.01" class="form-control" id="facturePaye" v-model.number="facture.paye" />
				</div>
				</div>
			</div>
		</div>

		<!-- Section Totaux -->
		<div class="card mb-4">
			<div class="card-header fw-bold">Résumé</div>
			<div class="card-body">
				<p><strong>Total HT :</strong> {{ totalHT.toFixed(2) }} €</p>
				<p><strong>TVA ({{ (facture.tva * 100).toFixed(0) }}%) :</strong> {{ totalTVA.toFixed(2) }} €</p>
				<p class="fs-5"><strong>Total TTC :</strong> <span class="fw-bold">{{ totalTTC.toFixed(2) }} €</span></p>
			</div>
		</div>

		<!-- Boutons -->
		<div class="d-flex gap-2">
			<BButton @click="onCancel" type="button" variant="secondary">Annuler</BButton>
			<BButton @click="onDelete" iconLeft="trash" type="button" variant="danger">Supprimer</BButton>
			<BButton class="ms-auto" iconLeft="save" type="submit" variant="primary">Enregistrer</BButton>
		</div>
		</form>
	</div>
</template>

<script setup>
import { useClientStore } from '@/stores/client'
import { storeToRefs } from 'pinia'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
const $router = useRouter()
const clientStore = useClientStore()
const { client } = storeToRefs(clientStore)
const { getClient, deleteClient, patchClient } = clientStore

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
})
const onCancel = () => {
  console.log('Annuler')
  $router.push('/clients')
}

const onDelete = async () => {
  console.log('Supprimer le client')
  await deleteClient(props.id)
  $router.push('/clients')
}

const onSaveClient = async () => {
  console.log('Enregistrer le client')
  await patchClient(props.id, client.value)
  $router.push('/clients')
}

onBeforeMount(async () => {
  await getClient(props.id)
})

</script>
