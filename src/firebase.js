import firebase from 'firebase'
import { ref, onUnmounted } from 'vue'

const config = {

        apiKey: "AIzaSyChFPGuDFxpxPEsl2eo7zVAdyFAJKpQNz0",
        authDomain: "thumb-zone-bf10c.firebaseapp.com",
        projectId: "thumb-zone-bf10c",
        storageBucket: "thumb-zone-bf10c.appspot.com",
        messagingSenderId: "312157025998",
        appId: "1:312157025998:web:4198e93a60661cc1a7829f",
        measurementId: "G-RE14RQSCYP"
      
}

const firebaseApp = firebase.initializeApp(config)

const db = firebaseApp.firestore()
const usersCollection = db.collection('thumbs')

export const createUser = user => {
  return usersCollection.add(user)
}

export const getUser = async id => {
  const user = await usersCollection.doc(id).get()
  return user.exists ? user.data() : null
}

export const updateUser = (id, user) => {
  return usersCollection.doc(id).update(user)
}

export const deleteUser = id => {
  return usersCollection.doc(id).delete()
}

export const useLoadUsers = () => {
  const users = ref([])
  const close = usersCollection.onSnapshot(snapshot => {
    users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return users
}