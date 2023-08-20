import React, {FC, useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import {useAppDispatch} from 'app/StoreProvider'
import {getProfileReadonly, profileActions, updateProfileData} from 'entities/Profile'
import classNames from 'shared/lib/classNames/classNames'
import Button, {ButtonThemes} from 'shared/ui/Button/Button'

import styles from './ProfilePageHeader.module.scss'

interface ProfilePageHeaderProps {
    className?: string
}

const ProfilePageHeader: FC<ProfilePageHeaderProps> = (props) => {
    const {
        className
    } = props
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const readonly = useSelector(getProfileReadonly)
    const onEdit = useCallback(() => {
        dispatch(profileActions.edit())
    },[dispatch])
    const onCancel = useCallback(() => {
        dispatch(profileActions.cancelEdit())
    },[dispatch])
    const onSave = useCallback(() => {
        dispatch(updateProfileData())
    },[dispatch])

    return (
        <div
            className={classNames(styles.ProfilePageHeader, {}, [className])}
        >
            {
                readonly
                    ? <div>
                        <Button
                            onClick={onEdit}
                            theme={ButtonThemes.OUTLINE}
                        >
                            {t('edit')}
                        </Button>
                    </div>
                    :<div>
                        <Button
                            onClick={onCancel}
                            theme={ButtonThemes.OUTLINE}
                        >
                            {t('cancel')}
                        </Button>
                        <Button
                            onClick={onSave}
                            theme={ButtonThemes.OUTLINE}
                        >
                            {t('save')}
                        </Button>
                    </div>

            }

        </div>
    )
}

export default ProfilePageHeader