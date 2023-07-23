import { useCallback, useState } from "react"
import commentRepository from "../../../repositories/comment"
import { Comment, CommentInsertDto, Comments, Profile, SchemaResponse } from "../../../libs/supabase/types"

type CommentEditorProps = {
  className?: string,
  userId: string|null,
  profile?: Profile|null,
  siteId: number,
  contentId: string,
  onSubmit: () => void
}

export default function CommentEditor({ className, userId, profile, siteId, contentId, onSubmit }: CommentEditorProps) {
  const [nickname, setNickname] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [result, setResult] = useState<SchemaResponse<Comments> | null>(null)

  const saveComment = useCallback(() => {
    const insert = async () => {
      const comment: CommentInsertDto = {
        content,
        content_id: contentId,
        site_id: siteId,
        user_id: userId,
      }
      if (userId == null) {
        comment.nickname = nickname
        comment.password = password
      }
      await commentRepository.save(comment)
      setContent("")
      onSubmit()
    }
    insert()
  }, [content, contentId, siteId, userId, onSubmit])
  
  return (
    <div className={`flex flex-col p-3 border ${className}`}>
      <div className="flex mb-2 justify-start">
      {
        !!userId ? <>
          {profile?.avatar_url && <img className="rounded-full border" src={profile.avatar_url} width="30"/>}
          <div className="ml-2">
            {profile?.user_name}
          </div>
        </> : <>
          <input type="text"
            name="nickname"
            placeholder="닉네임"
            className="border rounded-md pl-1.5 py-1.5 mr-2 text-sm w-24"
            value={nickname}
            onChange={e => setNickname(e.target.value)}/>
          <input type="password"
            name="password"
            placeholder="비밀번호"
            className="border rounded-md pl-1.5 py-1.5 text-sm"
            value={password}
            onChange={e => setPassword(e.target.value)}/>
        </>
      }
      </div>
      <div className="flex">
        <textarea
          name="content"
          className="border rounded-md flex-1 mr-3 pl-3 pt-3 min-h-[6rem]"
          value={content}
          onChange={e => setContent(e.target.value)}
          onKeyDown={e => {
            if (e.key == 'Enter') {
              saveComment();
              e.preventDefault();
            }
          }}/> 
        <button className="h-[fit-content]" onClick={saveComment}>작성</button>
      </div>
    </div>
  )
}