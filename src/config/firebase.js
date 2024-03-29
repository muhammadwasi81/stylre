// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDlmlN6OHwIpMVsJM7c5i0OxrhlOyg0enE',
  authDomain: 'stylre.firebaseapp.com',
  projectId: 'stylre',
  storageBucket: 'stylre.appspot.com',
  messagingSenderId: '860843145475',
  appId: '1:860843145475:web:756f6b65afb54f7de79136',
  measurementId: 'G-L8Z3EY4KZW',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
