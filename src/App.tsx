import './index.css'
import { useState, useEffect } from 'react'
import supabase from './libs/supabase'
import { Session } from '@supabase/supabase-js'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const getSession = async () => {
      const { data: { session }} = await supabase.auth.getSession()
      setSession(session)
    }
    void getSession()
    
    // .then(({ data: { session } }) => {
    //   setSession(session)
    // })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    // return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={['kakao']}/>)
    return (
      <div>
        <button onClick={() => {
          void supabase.auth.signInWithOAuth({
            provider: 'kakao',
          })
        }}>Login with kakao</button>
      </div>
    )
  }
  else {
    return (
      <div>
        Logged in!
        <div>
          {session?.user?.email}
        </div>
        <button onClick={() => {
          void supabase.auth.signOut()
        }}>로그아웃</button>
      </div>
    )
  }
}