import { signInWithPopup } from 'firebase/auth'
import React, { useState } from 'react'
import { auth, googleProvider } from '../../utils/firebase.js'
import { FcGoogle } from "react-icons/fc"
import api from "../../utils/axios.js"
import { useDispatch, useSelector } from 'react-redux'
import { setUserdata } from '../redux/userSlice.js'

function Home() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.userData)
    const [loading, setLoading] = useState(false)

    const handleLogin = async (token) => {
        try {
            const { data } = await api.post("/api/auth/login", { token })
            console.log("Logged in user:", data)
            dispatch(setUserdata(data))
        } catch (error) {
            console.error("Login API error:", error)
        }
    }

    const googleLogin = async () => {
        if (loading) return
        setLoading(true)
        try {
            const data = await signInWithPopup(auth, googleProvider)
            const token = await data.user.getIdToken()
            await handleLogin(token)
        } catch (error) {
            if (error.code === 'auth/popup-closed-by-user') {
                console.log("Login popup was closed by user.")
            } else if (error.code === 'auth/popup-blocked') {
                alert("Login popup was blocked by your browser. Please allow popups for this site.")
            } else if (error.code === 'auth/cancelled-popup-request') {
                console.log("Previous popup request was cancelled.")
            } else {
                console.error("Google sign-in error:", error)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='h-screen flex bg-[#0d0f14] text-white overflow-hidden p-8'>
            {!user ? (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur'>
                    <div className='w-[340px] bg-[#13151c] border border-white/[0.08] rounded-2xl p-7 flex flex-col gap-5'>
                        <div className='flex flex-col gap-1'>
                            <h2 className='text-[17px] font-semibold text-slate-100 tracking-tight'>Welcome to CortexAI</h2>
                            <p className='text-[13px] text-slate-500'>Please login to continue using the app.</p>
                        </div>

                        <button 
                            disabled={loading}
                            className={`w-full flex items-center justify-center gap-3 py-[11px] rounded-xl text-sm font-medium text-black/90 bg-white hover:bg-gray-200 transition-all duration-150 cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={googleLogin}
                        >
                            <FcGoogle size={15} />
                            {loading ? 'Signing in...' : 'Continue With Google'}
                        </button>
                    </div>
                </div>
            ) : (
                <div className='flex flex-col gap-4'>
                    <h1 className='text-2xl font-bold'>Welcome back, {user.name}!</h1>
                    <p className='text-gray-400'>Email: {user.email}</p>
                    {user.avatar && <img src={user.avatar} alt="Avatar" className='w-12 h-12 rounded-full' />}
                </div>
            )}
        </div>
    )
}

export default Home