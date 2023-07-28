import { useCallback, useEffect, useState } from 'react'
import supabase from '../../libs/supabase'
import CommentViewer from '../../components/comments/CommentViewer'
import CommentEditor from '../../components/comments/CommentEditor'
import { useDispatch, useSelector } from 'react-redux'
import { userAction } from '../../stores/user'
import { RootState } from '../../stores'
import useProfile from '../../hooks/user/useProfile'
import { Session, User } from '@supabase/supabase-js'
import dayjs from 'dayjs'
import "dayjs/locale/ko"

dayjs.locale('ko')

export default function Widget() {
  const [commentViewerKey, setCommentViewerKey] = useState<number>(1)

  const user = useSelector<RootState>(state => state.user.user) as User
  const profile = useProfile(user)
  const dispatch = useDispatch()

  const dispatchOnUserLogin = useCallback((session: Session|null) => {
    !session?.user || dispatch(userAction.setUser(session!!.user))
    dispatch(userAction.setLoggedIn(!!(session?.user)))
  }, [dispatch, userAction])

  useEffect(() => {
    if (profile != null) {
      dispatch(userAction.setProfile(profile))
    }
  }, [profile])

  useEffect(() => {
    const getSession = async () => {
      const { data: { session }} = await supabase.auth.getSession()
      dispatchOnUserLogin(session)
    }
    void getSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatchOnUserLogin(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div>
      Logged in!
      <CommentViewer key={commentViewerKey} className="mb-5" siteId={1} contentId='test' userId={user?.id}/>
      <CommentEditor userId={user?.id} profile={profile} siteId={1} contentId='test' onSubmit={() => { setCommentViewerKey(commentViewerKey + 1) }}/>
      <div>
        {user?.email}
      </div>
      {user ? 
        <button onClick={() => {
          const logout = async () => {
            await supabase.auth.signOut()
            window.location.reload()
          }
          logout()
        }}>로그아웃</button> :
        <button onClick={() => {
          void supabase.auth.signInWithOAuth({
            provider: 'kakao',
            options: {
              redirectTo: window.location.href
            }
          })
        }}>Login with kakao</button>
      }
    </div>
  )
}