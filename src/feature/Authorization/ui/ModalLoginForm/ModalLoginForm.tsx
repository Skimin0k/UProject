import React, {FC, Suspense} from 'react'
import {useTranslation} from 'react-i18next'
import LoadableModule from 'shared/lib/redux/LoadableModule'
import Modal from 'shared/ui/Modal/Modal'

import {authReducer} from '../../model/slices/AuthorizationFormSlice'
import {LoginFormAsync} from '../LoginForm/LoginForm.async'

interface ModalLoginFormProps {
    className?: string,
    isOpen?: boolean,
    onClickOutside?: () => void
}
const asyncReducers = {auth: authReducer}
export const ModalLoginForm: FC<ModalLoginFormProps> = (props) => {
    const {t} = useTranslation()
    if (!props.isOpen) return null
    return (
        // eslint-disable-next-line i18next/no-literal-string
        <LoadableModule reducers={asyncReducers}>
            <Modal {...props}>
                <Suspense fallback={t('loading')}>
                    <LoginFormAsync/>
                </Suspense>
            </Modal>
        </LoadableModule>
    )
}