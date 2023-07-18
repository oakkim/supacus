import { useState } from "react"
import commentRepository from "../../../repositories/comment"

export default function CommentEditor() {
  const [content, setContent] = useState<string>("")
  return (
    <div>
      <input type="text" value={content} onChange={e => setContent(e.target.value)}/> 
      <button onClick={() => {
        const f = async () => {
          commentRepository.saveComment()
        }
      }}>submit</button>
    </div>
  )
}