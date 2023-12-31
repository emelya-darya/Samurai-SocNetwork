import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// Мультиязычность
import './i18n'

import App from './App'
import reportWebVitals from './reportWebVitals'
import { store } from './store/redux/reduxStore'

import './assets/commonStyles/index.scss'
import 'react-datepicker/dist/react-datepicker.css'
import './assets/commonStyles/calendarStyles.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    // <React.StrictMode>
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
