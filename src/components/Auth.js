import { supabase } from '@/utils/SupabaseClient'
import React, { useState } from 'react'

export default function Auth() {

    const [loading, setLoading] = useState(false)
    const [email,setEmail] = useState('')

    const handleLogin = async ()=>{
        try {
            setLoading(true)
            const {error}  = supabase.auth.signInWithOtp({email})
            if(error) throw error
            alert('Check your email to get link!')
        } catch (error) {
            alert(error.error_description || error.error.message)
        }finally{
            setLoading(false)
        }
    }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1>Login or Signup</h1>
        <div className='space-y-4'>
      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
        Email
      </label>
      <div className="mt-2">
        <input
          type="email"
          name="email"
          id="email"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="you@example.com"
          onChange={(e)=>setEmail(e.target.value)}
        />
      </div>
      <button
        type="button"
        className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={()=>handleLogin()}
      >
        Send the magic link
      </button>
    </div>
    </div>
  )
}
