import {render} from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {StoreProvider} from 'app/StoreProvider'
import {WithEthereumWrapper} from 'entities/Ethereum'
import {ThemeProvider} from 'shared/theme'

import 'app/styles/fonts/Darkenstone.ttf'
import 'shared/i18n/i18n'

import App from './App'

import './styles/global.scss'
import './styles/index.scss'
render(
    <BrowserRouter>
        <StoreProvider>
            <WithEthereumWrapper>
                <ThemeProvider>
                    <App/>
                </ThemeProvider>
            </WithEthereumWrapper>
        </StoreProvider>
    </BrowserRouter>,
    document.getElementById('root')
)
