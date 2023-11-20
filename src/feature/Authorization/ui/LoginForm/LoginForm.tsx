import React, {FC, useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import { useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useAppDispatch} from 'app/StoreProvider'
import classNames from 'shared/lib/classNames/classNames'
import BubbleButton from 'shared/ui/BubbleButton/BubbleButton'
import {DebouncedInput} from 'shared/ui/DebouncedInput/DebouncedInput'
import Text, {ThemeText} from 'shared/ui/Text/Text'

import {getError} from '../../model/selectors/getError'
import {getIsLoading} from '../../model/selectors/getIsLoading'
import {getPassword} from '../../model/selectors/getPassword'
import {getUsername} from '../../model/selectors/getUsername'
import {submitUserAuthData} from '../../model/services/submitUserAuthData'
import {authActions} from '../../model/slices/AuthorizationFormSlice'

import styles from './LoginForm.module.scss'

interface LoginFormProps {
    className?: string
}

export const LoginForm: FC<LoginFormProps> = (props) => {
    const {
        className
    } = props
    const {t} = useTranslation('translation')

    const dispatch = useAppDispatch()
    const username = useSelector(getUsername)
    const password = useSelector(getPassword)
    const isLoading = useSelector(getIsLoading)
    const error = useSelector(getError)

    const onChangeUsername = useCallback((value) => {
        dispatch(authActions.setUsername(value))
    }, [dispatch])
    const onChangePassword = useCallback((value) => {
        dispatch(authActions.setPassword(value))
    }, [dispatch])
    const navigate = useNavigate()
    const onSubmit = useCallback(() => {
        if (username && password)
            dispatch(submitUserAuthData({
                authData: {
                    username,
                    password
                },
                navigate
            }))
    }, [dispatch, navigate, password, username])
    return (
        <div
            className={classNames(styles.LoginForm, {}, [
                className
            ])}
        >
            <DebouncedInput
                placeholder={t('loginForm_login')}
                onChange={onChangeUsername}
                value={username}
                delay={400}
            />
            <DebouncedInput
                placeholder={t('loginForm_password')}
                onChange={onChangePassword}
                value={password}
                delay={400}
            />
            <BubbleButton
                onClick={onSubmit}
            >{t('submit_button')}</BubbleButton>
            {error && <Text text={error} theme={ThemeText.Error}/>}
            {isLoading && <Text text={`${t('loading')}...`} theme={ThemeText.Primary}/>}
        </div>
    )
}