import {FC, ReactNode} from 'react'
import {createPortal} from 'react-dom'

export interface PortalProps {
    children: ReactNode,
    container?: HTMLElement
}
const Portal: FC<PortalProps> = (props) => {
    const {
        children,
        container = document.getElementById('modal-root')
    } = props
    return container? createPortal(children, container): <>{children}</>
}
export default Portal