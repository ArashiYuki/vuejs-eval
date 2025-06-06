<template>
  <div class="container py-5">
    <h1 class="mb-4">
      <i class="bi bi-person-plus-fill me-2"></i>Créer un client
    </h1>

    <form @submit.prevent="onCreateClient" v-if="client">
      <!-- Informations principales -->
      <div class="card mb-4">
        <div class="card-header fw-bold">Identité du client</div>
        <div class="card-body">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label" for="nom">Nom</label>
              <input type="text" class="form-control" v-model="client.nom" id="nom"/>
            </div>
            <div class="col-md-6">
              <label class="form-label" for="prenom">Prénom</label>
              <input type="text" class="form-control" v-model="client.prenom" id="prenom"/>
            </div>
            <div class="col-md-6">
              <label class="form-label" for="email">Email</label>
              <input type="email" class="form-control" v-model="client.email" id="email"/>
            </div>
            <div class="col-md-6">
              <label class="form-label" for="telephone">Téléphone</label>
              <input type="tel" class="form-control" v-model="client.telephone" id="telephone"/>
            </div>
          </div>
        </div>
      </div>

      <!-- Informations professionnelles -->
      <div class="card mb-4">
        <div class="card-header fw-bold">Informations professionnelles</div>
        <div class="card-body">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label" for="entreprise">Entreprise</label>
              <input type="text" class="form-control" v-model="client.entreprise" id="entreprise"/>
            </div>
            <div class="col-md-6">
              <label class="form-label" for="fonction">Fonction</label>
              <input type="text" class="form-control" v-model="client.fonction" id="fonction"/>
            </div>
          </div>
        </div>
      </div>

      <!-- Adresse -->
      <div class="card mb-4">
        <div class="card-header fw-bold">Adresse</div>
        <div class="card-body">
          <div class="row g-3">
            <div class="col-md-12">
              <label class="form-label" for="adresse">Adresse</label>
              <input type="text" class="form-control" v-model="client.adresse" placeholder="Adresse ligne 1" id="adresse"/>
            </div>
            <div class="col-md-12">
              <label class="form-label" for="adresse2">Adresse</label>
              <input type="text" class="form-control" v-model="client.adresse1" placeholder="Adresse ligne 1" id="adresse2"/>
            </div>
            <div class="col-md-4">
              <label class="form-label" for="codePostal">Code Postal</label>
              <input type="text" class="form-control" v-model="client.codePostal" id="codePostal"/>
            </div>
            <div class="col-md-4">
              <label class="form-label" for="ville">Ville</label>
              <input type="text" class="form-control" v-model="client.ville" id="ville"/>
            </div>
            <div class="col-md-4">
              <label class="form-label" for="pays">Pays</label>
              <input type="text" class="form-control" v-model="client.pays" id="pays"/>
            </div>
          </div>
        </div>
      </div>

      <!-- Boutons -->
      <div class="d-flex gap-2">
        <BButton @click="onCancel" type="button" variant="secondary">Annuler</BButton>
        <BButton class="ms-auto" iconLeft="save" type="submit" variant="primary">Enregistrer</BButton>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BButton from '@/components/BButton.vue'
import { clientInterface } from '@/interfaces/client'
import { useClientStore } from '@/stores/client'

const $router = useRouter()
const clientStore = useClientStore()
const { createClient } = clientStore

// Nouveau client vide basé sur l'interface
const client = ref({ ...clientInterface })

const onCreateClient = async () => {
  await createClient(client.value)
  $router.push('/clients')
}

const onCancel = () => {
  $router.push('/clients')
}
</script>
