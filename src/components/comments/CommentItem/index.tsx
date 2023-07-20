import { Comment, Profile } from "../../../libs/supabase/types"

type CommentItemProps = {
  comment: Comment,
  profile: Profile
}

export default function CommentItem({comment, profile}: CommentItemProps) {
  return (
    <div>
      {profile.avatar_url && <img src={profile.avatar_url} width="30"/>}
      <div>
        {profile.user_name}
      </div>
      <div>
        {comment.content}
      </div>
    </div>
  )
}