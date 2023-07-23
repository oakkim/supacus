import { CSSProperties, PropsWithChildren, ReactNode, forwardRef } from "react";

type ContextMenuProps = {
  children: ReactNode
  style?: CSSProperties
  className?: string
}

const ContextMenu = forwardRef<HTMLDivElement, PropsWithChildren<ContextMenuProps>>(({children, style, className}: ContextMenuProps, ref) => {
  return (
    <div ref={ref} style={style} className={`flex flex-col border rounded-md overflow-hidden ${className}`}>
      {children}
    </div>
  )  
})

export default ContextMenu