import { useEffect, useState } from "react"
import { Profile, ProfileInsertDto } from "../../libs/supabase/types"
import profileRepository from "../../repositories/profile"
import { User } from "@supabase/supabase-js"

const useProfile = (user: User|null) => {
  const [profile, setProfile] = useState<Profile|null>(null)

  const insertProfile = async (user: User) => {
    const profile: ProfileInsertDto = {
        id: user.id,
        user_name: user.app_metadata.provider == "kakao" ? user.user_metadata['user_name'] : user.email?.substring(0, user.email?.indexOf("@")),
        avatar_url: user.app_metadata.provider == "kakao" ? user.user_metadata['avatar_url'] : null
      }
    return await profileRepository.save(profile)
  }

  const upsertProfile = async (user: User) => {
    // TODO: 실패시 로직처리
    const profile = (await profileRepository.fetchOne(user.id)).data ?? (await insertProfile(user)).data
    setProfile(profile)
  }

  useEffect(() => {
    if (user != null) {
      upsertProfile(user)
    } else {
      setProfile(null)
    }
  }, [user])

  return profile
}

export default useProfile