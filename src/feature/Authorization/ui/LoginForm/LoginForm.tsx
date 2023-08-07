import React, {FC, useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import {submitUserAuthData} from 'feature/Authorization/model/services/submitUserAuthData'
import {authActions} from 'feature/Authorization/model/slices/AuthorizationFormSlice'
import classNames from 'shared/lib/classNames/classNames'
import BubbleButton from 'shared/ui/BubbleButton/BubbleButton'
import Input from 'shared/ui/Input/Input'
import Text, {ThemeText} from 'shared/ui/Text/Text'

import {getAuthData} from '../../model/selectors/getAuthData'

import styles from './LoginForm.module.scss'

interface LoginFormProps {
    className?: string
}

export const LoginForm: FC<LoginFormProps> = (props) => {
    const {
        className
    } = props
    const {t} = useTranslation('translation')
    
    const dispatch = useDispatch()
    const authData = useSelector(getAuthData)
    
    const onChangeUsername = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
        dispatch(authActions.setUsername(event.target.value))
    },[dispatch])
    const onChangePassword = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
        dispatch(authActions.setPassword(event.target.value))
    },[dispatch])
    const onSubmit = useCallback(() => {
        dispatch(submitUserAuthData(authData))
    },[authData, dispatch])
    return (
        <div
            className={classNames(styles.LoginForm, {}, [className])}
        >
            <Input
                placeholder={t('loginForm_login')}
                onChange={onChangeUsername}
                value={authData.username}
            />
            <Input
                placeholder={t('loginForm_password')}
                onChange={onChangePassword}
                value={authData.password}
            />
            <BubbleButton
                onClick={onSubmit}
            >{t('submit_button')}</BubbleButton>
            {authData?.error && <Text text={authData.error} theme={ThemeText.Error}/>}
            {authData?.isLoading && <Text text={`${t('loading')}...`} theme={ThemeText.Primary}/>}
        </div>
    )
}