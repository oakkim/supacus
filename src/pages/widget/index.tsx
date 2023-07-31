import { useState } from 'react'
import supabase from '../../libs/supabase'
import CommentViewer from '../../components/comments/CommentViewer'
import CommentEditor from '../../components/comments/CommentEditor'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores'
import useProfile from '../../hooks/user/useProfile'
import { User } from '@supabase/supabase-js'
import dayjs from 'dayjs'
import "dayjs/locale/ko"
import withAuthStateListener from '../../hocs/withAuthStateListener'

dayjs.locale('ko')

function Widget() {
  const [commentViewerKey, setCommentViewerKey] = useState<number>(1)

  const user = useSelector<RootState>(state => state.user.user) as User
  const profile = useProfile(user)

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

export default withAuthStateListener(Widget)