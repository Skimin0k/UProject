import React, {FC} from 'react'
import Modal from 'shared/ui/Modal/Modal'

import {LoginForm} from '../LoginForm/LoginForm'

interface ModalLoginFormProps {
    className?: string,
    isOpen?: boolean,
    onClickOutside?: () => void
}

export const ModalLoginForm: FC<ModalLoginFormProps> = (props) => {
    return (
        <Modal {...props}>
            <LoginForm/>
        </Modal>
    )
}