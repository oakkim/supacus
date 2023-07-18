import { useQuery } from "@tanstack/react-query"
import commentRepository from "../../../repositories/comment"
import CommentItem from "../CommentItem"

type CommentViewerProps = {
  siteId: number,
  contentId: string
}

export default function CommentViewer({ siteId, contentId }: CommentViewerProps) {
  const { isLoading, data, error } = useQuery({
    queryKey: ['comments'],
    queryFn: () => commentRepository.fetchCommentsBySiteAndContent(siteId, contentId).then(r => r.data)
  })

  return (
    <div>
      {isLoading ? <></> : (data ?? []).map((comment) => (
        <CommentItem {...comment}/>
      ))}
    </div>
  )
}