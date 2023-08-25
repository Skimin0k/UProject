import React, {memo} from 'react'
import {Comment} from 'entities/Comment'
import classNames from 'shared/lib/classNames/classNames'
import {Image} from 'shared/ui/Image/Image'
import {Skeleton} from 'shared/ui/Skeleton/Skeleton'
import Text from 'shared/ui/Text/Text'

import styles from './CommentCard.module.scss'

interface CommentCardProps {
    className?: string,
    comment: Comment,
    isLoading: boolean
}

export const CommentCard = memo((props: CommentCardProps) => {
    const {
        className,
        comment,
        isLoading
    } = props

    if(isLoading) return <Skeleton width={'100%'} height={'60px'}/>
    return (
        <div
            className={classNames(styles.CommentCard, {}, [className])}
        >
            <div className={styles.CommentHeader}>
                {/* eslint-disable-next-line i18next/no-literal-string */}
                {comment.user?.avatar && <Image size={'30px'} src={comment.user.avatar}/>}
                <Text text={comment.user.username} className={styles.CommentUser}/>
            </div>

            <Text text={comment.text} className={styles.CommentText}/>
        </div>
    )
})