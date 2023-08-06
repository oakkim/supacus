import { useEffect, useState } from "react"

const useClientIp = () => {
  const [ip, setIp] = useState<string|null>(null)
  
  useEffect(() => {
    const getIp = async () => {
      const response = await fetch('https://api64.ipify.org')
      if (response.status == 200) {
        const data = await response.text()
        setIp(data)
      }
    }
    getIp()
  }, [])

  return ip
}

export default useClientIp