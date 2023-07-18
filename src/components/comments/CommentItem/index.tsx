import { Row } from "../../../libs/supabase/types";

type CommentProps = Row<'comments'>

export default function CommentItem(props: CommentProps) {
  return (
    <div>
      {props.content}
    </div>
  )
}