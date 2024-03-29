import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './ui/App'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { setupStore } from './store/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const store = setupStore()

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
)
