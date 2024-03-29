// Auth.js
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../config/firebase'

const Auth = ({ signInWithGoogle }) => {
  // const navigate = useNavigate()

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       navigate('/')
  //     }
  //   })

  //   return () => unsubscribe()
  // }, [navigate])

  return (
    <div className="d-flex justify-content-center">
      <button onClick={signInWithGoogle} style={buttonStyle}>
        Sign in with Google
      </button>
    </div>
  )
}

const buttonStyle = {
  backgroundColor: '#DB4437',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
  outline: 'none',
}

export default Auth
