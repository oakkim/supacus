import { useEffect } from "react"
import useProfile from "../../hooks/user/useProfile"
import { useSelector } from "react-redux"
import { RootState } from "../../stores"
import { User } from "@supabase/supabase-js"
import withAuthStateListener from "../../hocs/withAuthStateListener"

function LoginCompleted() {
  const user = useSelector<RootState>(state => state.user.user) as User
  const profile = useProfile(user)

  useEffect(() => {
    if (user != null && profile != null) {
      window.close()
    }
  }, [user, profile])

  return (
    <></>
  )
}

export default withAuthStateListener(LoginCompleted)