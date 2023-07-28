import { Session, User } from "@supabase/supabase-js";
import { useDispatch, useSelector } from "react-redux";
import useProfile from "../../hooks/user/useProfile";
import { RootState } from "../../stores";
import { useCallback, useEffect } from "react";
import { userAction } from "../../stores/user";
import supabase from "../../libs/supabase";
const loginCompletedUri = '/login-completed'

export default function Login() {
  const user = useSelector<RootState>(state => state.user.user) as User
  const profile = useProfile(user)
  const dispatch = useDispatch()

  const dispatchOnUserLogin = useCallback((session: Session|null) => {
    !session?.user || dispatch(userAction.setUser(session!!.user))
    dispatch(userAction.setLoggedIn(!!(session?.user)))
  }, [dispatch, userAction])

  useEffect(() => {
    if (profile != null) {
      window.location.href = loginCompletedUri
    }
  }, [profile])

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

  useEffect(() => {
    const login = async () => {
      await supabase.auth.signInWithOAuth({provider: 'kakao', options: {
        // redirectTo: `${window.location.protocol}//${window.location.host}/login-completed`
        redirectTo: window.location.href
      }})
    }

    if (profile == null) {
      login()
    } else {
      window.location.href = loginCompletedUri
    }
  }, [])

  return (
    <>

    </>
  )
}