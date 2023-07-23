import { ReactNode } from "react"

type ContextMenuProps = {
  id: string
  className?: string
  icon?: ReactNode
  title: string
  onClick: (id: string) => void
}

export default function ContextMenuItem({id, className, icon, title, onClick}: ContextMenuProps) {
  return (
    <div className={`flex items-center p-3 border-b last:border-0 hover:bg-stone-50 cursor-pointer ${className}`} onClick={() => onClick(id)}>
      {icon != null ? <div className="mr-2">
        {icon}
      </div> : <></>}
      {title}
    </div>
  )
}