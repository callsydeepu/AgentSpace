import {signInWithPopup} from 'firebase/auth'
import React, { useState } from 'react'
import { auth, googleProvider } from '../utils/firebase'
import api from "../utils/axios.js"

function App() {
const [loading, setLoading] = useState(false)

const handleLogin=async(token)=>{
  try {
    const {data}=await api.post("/auth/login",{token})
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}
  const googleLogin=async()=>{
    if (loading) return
    setLoading(true)
    try {
      const data=await signInWithPopup(auth,googleProvider)
      const token= await data.user.getIdToken()
      console.log(token)
      await handleLogin(token)
      console.log(data)
    } catch (error) {
      console.log("Google login error:", error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='w-full h-screen bg-black flex items-center justify-center'>
      <button className='w-50 h-24 bg-white disabled:opacity-50' onClick={googleLogin} disabled={loading}>
        {loading ? "Signing in..." : "continue with google"}
      </button>
    </div>
  )
}

export default App

