import React, {memo} from 'react'
import {Comment} from 'entities/Comment'
import {routePaths, Routes} from 'shared/config/routeConfig/routerConfig'
import classNames from 'shared/lib/classNames/classNames'
import AppLink from 'shared/ui/AppLink/AppLink'
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
            <AppLink to={routePaths[Routes.PROFILE] + comment.user?.id} className={styles.CommentHeader}>
                {/* eslint-disable-next-line i18next/no-literal-string */}
                {comment.user?.avatar && <Image size={'30px'} src={comment.user.avatar}/>}
                <Text text={comment.user.username} className={styles.CommentUser}/>
            </AppLink>

            <Text text={comment.text} className={styles.CommentText}/>
        </div>
    )
})