import { useCallback, useRef, useState } from "react"
import commentRepository from "../../../repositories/comment"
import { CommentInsertDto, Profile } from "../../../libs/supabase/types"
import kakaoLogo from '../../../assets/auth/icons/icon_kakao.svg'
import supabase from "../../../libs/supabase"
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline"
import { useDispatch } from "react-redux"
import { userAction } from "../../../stores/user"
import useClientIp from "../../../hooks/useClientIp"
import useShortcut from "../../../hooks/useShortcut"
import { useMediaQuery } from "react-responsive"

type CommentEditorProps = {
  className?: string,
  userId: string|null,
  profile?: Profile|null,
  siteId: number,
  contentId: string,
  allowAnonymous?: boolean,
  onSubmit: () => void
}

export default function CommentEditor({ className, userId, profile, siteId, contentId, allowAnonymous = false, onSubmit }: CommentEditorProps) {
  const nicknameInputRef = useRef<HTMLInputElement>(null)
  const [nickname, setNickname] = useState<string>("")
  const [content, setContent] = useState<string>("")

  const dispatch = useDispatch()
  const ip = useClientIp()

  const saveComment = useCallback(() => {
    if (userId == null && nickname.trim() == "") {
      alert("닉네임을 입력해주세요.")
      return
    }

    if (content.trim() == "") {
      alert("내용을 입력해주세요.")
      return
    }

    const insert = async () => {
      const comment: CommentInsertDto = {
        content: content.trim(),
        content_id: contentId,
        site_id: siteId,
        user_id: userId,
        ip: ip
      }
      if (userId == null) {
        comment.nickname = nickname.trim()
      }
      await commentRepository.save(comment)
      setContent("")
      onSubmit()
    }
    insert()
  }, [nickname, content, contentId, siteId, userId, onSubmit])

  const handleSaveCommentAction = useCallback((e: KeyboardEvent) => {
    saveComment()
    e.preventDefault()
  }, [saveComment])

  const handleNewLineAction = useCallback((e: KeyboardEvent) => {
    setContent(content + "\n")
    e.preventDefault()
  }, [content, setContent])
  
  const isMobile = useMediaQuery({maxWidth: '500px'})
  const ref = useShortcut<HTMLTextAreaElement>([{
    keys: ['Enter'],
    callback: handleSaveCommentAction,
    disabled: isMobile
  }, {
    keys: ['Shift', 'Enter'],
    callback: handleNewLineAction,
    disabled: isMobile
  }])

  return (
    <>
      <div className={`flex flex-col p-3 border ${className}`}>
        <div className="flex flex-col gap-2">
          <div className="flex justify-start">
            {
              !!userId ? <div className="flex flex-row items-center">
                {profile?.avatar_url && <img className="rounded-full border mr-2 w-8 h-8" src={profile.avatar_url}/>}
                <div>
                  {profile?.user_name}
                </div>
              </div> : <>
                {allowAnonymous ? 
                  <>
                    <input ref={nicknameInputRef}
                      type="text"
                      name="nickname"
                      placeholder="닉네임"
                      className="border rounded-md pl-1.5 py-1.5 mr-2 text-sm w-24"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}/>
                  </>
                  :
                  <></>
                }
                <div className="flex items-center">
                  <div className="flex items-center justify-center bg-kakao p-2 rounded-md cursor-pointer w-8 h-8" onClick={() => {
                      window.open('/login', 'Login', 'width=500, height=800, location=no, toolbars=no')
                    }}>
                    <img className="w-full" src={kakaoLogo}/>
                  </div>
                </div>
              </>
            }
            <div className="flex-1"></div>
            <div className={`${profile != null ? "visible" : "invisible"} flex flex-row items-center justify-center cursor-pointer gap-1 py-1`} onClick={() => {
              const logout = async () => {
                await supabase.auth.signOut()
                dispatch(userAction.reset())
              }
              logout()
            }}>
              <ArrowLeftOnRectangleIcon className="w-5"/>
              <div>로그아웃</div>
            </div> 
          </div>
          <textarea ref={ref}
            name="content"
            className="border rounded-md flex-1 pl-3 pt-3 min-h-[6rem]"
            value={content}
            placeholder={!allowAnonymous && userId == null ? "로그인 후 댓글을 작성해보세요." : ""}
            disabled={!allowAnonymous && userId == null}
            onChange={e => setContent(e.target.value)}/> 
          <div className="flex items-center">
            <div>
              {isMobile ? '' : 'Shift+Enter로 줄바꿈'}
            </div>
            <div className="flex-1"/>
            <div>
              <button className="h-full p-0 px-4 py-1.5" onClick={saveComment}>작성</button>
            </div>
          </div>
        </div>
      </div>
    </>
)
}
