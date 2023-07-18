import { useState, useEffect } from 'react'
import supabase from '../../libs/supabase';
import { Session } from '@supabase/supabase-js';
import CommentViewer from '../../components/comments/CommentViewer';
import CommentEditor from '../../components/comments/CommentEditor';

export default function Widget() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const getSession = async () => {
      const { data: { session }} = await supabase.auth.getSession()
      setSession(session)
    }
    void getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (
      <div>
        <button onClick={() => {
          void supabase.auth.signInWithOAuth({
            provider: 'kakao',
            options: {
              redirectTo: window.location.href
            }
          })
        }}>Login with kakao</button>
      </div>
    )
  }
  else {
    return (
      <div>
        Logged in!
        <CommentViewer siteId={1} contentId='test'/>
        <CommentEditor/>
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