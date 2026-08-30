import {signInWithPopup} from 'firebase/auth'
import React, { useState } from 'react'
import { auth, googleProvider } from '../utils/firebase'
import api from '../utils/axios.js'
import Home from './pages/Home.jsx'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserdata } from './redux/userSlice'
import getCurrentUser from './features/getCurrentUser.js'


function App() {
  const dispatch=useDispatch()
useEffect(()=>{
  const getUser=async ()=>{
    const data=await getCurrentUser()
    dispatch(setUserdata(data))
  }
  getUser()
},[])

  return (
   <>
   <Home/>
   </>
  )
}

export default App



  //                   App starts
  //                      │
  //                      ▼
  //             user = null initially
  //                      │
  //                      ▼
  //                App renders
  //                      │
  //                      ▼
  //                 useEff ect()
  //                      │
  //                      ▼
  //               getCurrentUser()
  //                      │
  //               ┌──────┴──────┐
  //               │             │
  //            User found    No user
  //               │             │
  //               ▼             ▼
  //           setUser(u)      user = null
  //               │
  //               ▼
  //        user state updated
  //               │
  //               ▼
  //       App re-renders
  //               │
  //               ▼
  //  <Home user={user} setUser={setUser} />
  //               │
  //               ▼
  //             Home