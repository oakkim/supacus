import { useEffect, useState } from 'react'
import supabase from '../../libs/supabase';
import CommentViewer from '../../components/comments/CommentViewer';
import CommentEditor from '../../components/comments/CommentEditor';
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from '../../stores/user';
import { RootState } from '../../stores';

export default function Widget() {
  const [commentViewerKey, setCommentViewerKey] = useState<number>(1);

  const user = useSelector<RootState>(state => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session }} = await supabase.auth.getSession()
      !session?.user || dispatch(userAction.setUser(session!!.user))
    }
    void getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      !session?.user || dispatch(userAction.setUser(session!!.user))
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!user) {
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
        <CommentViewer key={commentViewerKey} siteId={1} contentId='test'/>
        <CommentEditor userId={user?.id} siteId={1} contentId='test' onSubmit={() => { setCommentViewerKey(commentViewerKey + 1); }}/>
        <div>
          {user?.email}
        </div>
        <button onClick={() => {
          void supabase.auth.signOut()
        }}>로그아웃</button>
      </div>
    )
  }
}