import { getDatabase } from 'firebase/database'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyDqn4vYpLltLxeZQMODaFGkw1wnE8Kfu4s',
  authDomain: 'siftlix.firebaseapp.com',
  databaseURL: 'https://siftlix-default-rtdb.firebaseio.com',
  projectId: 'siftlix',
  storageBucket: 'siftlix.appspot.com',
  messagingSenderId: '112599122056',
  appId: '1:112599122056:web:69ae9ae7b283d46c3cdf3d'
}

const app = initializeApp(firebaseConfig)
export const db = getDatabase()
