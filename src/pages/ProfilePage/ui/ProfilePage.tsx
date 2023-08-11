import {memo, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useAppDispatch} from 'app/StoreProvider/config/store'
import {getProfile} from 'entities/Profile/models/selectors/getProfile'
import {fetchUserData} from 'entities/Profile/models/services/fetchUserData'
import {profileReducer} from 'entities/Profile/models/slices/ProfileSlice'
import LoadableModule from 'shared/lib/redux/LoadableModule'

const ProfileView = memo(() => {
    const data = useSelector(getProfile)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchUserData())
    }, [dispatch])
    return <div>
        {JSON.stringify(data)}
    </div>
})
export const ProfilePage = () => {

    // eslint-disable-next-line i18next/no-literal-string
    return <LoadableModule name={'profile'} reducer={profileReducer}>
        <ProfileView/>
    </LoadableModule>
}