import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StateProvider } from './context/StateProvidor.js'
import reducer, { initialState } from './context/reducer.js'

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App/>
  </StateProvider>,
  document.getElementById("root")
)
