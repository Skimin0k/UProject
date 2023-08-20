import React, {FC, useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import { useSelector} from 'react-redux'
import {useAppDispatch} from 'app/StoreProvider'
import classNames from 'shared/lib/classNames/classNames'
import BubbleButton from 'shared/ui/BubbleButton/BubbleButton'
import Input from 'shared/ui/Input/Input'
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

    const onChangeUsername = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
        dispatch(authActions.setUsername(event.target.value))
    }, [dispatch])
    const onChangePassword = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
        dispatch(authActions.setPassword(event.target.value))
    }, [dispatch])
    const onSubmit = useCallback(() => {
        if (username && password)
            dispatch(submitUserAuthData({
                username,
                password
            }))
    }, [dispatch, password, username])
    return (
        <div
            className={classNames(styles.LoginForm, {}, [
                className
            ])}
        >
            <Input
                placeholder={t('loginForm_login')}
                onChange={onChangeUsername}
                value={username}
            />
            <Input
                placeholder={t('loginForm_password')}
                onChange={onChangePassword}
                value={password}
            />
            <BubbleButton
                onClick={onSubmit}
            >{t('submit_button')}</BubbleButton>
            {error && <Text text={error} theme={ThemeText.Error}/>}
            {isLoading && <Text text={`${t('loading')}...`} theme={ThemeText.Primary}/>}
        </div>
    )
}