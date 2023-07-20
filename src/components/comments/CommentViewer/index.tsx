import { useQuery } from "@tanstack/react-query"
import commentRepository from "../../../repositories/comment"
import CommentItem from "../CommentItem"

type CommentViewerProps = {
  siteId: number,
  contentId: string
}

export default function CommentViewer({ siteId, contentId }: CommentViewerProps) {
  const { isLoading, data } = useQuery({
    queryKey: ['comments'],
    queryFn: () => commentRepository.fetchBySiteAndContent(siteId, contentId).then(r => r.data)
  })
  console.log(data)

  return (
    <div>
      {isLoading ? <>로딩중</> : (data ?? []).map((comment) => (
        <CommentItem key={comment.id} comment={comment} profile={comment.profiles}/>
      ))}
    </div>
  )
}