import {ChangeEvent, useCallback, useEffect} from 'react'
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
    profileActions,
    ProfileCard,
    profileReducer
} from 'entities/Profile'
import {getAuthData} from 'entities/User'
import LoadableModule from 'shared/lib/redux/LoadableModule'

import ProfilePageHeader from './ProfilePageHeader/ProfilePageHeader'

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

    const onChangeFirstname = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(profileActions.updateProfile({first: event.target.value}))
    }, [dispatch])

    const onChangeLastname = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(profileActions.updateProfile({lastname: event.target.value}))
    }, [dispatch])

    const onChangeAvatar = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(profileActions.updateProfile({avatar: event.target.value}))
    }, [dispatch])

    const onChangeAge = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if(!isNaN(+event.target.value)){
            dispatch(profileActions.updateProfile({age: Number(event.target.value)}))
        }
    }, [dispatch])
    const onChangeCurrency = useCallback((value: Currency) => {
        dispatch(profileActions.updateProfile({currency: value}))
    }, [dispatch])

    // eslint-disable-next-line i18next/no-literal-string
    return <LoadableModule name={'profile'} reducer={profileReducer}>
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
            readonly={readonly}
        />
    </LoadableModule>
}