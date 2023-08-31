import React, {ChangeEvent, memo, MouseEvent} from 'react'
import {useTranslation} from 'react-i18next'
import classNames from 'shared/lib/classNames/classNames'
import Text from 'shared/ui/Text/Text'

import styles from './AddCommentForm.module.scss'

interface AddCommentFormProps {
    className?: string,
    value: string,
    onChange: (event:  ChangeEvent<HTMLInputElement>) => void,
    onSubmit: (event:  MouseEvent<HTMLButtonElement>) => void,
    error?: string
    isLoading?:boolean
}

export const AddCommentForm = memo((props: AddCommentFormProps) => {
    const {
        className,
        onChange,
        value,
        onSubmit,
        isLoading,
        error
    } = props
    const {t} = useTranslation()
    return (
        <div
            className={classNames(styles.AddCommentForm, {}, [className])}
        >
            <input value={value} onChange={onChange} className={styles.AddCommentInput}/>
            <button
                onClick={onSubmit}
            ><Text text={t('отправить')}/></button>
            {isLoading && <Text text={t('загрузка')} />}
            {error && <Text text={t(error)} />}
        </div>
    )
})