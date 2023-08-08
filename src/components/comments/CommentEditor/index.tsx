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
              // 한국어는 함수 호출이 두번되는 문제
              // https://1two13.tistory.com/entry/react-onKeyDown-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%ED%95%9C%EA%B8%80-%EC%9E%85%EB%A0%A5-%EC%8B%9C-%ED%95%A8%EC%88%98%EA%B0%80-%EB%91%90-%EB%B2%88-%EC%8B%A4%ED%96%89%EB%90%98%EB%8A%94-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0#:~:text=%EA%B2%80%EC%83%89%EC%B0%BD%EC%97%90%20%EA%B2%80%EC%83%89%EC%96%B4%EB%A5%BC%20%EC%9E%85%EB%A0%A5%ED%95%98%EA%B3%A0%20%ED%82%A4%EB%B3%B4%EB%93%9C%EB%A5%BC%20%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC%20%EC%9C%84%EC%95%84%EB%9E%98%EC%97%90%20%EC%9D%B4%EB%8F%99%20%EC%8B%9C%2C,%EC%A1%B0%ED%95%A9%EB%AC%B8%EC%9E%90%EC%9D%B8%EC%A7%80%20%EC%95%84%EB%8B%8C%EC%A7%80%EB%A5%BC%20%ED%8C%90%EB%8B%A8%ED%95%9C%EB%8B%A4.%20%ED%95%9C%EA%B8%80%EC%9D%80%20%EC%A1%B0%ED%95%A9%EB%AC%B8%EC%9E%90%EC%9D%B4%EA%B3%A0%2C%20%EC%98%81%EC%96%B4%EB%8A%94%20%EC%A1%B0%ED%95%A9%EB%AC%B8%EC%9E%90%EA%B0%80%20%EC%95%84%EB%8B%88%EB%8B%A4.
              if (e.key == 'Enter' && e.nativeEvent.isComposing == false) {
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
                      <img className="w-full" src={kakaoLogo}/>
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
