import supabase from "../libs/supabase"
import { Site, Response } from "../libs/supabase/types"

class SiteRepository {
  public async fetchById(id: number): Promise<Response<Site|null>> {
    return await supabase.from('sites')
        .select()
        .eq("id", id)
        .returns<Site>()
        .maybeSingle()
  }
}

const siteRepository = new SiteRepository()
export default siteRepository