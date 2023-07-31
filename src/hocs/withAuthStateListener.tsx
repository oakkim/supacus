import { ComponentType, useCallback, useEffect } from "react"
import useProfile from "../hooks/user/useProfile"
import { useDispatch, useSelector } from "react-redux"
import { Session, User } from "@supabase/supabase-js"
import { userAction } from "../stores/user"
import supabase from "../libs/supabase"
import { RootState } from "../stores"

function withAuthStateListener(OriginalComponent: ComponentType) {
  const WithAuthStateListener = () => {
    const user = useSelector<RootState>(state => state.user.user) as User
    const profile = useProfile(user)
    const dispatch = useDispatch()
  
    const dispatchOnUserLogin = useCallback((session: Session|null) => {
      !session?.user || dispatch(userAction.setUser(session!!.user))
      dispatch(userAction.setLoggedIn(!!(session?.user)))
    }, [dispatch, userAction])
  
    useEffect(() => {
      if (profile != null) {
        dispatch(userAction.setProfile(profile))
      }
    }, [profile])
  
    useEffect(() => {
      const getSession = async () => {
        const { data: { session }} = await supabase.auth.getSession()
        dispatchOnUserLogin(session)
      }
      void getSession()
  
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        dispatchOnUserLogin(session)
      })
  
      return () => subscription.unsubscribe()
    }, [])

    
    return (
      <OriginalComponent/>
    )
  }

  return WithAuthStateListener
}

export default withAuthStateListener