import React, {FC, useCallback, useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {useSelector} from 'react-redux'
import {useAppDispatch} from 'app/StoreProvider'
import {getProfileReadonly, getValidateErrors, profileActions, updateProfileData} from 'entities/Profile'
import {ValidateDataErrors} from 'entities/Profile/models/types/ProfileSchema'
import classNames from 'shared/lib/classNames/classNames'
import Button, {ButtonThemes} from 'shared/ui/Button/Button'
import Text, {ThemeText} from 'shared/ui/Text/Text'

import styles from './ProfilePageHeader.module.scss'

interface ProfilePageHeaderProps {
    className?: string
}

const ProfilePageHeader: FC<ProfilePageHeaderProps> = (props) => {
    const {
        className
    } = props
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

    const validateErrors = useSelector(getValidateErrors)
    const {t} = useTranslation('profile')

    const validateErrorsTranslation = useMemo(() => ({
        [ValidateDataErrors.NO_DATA]: t('данные не пришли с сервера'),
        [ValidateDataErrors.SERVER_ERROR]: t('сервер не отвечает'),
        [ValidateDataErrors.INVALIDATE_AGE]: t('некорректно задан возраст'),
        [ValidateDataErrors.INVALIDATE_COUNTRY ]: t('некорректно задана страна'),
        [ValidateDataErrors.INVALIDATE_FIRSTNAME]: t('некорректно задано имя'),
        [ValidateDataErrors.INVALIDATE_LASTNAME]: t('некорректно задано второе имя'),
    }), [t])

    return (
        <div
            className={classNames(styles.ProfilePageHeader, {}, [className])}
        >
            {
                readonly
                    ? <Button
                        onClick={onEdit}
                        theme={ButtonThemes.OUTLINE}
                    >
                        {t('edit')}
                    </Button>
                    :<div className={styles.Buttons}>
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
            <div>
                {
                    validateErrors?.length && validateErrors.map(error =>
                        <Text
                            key={error}
                            theme={ThemeText.Error}
                            text={validateErrorsTranslation[error]}
                        />
                    )
                }
            </div>

        </div>
    )
}

export default ProfilePageHeader