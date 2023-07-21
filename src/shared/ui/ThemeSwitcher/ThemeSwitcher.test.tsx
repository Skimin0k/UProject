import {render} from '@testing-library/react'
import ThemeSwitcher from 'shared/ui/ThemeSwitcher/ThemeSwitcher'

describe('ThemeSwitcher tests', () => {
    it('render', () => {
        const screen = render(<ThemeSwitcher/>)
    })

    it('test async function', () => {
        const Component = () => {
            const someFunction = async () => {
            }
            return <button
                onClick={someFunction}
            >button</button>
        }
        const screen = render(<Component/>)
        expect(screen.getByText('button')).toBeInTheDocument()
    })
})
