import { useState } from "react"
import commentRepository from "../../../repositories/comment"
import { Comment, CommentInsertDto, Comments, SchemaResponse } from "../../../libs/supabase/types"

type CommentEditorProps = {
  userId: string,
  siteId: number,
  contentId: string,
  onSubmit: () => void
}

export default function CommentEditor({ userId, siteId, contentId, onSubmit }: CommentEditorProps) {
  const [content, setContent] = useState<string>("")
  const [result, setResult] = useState<SchemaResponse<Comments> | null>(null)
  
  return (
    <div>
      <input type="text" value={content} onChange={e => setContent(e.target.value)}/> 
      <div>
        {userId}
      </div>
      <button onClick={() => {
        const insert = async () => {
          const comment: CommentInsertDto = {
            content,
            content_id: contentId,
            site_id: siteId,
            user_id: userId,
          }
          await commentRepository.saveComment(comment)
          onSubmit()
        }
        insert()
      }}>submit</button>
    </div>
  )
}