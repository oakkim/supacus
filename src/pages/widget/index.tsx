import { useState } from 'react'
import CommentViewer from '../../components/comments/CommentViewer'
import CommentEditor from '../../components/comments/CommentEditor'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores'
import useProfile from '../../hooks/user/useProfile'
import { User } from '@supabase/supabase-js'
import dayjs from 'dayjs'
import "dayjs/locale/ko"
import withAuthStateListener from '../../hocs/withAuthStateListener'
import { useParams } from 'react-router-dom'

dayjs.locale('ko')

function Widget() {
  const [commentViewerKey, setCommentViewerKey] = useState<number>(1)

  const user = useSelector<RootState>(state => state.user.user) as User
  const profile = useProfile(user)

  const params = useParams<{siteId: string, contentId: string}>()
  if (params.siteId == undefined || params.contentId == undefined) {
    window.location.href = '/error?message=사이트 정보가 잘못 입력되었습니다.'
  }
  const siteId = Number.parseInt(params.siteId ?? "0")
  const contentId = params.contentId ?? ""

  return (
    <div>
      <CommentViewer key={commentViewerKey} className="mb-5" siteId={siteId} contentId={contentId} userId={user?.id}/>
      <CommentEditor userId={user?.id} profile={profile} siteId={1} contentId={contentId} onSubmit={() => { setCommentViewerKey(commentViewerKey + 1) }} allowAnonymous/>
    </div>
  )
}

export default withAuthStateListener(Widget)