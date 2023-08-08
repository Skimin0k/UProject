import React, {FC, Suspense} from 'react'
import {useTranslation} from 'react-i18next'
import Modal from 'shared/ui/Modal/Modal'

import {LoginFormAsync} from '../LoginForm/LoginForm.async'

interface ModalLoginFormProps {
    className?: string,
    isOpen?: boolean,
    onClickOutside?: () => void
}

export const ModalLoginForm: FC<ModalLoginFormProps> = (props) => {
    const {t} = useTranslation()
    if(!props.isOpen) return null
    return (
        <Modal {...props}>
            <Suspense fallback={t('loading')}>
                <LoginFormAsync/>
            </Suspense>
        </Modal>
    )
}