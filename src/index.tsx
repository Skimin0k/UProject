import {render} from "react-dom";
import "./global.scss"
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import "./styles/index.scss"
render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root')
)
