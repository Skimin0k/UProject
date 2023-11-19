import { useCallback, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {useAppDispatch} from 'app/StoreProvider'
import {Currency} from 'entities/Currency'
import {
    fetchUserData,
    getProfileError,
    getProfileIsLoading,
    getProfileProp,
    getProfileReadonly,
    profileActions, ProfileCard,
    profileReducer
} from 'entities/Profile'
import {getAuthData} from 'entities/User'
import ProfilePageHeader from 'pages/ProfilePage/ui/ProfilePageHeader/ProfilePageHeader'
import LoadableModule from 'shared/lib/redux/LoadableModule'
import {PageWrapper} from 'widgets/Page'

import styles from 'pages/Article/ui/ArticlePage.module.scss'

const reducers = {profile: profileReducer}
export const ProfilePage = () => {
    const firstname = useSelector(getProfileProp('first'))
    const lastname = useSelector(getProfileProp('lastname'))
    const age = useSelector(getProfileProp('age'))
    const currency = useSelector(getProfileProp('currency'))
    const avatar = useSelector(getProfileProp('avatar'))
    const isLoading = useSelector(getProfileIsLoading)
    const readonly = useSelector(getProfileReadonly)
    const error = useSelector(getProfileError)
    const dispatch = useAppDispatch()
    const {id} = useParams<{id: string}>()
    const authData = useSelector(getAuthData)

    useEffect(() => {
        if(id) dispatch(fetchUserData(id))
    }, [dispatch, id])

    const onChangeFirstname = useCallback((value: string) => {
        dispatch(profileActions.updateProfile({first: value}))
    }, [dispatch])

    const onChangeLastname = useCallback((value: string) => {
        dispatch(profileActions.updateProfile({lastname: value}))
    }, [dispatch])

    const onChangeAvatar = useCallback((value: string) => {
        dispatch(profileActions.updateProfile({avatar: value}))
    }, [dispatch])

    const onChangeAge = useCallback((value: string) => {
        if(!isNaN(+value)){
            dispatch(profileActions.updateProfile({age: Number(value)}))
        }
    }, [dispatch])
    const onChangeCurrency = useCallback((value: Currency) => {
        dispatch(profileActions.updateProfile({currency: value}))
    }, [dispatch])

    // eslint-disable-next-line i18next/no-literal-string
    return <LoadableModule reducers={reducers}>
        <PageWrapper className={styles.ArticlePage}>
            {authData?.id == id && <ProfilePageHeader/>}
            <ProfileCard
                firstname={firstname || ''}
                lastname={lastname || ''}
                age={age || 0}
                avatar={avatar || ''}
                currency={currency as Currency || Currency.RUB}
                onChangeFirstname={onChangeFirstname}
                onChangeLastname={onChangeLastname}
                onChangeAge={onChangeAge}
                onChangeCurrency={onChangeCurrency}
                onChangeAvatar={onChangeAvatar}
                isLoading={isLoading}
                error={error}
                readOnly={readonly}
            />
        </PageWrapper>
    </LoadableModule>
}