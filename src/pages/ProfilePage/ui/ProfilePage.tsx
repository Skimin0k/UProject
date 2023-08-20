import {ChangeEvent, useCallback, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useAppDispatch} from 'app/StoreProvider'
import {
    fetchUserData, getProfileError,
    getProfileIsLoading,
    getProfileProp, getProfileReadonly,
    profileActions,
    ProfileCard,
    profileReducer
} from 'entities/Profile'
import LoadableModule from 'shared/lib/redux/LoadableModule'

import ProfilePageHeader from './ProfilePageHeader/ProfilePageHeader'

export const ProfilePage = () => {
    const username = useSelector(getProfileProp('username'))
    const lastname = useSelector(getProfileProp('lastname'))
    const isLoading = useSelector(getProfileIsLoading)
    const readonly = useSelector(getProfileReadonly)
    const error = useSelector(getProfileError)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchUserData())
    }, [dispatch])

    const onChangeFirstname = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(profileActions.updateProfile({username: event.target.value}))
    }, [dispatch])

    const onChangeLastname = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(profileActions.updateProfile({lastname: event.target.value}))
    }, [dispatch])

    // eslint-disable-next-line i18next/no-literal-string
    return <LoadableModule name={'profile'} reducer={profileReducer}>
        <ProfilePageHeader/>
        <ProfileCard
            firstname={username || ''}
            lastname={lastname || ''}
            onChangeFirstname={onChangeFirstname}
            onChangeLastname={onChangeLastname}
            isLoading={isLoading}
            error={error}
            readonly={readonly}
        />
    </LoadableModule>
}