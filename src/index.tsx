import {render} from "react-dom";
import "./global.scss"
import {BrowserRouter} from "react-router-dom";
import App from "./App";
render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root')
)
