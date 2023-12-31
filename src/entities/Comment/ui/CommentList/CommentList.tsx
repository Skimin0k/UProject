import React, {memo} from 'react'
import {useTranslation} from 'react-i18next'
import {Comment, CommentCard} from 'entities/Comment'
import classNames from 'shared/lib/classNames/classNames'
import Text from 'shared/ui/Text/Text'

import styles from './CommentList.module.scss'

interface CommentListProps {
    className?: string,
    isLoading: boolean,
    comments: Comment[]
}

export const CommentList = memo((props: CommentListProps) => {
    const {
        className,
        isLoading,
        comments
    } = props
    const {t} = useTranslation()
    return (
        <div
            className={classNames(styles.CommentList, {}, [className])}
        >
            {
                comments?.length
                    ? comments.map( comment => {
                        return <CommentCard
                            key={comment.id}
                            comment={comment}
                            isLoading={isLoading}
                        />
                    })
                    : <Text text={t('комментарии отсутствуют')}/>
            }
        </div>
    )
})