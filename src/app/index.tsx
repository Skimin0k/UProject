import {render} from 'react-dom'
import './styles/global.scss'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import './styles/index.scss'
import {ThemeProvider} from 'shared/theme'

import './Darkenstone.ttf'

import 'shared/i18n/i18n'
render(
    <BrowserRouter>
        <ThemeProvider>
            <App/>
        </ThemeProvider>
    </BrowserRouter>,
    document.getElementById('root')
)
