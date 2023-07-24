import dayjs from "dayjs"
import "dayjs/plugin/duration"
import * as relativeTime from "dayjs/plugin/relativeTime"
import { Comment, Profile } from "../../../libs/supabase/types"
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid"
import { MouseEvent } from "react"

dayjs.extend(relativeTime)

type CommentItemProps = {
  comment: Comment,
  profile: Profile|null,
  userId: string|null,
  onContextMenuOpen: (commentId: number, e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>) => void,
}

export default function CommentItem({comment, profile, userId, onContextMenuOpen}: CommentItemProps) {
  return (
    <div className="w-full mb-3 pb-3 px-3 border-b last:mb-0">
      <div className="flex mb-2 items-center">
        {profile?.avatar_url && <img className="rounded-full border mr-2" src={profile.avatar_url} width="30"/>}
        <div>
          {profile?.user_name ?? comment.nickname} · <span className="text-stone-700" title={dayjs(comment.created_at).format()}>{dayjs().to(dayjs(comment.created_at))}</span>
        </div>
        <div className="flex-1"></div>
        {
          userId == profile?.id ? <div>
            <EllipsisHorizontalIcon className="h-6 w-6 text-stone-500 cursor-pointer" onClick={e => {onContextMenuOpen(comment.id, e)}}/>
          </div> : <></>
        }

      </div>
      <div>
        {comment.content}
      </div>
    </div>

  )
}