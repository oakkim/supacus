import { useCallback, useRef, useState } from "react"
import commentRepository from "../../../repositories/comment"
import { CommentInsertDto, Profile } from "../../../libs/supabase/types"
import kakaoLogo from '../../../assets/auth/icons/icon_kakao.svg'
import supabase from "../../../libs/supabase"
import ContextMenu from "../../ContextMenu"
import ContextMenuItem from "../../ContextMenu/ContextMenuItem"
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline"
import useComponentVisible from "../../../hooks/useComponentVisible"
import { useDispatch } from "react-redux"
import { userAction } from "../../../stores/user"
import useClientIp from "../../../hooks/useClientIp"

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

  const {ref, componentVisible, setComponentVisible} = useComponentVisible(false)
  const [left, setLeft] = useState<number>(0)
  const [top, setTop] = useState<number>(0)

  const dispatch = useDispatch()
  const ip = useClientIp()

  const saveComment = useCallback(() => {
    const insert = async () => {
      const comment: CommentInsertDto = {
        content,
        content_id: contentId,
        site_id: siteId,
        user_id: userId,
        ip: ip
      }
      if (userId == null) {
        comment.nickname = nickname
      }
      await commentRepository.save(comment)
      setContent("")
      onSubmit()
    }
    insert()
  }, [nickname, content, contentId, siteId, userId, onSubmit])
  
  return (
    <>
      <div className={`flex flex-col p-3 border ${className}`}>
        <div className="flex flex-col">
          <textarea
            name="content"
            className="border rounded-md flex-1 pl-3 pt-3 min-h-[6rem]"
            value={content}
            placeholder={!allowAnonymous && userId == null ? "로그인 후 댓글을 작성해보세요." : ""}
            disabled={!allowAnonymous && userId == null}
            onChange={e => setContent(e.target.value)}
            onKeyDown={e => {
              if (e.key == 'Enter') {
                saveComment();
                e.preventDefault();
              }
            }}/> 
          <div className="flex mt-2">
            <div className="flex mb-2 justify-start">
              {
                !!userId ? <div className="flex flex-row items-center cursor-pointer" onClick={(e) => {
                      setComponentVisible(true)
                      const rect = e.currentTarget.getBoundingClientRect()
                      setLeft(rect.left + window.scrollX)
                      setTop(rect.top + (e.currentTarget.clientHeight + 5) + window.scrollY)
                    }}>
                  {profile?.avatar_url && <img className="rounded-full border mr-2" src={profile.avatar_url} width="30"/>}
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
                      <img src={kakaoLogo}/>
                    </div>
                  </div>
                </>
              }
            </div>
            <div className="flex-1"/>
            <button className="h-[fit-content]" onClick={saveComment}>작성</button>
          </div>
        </div>
      </div>
      <ContextMenu ref={ref} className={`${componentVisible ? '' : 'invisible'} absolute bg-white`} style={{left, top}}>
        <ContextMenuItem
          id="logout"
          title="로그아웃"
          icon={<ArrowLeftOnRectangleIcon className="w-5"/>}
          onClick={() => {
            const logout = async () => {
              await supabase.auth.signOut()
              dispatch(userAction.reset())
            }
            logout()
            setComponentVisible(false)
          }}/>
      </ContextMenu>
    </>
)
}