import {useState,useEffect} from 'react'
import '@/styles/globals.css'
// import {supabase} from '@supabase/supabase-js' 
import { supabase } from '../utils/SupabaseClient'
import Auth from '@/components/Auth'
import Header from '@/components/Header'

export default function App({ Component, pageProps }) {

  const [session,setSession] = useState(null)
  const [loading,setLoading] = useState(null)

  useEffect(()=>{
    let mounted = true;
    async function getInitialSession(){

      setLoading(true)

      const {data: {session} } = await supabase.auth.getSession()


      if(mounted){
        if(session){
          setSession(session)
        }
      }
    };

    getInitialSession();

    const {subscription} = supabase.auth.onAuthStateChange((_event,session)=>{
      setSession(session)
    })

    return () =>{
      mounted = false;
      subscription?.unsubscribe()
    }

  },[])

  return (

    <>
      {!session?
      (
        <Auth/>
      ) :
      (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
           <Header session={session}/>
          <Component {...pageProps} />
        </div>
      )
     

      }
    </>

  )
}
