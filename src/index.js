import React from 'react'
import { render } from 'react-snapshot'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import I18n from "redux-i18n"
import { Provider } from "react-redux"
import Store from "./store"
import RegisterServiceWorker from './registerServiceWorker'
import 'components/polyfill'
//CSS
import 'bootstrap/dist/css/bootstrap.css'
import 'react-loading-bar/dist/index.css'
import 'font-awesome/css/font-awesome.css'
//CONTAINERS
import Main from 'containers/main'
import Home from 'containers/home'
import NotFound from 'components/notFound'
//RENDER
render((
  <Provider store={Store}>
    <I18n translations={{}} initialLang={'en'} fallbackLang={'en'} useReducer={true}>
      <BrowserRouter>
        <Main>
          <Switch>
            <Route path="/" exact component={Home}/>           
            <Route component={NotFound}/>
          </Switch>
        </Main>
      </BrowserRouter>
    </I18n>
  </Provider>
), document.getElementById('root'))

RegisterServiceWorker()
