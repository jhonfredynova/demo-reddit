import { combineReducers } from 'redux'
import { i18nState } from 'redux-i18n'
import app from 'reducers/appReducer'
import post from 'reducers/postReducer'

export default combineReducers({
  app,
  i18nState,
  post
})