import { useEffect, useState } from "react"
import useProfile from "../../hooks/user/useProfile"
import { useSelector } from "react-redux"
import { RootState } from "../../stores"
import { User } from "@supabase/supabase-js"
import withAuthStateListener from "../../hocs/withAuthStateListener"
import supabase from "../../libs/supabase"

function LoginCompleted() {
  const user = useSelector<RootState>(state => state.user.user) as User
  const profile = useProfile(user)
  const [messageSent, setMessageSent] = useState<boolean>(false)

  useEffect(() => {
    if (user != null && profile != null && !messageSent) {
      const retriveSessionAndSendToOpener = async () => {
        const { data, error } = await supabase.auth.getSession()
        window.opener.postMessage(data.session, process.env.PUBLIC_URL)
        setMessageSent(true)
        window.close()
      }
      retriveSessionAndSendToOpener()
    }
  }, [user, profile])

  return (
    <></>
  )
}

export default withAuthStateListener(LoginCompleted)