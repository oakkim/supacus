import { useQuery } from "@tanstack/react-query"
import commentRepository from "../../../repositories/comment"
import CommentItem from "../CommentItem"
import ContextMenu from "../../ContextMenu"
import ContextMenuItem from "../../ContextMenu/ContextMenuItem"
import { TrashIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import useComponentVisible from "../../../hooks/useComponentVisible"
import sha512 from 'crypto-js/sha512'

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

  const {ref, componentVisible, setComponentVisible} = useComponentVisible(false)
  const [workingCommentId, setWorkingCommentId] = useState<number|null>(null)
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)

  return (
    <div>
      <ContextMenu
        ref={ref}
        className={`${componentVisible ? '' : 'invisible'} absolute bg-white`}
        style={{top: top, left: left}}>
        {/* <ContextMenuItem
          id="edit"
          icon={<PencilSquareIcon className="w-5 h-5"/>}
          title="편집"
          onClick={() => {}}/>  */ /* 현재 기능 지원하지 않음. */}
        <ContextMenuItem
          className="text-red-500"
          id="delete"
          icon={<TrashIcon className="w-5 h-5"/>}
          title="삭제"
          onClick={() => {
            if (workingCommentId != null) {
              const comment = data?.find(c => c.id == workingCommentId)
              if (!comment) return

              const deleteComment = async () => {
                await commentRepository.delete(workingCommentId)
                refetch()
              }
              const deleteAnonComment = async () => {
                const password = sha512(window.prompt('비밀번호') ?? "").toString()
                console.log(await commentRepository.deleteAnonComment(workingCommentId, password))
                refetch()
              }

              if (comment.user_id == null) {
                deleteAnonComment()
              } else {
                deleteComment()
              }
              setComponentVisible(false)
            }
          }}/>
      </ContextMenu>
      <div className={`border-x ${className}`}>
        {isLoading ? <div className="border-y p-3">로딩중</div> : !data || data.length == 0 ? <div className="border-y p-3">첫번째 댓글을 남겨보세요!</div> : data.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            profile={comment.profiles}
            userId={userId}
            onContextMenuOpen={(id, e) => {
              setWorkingCommentId(id)
              setComponentVisible(true)
              const rect = e.currentTarget.getBoundingClientRect()
              setLeft(rect.left - ((ref.current?.clientWidth ?? 0) + window.scrollX))
              setTop(rect.top + ((e.currentTarget.clientHeight / 2) + window.scrollY))
            }}/>
        ))}
      </div>
    </div>
  )
}