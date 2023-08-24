import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'

export const ArticlesListPage = () => {
    const navigate = useNavigate()
    const handleClick = useCallback((id: number) => () => {
        navigate(String(id))
    }, [navigate])

    return <div>
        {/* eslint-disable-next-line i18next/no-literal-string */}
        <button onClick={handleClick(1)}>
            article 1
        </button>
        <br/>
        {/* eslint-disable-next-line i18next/no-literal-string */}
        {/* eslint-disable-next-line i18next/no-literal-string */}
        ArticlesListPage
    </div>
}