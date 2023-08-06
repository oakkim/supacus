import supabase from "../libs/supabase"
import { Profiles, ProfileInsertDto, Profile, Response } from "../libs/supabase/types"

class ProfileRepository {
  public async fetchOne(id: string): Promise<Response<Profile|null>> {
    return await supabase.from<'profiles', Profiles>('profiles')
        .select()
        .eq("id", id)
        .returns<Profile>()
        .maybeSingle()
  }

  public async save(profile: ProfileInsertDto): Promise<Response<Profile>> {
    return await supabase.from('profiles').insert(profile).select().returns<Profile>()
  }
}

const profileRepository = new ProfileRepository()
export default profileRepository