import { User } from "@supabase/supabase-js";
import { useSelector } from "react-redux";
import useProfile from "../../hooks/user/useProfile";
import { RootState } from "../../stores";
import { useEffect } from "react";
import supabase from "../../libs/supabase";
import withAuthStateListener from "../../hocs/withAuthStateListener";
const loginCompletedUri = '/login-completed'

function Login() {
  const user = useSelector<RootState>(state => state.user.user) as User
  const profile = useProfile(user)

  useEffect(() => {
    if (profile != null) {
      window.location.href = loginCompletedUri
    }
  }, [profile])

  useEffect(() => {
    const login = async () => {
      await supabase.auth.signInWithOAuth({provider: 'kakao', options: {
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
    <></>
  )
}

export default withAuthStateListener(Login)