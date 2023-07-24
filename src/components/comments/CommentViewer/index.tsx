import { useQuery } from "@tanstack/react-query"
import commentRepository from "../../../repositories/comment"
import CommentItem from "../CommentItem"
import ContextMenu from "../../ContextMenu"
import ContextMenuItem from "../../ContextMenu/ContextMenuItem"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"
import { createRef, useRef, useState } from "react"
import useComponentVisible from "../../../hooks/useComponentVisible"

type CommentViewerProps = {
  className?: string
  siteId: number
  contentId: string
  userId: string|null
}

export default function CommentViewer({ className, siteId, contentId, userId }: CommentViewerProps) {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ['comments'],
    queryFn: () => commentRepository.fetchBySiteAndContent(siteId, contentId).then(r => r.data)
  })

  const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false)
  const [workingCommentId, setWorkingCommentId] = useState<number|null>(null)
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)

  return (
    <div className={`pt-3 border-t border-x ${className}`}>
      <ContextMenu
        ref={ref}
        className={`${isComponentVisible ? '' : 'invisible'} absolute bg-white`}
        style={{top: top, left: left}}>
        <ContextMenuItem
          id="edit"
          icon={<PencilSquareIcon className="w-5 h-5"/>}
          title="편집"
          onClick={() => {}}/>
        <ContextMenuItem
          className="text-red-500"
          id="delete"
          icon={<TrashIcon className="w-5 h-5"/>}
          title="삭제"
          onClick={() => {
            if (workingCommentId != null) {
              const deleteComment = async () => {
                await commentRepository.delete(workingCommentId)
                refetch()
              }
              deleteComment()
            }
          }}/>
      </ContextMenu>
      {isLoading ? <>로딩중</> : (data ?? []).map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          profile={comment.profiles}
          userId={userId}
          onContextMenuOpen={(id, e) => {
            setWorkingCommentId(id)
            setIsComponentVisible(true)
            const rect = e.currentTarget.getBoundingClientRect()
            setLeft(rect.left - ((ref.current?.clientWidth ?? 0) + window.scrollX))
            setTop(rect.top + ((e.currentTarget.clientHeight / 2) + window.scrollY))
          }}/>
      ))}
    </div>
  )
}