import Button from 'shared/ui/Button/Button'
import {render} from '@testing-library/react'
describe('Button test', () => {
    it('click test', () => {
        const screen = render(<Button>Test</Button>)
        expect(screen.getByText('Test')).toBeInTheDocument()
    })
})