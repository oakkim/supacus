import { useLocation } from "react-router-dom";

export default function Error() {
  const location = useLocation()
  const searchQueries = location.search.replace('?', '').split('&').reduce<{[key: string]: string}>((prev, cur, _, __) => {
    const keyvalue = cur.split('=')
    prev[keyvalue[0]] = keyvalue[1]
    return prev
  }, {})
  const message = decodeURI(searchQueries['message'] ?? "")

  return (
    <div className="flex w-full flex-col m-4">
      <div className="text-4xl">
        오류가 발생했습니다!
      </div>
      <div className="mt-4 text-lg">
        {message}
      </div>
    </div>
  )
}