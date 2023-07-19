import { useQuery } from "@tanstack/react-query"
import commentRepository, { GetCommentsDto } from "../../../repositories/comment"
import CommentItem from "../CommentItem"

type CommentViewerProps = {
  siteId: number,
  contentId: string
}

export default function CommentViewer({ siteId, contentId }: CommentViewerProps) {
  const { isLoading, data, error } = useQuery<GetCommentsDto[]|null, unknown, GetCommentsDto[]|null, string[]>({
    queryKey: ['comments'],
    queryFn: () => commentRepository.fetchCommentsBySiteAndContent(siteId, contentId).then(r => r.data)
  })
  console.log(data)

  return (
    <div>
      {isLoading ? <></> : (data ?? []).map((comment) => (
        <CommentItem key={comment.id} {...comment}/>
      ))}
    </div>
  )
}