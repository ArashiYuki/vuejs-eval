import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'

const getItems = async (req, res) => {
  try {
    const data = await fs.promises.readFile('./db/clients.json', 'utf8')
    const list = JSON.parse(data)
    res.json(list)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: true, message:'Error reading file' })
  }
}

const getItem = async (req, res) => {
  try {
    const data = await fs.promises.readFile('./db/clients.json', 'utf8')
    const list = JSON.parse(data)
    
    const item = list.find(item => item.id == req.params.id)

    if (!item) {
      res.status(404).json({ error: true, message:'Client not found' })
      return
    }
    
    res.json(item)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: true, message:'Error reading file' })
  }
}

const patchItem = async (req, res) => {
  try {
    // récupération des données depuis le fichier JSON
    const data = await fs.promises.readFile('./db/clients.json', 'utf8')
    // conversion des données en objet JSON
    const list = JSON.parse(data)
    
    // chercher l'utilisateur dans la liste des données
    const itemToEdit = list.find(item => item.id == req.params.id)
    if (!itemToEdit) {
      res.status(404).json({ error: true, message:'Client not found' })
      return
    }
    // modifier la donnée utilisateur
    const itemToSave = {
      ...itemToEdit,
      ...req.body
    }
    // modifier la liste des données
    const listToSave = list.map(item => item.id == req.params.id ? itemToSave : item)
    // sauvegarder la liste des données
    await fs.promises.writeFile('./db/clients.json', JSON.stringify(listToSave))

    // puis on renvoie la donnée utilisateur
    res.json(itemToSave)
  } catch (err) {
    // en cas d'erreur, on renvoie un message d'erreur
    console.log(err)
    res.status(500).json({ error: true, message:'Error reading file' })
  }
}

const postItem = async (req, res) => {
  try {
    // récupération des données depuis le fichier JSON
    const data = await fs.promises.readFile('./db/clients.json', 'utf8')
    // conversion des données en objet JSON
    const list = JSON.parse(data)
    // modifier la donnée utilisateur
    const itemToSave = {
      ...req.body
    }
    // ajouter l'id
    itemToSave.id = uuidv4()
    
    // vérification des données côté backend (IMPORTANT pour la sécurité)
    if (!itemToSave.nom || itemToSave.nom.trim().length < 3) {
      console.log(itemToSave)
      res.status(400).json({ error: true, message: 'Missing nom or nom too short' })
      return
    }
    if (!itemToSave.prenom || itemToSave.prenom.trim().length < 3) {
      res.status(400).json({ error: true, message: 'Missing prenom or prenom too short' })
      return
    }

    // modifier la liste des données
    list.push(itemToSave)
    // sauvegarder la liste des données
    await fs.promises.writeFile('./db/clients.json', JSON.stringify(list))

    // puis on renvoie la donnée utilisateur
    res.json(itemToSave)
  } catch (err) {
    // en cas d'erreur, on renvoie un message d'erreur
    console.log(err)
    res.status(500).json({ error: true, message:'Error reading file' })
  }
}
const deleteItem = async (req, res) => {
  try {
    // récupération des données depuis le fichier JSON
    const data = await fs.promises.readFile('./db/clients.json', 'utf8')
    // conversion des données en objet JSON
    const list = JSON.parse(data)
    
    // chercher l'utilisateur dans la liste des données
    const itemToDelete = list.find(item => item.id == req.params.id)
    if (!itemToDelete) {
      res.status(404).json({ error: true, message:'Client not found' })
      return
    }
    
    // modifier la liste des données
    const listToSave = list.filter(item => item.id != req.params.id)

    // sauvegarder la liste des données
    await fs.promises.writeFile('./db/clients.json', JSON.stringify(listToSave))

    // puis on renvoie un message de confirmation
    res.json({ error: false, message: 'Client deleted' })
  } catch (err) {
    // en cas d'erreur, on renvoie un message d'erreur
    console.log(err)
    res.status(500).json({ error: true, message:'Error reading file' })
  }
}


export { getItems, getItem, patchItem, postItem, deleteItem }