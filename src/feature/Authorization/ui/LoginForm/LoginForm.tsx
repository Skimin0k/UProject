import React, {FC, useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import {getError} from 'feature/Authorization/model/selectors/getError'
import {getIsLoading} from 'feature/Authorization/model/selectors/getIsLoading'
import {getPassword} from 'feature/Authorization/model/selectors/getPassword'
import {getUsername} from 'feature/Authorization/model/selectors/getUsername'
import {submitUserAuthData} from 'feature/Authorization/model/services/submitUserAuthData'
import {authActions} from 'feature/Authorization/model/slices/AuthorizationFormSlice'
import classNames from 'shared/lib/classNames/classNames'
import BubbleButton from 'shared/ui/BubbleButton/BubbleButton'
import Input from 'shared/ui/Input/Input'
import Text, {ThemeText} from 'shared/ui/Text/Text'

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
        dispatch(submitUserAuthData({
            username, password, isLoading
        }))
    }, [dispatch, isLoading, password, username])
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